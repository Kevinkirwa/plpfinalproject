import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import server from '../../server';
import { toast } from 'react-toastify';
import styles from '../../styles/styles';

const Chat = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentChat, setCurrentChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Get conversation ID from URL query params
    const searchParams = new URLSearchParams(location.search);
    const conversationId = searchParams.get('conversation');

    const loadConversations = async () => {
      try {
        const response = await axios.get(
          `${server}/conversation/get-all-conversation-user/${user._id}`,
          { withCredentials: true }
        );
        setConversations(response.data.conversations);
        
        // If we have a conversation ID in the URL, set it as current
        if (conversationId) {
          const conversation = response.data.conversations.find(
            (conv) => conv._id === conversationId
          );
          if (conversation) {
            setCurrentChat(conversation);
            loadMessages(conversationId);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading conversations:', error);
        toast.error('Error loading conversations');
        setLoading(false);
      }
    };

    loadConversations();
  }, [isAuthenticated, navigate, user._id, location.search]);

  const loadMessages = async (conversationId) => {
    try {
      const response = await axios.get(
        `${server}/message/get-all-messages/${conversationId}`,
        { withCredentials: true }
      );
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast.error('Error loading messages');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(
        `${server}/message/create-new-message`,
        {
          conversationId: currentChat._id,
          text: newMessage,
          sender: user._id,
        },
        { withCredentials: true }
      );

      setMessages([...messages, response.data.message]);
      setNewMessage('');

      // Update last message in conversation
      await axios.put(
        `${server}/conversation/update-last-message/${currentChat._id}`,
        {
          lastMessage: newMessage,
          lastMessageId: response.data.message._id,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Error sending message');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full flex py-10 justify-center">
        <div className="w-[90%] 800px:w-[80%] bg-white rounded shadow">
          <div className="w-full flex flex-col md:flex-row">
            {/* Conversations List */}
            <div className="w-full md:w-[30%] bg-gray-50 rounded-l">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">Messages</h2>
              </div>
              <div className="overflow-y-auto h-[70vh]">
                {conversations.map((conversation) => (
                  <div
                    key={conversation._id}
                    onClick={() => {
                      setCurrentChat(conversation);
                      loadMessages(conversation._id);
                      navigate(`/inbox?conversation=${conversation._id}`);
                    }}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
                      currentChat?._id === conversation._id ? 'bg-gray-200' : ''
                    }`}
                  >
                    <h3 className="font-medium">{conversation.groupTitle}</h3>
                    <p className="text-sm text-gray-500">
                      {conversation.lastMessage || 'No messages yet'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Messages Area */}
            <div className="w-full md:w-[70%] bg-white">
              {currentChat ? (
                <>
                  <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold">
                      {currentChat.groupTitle}
                    </h2>
                  </div>
                  <div className="h-[60vh] overflow-y-auto p-4">
                    {messages.map((message) => (
                      <div
                        key={message._id}
                        className={`flex mb-4 ${
                          message.sender === user._id
                            ? 'justify-end'
                            : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.sender === user._id
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200'
                          }`}
                        >
                          <p>{message.text}</p>
                          {message.images && (
                            <img
                              src={message.images.url}
                              alt="message"
                              className="mt-2 max-w-[200px] rounded"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleSendMessage} className="p-4 border-t">
                    <div className="flex">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 p-2 border rounded-l focus:outline-none"
                      />
                      <button
                        type="submit"
                        className={`${styles.button} !rounded-l-none !h-[42px]`}
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500">
                    Select a conversation to start chatting
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat; 