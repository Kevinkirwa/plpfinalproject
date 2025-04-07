import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";
import axios from "axios";
import { toast } from "react-toastify";

const SellerActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activation_token) {
      const activateSeller = async () => {
        try {
          const res = await axios.post(`${server}/shop/activation`, {
            activation_token,
          });
          toast.success("Your shop has been activated successfully!");
          setLoading(false);
          // Redirect to shop login after 2 seconds
          setTimeout(() => {
            window.location.href = "/shop-login";
          }, 2000);
        } catch (error) {
          setError(true);
          setLoading(false);
          toast.error(error.response?.data?.message || "Error activating shop");
        }
      };
      activateSeller();
    }
  }, [activation_token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Shop Activation
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {loading
              ? "Activating your shop account..."
              : error
              ? "There was an error activating your shop"
              : "Your shop has been activated successfully!"}
          </p>
        </div>
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600">
            <p>Please try again or contact support if the problem persists.</p>
          </div>
        ) : (
          <div className="text-center text-green-600">
            <p>Redirecting to login page...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerActivationPage; 