import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineMoneyCollect, AiOutlinePlus } from "react-icons/ai";
import { MdOutlineLocalShipping } from "react-icons/md";
import { FiPackage, FiShoppingBag, FiSettings } from "react-icons/fi";
import { RiProductHuntLine, RiRefundLine } from "react-icons/ri";
import { BsShop, BsGraphUp } from "react-icons/bs";
import { BiLineChart, BiMoney, BiMessageDetail } from "react-icons/bi";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import styles from "../../styles/styles";
import axios from "axios";
import server from "../../server";
import { toast } from "react-toastify";
import { TbTruckDelivery } from "react-icons/tb";
import Loader from "../../components/Layout/Loader";
import { CgEventbrite } from "react-icons/cg";
import ShopLayout from "../../components/Shop/ShopLayout";

const ShopDashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { seller, isSeller, isLoading } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.order);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState("week");
  const [messages, setMessages] = useState([]);
  const [refunds, setRefunds] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalSales: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    conversionRate: 0,
    topProducts: [],
    recentActivity: []
  });

  useEffect(() => {
    // Check authentication
    if (!isSeller && !isLoading) {
      navigate("/shop-login");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('seller_token');
        if (!token) {
          throw new Error('No seller token found');
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const [ordersData, productsData, eventsData] = await Promise.all([
          axios.get(`${server}/order/get-seller-orders/${seller?._id}`, config),
          axios.get(`${server}/product/get-seller-products/${seller?._id}`, config),
          axios.get(`${server}/event/get-seller-events/${seller?._id}`, config)
        ]);

        if (ordersData.data?.orders) setOrders(ordersData.data.orders);
        if (productsData.data?.products) setProducts(productsData.data.products);
        if (eventsData.data?.events) setEvents(eventsData.data.events);
      } catch (error) {
        console.error("Dashboard data fetch error:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem('seller_token');
          navigate("/shop-login");
        }
        toast.error(error.response?.data?.message || "Error fetching dashboard data");
      }
      setLoading(false);
    };

    if (seller?._id) {
      fetchData();
    }
  }, [seller?._id, isSeller, isLoading, navigate]);

  // Calculate statistics
  const totalEarnings = orders.reduce((acc, order) => acc + order.totalPrice, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const pendingOrders = orders.filter(order => order.status === "Processing").length;
  const deliveredOrders = orders.filter(order => order.status === "Delivered").length;
  const shippingOrders = orders.filter(order => order.status === "Shipping").length;
  const totalEvents = events.length;
  const unreadMessages = messages.filter(msg => !msg.read).length;
  const pendingRefunds = refunds.filter(order => order.status === "Processing refund").length;
  const pendingWithdrawals = withdrawals.filter(w => w.status === "pending").length;

  if (isLoading || loading) {
    return <Loader />;
  }

  if (!isSeller) {
    return null;
  }

  return (
    <ShopLayout>
      <div className="w-full p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {seller?.name || "Seller"}!
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Here's what's happening with your store today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Earnings */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <AiOutlineMoneyCollect className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Earnings</p>
                <p className="text-lg font-semibold text-gray-900">
                  ${totalEarnings.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* All Products */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <FiPackage className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">All Products</p>
                <p className="text-lg font-semibold text-gray-900">
                  {totalProducts}
                </p>
            </div>
          </div>
        </div>

          {/* All Orders */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <FiShoppingBag className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">All Orders</p>
                <p className="text-lg font-semibold text-gray-900">
                  {totalOrders}
                </p>
              </div>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-full">
                <MdOutlineLocalShipping className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Orders</p>
                <p className="text-lg font-semibold text-gray-900">
                  {pendingOrders}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            <Link
              to="/dashboard-orders"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              View all
            </Link>
          </div>
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                  {orders && orders.length > 0 ? (
                    orders.slice(0, 5).map((order) => (
                      <tr key={order._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      #{order._id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}>
                        {order.status}
                      </span>
                    </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${order.totalPrice?.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                        No orders found
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/dashboard-create-product"
              className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-blue-100 rounded-full">
                <FiPackage className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Add New Product</p>
                <p className="text-xs text-gray-500">Create a new product listing</p>
              </div>
            </Link>

            <Link
              to="/dashboard-orders"
              className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-purple-100 rounded-full">
                <FiShoppingBag className="w-6 h-6 text-purple-600" />
          </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">View Orders</p>
                <p className="text-xs text-gray-500">Check your pending orders</p>
              </div>
            </Link>

            <Link
              to="/dashboard-withdraw-money"
              className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-green-100 rounded-full">
                <AiOutlineMoneyCollect className="w-6 h-6 text-green-600" />
                </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Withdraw Money</p>
                <p className="text-xs text-gray-500">Transfer your earnings</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </ShopLayout>
  );
};

export default ShopDashboardPage;
