import React from 'react';
import { MapPin } from 'lucide-react';
import { MapMarker } from '../../types';
import { categories } from '../../data/categories';

interface MapProps {
  markers: MapMarker[];
  onMarkerClick: (marker: MapMarker) => void;
  center?: { lat: number; lng: number };
  className?: string;
}

export default function Map({ markers, onMarkerClick, center, className = '' }: MapProps) {
  // Mock map implementation - in production, use Mapbox or Google Maps
  const defaultCenter = center || { lat: 40.7128, lng: -74.0060 };

  return (
    <div className={`relative bg-gradient-to-br from-blue-50 to-green-50 rounded-xl overflow-hidden ${className}`}>
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-green-100/30">
        <div className="absolute inset-0 opacity-10">
          {/* Grid pattern to simulate map */}
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 144 }, (_, i) => (
              <div key={i} className="border border-gray-300/20" />
            ))}
          </div>
        </div>
      </div>

      {/* Center marker */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
          <MapPin className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Dynamic markers */}
      {markers.map((marker, index) => {
        const category = categories.find(c => c.id === marker.category);
        const offsetX = (index % 3 - 1) * 80 + Math.random() * 40 - 20;
        const offsetY = (Math.floor(index / 3) % 3 - 1) * 60 + Math.random() * 30 - 15;
        
        return (
          <div
            key={marker.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
            style={{
              left: `calc(50% + ${offsetX}px)`,
              top: `calc(50% + ${offsetY}px)`,
            }}
            onClick={() => onMarkerClick(marker)}
          >
            {/* Category emoji */}
            <div className="text-2xl mb-1 text-center group-hover:scale-110 transition-transform">
              {category?.emoji}
            </div>
            
            {/* Marker pin */}
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white group-hover:scale-110 transition-transform"
              style={{ backgroundColor: category?.color }}
            >
              <MapPin className="w-4 h-4 text-white" />
            </div>
            
            {/* Tooltip */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30">
              {marker.title}
              <div className="text-xs text-gray-300">
                {marker.type === 'request' ? `Budget: $${marker.budget}` : `Price: $${marker.price}`}
              </div>
            </div>
          </div>
        );
      })}

      {/* Map controls */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
        <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
          <span className="text-lg font-bold">+</span>
        </button>
        <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
          <span className="text-lg font-bold">−</span>
        </button>
      </div>

      {/* Current location button */}
      <button className="absolute bottom-4 left-4 w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
        <MapPin className="w-5 h-5 text-blue-500" />
      </button>
    </div>
  );
}