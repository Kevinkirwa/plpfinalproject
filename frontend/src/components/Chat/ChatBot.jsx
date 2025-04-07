import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FiMessageSquare, FiX } from 'react-icons/fi';
import { IoMdSend } from 'react-icons/io';
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { seller } = useSelector((state) => state.seller);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial greeting based on user type
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMessage = getInitialMessage();
      setMessages([
        {
          type: 'bot',
          content: initialMessage.greeting,
          options: initialMessage.options,
        },
      ]);
    }
  }, [isOpen, isAuthenticated, seller]);

  const getInitialMessage = () => {
    if (seller) {
      return {
        greeting: 'Welcome back to your seller dashboard! How can I assist you today?',
        options: [
          'How do I create a new product listing?',
          'How can I process orders?',
          'How do I set up shipping options?',
          'How can I view my sales analytics?',
          'How do I handle customer refunds?',
        ],
      };
    } else if (isAuthenticated) {
      return {
        greeting: 'Welcome back! How can I help you with your shopping today?',
        options: [
          'Track my order',
          'View my purchase history',
          'Contact a seller',
          'Return an item',
          'Check available discounts',
        ],
      };
    } else {
      return {
        greeting: 'Welcome to our marketplace! How can I help you today?',
        options: [
          'How do I create an account?',
          'Browse products',
          'View shipping information',
          'Contact support',
          'Become a seller',
        ],
      };
    }
  };

  const getBotResponse = (message) => {
    const lowerMsg = message.toLowerCase();
    
    // Common responses for all users
    const commonResponses = {
      'hello': 'Hi there! How can I help you today?',
      'hi': 'Hello! What can I assist you with?',
      'bye': 'Goodbye! Have a great day!',
      'thank you': "You're welcome! Let me know if you need anything else.",
      'thanks': "You're welcome! Is there anything else I can help with?"
    };

    // Check common responses first
    if (commonResponses[lowerMsg]) {
      return commonResponses[lowerMsg];
    }

    // Seller-specific responses
    const sellerResponses = {
      "How do I create a new product listing?":
        "To create a new product listing:\n1. Go to 'Create Product' in your dashboard\n2. Fill in product details (name, description, price)\n3. Upload high-quality images\n4. Set inventory and shipping options\n5. Click 'Publish'",
      "How can I process orders?":
        "To process orders:\n1. Go to 'All Orders' in your dashboard\n2. View new orders in the 'Pending' tab\n3. Review order details\n4. Update order status\n5. Arrange shipping",
      "How do I set up shipping options?":
        "To set up shipping:\n1. Go to 'Settings'\n2. Select 'Shipping Options'\n3. Add shipping zones\n4. Set rates and delivery times\n5. Save your changes",
      "How can I view my sales analytics?":
        "To view analytics:\n1. Click 'Analytics' in your dashboard\n2. View sales trends, popular products\n3. Export reports as needed",
      "How do I handle customer refunds?":
        "For refunds:\n1. Go to 'Refunds' section\n2. Review refund request\n3. Approve or decline with reason\n4. Process payment refund if approved",
    };

    // Authenticated user responses
    const userResponses = {
      "Track my order":
        "You can track your order by:\n1. Going to 'My Orders'\n2. Finding your order\n3. Clicking 'Track Order'\n4. Viewing real-time updates",
      "View my purchase history":
        "To view your purchase history:\n1. Go to your account\n2. Click 'Order History'\n3. View all past purchases",
      "Contact a seller":
        "To contact a seller:\n1. Go to the product page\n2. Click 'Contact Seller'\n3. Write your message\n4. Wait for response",
      "Return an item":
        "To return an item:\n1. Go to 'My Orders'\n2. Select the item\n3. Click 'Return Item'\n4. Follow return instructions",
      "Check available discounts":
        "To check discounts:\n1. Visit the 'Deals' section\n2. View active promotions\n3. Copy discount codes",
    };

    // Guest user responses
    const guestResponses = {
      "How do I create an account?":
        "To create an account:\n1. Click 'Sign Up'\n2. Enter your details\n3. Verify your email\n4. Start shopping!",
      "Browse products":
        "You can browse products by:\n1. Using the search bar\n2. Exploring categories\n3. Checking featured items",
      "View shipping information":
        "Shipping information:\n1. Standard delivery: 3-5 days\n2. Express delivery: 1-2 days\n3. International: 7-14 days",
      "Contact support":
        "To contact support:\n1. Click 'Help' at the bottom\n2. Select your issue\n3. Fill out the form",
      "Become a seller":
        "To become a seller:\n1. Click 'Sell on Our Platform'\n2. Complete verification\n3. Set up your shop",
    };

    if (seller) {
      return sellerResponses[message] || "I'll help you find the information you need about selling on our platform.";
    } else if (isAuthenticated) {
      return userResponses[message] || "I'll help you find what you're looking for.";
    } else {
      return guestResponses[message] || "I'll help you explore our marketplace.";
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { type: 'user', content: inputMessage },
    ]);

    // Get and add bot response
    const botResponse = getBotResponse(inputMessage);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { type: 'bot', content: botResponse },
      ]);
    }, 500);

    setInputMessage('');
  };

  const handleOptionClick = (option) => {
    // Add user message
    setMessages((prev) => [
      ...prev,
      { type: 'user', content: option },
    ]);

    // Get and add bot response
    const botResponse = getBotResponse(option);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { type: 'bot', content: botResponse },
      ]);
    }, 500);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-all duration-200"
      >
        {isOpen ? (
          <FiX size={24} />
        ) : (
          <FiMessageSquare size={24} />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[350px] bg-white rounded-lg shadow-xl">
          {/* Header */}
          <div className="bg-blue-500 text-white p-4 rounded-t-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">KartHub Assistant</h3>
                {isAuthenticated && (
                  <p className="text-sm">Welcome, {user?.name || 'User'}!</p>
                )}
              </div>
              {messages.length > 0 && (
                <button 
                  onClick={clearChat}
                  className="text-white text-sm hover:text-gray-200"
                >
                  Clear Chat
                </button>
              )}
            </div>
          </div>

          {/* Chat History */}
          <div className="h-[300px] overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-gray-600">
                <p className="mb-4">Hello! How can I assist you today?</p>
                <p className="text-sm text-gray-500">Try asking me about:</p>
                <ul className="list-disc pl-5 text-sm text-gray-500 mt-2">
                  {!isAuthenticated && (
                    <>
                      <li>Creating an account</li>
                      <li>Payment methods</li>
                      <li>Browsing products</li>
                    </>
                  )}
                  {isAuthenticated && !seller && (
                    <>
                      <li>Tracking your order</li>
                      <li>Returns and refunds</li>
                      <li>Updating delivery address</li>
                    </>
                  )}
                  {seller && (
                    <>
                      <li>Managing products</li>
                      <li>Processing orders</li>
                      <li>Sales performance</li>
                    </>
                  )}
                </ul>
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="whitespace-pre-line">{message.content}</p>
                      {message.options && (
                        <div className="mt-3 space-y-2">
                          {message.options.map((option, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleOptionClick(option)}
                              className="block w-full text-left px-3 py-2 text-sm bg-white rounded hover:bg-gray-50 transition-colors"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Message Input */}
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="border-t p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <IoMdSend size={20} />
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="border-t p-3 text-center text-xs text-gray-500">
            {isAuthenticated ? (
              <Link to="/inbox" className="text-blue-500 hover:text-blue-600">
                Need more help? Contact support
              </Link>
            ) : (
              <Link to="/login" className="text-blue-500 hover:text-blue-600">
                Login for personalized support
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot; 