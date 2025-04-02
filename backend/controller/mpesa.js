const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const axios = require("axios");
const crypto = require("crypto");
const Order = require("../model/order");
const ErrorHandler = require("../utils/ErrorHandler");

// M-Pesa API credentials
const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET;
const PASSKEY = process.env.MPESA_PASSKEY;
const SHORTCODE = process.env.MPESA_SHORTCODE;
const CALLBACK_URL = process.env.MPESA_CALLBACK_URL;

// Validate environment variables
const validateEnvVariables = () => {
  const required = ['MPESA_CONSUMER_KEY', 'MPESA_CONSUMER_SECRET', 'MPESA_PASSKEY', 'MPESA_SHORTCODE', 'MPESA_CALLBACK_URL'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('Missing M-Pesa environment variables:', missing);
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  // Log the values (without exposing sensitive data)
  console.log('M-Pesa Configuration:', {
    hasConsumerKey: !!process.env.MPESA_CONSUMER_KEY,
    hasConsumerSecret: !!process.env.MPESA_CONSUMER_SECRET,
    hasPasskey: !!process.env.MPESA_PASSKEY,
    shortcode: process.env.MPESA_SHORTCODE,
    callbackUrl: process.env.MPESA_CALLBACK_URL
  });
};

// Generate access token
const getAccessToken = async () => {
  try {
    validateEnvVariables();
    const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");
    console.log('Attempting to get M-Pesa access token...');
    
    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: { Authorization: `Basic ${auth}` },
      }
    );
    
    console.log('Successfully obtained M-Pesa access token');
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting access token:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers
    });
    throw new ErrorHandler("Failed to get M-Pesa access token", 500);
  }
};

// Generate timestamp
const getTimestamp = () => {
  return new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -3);
};

// Generate password
const getPassword = () => {
  const timestamp = getTimestamp();
  const str = SHORTCODE + PASSKEY + timestamp;
  return Buffer.from(str).toString('base64');
};

// Initiate STK Push
router.post(
  "/initiate",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { amount, phoneNumber } = req.body;
      
      if (!amount || !phoneNumber) {
        return next(new ErrorHandler("Amount and phone number are required", 400));
      }

      // Format phone number (remove leading 0 or +254)
      const formattedPhone = phoneNumber.replace(/^0|^\+254/, "254");
      
      // Validate phone number format
      if (!/^254[71](?:(?:0[0-8])|(?:[12][0-9])|(?:9[0-9])|(?:4[0-3])|(?:4[5-9])|(?:5[7-9])|(?:6[8-9])|(?:7[0-9])|(?:8[0-2])|(?:8[4-9]))[0-9]{6}$/.test(formattedPhone)) {
        return next(new ErrorHandler("Invalid phone number format. Use format: 254XXXXXXXXX", 400));
      }

      // Format amount - convert to integer and ensure it's at least 1
      const formattedAmount = Math.max(1, Math.round(Number(amount)));

      const accessToken = await getAccessToken();
      const timestamp = getTimestamp();
      const password = getPassword();

      const response = await axios.post(
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        {
          BusinessShortCode: SHORTCODE,
          Password: password,
          Timestamp: timestamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: formattedAmount,
          PartyA: formattedPhone,
          PartyB: SHORTCODE,
          PhoneNumber: formattedPhone,
          CallBackURL: CALLBACK_URL,
          AccountReference: "KartHub",
          TransactionDesc: "Payment for goods",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.ResponseCode === "0") {
        console.log("M-Pesa STK Push initiated successfully:", response.data);
        res.status(200).json({
          success: true,
          transactionId: response.data.CheckoutRequestID,
          CheckoutRequestID: response.data.CheckoutRequestID,
          MerchantRequestID: response.data.MerchantRequestID,
          message: "STK Push initiated successfully",
        });
      } else {
        console.error("M-Pesa STK Push failed:", response.data);
        return next(new ErrorHandler(response.data.ResponseDescription || "Failed to initiate M-Pesa payment", 400));
      }
    } catch (error) {
      console.error("M-Pesa STK Push error:", error.response?.data || error.message);
      return next(new ErrorHandler(error.response?.data?.ResponseDescription || "Failed to initiate M-Pesa payment", 500));
    }
  })
);

