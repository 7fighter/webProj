import React from 'react';
import { X, MapPin, User, MessageCircle, Star } from 'lucide-react';
import { Deal } from '../../types';
import { useApp } from '../../context/AppContext';
import { categories } from '../../data/categories';

interface DealDetailsModalProps {
  deal: Deal;
  onClose: () => void;
}

export default function DealDetailsModal({ deal, onClose }: DealDetailsModalProps) {
  const { state, dispatch } = useApp();
  const category = categories.find(c => c.id === deal.category);

  const handleStartChat = () => {
    if (!state.currentUser) return;

    // Check if chat already exists
    const existingChat = state.chats.find(chat =>
      chat.participants.includes(state.currentUser!.id) &&
      chat.participants.includes(deal.sellerId)
    );

    if (existingChat) {
      dispatch({ type: 'SELECT_CHAT', payload: existingChat.id });
    } else {
      // Create new chat (in a real app, this would be an API call)
      const newChat = {
        id: Date.now().toString(),
        participants: [state.currentUser.id, deal.sellerId],
        participantNames: {
          [state.currentUser.id]: state.currentUser.name,
          [deal.sellerId]: deal.sellerName
        },
        messages: [],
        unreadCount: 0
      };

      // Add initial message
      const initialMessage = {
        id: Date.now().toString(),
        senderId: state.currentUser.id,
        receiverId: deal.sellerId,
        message: `Hi! I'm interested in "${deal.title}". Is it still available?`,
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
              <h2 className="text-2xl font-bold text-gray-900">{deal.title}</h2>
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
          {/* Price */}
          <div className="text-center py-4 bg-green-50 rounded-xl">
            <span className="text-3xl font-bold text-green-600">${deal.price}</span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{deal.description}</p>
          </div>

          {/* Seller Info */}
          <div className="border border-gray-200 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Seller Information</h3>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{deal.sellerName}</h4>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{deal.address}</span>
                </div>
                <div className="flex items-center space-x-1 mt-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">(4.8)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>{deal.address}</span>
            </div>
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
              Save for Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}