import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { BiPackage, BiMoneyWithdraw } from 'react-icons/bi';
import { FiPackage, FiSettings, FiLogOut } from 'react-icons/fi';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { BsGraphUp } from 'react-icons/bs';
import { TbMessageCircle } from 'react-icons/tb';
import { logoutSeller } from '../../redux/actions/seller';

const ShopLayout = () => {
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutSeller());
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#f3f6ff]">
      {/* Top Header */}
      <div className="bg-white shadow-sm">
        <div className="flex justify-between items-center px-4 py-4 max-w-[90%] mx-auto">
          <Link to="/dashboard" className="flex items-center space-x-3">
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
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
            >
              <FiLogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white min-h-screen shadow-sm">
          <nav className="mt-4">
            <Link
              to=""
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <BsGraphUp size={20} />
              <span>Dashboard</span>
            </Link>

            <Link
              to="orders"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <BiPackage size={20} />
              <span>All Orders</span>
            </Link>

            <Link
              to="products"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <FiPackage size={20} />
              <span>All Products</span>
            </Link>

            <Link
              to="create-product"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <FiPackage size={20} />
              <span>Create Product</span>
            </Link>

            <Link
              to="events"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <MdOutlineLocalOffer size={20} />
              <span>All Events</span>
            </Link>

            <Link
              to="create-event"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <MdOutlineLocalOffer size={20} />
              <span>Create Event</span>
            </Link>

            <Link
              to="withdraw-money"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <BiMoneyWithdraw size={20} />
              <span>Withdraw Money</span>
            </Link>

            <Link
              to="inbox"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <TbMessageCircle size={20} />
              <span>Shop Inbox</span>
            </Link>

            <Link
              to="settings"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <FiSettings size={20} />
              <span>Settings</span>
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ShopLayout; 