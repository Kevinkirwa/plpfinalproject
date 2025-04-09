import React, { useState } from "react";
import { useSelector } from "react-redux";
import { server } from "../../server";
import { toast } from "react-toastify";
import axios from "axios";

const Payment = ({ order, setActive }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);

  const handlePayment = async () => {
    if (!phoneNumber) {
      toast.error("Please enter your M-Pesa phone number");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/payment/process`,
        {
          orderId: order._id,
          phoneNumber: phoneNumber,
          amount: order.totalPrice,
        },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Payment initiated successfully! Please check your phone");
        // Poll for payment status
        pollPaymentStatus(data.data._id);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const pollPaymentStatus = async (paymentId) => {
    const interval = setInterval(async () => {
      try {
        const { data } = await axios.get(
          `${server}/payment/status/${paymentId}`,
          { withCredentials: true }
        );

        if (data.success) {
          if (data.data.status === "completed") {
            clearInterval(interval);
            toast.success("Payment completed successfully!");
            setActive(3); // Move to next step
          } else if (data.data.status === "failed") {
            clearInterval(interval);
            toast.error("Payment failed: " + data.data.failureReason);
          }
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
      }
    }, 5000); // Check every 5 seconds

    // Clear interval after 5 minutes
    setTimeout(() => {
      clearInterval(interval);
      toast.error("Payment verification timeout. Please check your M-Pesa statement.");
    }, 300000);
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-6">M-Pesa Payment</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            M-Pesa Phone Number
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="e.g., 254712345678"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            Enter the phone number registered with M-Pesa
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Order Summary</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between mb-2">
              <span>Total Amount:</span>
              <span>KSh {order.totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Order ID:</span>
              <span>{order._id}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-3 px-4 rounded-md text-white font-medium ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing..." : "Pay with M-Pesa"}
        </button>

        <div className="mt-4 text-sm text-gray-500">
          <p>You will receive an M-Pesa prompt on your phone.</p>
          <p>Please enter your M-Pesa PIN to complete the payment.</p>
        </div>
      </div>
    </div>
  );
};

export default Payment; 