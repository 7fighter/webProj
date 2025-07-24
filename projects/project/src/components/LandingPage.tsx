import React, { useState } from 'react';
import { MapPin, Users, MessageCircle, Shield, ArrowRight, Star } from 'lucide-react';
import AuthModal from './auth/AuthModal';

export default function LandingPage() {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const openAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Requestly
            </h1>
          </div>
          <div className="space-x-4">
            <button
              onClick={() => openAuth('login')}
              className="px-4 py-2 text-gray-700 hover:text-purple-600 transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => openAuth('register')}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="mb-8">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Connect Locally,<br />
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Trade Instantly
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The real-time marketplace for local services, products, rentals, and food. 
            Post requests, find nearby deals, and connect with your community instantly.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => openAuth('register')}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2"
          >
            <span className="text-lg font-semibold">Start Trading</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => openAuth('login')}
            className="px-8 py-4 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all shadow-lg border border-gray-200"
          >
            <span className="text-lg font-semibold">I have an account</span>
          </button>
        </div>

        {/* Preview Video/Animation Placeholder */}
        <div className="relative max-w-4xl mx-auto">
          <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <p className="text-lg text-gray-600">Interactive Demo Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need for Local Trading
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make local commerce simple, safe, and efficient.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Location-Based</h4>
              <p className="text-gray-600">Find exactly what you need in your neighborhood with precise geo-targeting.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Real-Time Chat</h4>
              <p className="text-gray-600">Instant messaging with buyers and sellers to negotiate and coordinate.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Smart Matching</h4>
              <p className="text-gray-600">Intelligent algorithms connect buyers with the perfect sellers instantly.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Secure Platform</h4>
              <p className="text-gray-600">Advanced security measures to protect your data and transactions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Four Main Categories
            </h3>
            <p className="text-lg text-gray-600">
              Everything you need, organized and easy to find.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: '🍔', name: 'Food & Dining', color: 'from-orange-400 to-red-400' },
              { emoji: '🚗', name: 'Vehicle Rental', color: 'from-blue-400 to-indigo-400' },
              { emoji: '🛍️', name: 'Shopping', color: 'from-emerald-400 to-teal-400' },
              { emoji: '🛠️', name: 'Services', color: 'from-purple-400 to-pink-400' }
            ].map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className={`bg-gradient-to-br ${category.color} p-8 rounded-2xl text-center text-white group-hover:scale-105 transition-transform shadow-lg`}>
                  <div className="text-4xl mb-4">{category.emoji}</div>
                  <h4 className="text-xl font-semibold">{category.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Loved by Local Communities
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Chen',
                role: 'Food Enthusiast',
                content: 'Found the best local restaurants and got food delivered in minutes. The real-time chat made ordering so easy!'
              },
              {
                name: 'Mike Rodriguez',
                role: 'Small Business Owner',
                content: 'As a service provider, Requestly has helped me connect with so many local customers. Game changer!'
              },
              {
                name: 'Emily Johnson',
                role: 'College Student',
                content: 'Perfect for finding affordable rentals and services around campus. The location-based search is incredibly accurate.'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-500 to-blue-500 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-4xl font-bold text-white mb-6">
            Ready to Start Trading Locally?
          </h3>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of users who are already connecting and trading in their communities.
          </p>
          <button
            onClick={() => openAuth('register')}
            className="px-8 py-4 bg-white text-purple-600 rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg text-lg font-semibold"
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">Requestly</h1>
          </div>
          <p className="text-gray-400 mb-4">
            Connecting communities through local commerce.
          </p>
          <p className="text-gray-500 text-sm">
            © 2025 Requestly. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuth && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuth(false)}
          onSwitchMode={setAuthMode}
        />
      )}
    </div>
  );
}