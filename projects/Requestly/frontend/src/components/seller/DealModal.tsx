import React, { useState } from 'react';
import { X, MapPin, DollarSign, FileText, Image } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Deal } from '../../types';
import { categories } from '../../data/categories';

interface DealModalProps {
  onClose: () => void;
  deal?: Deal | null;
}

export default function DealModal({ onClose, deal }: DealModalProps) {
  const { state, dispatch } = useApp();
  const [formData, setFormData] = useState({
    category: deal?.category || 'food' as const,
    title: deal?.title || '',
    description: deal?.description || '',
    price: deal?.price?.toString() || '',
    location: deal?.address || state.currentUser?.location.address || ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.currentUser) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newDeal: Deal = {
        id: deal?.id || Date.now().toString(),
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        sellerId: state.currentUser!.id,
        sellerName: state.currentUser!.name,
        category: formData.category,
        geoCoords: state.currentUser!.location,
        address: formData.location,
        timestamp: deal?.timestamp || new Date().toISOString(),
        status: 'active'
      };

      dispatch({ type: 'ADD_DEAL', payload: newDeal });
      
      // Add notification
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now().toString(),
          type: 'deal',
          title: deal ? 'Deal Updated' : 'Deal Created',
          message: `Your deal "${formData.title}" has been ${deal ? 'updated' : 'created'} successfully.`,
          timestamp: new Date().toISOString(),
          read: false
        }
      });

      setLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {deal ? 'Edit Deal' : 'Create New Deal'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Category
            </label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: category.id })}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.category === category.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{category.emoji}</div>
                  <div className="text-sm font-medium text-gray-900">{category.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deal Title
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="e.g., Fresh Wood-Fired Pizza, Premium Car Rental"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
              rows={4}
              placeholder="Describe your product or service in detail..."
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your price"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your business location"
                required
              />
            </div>
          </div>

          {/* Images (placeholder) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors cursor-pointer">
              <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload images</p>
              <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? (deal ? 'Updating Deal...' : 'Creating Deal...') : (deal ? 'Update Deal' : 'Create Deal')}
          </button>
        </form>
      </div>
    </div>
  );
}