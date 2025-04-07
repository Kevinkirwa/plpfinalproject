import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiPackage, BiMoneyWithdraw } from 'react-icons/bi';
import { FiPackage, FiSettings, FiMenu, FiX } from 'react-icons/fi';
import { MdOutlineLocalOffer, MdOutlineDashboard } from 'react-icons/md';
import { BsGraphUp } from 'react-icons/bs';
import { TbMessageCircle, TbDiscount } from 'react-icons/tb';
import { HiOutlineRefresh } from 'react-icons/hi';
import { useSelector } from 'react-redux';

const ShopSidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { seller } = useSelector((state) => state.seller);

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <MdOutlineDashboard size={24} />,
      link: '/dashboard',
    },
    {
      title: 'All Orders',
      icon: <BiPackage size={24} />,
      link: '/dashboard-orders',
      badge: '0',
    },
    {
      title: 'All Products',
      icon: <FiPackage size={24} />,
      link: '/dashboard-products',
    },
    {
      title: 'Create Product',
      icon: <FiPackage size={24} />,
      link: '/dashboard-create-product',
    },
    {
      title: 'Events',
      icon: <MdOutlineLocalOffer size={24} />,
      link: '/dashboard-events',
    },
    {
      title: 'Create Event',
      icon: <MdOutlineLocalOffer size={24} />,
      link: '/dashboard-create-event',
    },
    {
      title: 'Withdraw Money',
      icon: <BiMoneyWithdraw size={24} />,
      link: '/dashboard-withdraw-money',
    },
    {
      title: 'Shop Inbox',
      icon: <TbMessageCircle size={24} />,
      link: '/dashboard-messages',
      badge: '2',
    },
    {
      title: 'Discount Codes',
      icon: <TbDiscount size={24} />,
      link: '/dashboard-coupons',
    },
    {
      title: 'Refunds',
      icon: <HiOutlineRefresh size={24} />,
      link: '/dashboard-refunds',
    },
    {
      title: 'Settings',
      icon: <FiSettings size={24} />,
      link: '/dashboard-settings',
    },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-50 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <img
                src={seller?.avatar?.url || '/default-avatar.png'}
                alt="Shop"
                className="h-8 w-8 rounded-full"
              />
              <span className="font-semibold text-gray-800 truncate">
                {seller?.name || 'Shop Name'}
              </span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? <FiMenu size={20} /> : <FiX size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-3 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.link;
              return (
                <Link
                  key={item.link}
                  to={item.link}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors relative ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className={`flex-shrink-0 ${isActive ? 'text-blue-600' : ''}`}>
                    {item.icon}
                  </div>
                  {!isCollapsed && (
                    <>
                      <span className="font-medium">{item.title}</span>
                      {item.badge && (
                        <span className="absolute right-3 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  {isCollapsed && item.badge && (
                    <span className="absolute -right-1 -top-1 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <BsGraphUp size={20} className="text-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Total Sales
                </p>
                <p className="text-sm text-gray-500 truncate">$0.00</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopSidebar; 