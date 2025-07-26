import React, { useState } from "react";
import { useApp } from "./context/AppContext";
import LandingPage from "./components/LandingPage";
import BuyerDashboard from "./components/buyer/BuyerDashboard";
import SellerDashboard from "./components/seller/SellerDashboard";
import Header from "./components/common/Header";
import ChatSystem from "./components/ChatSystem";

function App() {
  const { state } = useApp();
  const [showChat, setShowChat] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);

  if (!state.currentUser) {
    return <LandingPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onOpenChat={() => setShowChat(true)}
        onOpenNotifications={() => setShowNotifications(true)}
        onOpenProfile={() => setShowProfile(true)}
      />

      {state.currentUser.role === "buyer" ? (
        <BuyerDashboard />
      ) : (
        <SellerDashboard />
      )}

      {/* Chat System */}
      {showChat && selectedDealId && (
        <ChatSystem
          dealId={selectedDealId}
          onClose={() => setShowChat(false)}
        />
      )}

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-96 max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Notifications
                </h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-4 overflow-y-auto max-h-96">
              {state.notifications.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No notifications yet
                </p>
              ) : (
                <div className="space-y-3">
                  {state.notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border ${
                        notification.read
                          ? "bg-gray-50 border-gray-200"
                          : "bg-blue-50 border-blue-200"
                      }`}
                    >
                      <h4 className="font-medium text-gray-900">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Profile Panel */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Profile Settings
                </h3>
                <button
                  onClick={() => setShowProfile(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white font-semibold">
                    {state.currentUser.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {state.currentUser.name}
                </h4>
                <p className="text-gray-600">{state.currentUser.email}</p>
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mt-2 capitalize">
                  {state.currentUser.role}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <p className="text-gray-600">
                    {state.currentUser.location.address}
                  </p>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
