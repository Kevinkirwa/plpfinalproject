import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineMessage, AiOutlineClose, AiOutlineSend } from 'react-icons/ai';
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const chatEndRef = useRef(null);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { seller } = useSelector((state) => state.seller);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

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
    if (seller) {
      if (lowerMsg.includes('sales')) {
        return "You can view your sales performance in Dashboard > Analytics. Would you like me to explain the metrics?";
      }
      if (lowerMsg.includes('product') && lowerMsg.includes('add')) {
        return "To add a new product, go to Dashboard > Products > Add New. Make sure to include high-quality images and detailed descriptions.";
      }
      if (lowerMsg.includes('order') && lowerMsg.includes('process')) {
        return "To process orders: 1. Go to Dashboard > Orders 2. Click on pending orders 3. Update order status as you process them. Need more details?";
      }
      if (lowerMsg.includes('shipping')) {
        return "You can manage shipping settings in Dashboard > Settings > Shipping. Would you like to know how to set up shipping zones?";
      }
      if (lowerMsg.includes('return') || lowerMsg.includes('refund')) {
        return "For returns and refunds, check Dashboard > Returns. Each return request needs to be processed within 48 hours. Need help with the process?";
      }
    }
    
    // Logged-in user responses
    else if (isAuthenticated) {
      if (lowerMsg.includes('order') && lowerMsg.includes('track')) {
        return "You can track your order in Profile > My Orders. Click on any order to see its current status and tracking information.";
      }
      if (lowerMsg.includes('return')) {
        return "To return an item: 1. Go to My Orders 2. Find the order 3. Click 'Request Return' 4. Follow the return instructions. Need more help?";
      }
      if (lowerMsg.includes('address') || lowerMsg.includes('delivery')) {
        return "Manage your delivery addresses in Profile > Settings > Addresses. You can add multiple addresses and set a default one.";
      }
      if (lowerMsg.includes('payment')) {
        return "We accept M-Pesa, credit/debit cards, and bank transfers. All payments are processed securely. Which payment method would you like to know more about?";
      }
      if (lowerMsg.includes('contact') && lowerMsg.includes('seller')) {
        return "You can contact a seller by visiting their shop page or product page and clicking the 'Contact Seller' button.";
      }
    }
    
    // Non-logged in user responses
    else {
      if (lowerMsg.includes('account') || lowerMsg.includes('sign up') || lowerMsg.includes('register')) {
        return "To create an account, click 'Sign Up' at the top of the page. You'll need to provide your email and create a password. Would you like me to guide you through the process?";
      }
      if (lowerMsg.includes('login')) {
        return "Click the 'Login' button at the top right of the page. Enter your email and password to access your account.";
      }
      if (lowerMsg.includes('price')) {
        return "All prices are shown in KES and include VAT. Shipping costs are calculated at checkout based on your location.";
      }
      if (lowerMsg.includes('payment')) {
        return "We accept various payment methods including M-Pesa, credit/debit cards, and bank transfers. Create an account to see all available payment options.";
      }
    }

    // Default response if no specific match is found
    return "I'm not sure about that. Could you please rephrase your question? Or you can contact our support team for more detailed assistance.";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message to chat
    const userMessage = { type: 'user', text: inputMessage };
    
    // Get bot response
    const botResponse = { type: 'bot', text: getBotResponse(inputMessage) };
    
    // Update chat history
    setChatHistory([...chatHistory, userMessage, botResponse]);
    setInputMessage('');
  };

  const clearChat = () => {
    setChatHistory([]);
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
              {chatHistory.length > 0 && (
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
            {chatHistory.length === 0 ? (
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
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </>
            )}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="border-t p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <AiOutlineSend size={20} />
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