// M-Pesa Callback URL
router.post(
  "/callback",
  catchAsyncErrors(async (req, res) => {
    try {
      console.log("=== M-Pesa Callback Received ===");
      console.log("Headers:", JSON.stringify(req.headers, null, 2));
      console.log("Body:", JSON.stringify(req.body, null, 2));
      
      // Handle both v1 and v2 callback formats
      const callbackData = req.body.Body?.stkCallback || req.body;
      console.log("Extracted callback data:", JSON.stringify(callbackData, null, 2));

      if (!callbackData) {
        console.error("No callback data found in request");
        return res.status(400).json({
          success: false,
          message: "Invalid callback data",
        });
      }

      const { ResultCode, MerchantRequestID, CheckoutRequestID, ResultDesc } = callbackData;
      
      console.log("Extracted fields:", {
        ResultCode,
        MerchantRequestID,
        CheckoutRequestID,
        ResultDesc
      });
      
      if (!MerchantRequestID) {
        console.error("No MerchantRequestID in callback data");
        return res.status(400).json({
          success: false,
          message: "Missing MerchantRequestID in callback data",
        });
      }

      console.log("Searching for order with transaction IDs:", {
        merchantRequestId: MerchantRequestID,
        checkoutRequestId: CheckoutRequestID
      });
      
      // Find the order first
      const order = await Order.findOne({
        $or: [
          { "paymentInfo.transactionId": CheckoutRequestID },
          { "paymentInfo.CheckoutRequestID": CheckoutRequestID },
          { "paymentInfo.MerchantRequestID": MerchantRequestID }
        ]
      });

      if (!order) {
        console.error("Order not found for transaction:", {
          merchantRequestId: MerchantRequestID,
          checkoutRequestId: CheckoutRequestID
        });
        console.error("Search criteria:", {
          transactionId: CheckoutRequestID,
          checkoutRequestId: CheckoutRequestID,
          merchantRequestId: MerchantRequestID
        });
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      console.log("Found order:", {
        orderId: order._id,
        currentStatus: order.paymentInfo.status,
        paymentInfo: order.paymentInfo,
        resultCode: ResultCode
      });

      // Update order based on result code
      let updateData = {};
      
      if (ResultCode === 0) {
        // Payment successful
        updateData = {
          "paymentInfo.status": "Succeeded",
          status: "Processing"
        };
        console.log("Payment successful, updating order status to Succeeded");
      } else if (ResultCode === 1032) {
        // Payment cancelled
        updateData = {
          "paymentInfo.status": "Cancelled",
          status: "Cancelled"
        };
        console.log("Payment cancelled, updating order status to Cancelled");
      } else {
        // Payment failed
        updateData = {
          "paymentInfo.status": "Failed",
          status: "Payment Failed"
        };
        console.log("Payment failed, updating order status to Failed");
      }

      // Update the order
      const updatedOrder = await Order.findByIdAndUpdate(
        order._id,
        updateData,
        { new: true }
      );

      console.log("Order updated successfully:", {
        orderId: updatedOrder._id,
        newStatus: updatedOrder.paymentInfo.status,
        orderStatus: updatedOrder.status,
        resultCode: ResultCode,
        resultDesc: ResultDesc
      });

      res.status(200).json({
        success: true,
        message: ResultCode === 0 ? "Payment successful" : 
                ResultCode === 1032 ? "Payment cancelled" : 
                "Payment failed",
        resultCode: ResultCode,
        resultDesc: ResultDesc,
        orderStatus: updatedOrder.paymentInfo.status
      });
    } catch (error) {
      console.error("=== M-Pesa Callback Error ===");
      console.error("Error details:", error);
      console.error("Stack trace:", error.stack);
      res.status(500).json({
        success: false,
        message: "Error processing callback",
        error: error.message
      });
    }
  })
);

module.exports = router; 