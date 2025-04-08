import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { FiDollarSign, FiCreditCard, FiClock } from "react-icons/fi";
import ShopLayout from "../../components/Shop/ShopLayout";

const ShopWithdrawMoney = () => {
  const { seller } = useSelector((state) => state.seller);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    accountNumber: "",
    accountName: "",
  });

  useEffect(() => {
    fetchWithdrawals();
    fetchBankInfo();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/withdraw/get-withdrawals/${seller._id}`,
        { withCredentials: true }
      );
      setWithdrawals(response.data.withdrawals);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching withdrawals");
    } finally {
      setLoading(false);
    }
  };

  const fetchBankInfo = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/shop/get-bank-info/${seller._id}`,
        { withCredentials: true }
      );
      if (response.data.bankInfo) {
        setBankInfo(response.data.bankInfo);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching bank info");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/withdraw/create-withdrawal`,
        {
          amount: parseFloat(amount),
          shopId: seller._id,
        },
        { withCredentials: true }
      );
      toast.success("Withdrawal request submitted successfully!");
      setAmount("");
      fetchWithdrawals();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting withdrawal request");
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <ShopLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </ShopLayout>
    );
  }

  return (
    <ShopLayout>
      <div className="w-full p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Withdraw Money</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your earnings and withdrawal requests
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Withdrawal Form */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Request Withdrawal
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bank Information
                </label>
                <div className="mt-1 space-y-2">
                  <input
                    type="text"
                    value={bankInfo.bankName}
                    readOnly
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Bank Name"
                  />
                  <input
                    type="text"
                    value={bankInfo.accountNumber}
                    readOnly
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Account Number"
                  />
                  <input
                    type="text"
                    value={bankInfo.accountName}
                    readOnly
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Account Name"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Request Withdrawal
              </button>
            </form>
          </div>

          {/* Withdrawal History */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Withdrawal History
            </h2>
            {withdrawals.length === 0 ? (
              <div className="text-center py-8">
                <FiClock className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No withdrawals yet
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Your withdrawal history will appear here.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {withdrawals.map((withdrawal) => (
                      <tr key={withdrawal._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            ${withdrawal.amount}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              withdrawal.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : withdrawal.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {withdrawal.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatDate(withdrawal.createdAt)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </ShopLayout>
  );
};

export default ShopWithdrawMoney; 