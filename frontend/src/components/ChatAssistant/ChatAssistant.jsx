import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { FiSend, FiMessageCircle, FiX } from "react-icons/fi";

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const messagesEndRef = useRef(null);
  const { user } = useSelector((state) => state.user);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize chat with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = {
        text: `Hello${user ? ` ${user.name}` : ""}! How can I help you today? Here are some common topics you might be interested in:`,
        sender: "assistant",
        suggestions: [
          "How do I create an account?",
          "Track my order",
          "Return policy",
          "Shipping information",
          user?.role === "vendor" ? "Vendor dashboard help" : "Become a vendor"
        ].filter(Boolean)
      };
      setMessages([welcomeMessage]);
    }
  }, [user]);

  const predefinedAnswers = {
    // General Questions
    greeting: [
      "Hello! How can I help you today?",
      "Hi there! What can I assist you with?",
      "Welcome! How may I be of service?"
    ],
    goodbye: [
      "Goodbye! Have a great day!",
      "See you later! Feel free to come back if you have more questions.",
      "Take care! Don't hesitate to ask if you need anything else."
    ],
    thanks: [
      "You're welcome! Is there anything else I can help you with?",
      "Glad I could help! Let me know if you have more questions.",
      "My pleasure! Feel free to ask anything else."
    ],

    // User Questions
    user: {
      account: {
        "How do I create an account?": "To create an account, click the 'Sign Up' button in the top right corner and follow the registration process. You'll need to provide your email, password, and basic information.",
        "How do I reset my password?": "Click on 'Forgot Password' on the login page, enter your email address, and follow the instructions sent to your email to reset your password.",
        "How do I update my profile?": "Go to your account settings, click on 'Edit Profile', and update your information. Don't forget to save your changes.",
      },
      orders: {
        "How do I track my order?": "Go to your account dashboard, click on 'My Orders', and select the order you want to track. You'll see the current status and tracking information.",
        "What payment methods do you accept?": "We accept M-Pesa payments and other major payment methods. You can see all available payment options during checkout.",
        "How do I cancel my order?": "Go to your order details and click 'Cancel Order' if the order is still in processing status. Note that some orders may not be cancellable.",
      },
      shipping: {
        "What are your shipping costs?": "Shipping costs vary based on your location and order size. You'll see the exact shipping cost during checkout.",
        "How long does delivery take?": "Delivery times vary by location. Within major cities, delivery typically takes 2-3 business days. Rural areas may take longer.",
        "Do you ship internationally?": "Currently, we only ship within Kenya. We're working on expanding our shipping network.",
      },
      returns: {
        "What is your return policy?": "We offer a 30-day return policy for most items. Items must be unused and in their original packaging.",
        "How do I initiate a return?": "Go to your order details, select the item you want to return, and click 'Start Return'. Follow the prompts to complete the process.",
        "How long do refunds take?": "Refunds typically process within 5-7 business days after we receive and inspect the returned item.",
      },
    },

    // Vendor Questions
    vendor: {
      registration: {
        "How do I become a vendor?": "Click on 'Become a Vendor' in the header, complete the registration form, and submit your business documentation for review.",
        "What documents do I need?": "You'll need your business registration certificate, KRA PIN, and valid identification documents.",
        "How long does approval take?": "Vendor approval typically takes 2-3 business days after all documents are submitted.",
      },
      dashboard: {
        "How do I manage my products?": "Go to your vendor dashboard, click on 'Products', and use the interface to add, edit, or remove products.",
        "How do I update product prices?": "In your product management section, click on the product you want to update, modify the price, and save changes.",
        "How do I handle orders?": "Go to your 'Orders' section in the dashboard to view, process, and update order statuses.",
      },
      payments: {
        "How do I receive payments?": "Payments are automatically processed and transferred to your registered bank account within 7-14 days of order completion.",
        "What are your commission rates?": "Commission rates vary by category. You can view the detailed fee structure in your vendor dashboard.",
        "How do I update my payment details?": "Go to your vendor settings, select 'Payment Information', and update your bank account details.",
      },
      shipping: {
        "How do I set up shipping?": "In your vendor dashboard, go to 'Shipping Settings' to configure shipping zones and rates.",
        "Do I need to handle shipping?": "You can choose to handle shipping yourself or use our integrated shipping partners.",
        "How do I print shipping labels?": "Once an order is confirmed, you can generate and print shipping labels from the order details page.",
      },
    },
  };

  const getRandomResponse = (responses) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const findAnswer = (question) => {
    const lowerQuestion = question.toLowerCase();
    let answer = "";
    let suggestions = [];

    // Check for greetings
    if (lowerQuestion.match(/^(hi|hello|hey|greetings)/)) {
      answer = getRandomResponse(predefinedAnswers.greeting);
      suggestions = ["How do I create an account?", "Track my order", "Shipping information"];
    }
    // Check for goodbyes
    else if (lowerQuestion.match(/^(bye|goodbye|see you|farewell)/)) {
      answer = getRandomResponse(predefinedAnswers.goodbye);
    }
    // Check for thanks
    else if (lowerQuestion.match(/^(thanks|thank you|appreciate it)/)) {
      answer = getRandomResponse(predefinedAnswers.thanks);
      suggestions = ["Is there anything else you'd like to know?", "Need help with something else?"];
    }
    // Check user-specific questions
    else if (user) {
      for (const category in predefinedAnswers.user) {
        for (const [key, value] of Object.entries(predefinedAnswers.user[category])) {
          if (lowerQuestion.includes(key.toLowerCase())) {
            answer = value;
            // Add related suggestions based on the category
            suggestions = Object.keys(predefinedAnswers.user[category])
              .filter(k => k !== key)
              .slice(0, 3);
            break;
          }
        }
        if (answer) break;
      }
    }
    // Check vendor-specific questions
    else if (user?.role === "vendor") {
      for (const category in predefinedAnswers.vendor) {
        for (const [key, value] of Object.entries(predefinedAnswers.vendor[category])) {
          if (lowerQuestion.includes(key.toLowerCase())) {
            answer = value;
            // Add related suggestions based on the category
            suggestions = Object.keys(predefinedAnswers.vendor[category])
              .filter(k => k !== key)
              .slice(0, 3);
            break;
          }
        }
        if (answer) break;
      }
    }

    // Default response for unknown questions
    if (!answer) {
      answer = "I apologize, but I'm not sure about that. Here are some topics I can help you with:";
      suggestions = [
        "How do I create an account?",
        "Track my order",
        "Shipping information",
        "Return policy"
      ];
    }

    return { text: answer, suggestions };
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const newMessages = [...messages, { text: inputMessage, sender: "user" }];
    setMessages(newMessages);
    setInputMessage("");
    setIsTyping(true);
    setSuggestions([]);

    // Simulate typing delay
    setTimeout(() => {
      const { text, suggestions } = findAnswer(inputMessage);
      setMessages([...newMessages, { text, sender: "assistant", suggestions }]);
      setSuggestions(suggestions);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
    handleSendMessage();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FiMessageCircle className="w-6 h-6" />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl w-96 h-[500px] flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold flex items-center">
              <FiMessageCircle className="w-5 h-5 mr-2" />
              Chat Assistant
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p>{message.text}</p>
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {message.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block w-full text-left text-sm text-indigo-600 hover:text-indigo-700 bg-white rounded p-2 hover:bg-gray-50 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiSend className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant; 