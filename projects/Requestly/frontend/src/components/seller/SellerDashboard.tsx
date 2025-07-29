import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MapMarker, Request } from '../../types';
import Map from '../common/Map';
import DealModal from './DealModal';
import RequestDetailsModal from './RequestDetailsModal';
import { categories } from '../../data/categories';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_BASE_URL);

export default function SellerDashboard() {
  const { state, dispatch } = useApp();
  const [showDealModal, setShowDealModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [editingDeal, setEditingDeal] = useState(null);
  const [newRequestPopup, setNewRequestPopup] = useState<Request | null>(null);

  // Get seller's deals
  const myDeals = state.deals.filter(deal => deal.sellerId === state.currentUser?.id);

  // Create map markers from active requests
  const mapMarkers: MapMarker[] = state.requests
    .filter(request => request.status === 'active')
    .map(request => ({
      id: request.id,
      type: 'request',
      category: request.category,
      position: request.geoCoords,
      title: request.title,
      budget: request.budget
    }));

  const handleMarkerClick = (marker: MapMarker) => {
    const request = state.requests.find(r => r.id === marker.id);
    if (request) {
      setSelectedRequest(request);
    }
  };

  useEffect(() => {
    socket.on('newRequest', (request) => {
      setNewRequestPopup(request);
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now().toString(),
          type: 'request',
          title: 'New Buyer Request',
          message: `A new request for "${request.title}" has been posted.`,
          timestamp: new Date().toISOString(),
          read: false
        }
      });
    });

    return () => {
      socket.off('newRequest');
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Seller Dashboard</h2>
            <p className="text-gray-600">Manage your deals and view buyer requests</p>
          </div>
          <button
            onClick={() => setShowDealModal(true)}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create Deal</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Map Section */}
        <div className="flex-1 p-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Active Buyer Requests ({mapMarkers.length})
            </h3>
            <Map
              markers={mapMarkers}
              onMarkerClick={handleMarkerClick}
              className="h-full"
            />
          </div>
        </div>

        {/* Deals Management Sidebar */}
        <div className="w-96 bg-white border-l border-gray-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              My Deals ({myDeals.length})
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto">
            {myDeals.length === 0 ? (
              <div className="p-4 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-4">No deals yet</p>
                <button
                  onClick={() => setShowDealModal(true)}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Create Your First Deal
                </button>
              </div>
            ) : (
              <div className="space-y-3 p-4">
                {myDeals.map(deal => {
                  const category = categories.find(c => c.id === deal.category);
                  return (
                    <div
                      key={deal.id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{category?.emoji}</span>
                          <h4 className="font-medium text-gray-900 truncate">{deal.title}</h4>
                        </div>
                        <span className="text-lg font-bold text-green-600">${deal.price}</span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{deal.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span className={`px-2 py-1 rounded-full ${
                          deal.status === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {deal.status}
                        </span>
                        <span>{new Date(deal.timestamp).toLocaleDateString()}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button className="flex-1 px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>View</span>
                        </button>
                        <button className="flex-1 px-3 py-1.5 text-xs bg-purple-50 text-purple-600 rounded hover:bg-purple-100 transition-colors flex items-center justify-center space-x-1">
                          <Edit className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        <button className="flex-1 px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors flex items-center justify-center space-x-1">
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </button>
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
      {showDealModal && (
        <DealModal
          onClose={() => setShowDealModal(false)}
          deal={editingDeal}
        />
      )}

      {selectedRequest && (
        <RequestDetailsModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}

      {newRequestPopup && (
        <RequestDetailsModal
          request={newRequestPopup}
          onClose={() => setNewRequestPopup(null)}
        />
      )}
    </div>
  );
}