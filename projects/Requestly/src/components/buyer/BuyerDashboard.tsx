import React, { useState } from 'react';
import { Plus, Filter, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MapMarker, Deal, Request } from '../../types';
import Map from '../common/Map';
import RequestModal from './RequestModal';
import DealDetailsModal from './DealDetailsModal';
import { categories } from '../../data/categories';

export default function BuyerDashboard() {
  const { state } = useApp();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter deals based on category and search
  const filteredDeals = state.deals.filter(deal => {
    const matchesCategory = selectedCategory === 'all' || deal.category === selectedCategory;
    const matchesSearch = deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         deal.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && deal.status === 'active';
  });

  // Create map markers from deals
  const mapMarkers: MapMarker[] = filteredDeals.map(deal => ({
    id: deal.id,
    type: 'deal',
    category: deal.category,
    position: deal.geoCoords,
    title: deal.title,
    price: deal.price
  }));

  const handleMarkerClick = (marker: MapMarker) => {
    const deal = state.deals.find(d => d.id === marker.id);
    if (deal) {
      setSelectedDeal(deal);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Search & Filter Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for services, food, vehicles..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.emoji} {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Create Request Button */}
          <button
            onClick={() => setShowRequestModal(true)}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all flex items-center space-x-2 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            <span>New Request</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Map Section */}
        <div className="flex-1 p-4">
          <Map
            markers={mapMarkers}
            onMarkerClick={handleMarkerClick}
            className="h-full"
          />
        </div>

        {/* Deals Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Available Deals ({filteredDeals.length})
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredDeals.length === 0 ? (
              <div className="p-4 text-center">
                <p className="text-gray-500">No deals found matching your criteria.</p>
              </div>
            ) : (
              <div className="space-y-3 p-4">
                {filteredDeals.map(deal => {
                  const category = categories.find(c => c.id === deal.category);
                  return (
                    <div
                      key={deal.id}
                      onClick={() => setSelectedDeal(deal)}
                      className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{category?.emoji}</span>
                          <h4 className="font-medium text-gray-900 truncate">{deal.title}</h4>
                        </div>
                        <span className="text-lg font-bold text-green-600">${deal.price}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{deal.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{deal.sellerName}</span>
                        <span>{deal.address}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showRequestModal && (
        <RequestModal onClose={() => setShowRequestModal(false)} />
      )}

      {selectedDeal && (
        <DealDetailsModal
          deal={selectedDeal}
          onClose={() => setSelectedDeal(null)}
        />
      )}
    </div>
  );
}