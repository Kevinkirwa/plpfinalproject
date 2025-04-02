import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { AiOutlineUpload } from "react-icons/ai";

const ShopKYCVerification = ({ sellerId }) => {
  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [businessRegistration, setBusinessRegistration] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileInputChange = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("File size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setter(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idFront || !idBack || !selfie || !businessRegistration) {
      toast.error("Please upload all required documents");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${server}/shop/verify-kyc`, {
        sellerId,
        documents: {
          idFront,
          idBack,
          selfie,
          businessRegistration
        }
      });

      if (response.data.success) {
        toast.success("KYC verification submitted successfully!");
        toast.info("Your account will be reviewed within 24-48 hours");
        navigate("/shop-login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting KYC verification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          KYC Verification
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please provide the following documents to verify your identity
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* ID Front */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ID Card Front
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileInputChange(e, setIdFront)}
                  className="hidden"
                  id="id-front"
                />
                <label
                  htmlFor="id-front"
                  className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <div className="text-center">
                    <AiOutlineUpload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-600">
                      Click to upload ID front
                    </p>
                  </div>
                </label>
              </div>
              {idFront && (
                <p className="mt-1 text-sm text-green-600">File uploaded successfully</p>
              )}
            </div>

            {/* ID Back */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ID Card Back
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileInputChange(e, setIdBack)}
                  className="hidden"
                  id="id-back"
                />
                <label
                  htmlFor="id-back"
                  className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <div className="text-center">
                    <AiOutlineUpload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-600">
                      Click to upload ID back
                    </p>
                  </div>
                </label>
              </div>
              {idBack && (
                <p className="mt-1 text-sm text-green-600">File uploaded successfully</p>
              )}
            </div>

            {/* Selfie with ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Selfie with ID
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileInputChange(e, setSelfie)}
                  className="hidden"
                  id="selfie"
                />
                <label
                  htmlFor="selfie"
                  className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <div className="text-center">
                    <AiOutlineUpload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-600">
                      Click to upload selfie with ID
                    </p>
                  </div>
                </label>
              </div>
              {selfie && (
                <p className="mt-1 text-sm text-green-600">File uploaded successfully</p>
              )}
            </div>

            {/* Business Registration */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Business Registration Document
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileInputChange(e, setBusinessRegistration)}
                  className="hidden"
                  id="business-reg"
                />
                <label
                  htmlFor="business-reg"
                  className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <div className="text-center">
                    <AiOutlineUpload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-600">
                      Click to upload business registration
                    </p>
                  </div>
                </label>
              </div>
              {businessRegistration && (
                <p className="mt-1 text-sm text-green-600">File uploaded successfully</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit for Verification"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopKYCVerification; 