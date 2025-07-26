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
        setMessages(res.data);
      } catch (err) {
        console.error('Failed to fetch messages:', err);
      }
    };

    fetchMessages();

    // 2. Connect and join room
    socketRef.current = io(socketServerURL);
    socketRef.current.emit('joinRoom', { dealId });

    // 3. Handle incoming messages
    socketRef.current.on('newMessage', (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
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
    <div className="chat-box">
      <h3>Chat</h3>
      <button onClick={onClose}>Close</button>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={
              msg.senderId === user?.id ? 'my-message' : 'their-message'
            }
          >
            {msg.message}
            <span className="timestamp">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatSystem;
