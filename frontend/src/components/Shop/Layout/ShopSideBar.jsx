import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineDashboard, AiOutlineShoppingCart, AiOutlineShop, AiOutlineSetting, AiOutlineUser, AiOutlineMessage } from "react-icons/ai";
import { MdOutlineLocalShipping, MdOutlineEvent } from "react-icons/md";
import { BiLineChart, BiMoney, BiPackage } from "react-icons/bi";
import { RiRefundLine } from "react-icons/ri";
import { CgEventbrite } from "react-icons/cg";

const ShopSideBar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-[250px] h-screen bg-white shadow-sm fixed left-0 top-0 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-8">
          <AiOutlineShop className="text-2xl text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Seller Panel</h2>
        </div>

        <div className="space-y-2">
          {/* Dashboard */}
          <Link to="/shop-dashboard">
            <div className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
              isActive("/shop-dashboard") ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
            }`}>
              <AiOutlineDashboard className="text-xl" />
              <span>Dashboard</span>
            </div>
          </Link>

          {/* Products */}
          <Link to="/dashboard-products">
            <div className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
              isActive("/dashboard-products") ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
            }`}>
              <BiPackage className="text-xl" />
              <span>Products</span>
            </div>
          </Link>

          {/* Orders */}
          <Link to="/dashboard-orders">
            <div className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
              isActive("/dashboard-orders") ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
            }`}>
              <AiOutlineShoppingCart className="text-xl" />
              <span>Orders</span>
            </div>
          </Link>

          {/* Events */}
          <Link to="/dashboard-events">
            <div className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
              isActive("/dashboard-events") ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
            }`}>
              <CgEventbrite className="text-xl" />
              <span>Events</span>
            </div>
          </Link>

          {/* Analytics */}
          <Link to="/dashboard-analytics">
            <div className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
              isActive("/dashboard-analytics") ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
            }`}>
              <BiLineChart className="text-xl" />
              <span>Analytics</span>
            </div>
          </Link>

          {/* Messages */}
          <Link to="/dashboard-messages">
            <div className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
              isActive("/dashboard-messages") ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
            }`}>
              <AiOutlineMessage className="text-xl" />
              <span>Messages</span>
            </div>
          </Link>

          {/* Refunds */}
          <Link to="/dashboard-refunds">
            <div className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
              isActive("/dashboard-refunds") ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
            }`}>
              <RiRefundLine className="text-xl" />
              <span>Refunds</span>
            </div>
          </Link>

          {/* Shipping */}
          <Link to="/dashboard-shipping">
            <div className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
              isActive("/dashboard-shipping") ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
            }`}>
              <MdOutlineLocalShipping className="text-xl" />
              <span>Shipping</span>
            </div>
          </Link>

          {/* Settings */}
          <Link to="/settings">
            <div className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
              isActive("/settings") ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
            }`}>
              <AiOutlineSetting className="text-xl" />
              <span>Settings</span>
            </div>
          </Link>

          {/* Profile */}
          <Link to="/shop-profile">
            <div className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
              isActive("/shop-profile") ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
            }`}>
              <AiOutlineUser className="text-xl" />
              <span>Profile</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShopSideBar; 