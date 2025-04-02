import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { FaFileAlt } from "react-icons/fa";

const KYCReview = () => {
  const [pendingVerifications, setPendingVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeller, setSelectedSeller] = useState(null);

  useEffect(() => {
    fetchPendingVerifications();
  }, []);

  const fetchPendingVerifications = async () => {
    try {
      const response = await axios.get(`${server}/admin/pending-kyc`);
      if (response.data.success) {
        setPendingVerifications(response.data.sellers);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching verifications");
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (sellerId, status, reason = "") => {
    try {
      const response = await axios.post(`${server}/admin/review-kyc`, {
        sellerId,
        status,
        reason
      });

      if (response.data.success) {
        toast.success(`KYC ${status === "approved" ? "approved" : "rejected"} successfully`);
        fetchPendingVerifications();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error reviewing KYC");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">KYC Verification Review</h2>
        <p className="text-gray-600">Review and verify seller documentation for legitimacy</p>
      </div>
      
      {pendingVerifications.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No pending KYC verifications</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingVerifications.map((seller) => (
            <div
              key={seller._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold">{seller.name}</h3>
                <p className="text-gray-600">{seller.email}</p>
                <p className="text-sm text-gray-500">Business Location: {seller.address}</p>
              </div>

              <div className="space-y-4">
                {/* Personal Identification */}
                <div className="border-t pt-4">
                  <h4 className="font-medium text-lg mb-3">Personal Identification</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">ID Card Front</label>
                      <img
                        src={seller.kycDocuments.idFront}
                        alt="ID Front"
                        className="mt-1 w-full h-32 object-cover rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">ID Card Back</label>
                      <img
                        src={seller.kycDocuments.idBack}
                        alt="ID Back"
                        className="mt-1 w-full h-32 object-cover rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Selfie with ID</label>
                      <img
                        src={seller.kycDocuments.selfie}
                        alt="Selfie"
                        className="mt-1 w-full h-32 object-cover rounded"
                      />
                    </div>
                  </div>
                </div>

                {/* Business Documentation */}
                <div className="border-t pt-4">
                  <h4 className="font-medium text-lg mb-3">Business Documentation</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Business Registration Certificate</label>
                      <img
                        src={seller.kycDocuments.businessRegistration}
                        alt="Business Registration"
                        className="mt-1 w-full h-32 object-cover rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">KRA PIN Certificate</label>
                      <img
                        src={seller.kycDocuments.kraPin}
                        alt="KRA PIN"
                        className="mt-1 w-full h-32 object-cover rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Business Permit</label>
                      <img
                        src={seller.kycDocuments.businessPermit}
                        alt="Business Permit"
                        className="mt-1 w-full h-32 object-cover rounded"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Verification */}
                <div className="border-t pt-4">
                  <h4 className="font-medium text-lg mb-3">Additional Verification</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Bank Statement (Last 3 months)</label>
                      <img
                        src={seller.kycDocuments.bankStatement}
                        alt="Bank Statement"
                        className="mt-1 w-full h-32 object-cover rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Utility Bill (Proof of Address)</label>
                      <img
                        src={seller.kycDocuments.utilityBill}
                        alt="Utility Bill"
                        className="mt-1 w-full h-32 object-cover rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-4">
                <button
                  onClick={() => handleReview(seller._id, "approved")}
                  className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  <AiOutlineCheck className="mr-2" />
                  Approve
                </button>
                <button
                  onClick={() => {
                    const reason = prompt("Please provide rejection reason:");
                    if (reason) {
                      handleReview(seller._id, "rejected", reason);
                    }
                  }}
                  className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  <AiOutlineClose className="mr-2" />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KYCReview; 