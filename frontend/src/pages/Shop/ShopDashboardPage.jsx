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

const ShopDashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { seller, isSeller, isLoading } = useSelector((state) => state.seller);
  const { products = [] } = useSelector((state) => state.products || {});
  const { orders = [] } = useSelector((state) => state.order || {});
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState("week");
  const [messages, setMessages] = useState([]);
  const [refunds, setRefunds] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    orders: [],
    products: [],
    events: []
  });
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

        setDashboardData({
          orders: ordersData.data?.orders || [],
          products: productsData.data?.products || [],
          events: eventsData.data?.events || []
        });
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

  // Calculate statistics safely
  const totalEarnings = (dashboardData.orders || []).reduce((acc, order) => acc + (order.totalPrice || 0), 0);
  const totalOrders = (dashboardData.orders || []).length;
  const totalProducts = (dashboardData.products || []).length;
  const pendingOrders = (dashboardData.orders || []).filter(order => order.status === "Processing").length;
  const deliveredOrders = (dashboardData.orders || []).filter(order => order.status === "Delivered").length;
  const shippingOrders = (dashboardData.orders || []).filter(order => order.status === "Shipping").length;
  const totalEvents = (dashboardData.events || []).length;
  const unreadMessages = (messages || []).filter(msg => !msg.read).length;
  const pendingRefunds = (refunds || []).filter(order => order.status === "Processing refund").length;
  const pendingWithdrawals = (withdrawals || []).filter(w => w.status === "pending").length;

  if (isLoading || loading) {
    return <Loader />;
  }

  if (!isSeller) {
    return null;
  }

  return (
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
  );
};

export default ShopDashboardPage;
