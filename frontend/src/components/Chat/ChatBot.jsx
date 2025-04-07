import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineMessage, AiOutlineClose } from 'react-icons/ai';
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { seller } = useSelector((state) => state.seller);

  const getInitialMessage = () => {
    if (!isAuthenticated) {
      return "Please login to chat with sellers or get support.";
    }
    if (seller) {
      return "Welcome back! Check your messages from customers.";
    }
    return "How can we help you today?";
  };

  const getActionButton = () => {
    if (!isAuthenticated) {
      return (
        <Link to="/login" className={`${styles.button} w-full`}>
          Login to Chat
        </Link>
      );
    }
    if (seller) {
      return (
        <Link to="/dashboard-messages" className={`${styles.button} w-full`}>
          View Messages
        </Link>
      );
    }
    return (
      <Link to="/inbox" className={`${styles.button} w-full`}>
        Start Chat
      </Link>
    );
  };

  const getQuickActions = () => {
    if (!isAuthenticated) {
      return [
        { text: "How to create an account?", link: "/sign-up" },
        { text: "Browse products", link: "/products" },
        { text: "About us", link: "/about" },
      ];
    }
    if (seller) {
      return [
        { text: "View Dashboard", link: "/dashboard" },
        { text: "Create Product", link: "/dashboard-create-product" },
        { text: "View Orders", link: "/dashboard-orders" },
      ];
    }
    return [
      { text: "Track my order", link: "/profile?tab=orders" },
      { text: "View cart", link: "/cart" },
      { text: "Contact support", link: "/inbox" },
    ];
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-all duration-200"
      >
        {isOpen ? (
          <AiOutlineClose size={24} />
        ) : (
          <AiOutlineMessage size={24} />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[300px] bg-white rounded-lg shadow-xl">
          {/* Header */}
          <div className="bg-blue-500 text-white p-4 rounded-t-lg">
            <h3 className="text-lg font-semibold">Chat Assistant</h3>
            {isAuthenticated && (
              <p className="text-sm">Welcome, {user?.name || 'User'}!</p>
            )}
          </div>

          {/* Body */}
          <div className="p-4">
            <p className="text-gray-600 mb-4">{getInitialMessage()}</p>

            {/* Quick Actions */}
            <div className="space-y-2 mb-4">
              <p className="text-sm font-medium text-gray-700">Quick Actions:</p>
              {getQuickActions().map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="block text-blue-500 hover:text-blue-600 text-sm"
                >
                  {action.text}
                </Link>
              ))}
            </div>

            {/* Action Button */}
            {getActionButton()}
          </div>

          {/* Footer */}
          <div className="border-t p-3 text-center text-xs text-gray-500">
            Available 24/7 for your assistance
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot; 