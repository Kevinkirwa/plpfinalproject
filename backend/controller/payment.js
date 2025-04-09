const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const SellerMpesa = require("../models/sellerMpesa");
const { decryptData } = require("../utils/encryption");
const ErrorHandler = require("../utils/ErrorHandler");
const axios = require("axios");
const Order = require("../models/order");
const Payment = require("../models/payment");

// Payment routes will be handled by M-Pesa
router.get("/status", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Payment system is active",
  });
});

// Process payment using seller's M-Pesa credentials
exports.processPayment = async (req, res, next) => {
  try {
    const { orderId, phoneNumber, amount } = req.body;

    // Get the order details
    const order = await Order.findById(orderId).populate("shopId");
    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    // Get seller's M-Pesa credentials
    const mpesaCredentials = await SellerMpesa.findOne({ 
      sellerId: order.shopId._id,
      isActive: true 
    });

    if (!mpesaCredentials) {
      return next(new ErrorHandler("Seller M-Pesa credentials not found or inactive", 400));
    }

    // Decrypt the credentials
    const consumerKey = decryptData(mpesaCredentials.consumerKey);
    const consumerSecret = decryptData(mpesaCredentials.consumerSecret);
    const passKey = decryptData(mpesaCredentials.passKey);
    const shortCode = mpesaCredentials.shortCode;

    // Generate access token
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
    const tokenResponse = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Generate timestamp
    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, -3);

    // Generate password
    const password = Buffer.from(
      `${shortCode}${passKey}${timestamp}`
    ).toString("base64");

    // Make STK push request
    const stkPushResponse = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: shortCode,
        PhoneNumber: phoneNumber,
        CallBackURL: `${process.env.BACKEND_URL}/api/v2/payment/mpesa-callback`,
        AccountReference: `Order-${orderId}`,
        TransactionDesc: "Payment for order",
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Save payment details
    const payment = await Payment.create({
      orderId,
      amount,
      phoneNumber,
      merchantRequestID: stkPushResponse.data.MerchantRequestID,
      checkoutRequestID: stkPushResponse.data.CheckoutRequestID,
      status: "pending",
    });

    res.status(200).json({
      success: true,
      message: "Payment initiated successfully",
      data: payment,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Handle M-Pesa callback
exports.mpesaCallback = async (req, res, next) => {
  try {
    const { Body: { stkCallback: callback } } = req.body;

    // Find the payment record
    const payment = await Payment.findOne({
      merchantRequestID: callback.MerchantRequestID,
      checkoutRequestID: callback.CheckoutRequestID,
    });

    if (!payment) {
      return next(new ErrorHandler("Payment not found", 404));
    }

    // Update payment status
    if (callback.ResultCode === 0) {
      payment.status = "completed";
      payment.mpesaReceiptNumber = callback.CallbackMetadata.Item[1].Value;
      payment.transactionDate = callback.CallbackMetadata.Item[3].Value;
      payment.phoneNumber = callback.CallbackMetadata.Item[4].Value;

      // Update order status
      await Order.findByIdAndUpdate(payment.orderId, {
        paymentInfo: {
          id: payment._id,
          status: "completed",
          type: "M-Pesa",
        },
        paidAt: Date.now(),
      });
    } else {
      payment.status = "failed";
      payment.failureReason = callback.ResultDesc;
    }

    await payment.save();

    res.status(200).json({
      success: true,
      message: "Callback processed successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports = router;