import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BiMoneyWithdraw, BiPackage } from "react-icons/bi";
import { FiPackage, FiSettings } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { BsGraphUp } from "react-icons/bs";
import { TbMessageCircle } from "react-icons/tb";
import styles from "../styles/styles";

const ShopDashboardPage = () => {
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

  const quickActions = [
    {
      title: "Create Product",
      icon: <FiPackage size={20} />,
      link: "/dashboard-create-product",
    },
    {
      title: "Create Event",
      icon: <MdOutlineLocalOffer size={20} />,
      link: "/dashboard-create-event",
    },
    {
      title: "Analytics",
      icon: <BsGraphUp size={20} />,
      link: "/dashboard",
    },
    {
      title: "Messages",
      icon: <TbMessageCircle size={20} />,
      link: "/dashboard-messages",
    },
    {
      title: "Settings",
      icon: <FiSettings size={20} />,
      link: "/dashboard-settings",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Welcome to your seller dashboard. Manage your products, orders, and business here.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <Link
              to={stat.link}
              key={index}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300"
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
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <span className="text-blue-600 hover:text-blue-500 font-medium">
                    View details
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {quickActions.map((action, index) => (
                <Link
                  to={action.link}
                  key={index}
                  className="group relative flex items-center space-x-3 rounded-lg border border-gray-200 bg-white px-6 py-5 shadow-sm hover:border-blue-500 hover:ring-1 hover:ring-blue-500 transition-all duration-200"
                >
                  <div className="flex-shrink-0 text-gray-500 group-hover:text-blue-500">
                    {action.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">
                      {action.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Recent Activity
            </h3>
            <div className="flow-root">
              <ul className="-mb-8">
                <li>
                  <div className="relative pb-8">
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                          <FiPackage className="h-5 w-5 text-white" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            No recent activity
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDashboardPage; 