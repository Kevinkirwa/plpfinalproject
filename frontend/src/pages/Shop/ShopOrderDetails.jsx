import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FiTruck, FiPackage, FiCheckCircle, FiXCircle } from "react-icons/fi";
import ShopLayout from "../../components/Shop/ShopLayout";

const ShopOrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/order/get-order-details/${id}`,
        { withCredentials: true }
      );
      setOrder(response.data.order);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching order details");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (status) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/order/update-order-status/${id}`,
        { status },
        { withCredentials: true }
      );
      toast.success("Order status updated successfully!");
      fetchOrderDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating order status");
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

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "processing":
        return <FiPackage className="h-5 w-5 text-yellow-500" />;
      case "shipped":
        return <FiTruck className="h-5 w-5 text-blue-500" />;
      case "delivered":
        return <FiCheckCircle className="h-5 w-5 text-green-500" />;
      case "cancelled":
        return <FiXCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
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

  if (!order) {
    return (
      <ShopLayout>
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Order not found</h3>
          <p className="mt-1 text-sm text-gray-500">
            The order you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </ShopLayout>
    );
  }

  return (
    <ShopLayout>
      <div className="w-full p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Order #{order._id.slice(-8)}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Order Status */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Order Status
            </h2>
            <div className="flex items-center space-x-4">
              {getStatusIcon(order.status)}
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Customer Information
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <img
                  src={order.user.avatar.url}
                  alt={order.user.name}
                  className="h-10 w-10 rounded-full"
                />
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {order.user.name}
                  </div>
                  <div className="text-sm text-gray-500">{order.user.email}</div>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <h3 className="text-sm font-medium text-gray-900">
                  Shipping Address
                </h3>
                <address className="mt-2 text-sm text-gray-500">
                  {order.shippingAddress.address}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.zipCode}
                  <br />
                  {order.shippingAddress.country}
                </address>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white shadow-sm rounded-lg p-6 lg:col-span-2">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Order Items
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.cart.map((item) => (
                    <tr key={item._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-md object-cover"
                              src={item.images[0].url}
                              alt={item.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${item.discountPrice || item.originalPrice}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.quantity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          $
                          {(item.discountPrice || item.originalPrice) *
                            item.quantity}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white shadow-sm rounded-lg p-6 lg:col-span-2">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Order Summary
            </h2>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Subtotal</dt>
                <dd className="text-sm text-gray-900">${order.totalPrice}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Shipping</dt>
                <dd className="text-sm text-gray-900">$0.00</dd>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3">
                <dt className="text-base font-medium text-gray-900">Total</dt>
                <dd className="text-base font-medium text-gray-900">
                  ${order.totalPrice}
                </dd>
              </div>
            </dl>
          </div>
        </div>
    </div>
    </ShopLayout>
  );
};

export default ShopOrderDetails;