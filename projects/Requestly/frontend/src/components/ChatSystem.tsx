// components/ChatSystem.tsx
import React, { useEffect, useState, useContext, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

interface Message {
  _id: string;
  senderId: string;
  message: string;
  timestamp: string;
}

interface ChatSystemProps {
  dealId: string;
  onClose: () => void;
}

const socketServerURL = import.meta.env.VITE_BASE_URL;

const ChatSystem: React.FC<ChatSystemProps> = ({ dealId, onClose }) => {
  const { state } = useContext(AppContext);
  const user = state.currentUser;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // 1. Fetch existing chat history
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/chat/${dealId}`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        // Ensure messages is always an array
        setMessages(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Failed to fetch messages:', err);
        setMessages([]); // fallback to empty array on error
      }
    };

    fetchMessages();

    // 2. Connect and join room
    socketRef.current = io(socketServerURL);
    socketRef.current.emit('joinRoom', { dealId });

    // 3. Handle incoming messages
    socketRef.current.on('newMessage', (msg: Message) => {
      // console.log(Message)
      setMessages((prev) => [...prev, msg]);
      // console.log(msg)
    });

    // 4. Cleanup
    return () => {
      socketRef.current?.disconnect();
    };
  }, [dealId, user]);

  // 5. Send message
  const handleSend = () => {
    if (!input.trim() || !user) return;
    socketRef.current?.emit('chatMessage', {
      dealId,
      senderId: user.id,
      message: input.trim(),
    });
    setInput('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Chat</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
          >
            ×
          </button>
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {Array.isArray(messages) && messages.length > 0 ? (
            messages.map((msg) => (
              <div
                key={msg._id}
                className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${
                    msg.senderId === user?.id
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <span className="text-xs mt-1 block text-right opacity-70">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-center py-8">No messages yet.</div>
          )}
        </div>
        {/* Input */}
        {/* <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Type message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:from-purple-600 hover:to-blue-600 transition-all"
            >
              Send
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ChatSystem;
