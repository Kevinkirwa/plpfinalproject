import React from "react";
import { Link } from "react-router-dom";
import { BiMoneyWithdraw, BiPackage } from "react-icons/bi";
import { FiPackage } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { BsGraphUp } from "react-icons/bs";
import ShopSidebar from "../components/Shop/ShopSidebar";
import { useSelector } from "react-redux";

const ShopDashboardPage = () => {
  const { seller } = useSelector((state) => state.seller);

  const stats = [
    {
      title: "Total Orders",
      value: "0",
      icon: <BiPackage size={30} color="#fff" />,
      bg: "#3B82F6",
      link: "/dashboard-orders",
    },
    {
      title: "Total Products",
      value: "0",
      icon: <FiPackage size={30} color="#fff" />,
      bg: "#10B981",
      link: "/dashboard-products",
    },
    {
      title: "Total Events",
      value: "0",
      icon: <MdOutlineLocalOffer size={30} color="#fff" />,
      bg: "#F59E0B",
      link: "/dashboard-events",
    },
    {
      title: "Total Withdraw",
      value: "$0",
      icon: <BiMoneyWithdraw size={30} color="#fff" />,
      bg: "#8B5CF6",
      link: "/dashboard-withdraw-money",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <ShopSidebar />
      
      <div className="flex-1 ml-64 p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {seller?.name || "Seller"}!
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Here's what's happening with your shop today.
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <BsGraphUp className="mr-2" />
                View Analytics
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <Link
              to={stat.link}
              key={index}
              className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div
                    className="flex-shrink-0 rounded-md p-3"
                    style={{ backgroundColor: stat.bg }}
                  >
                    {stat.icon}
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.title}
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Orders and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white shadow-sm rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
                <Link
                  to="/dashboard-orders"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  View all
                </Link>
              </div>
              <div className="flow-root">
                <div className="flex items-center justify-center h-32 text-gray-500">
                  No recent orders
                </div>
              </div>
            </div>
          </div>

          {/* Sales Analytics */}
          <div className="bg-white shadow-sm rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Sales Analytics</h3>
                <select className="text-sm border-gray-300 rounded-md">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <div className="flex items-center justify-center h-32 text-gray-500">
                No sales data available
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDashboardPage; 