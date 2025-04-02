import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineMoneyCollect, AiOutlinePlus } from "react-icons/ai";
import { MdOutlineLocalShipping } from "react-icons/md";
import { FiPackage, FiShoppingBag, FiSettings } from "react-icons/fi";
import { RiProductHuntLine, RiRefundLine } from "react-icons/ri";
import { BsShop, BsGraphUp } from "react-icons/bs";
import { BiLineChart, BiMoney, BiMessageDetail } from "react-icons/bi";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import styles from "../../styles/styles";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { TbTruckDelivery } from "react-icons/tb";
import Loader from "../../components/Layout/Loader";
import { CgEventbrite } from "react-icons/cg";
import ShopLayout from "../../components/Shop/Layout/ShopLayout";

const ShopDashboardPage = () => {
  const { seller } = useSelector((state) => state.seller);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
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
    const fetchData = async () => {
      setLoading(true);
      try {
        const [ordersData, productsData, eventsData] = await Promise.all([
          axios.get(`${server}/order/get-seller-orders/${seller._id}`),
          axios.get(`${server}/product/get-seller-products/${seller._id}`),
          axios.get(`${server}/event/get-seller-events/${seller._id}`),
        ]);

        setOrders(ordersData.data.orders || []);
        setProducts(productsData.data.products || []);
        setEvents(eventsData.data.events || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching data");
      }
      setLoading(false);
    };

    fetchData();
  }, [seller._id]);

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

  if (loading) {
    return <Loader />;
  }

  return (
    <ShopLayout>
      <div className="p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, {seller.name}!</h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your shop today.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link to="/dashboard-create-event">
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 hover:bg-purple-100 transition cursor-pointer">
              <CgEventbrite className="text-2xl text-purple-600 mb-2" />
              <h3 className="font-semibold text-gray-800">Create Event</h3>
              <p className="text-sm text-gray-600">Add special sales event</p>
            </div>
          </Link>
          <Link to="/dashboard-refunds">
            <div className="bg-red-50 p-4 rounded-xl border border-red-100 hover:bg-red-100 transition cursor-pointer">
              <RiRefundLine className="text-2xl text-red-600 mb-2" />
              <h3 className="font-semibold text-gray-800">Refunds</h3>
              <p className="text-sm text-gray-600">{pendingRefunds} pending</p>
            </div>
          </Link>
          <Link to="/dashboard-messages">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 hover:bg-blue-100 transition cursor-pointer">
              <BiMessageDetail className="text-2xl text-blue-600 mb-2" />
              <h3 className="font-semibold text-gray-800">Messages</h3>
              <p className="text-sm text-gray-600">{unreadMessages} unread</p>
            </div>
          </Link>
          <Link to="/dashboard-withdraw">
            <div className="bg-green-50 p-4 rounded-xl border border-green-100 hover:bg-green-100 transition cursor-pointer">
              <BiMoney className="text-2xl text-green-600 mb-2" />
              <h3 className="font-semibold text-gray-800">Withdrawals</h3>
              <p className="text-sm text-gray-600">{pendingWithdrawals} pending</p>
            </div>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Earnings Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg opacity-90">Total Earnings</p>
                <h3 className="text-3xl font-bold mt-2">KES {totalEarnings.toLocaleString()}</h3>
              </div>
              <BiMoney className="text-5xl opacity-80" />
            </div>
            <div className="mt-4 text-sm opacity-90">
              <span className="font-semibold">+{analytics.totalSales > 0 ? ((analytics.totalSales / totalEarnings) * 100).toFixed(1) : 0}%</span> from last month
            </div>
          </div>

          {/* Orders Card */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg opacity-90">Total Orders</p>
                <h3 className="text-3xl font-bold mt-2">{totalOrders}</h3>
              </div>
              <FiShoppingBag className="text-5xl opacity-80" />
            </div>
            <div className="mt-4 text-sm opacity-90">
              <span className="font-semibold">{pendingOrders}</span> orders pending
            </div>
          </div>

          {/* Products Card */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg opacity-90">Total Products</p>
                <h3 className="text-3xl font-bold mt-2">{totalProducts}</h3>
              </div>
              <FiPackage className="text-5xl opacity-80" />
            </div>
            <div className="mt-4 text-sm opacity-90">
              <Link to="/dashboard-products" className="flex items-center hover:underline">
                Manage Products <AiOutlineArrowRight className="ml-2" />
              </Link>
            </div>
          </div>

          {/* Performance Card */}
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg opacity-90">Conversion Rate</p>
                <h3 className="text-3xl font-bold mt-2">{analytics.conversionRate}%</h3>
              </div>
              <BsGraphUp className="text-5xl opacity-80" />
            </div>
            <div className="mt-4 text-sm opacity-90">
              Based on {analytics.totalOrders} orders
            </div>
          </div>
        </div>

        {/* Order Status and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Order Status */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Order Status</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setTimeRange("week")}
                  className={`px-3 py-1 rounded-full text-sm ${
                    timeRange === "week" 
                      ? "bg-blue-100 text-blue-600" 
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  Week
                </button>
                <button 
                  onClick={() => setTimeRange("month")}
                  className={`px-3 py-1 rounded-full text-sm ${
                    timeRange === "month" 
                      ? "bg-blue-100 text-blue-600" 
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  Month
                </button>
                <button 
                  onClick={() => setTimeRange("year")}
                  className={`px-3 py-1 rounded-full text-sm ${
                    timeRange === "year" 
                      ? "bg-blue-100 text-blue-600" 
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  Year
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-100">
                <div className="inline-block p-3 bg-orange-100 rounded-full">
                  <MdOutlineLocalShipping className="text-2xl text-orange-500" />
                </div>
                <h4 className="mt-2 text-2xl font-semibold">{pendingOrders}</h4>
                <p className="text-sm text-gray-600">Processing</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="inline-block p-3 bg-blue-100 rounded-full">
                  <TbTruckDelivery className="text-2xl text-blue-500" />
                </div>
                <h4 className="mt-2 text-2xl font-semibold">{shippingOrders}</h4>
                <p className="text-sm text-gray-600">Shipping</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
                <div className="inline-block p-3 bg-green-100 rounded-full">
                  <AiOutlineMoneyCollect className="text-2xl text-green-500" />
                </div>
                <h4 className="mt-2 text-2xl font-semibold">{deliveredOrders}</h4>
                <p className="text-sm text-gray-600">Delivered</p>
              </div>
            </div>
          </div>

          {/* Sales Analytics */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Sales Analytics</h2>
              <BiLineChart className="text-3xl text-blue-500" />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-600">Monthly Revenue</p>
                <h4 className="text-2xl font-bold">KES {(totalEarnings / 12).toFixed(2)}</h4>
              </div>
              <div className="text-sm text-green-500 bg-green-50 px-2 py-1 rounded-full">
                +{analytics.totalSales > 0 ? ((analytics.totalSales / totalEarnings) * 100).toFixed(1) : 0}%
              </div>
            </div>
            <div className="h-[200px] flex items-end justify-between px-4">
              {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                <div key={item} className="relative group">
                  <div 
                    className="w-8 bg-blue-50 rounded-t-lg transition-all duration-300 group-hover:bg-blue-100"
                    style={{ 
                      height: `${Math.random() * 150 + 50}px`,
                    }}
                  >
                    <div 
                      className="absolute bottom-0 w-full bg-blue-500 rounded-t-lg transition-all duration-300 group-hover:bg-blue-600"
                      style={{ 
                        height: `${Math.random() * 100 + 20}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Day {item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            <Link to="/dashboard-orders" className="text-blue-600 hover:text-blue-700 flex items-center">
              View All <AiOutlineArrowRight className="ml-2" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-l-lg">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-r-lg">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order._id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.user?.name || "Guest"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      KES {order.totalPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${order.status === "Delivered" ? "bg-green-100 text-green-800" : 
                          order.status === "Processing" ? "bg-yellow-100 text-yellow-800" : 
                          "bg-blue-100 text-blue-800"}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Top Products</h2>
            <Link to="/dashboard-products" className="text-blue-600 hover:text-blue-700 flex items-center">
              View All <AiOutlineArrowRight className="ml-2" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analytics.topProducts.slice(0, 3).map((product) => (
              <div key={product._id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-600">Sold: {product.sold}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
          <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {analytics.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-full ${
                  activity.type === "order" ? "bg-blue-100" :
                  activity.type === "product" ? "bg-green-100" :
                  "bg-purple-100"
                }`}>
                  {activity.type === "order" ? <FiShoppingBag className="text-blue-600" /> :
                   activity.type === "product" ? <FiPackage className="text-green-600" /> :
                   <CgEventbrite className="text-purple-600" />}
                </div>
                <div>
                  <p className="text-sm text-gray-800">{activity.description}</p>
                  <p className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ShopLayout>
  );
};

export default ShopDashboardPage;
