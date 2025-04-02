import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { FaMobileAlt } from "react-icons/fa";

const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };

  const mpesaPaymentHandler = async (e, phoneNumber) => {
    e.preventDefault();
    
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // First initiate M-Pesa payment
      const mpesaResponse = await axios.post(
        `${server}/mpesa/initiate`,
        {
          amount: orderData?.totalPrice,
          phoneNumber: phoneNumber,
        },
        config
      );

      if (mpesaResponse?.data?.success) {
        // Wait for payment confirmation
        toast.info("Please check your phone for the M-Pesa prompt and enter your PIN");

        // Store all transaction IDs from the M-Pesa response
        order.paymentInfo = {
          type: "M-Pesa",
          transactionId: mpesaResponse?.data?.CheckoutRequestID,
          CheckoutRequestID: mpesaResponse?.data?.CheckoutRequestID,
          MerchantRequestID: mpesaResponse?.data?.MerchantRequestID,
          status: "pending",
        };

        console.log("Creating order with payment info:", order.paymentInfo);

        // Create order
        await axios.post(`${server}/order/create-order`, order, config)
          .then((res) => {
            if (res?.data?.success) {
              console.log("Order created successfully:", res.data);
              // Start polling for payment status using CheckoutRequestID
              pollPaymentStatus(mpesaResponse?.data?.CheckoutRequestID);
            } else {
              console.error("Order creation failed:", res?.data);
              toast.error(res?.data?.message || "Failed to create order");
            }
          })
          .catch((error) => {
            console.error("Order creation error:", error);
            toast.error(error.response?.data?.message || "Failed to create order");
          });
      } else {
        toast.error(mpesaResponse?.data?.message || "M-Pesa payment initiation failed. Please try again.");
      }
    } catch (error) {
      console.error("M-Pesa payment error:", error);
      const errorMessage = error.response?.data?.message || "Payment failed. Please try again.";
      toast.error(errorMessage);
      
      // If the error is due to invalid phone number format
      if (errorMessage.includes("Invalid phone number format")) {
        toast.info("Please enter your phone number in the format: 254XXXXXXXXX");
      }
    }
  };

  const pollPaymentStatus = async (transactionId) => {
    let attempts = 0;
    const maxAttempts = 30; // 5 minutes (10 seconds * 30)

    const checkStatus = async () => {
      try {
        const response = await axios.get(
          `${server}/order/status/${transactionId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response?.data?.status === "Succeeded") {
          navigate("/order/success");
          toast.success("Payment successful! Your order has been placed.");
          localStorage.setItem("cartItems", JSON.stringify([]));
          localStorage.setItem("latestOrder", JSON.stringify([]));
          window.location.reload();
          return;
        }

        if (attempts < maxAttempts) {
          attempts++;
          setTimeout(checkStatus, 10000); // Check every 10 seconds
        } else {
          toast.error("Payment status check timed out. Please contact support if payment was deducted.");
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
        if (attempts < maxAttempts) {
          attempts++;
          setTimeout(checkStatus, 10000);
        }
      }
    };

    checkStatus();
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo
            user={user}
            mpesaPaymentHandler={mpesaPaymentHandler}
            orderData={orderData}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({
  user,
  mpesaPaymentHandler,
  orderData
}) => {
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");

  const handleMpesaSubmit = (e) => {
    e.preventDefault();
    mpesaPaymentHandler(e, phoneNumber);
  };

  return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      <div>
        {/* M-Pesa Header */}
        <div className="flex items-center mb-6">
          <FaMobileAlt size={30} className="text-[#12b32a] mr-3" />
          <h4 className="text-[20px] font-[600] text-[#000000b1]">
            Pay with M-Pesa
          </h4>
        </div>

        {/* M-Pesa payment form */}
        <div className="w-full">
          <form className="w-full" onSubmit={handleMpesaSubmit}>
            <div className="w-full flex pb-3">
              <div className="w-[50%]">
                <label className="block pb-2">Phone Number</label>
                <input
                  required
                  type="tel"
                  pattern="^(?:254|\+254|0)?([71](?:(?:0[0-8])|(?:[12][0-9])|(?:9[0-9])|(?:4[0-3])|(?:4[5-9])|(?:5[7-9])|(?:6[8-9])|(?:7[0-9])|(?:8[0-2])|(?:8[4-9]))[0-9]{6})$"
                  placeholder="Enter M-Pesa number (e.g., 254712345678)"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={`${styles.input} !w-[95%] text-[#444]`}
                />
                <p className="text-[12px] text-gray-500 mt-1">
                  Enter number in format: 254XXXXXXXXX
                </p>
              </div>
              <div className="w-[50%]">
                <label className="block pb-2">Amount (KES)</label>
                <input
                  disabled
                  value={orderData?.totalPrice}
                  className={`${styles.input} !w-[95%] text-[#444] bg-gray-100`}
                />
              </div>
            </div>
            <button
              type="submit"
              className={`${styles.button} !bg-[#12b32a] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600] transition-all hover:bg-[#0f9c24] w-full mt-4`}
            >
              Pay Now with M-Pesa
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const CartData = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2);
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">KES {orderData?.subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">KES {shipping}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">{orderData?.discountPrice? "KES " + orderData.discountPrice : "-"}</h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        KES {orderData?.totalPrice}
      </h5>
      <br />
    </div>
  );
};

export default Payment;
