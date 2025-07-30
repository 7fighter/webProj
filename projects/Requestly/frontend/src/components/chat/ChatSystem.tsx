import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Phone, Video, Info, MessageCircle, Plus } from 'lucide-react'; // Added Plus icon
import { useApp } from '../../context/AppContext';

interface ChatSystemProps {
  onClose: () => void;
}

export default function ChatSystem({ onClose }: ChatSystemProps) {
  console.log("ChatSystem.tsx component function started rendering!"); // ADD THIS LINE
  if (!selectedChat || selectedChat.messages.length === 0) {
  return (
    console.log("nothing")
  );
}
  const { state, dispatch } = useApp();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedChat = state.chats.find(chat => chat.id === state.selectedChat);
  const currentUserId = state.currentUser?.id;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedChat?.messages]);

  useEffect(() => {
    if (selectedChat && selectedChat.unreadCount > 0) {
      dispatch({ type: 'MARK_MESSAGES_READ', payload: selectedChat.id });
    }
  }, [selectedChat, dispatch]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedChat || !currentUserId) return;

    const otherParticipant = selectedChat.participants.find(p => p !== currentUserId);
    if (!otherParticipant) return;

    const newMessage = {
      id: Date.now().toString(),
      senderId: currentUserId,
      receiverId: otherParticipant,
      message: message.trim(),
      timestamp: new Date().toISOString(),
      read: false
    };

    dispatch({ type: 'ADD_MESSAGE', payload: { chatId: selectedChat.id, message: newMessage } });
    setMessage('');
  };

  const handleSelectChat = (chatId: string) => {
    dispatch({ type: 'SET_SELECTED_CHAT', payload: chatId });
  };

  const handleStartNewChat = () => {
    // This is a placeholder. In a real app, you'd navigate to a user selection screen
    // or trigger a modal to choose who to chat with.
    alert("Functionality to start a new chat is not yet implemented.");
    // For demonstration, let's assume we create a dummy chat or select the first available if any.
    if (state.chats.length > 0) {
      dispatch({ type: 'SET_SELECTED_CHAT', payload: state.chats[0].id });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[600px] flex">
        {/* Chat List / Sidebar */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Chats</h3>
            <button
              onClick={handleStartNewChat}
              className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              title="Start New Chat"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {state.chats.length === 0 ? (
              <div className="text-center py-8 px-4 text-gray-500">
                <p>No active chats. Click the '+' button to start a new one!</p>
              </div>
            ) : (
              state.chats.map(chat => {
                const otherParticipantId = chat.participants.find(p => p !== currentUserId);
                const participantName = otherParticipantId ? chat.participantNames[otherParticipantId] : 'Unknown';
                const lastMessage = chat.messages[chat.messages.length - 1];

                return (
                  <button
                    key={chat.id}
                    onClick={() => handleSelectChat(chat.id)}
                    className={`flex items-center space-x-3 p-4 w-full text-left border-b border-gray-100 ${
                      selectedChat?.id === chat.id ? 'bg-purple-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold">
                        {participantName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">{participantName}</h4>
                      {lastMessage && (
                        <p className="text-sm text-gray-600 truncate">
                          {lastMessage.message}
                        </p>
                      )}
                    </div>
                    {chat.unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                        {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {selectedChat.participantNames[selectedChat.participants.find(p => p !== currentUserId) || '']?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {selectedChat.participantNames[selectedChat.participants.find(p => p !== currentUserId) || ''] || 'Unknown'}
                    </h3>
                    <p className="text-sm text-green-500">Online</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                    <Info className="w-5 h-5" />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedChat.messages.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  selectedChat.messages.map((msg) => {
                    const isCurrentUser = msg.senderId === currentUserId;
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            isCurrentUser
                              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                          <p
                            className={`text-xs mt-1 ${
                              isCurrentUser ? 'text-purple-100' : 'text-gray-500'
                            }`}
                          >
                            {new Date(msg.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                  <button
                    type="submit"
                    disabled={!message.trim()}
                    className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 p-8">
              <span className="text-6xl mb-4 text-gray-300">💬</span>
              <p className="text-gray-500 text-center text-lg mb-6">
                Select a chat from the left or start a new conversation.
              </p>
              <button
                onClick={handleStartNewChat}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Start New Chat</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}