import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { server } from "../../server";
import { toast } from "react-toastify";
import axios from "axios";

const ShopMpesaSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [credentials, setCredentials] = useState({
    consumerKey: "",
    consumerSecret: "",
    passKey: "",
    shortCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [existingCredentials, setExistingCredentials] = useState(null);

  useEffect(() => {
    fetchMpesaCredentials();
  }, []);

  const fetchMpesaCredentials = async () => {
    try {
      const { data } = await axios.get(
        `${server}/seller-mpesa/get/${seller._id}`,
        { withCredentials: true }
      );
      if (data.success) {
        setExistingCredentials(data.data);
        setCredentials({
          consumerKey: data.data.consumerKey,
          consumerSecret: data.data.consumerSecret,
          passKey: data.data.passKey,
          shortCode: data.data.shortCode,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/seller-mpesa/add`,
        {
          sellerId: seller._id,
          ...credentials,
        },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("M-Pesa credentials added successfully!");
        setExistingCredentials(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.put(
        `${server}/seller-mpesa/update/${seller._id}`,
        credentials,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("M-Pesa credentials updated successfully!");
        setExistingCredentials(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen p-4">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-6">M-Pesa Settings</h2>
        
        <form onSubmit={existingCredentials ? handleUpdate : handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Consumer Key
              </label>
              <input
                type="text"
                value={credentials.consumerKey}
                onChange={(e) =>
                  setCredentials({ ...credentials, consumerKey: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Consumer Secret
              </label>
              <input
                type="password"
                value={credentials.consumerSecret}
                onChange={(e) =>
                  setCredentials({ ...credentials, consumerSecret: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pass Key
              </label>
              <input
                type="password"
                value={credentials.passKey}
                onChange={(e) =>
                  setCredentials({ ...credentials, passKey: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Code
              </label>
              <input
                type="text"
                value={credentials.shortCode}
                onChange={(e) =>
                  setCredentials({ ...credentials, shortCode: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading
                ? "Processing..."
                : existingCredentials
                ? "Update Credentials"
                : "Save Credentials"}
            </button>
          </div>
        </form>

        {existingCredentials && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium mb-2">Current Status</h3>
            <p className="text-sm text-gray-600">
              M-Pesa credentials are {existingCredentials.isActive ? "active" : "inactive"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopMpesaSettings; 