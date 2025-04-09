import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import ShopLayout from "../../components/Shop/ShopLayout";

const ShopPreviewPage = () => {
  const { id } = useParams();
  const { seller } = useSelector((state) => state.seller);
  const [shopData, setShopData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchShopData();
  }, [id]);

  const fetchShopData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/shop/get-shop-info/${id}`,
        { withCredentials: true }
      );
      setShopData(response.data.shop);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching shop data");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
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

  if (!shopData) {
    return (
      <ShopLayout>
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Shop not found</h3>
          <p className="mt-1 text-sm text-gray-500">
            The shop you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </ShopLayout>
    );
  }

  return (
    <ShopLayout>
      <div className="w-full p-8">
        {/* Shop Header */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-600">
            {shopData.banner && (
              <img
                src={shopData.banner.url}
                alt="Shop Banner"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute -bottom-12 left-8">
              <div className="relative">
                <img
                  src={shopData.avatar.url}
                  alt={shopData.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                />
                {shopData.isVerified && (
                  <span className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="pt-16 pb-8 px-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {shopData.name}
                </h1>
                <p className="mt-1 text-sm text-gray-500">{shopData.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="flex items-center text-yellow-400">
                  <AiFillStar className="h-5 w-5" />
                  <span className="ml-1 text-gray-900">
                    {shopData.ratings.toFixed(1)}
                  </span>
                </span>
                <span className="text-sm text-gray-500">
                  ({shopData.totalReviews} reviews)
                </span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center text-gray-500">
                <FiMapPin className="h-5 w-5 mr-2" />
                <span>{shopData.address}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <FiPhone className="h-5 w-5 mr-2" />
                <span>{shopData.phoneNumber}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <FiMail className="h-5 w-5 mr-2" />
                <span>{shopData.email}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <FiClock className="h-5 w-5 mr-2" />
                <span>Since {formatDate(shopData.createdAt)}</span>
              </div>
            </div>
          </div>
         </div>

        {/* Navigation Tabs */}
        <div className="mt-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`${
                activeTab === "overview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`${
                activeTab === "products"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`${
                activeTab === "reviews"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
            >
              Reviews
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="bg-white shadow-sm rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Shop Statistics
                </h3>
                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Products
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                      {shopData.totalProducts}
                    </dd>
                  </div>
                  <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Orders
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                      {shopData.totalOrders}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="bg-white shadow-sm rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Shop Description
                </h3>
                <p className="mt-4 text-gray-500">{shopData.description}</p>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {shopData.products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white shadow-sm rounded-lg overflow-hidden"
                >
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-medium text-gray-900">
                      {product.name}
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.description}
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-900">
                        ${product.price}
                      </span>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.stock > 0
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
              {shopData.reviews.map((review) => (
                <div key={review._id} className="p-6">
                  <div className="flex items-start">
                    <img
                      src={review.user.avatar.url}
                      alt={review.user.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-900">
                        {review.user.name}
                      </h4>
                      <div className="mt-1 flex items-center">
                        {[...Array(5)].map((_, index) => (
                          <AiFillStar
                            key={index}
                            className={`h-5 w-5 ${
                              index < review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        {review.comment}
                      </p>
                      <p className="mt-2 text-sm text-gray-400">
                        {formatDate(review.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
    </div>
    </ShopLayout>
  );
};

export default ShopPreviewPage;