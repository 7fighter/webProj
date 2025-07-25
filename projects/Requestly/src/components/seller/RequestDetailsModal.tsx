import React from 'react';
import { X, MapPin, User, MessageCircle, DollarSign } from 'lucide-react';
import { Request } from '../../types';
import { useApp } from '../../context/AppContext';
import { categories } from '../../data/categories';

interface RequestDetailsModalProps {
  request: Request;
  onClose: () => void;
}

export default function RequestDetailsModal({ request, onClose }: RequestDetailsModalProps) {
  const { state, dispatch } = useApp();
  const category = categories.find(c => c.id === request.category);

  const handleStartChat = () => {
    if (!state.currentUser) return;

    // Check if chat already exists
    const existingChat = state.chats.find(chat =>
      chat.participants.includes(state.currentUser!.id) &&
      chat.participants.includes(request.requesterId)
    );

    if (existingChat) {
      dispatch({ type: 'SELECT_CHAT', payload: existingChat.id });
    } else {
      // Create new chat
      const newChat = {
        id: Date.now().toString(),
        participants: [state.currentUser.id, request.requesterId],
        participantNames: {
          [state.currentUser.id]: state.currentUser.name,
          [request.requesterId]: request.requesterName
        },
        messages: [],
        unreadCount: 0
      };

      // Add initial message
      const initialMessage = {
        id: Date.now().toString(),
        senderId: state.currentUser.id,
        receiverId: request.requesterId,
        message: `Hi! I can help with "${request.title}". Let's discuss the details.`,
        timestamp: new Date().toISOString(),
        read: false
      };

      dispatch({ type: 'ADD_MESSAGE', payload: { chatId: newChat.id, message: initialMessage } });
      dispatch({ type: 'SELECT_CHAT', payload: newChat.id });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{category?.emoji}</span>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{request.title}</h2>
              <p className="text-gray-600">{category?.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Budget */}
          <div className="text-center py-4 bg-blue-50 rounded-xl">
            <div className="flex items-center justify-center space-x-2">
              <DollarSign className="w-6 h-6 text-blue-600" />
              <span className="text-3xl font-bold text-blue-600">{request.budget}</span>
            </div>
            <p className="text-sm text-blue-600 mt-1">Budget</p>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{request.description}</p>
          </div>

          {/* Requester Info */}
          <div className="border border-gray-200 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Requester Information</h3>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{request.requesterName}</h4>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{request.address}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Posted {new Date(request.timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>{request.address}</span>
            </div>
          </div>

          {/* Status */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Status</h3>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              request.status === 'active'
                ? 'bg-green-100 text-green-700'
                : request.status === 'matched'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700'
            }`}>
              {request.status === 'active' ? 'Looking for Seller' : 
               request.status === 'matched' ? 'Matched' : 'Completed'}
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={handleStartChat}
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Start Chat</span>
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-all">
              Save Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}