import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiPackage, BiMoneyWithdraw } from 'react-icons/bi';
import { FiPackage, FiSettings } from 'react-icons/fi';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { BsGraphUp } from 'react-icons/bs';
import { TbMessageCircle } from 'react-icons/tb';

const ShopLayout = ({ children }) => {
  const { seller } = useSelector((state) => state.seller);

  return (
    <div className="min-h-screen bg-[#f3f6ff]">
      {/* Top Header */}
      <div className="bg-white shadow-sm">
        <div className="flex justify-between items-center px-4 py-4 max-w-[90%] mx-auto">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/logo.png" alt="KartHub" className="h-8" />
            <span className="text-xl font-bold text-gray-800">Seller Panel</span>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img
                src={seller?.avatar?.url || '/default-avatar.png'}
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">
                {seller?.name || 'Seller'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white min-h-screen shadow-sm">
          <nav className="mt-4">
            <Link
              to="/dashboard"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <BsGraphUp size={20} />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/dashboard-orders"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <BiPackage size={20} />
              <span>All Orders</span>
            </Link>

            <Link
              to="/dashboard-products"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <FiPackage size={20} />
              <span>All Products</span>
            </Link>

            <Link
              to="/dashboard-create-product"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <FiPackage size={20} />
              <span>Create Product</span>
            </Link>

            <Link
              to="/dashboard-events"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <MdOutlineLocalOffer size={20} />
              <span>All Events</span>
            </Link>

            <Link
              to="/dashboard-create-event"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <MdOutlineLocalOffer size={20} />
              <span>Create Event</span>
            </Link>

            <Link
              to="/dashboard-withdraw-money"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <BiMoneyWithdraw size={20} />
              <span>Withdraw Money</span>
            </Link>

            <Link
              to="/dashboard-messages"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <TbMessageCircle size={20} />
              <span>Shop Inbox</span>
            </Link>

            <Link
              to="/dashboard-settings"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <FiSettings size={20} />
              <span>Settings</span>
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ShopLayout; 