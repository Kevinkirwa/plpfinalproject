import React, { useState, useEffect } from 'react'
import { AiOutlineGift, AiOutlineBell, AiOutlineSetting, AiOutlineSearch } from 'react-icons/ai'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { FiPackage, FiShoppingBag } from 'react-icons/fi'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { markAsRead, markAllAsRead, setNotifications, setLoading, setError } from '../../redux/reducers/notificationSlice'
import { logout } from '../../redux/reducers/userSlice'
import axios from 'axios'
import server from '../../server'
import logo from '../../assets/logo.png'
import { toast } from 'react-toastify'

const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { notifications, unreadCount, loading } = useSelector((state) => state.notification);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        dispatch(setLoading(true));
        const { data } = await axios.get(`${server}/notification/admin`, {
          withCredentials: true
        });
        dispatch(setNotifications(data.notifications));
      } catch (error) {
        dispatch(setError(error.response?.data?.message || "Error fetching notifications"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchNotifications();
    // Set up polling for new notifications
    const interval = setInterval(fetchNotifications, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleNotificationClick = async (notificationId) => {
    try {
      await axios.put(`${server}/notification/mark-read/${notificationId}`, {}, {
        withCredentials: true
      });
      dispatch(markAsRead(notificationId));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await axios.put(`${server}/notification/mark-all-read`, {}, {
        withCredentials: true
      });
      dispatch(markAllAsRead());
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const logoutHandler = async () => {
    try {
      await axios.get(`${server}/user/logout`, { withCredentials: true });
      dispatch(logout());
      toast.success("Logged out successfully!");
      navigate("/admin-login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
            alt="KartHub"
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center flex-1 px-6">
          <div className="w-full max-w-lg">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <AiOutlineSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full bg-gray-50 border border-gray-300 rounded-lg py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Search orders, products..."
                type="search"
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/dashboard/cupouns" className="p-2 hover:bg-gray-100 rounded-full">
              <AiOutlineGift className="text-xl text-gray-600" />
            </Link>
            <Link to="/dashboard-events" className="p-2 hover:bg-gray-100 rounded-full">
              <MdOutlineLocalOffer className="text-xl text-gray-600" />
            </Link>
            <Link to="/dashboard-products" className="p-2 hover:bg-gray-100 rounded-full">
              <FiShoppingBag className="text-xl text-gray-600" />
          </Link>
            <Link to="/dashboard-orders" className="p-2 hover:bg-gray-100 rounded-full">
              <FiPackage className="text-xl text-gray-600" />
          </Link>
            <Link to="/dashboard-messages" className="p-2 hover:bg-gray-100 rounded-full">
              <BiMessageSquareDetail className="text-xl text-gray-600" />
          </Link>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
            >
              <span className="sr-only">View notifications</span>
              <div className="relative">
                <AiOutlineBell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-xs text-white">
                    {unreadCount}
                  </span>
                )}
              </div>
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllAsRead}
                      className="text-xs text-blue-600 hover:text-blue-700"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {loading ? (
                    <div className="px-4 py-3 text-center text-gray-500">Loading...</div>
                  ) : notifications.length === 0 ? (
                    <div className="px-4 py-3 text-center text-gray-500">No notifications</div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification._id}
                        onClick={() => handleNotificationClick(notification._id)}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start">
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${
                              !notification.read ? 'text-blue-600' : 'text-gray-900'
                            }`}>
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(notification.createdAt).toRelativeTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="px-4 py-2 border-t border-gray-200">
                  <Link
                    to="/admin/notifications"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View all notifications
          </Link>
                </div>
              </div>
            )}
          </div>

          {/* Messages */}
          <button className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg">
            <span className="sr-only">View messages</span>
            <BiMessageSquareDetail className="h-6 w-6" />
          </button>

          {/* Profile */}
          <div className="relative">
            <button 
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-3 focus:outline-none"
            >
            <img
              src={`${user?.avatar?.url}`}
                alt={user?.name}
                className="h-8 w-8 rounded-full object-cover border-2 border-gray-200"
              />
              <span className="hidden md:block text-sm font-medium text-gray-700">{user?.name}</span>
            </button>
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
                <Link
                  to="/admin/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Your Profile
                </Link>
                <Link
                  to="/admin/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Settings
                </Link>
                <button
                  onClick={logoutHandler}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader