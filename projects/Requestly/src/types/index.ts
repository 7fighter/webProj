export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  contact?: string;
  avatar?: string;
}

export interface Request {
  id: string;
  category: CategoryType;
  title: string;
  description: string;
  budget: number;
  requesterId: string;
  requesterName: string;
  geoCoords: {
    lat: number;
    lng: number;
  };
  address: string;
  timestamp: string;
  status: 'active' | 'matched' | 'completed';
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  price: number;
  sellerId: string;
  sellerName: string;
  category: CategoryType;
  geoCoords: {
    lat: number;
    lng: number;
  };
  address: string;
  timestamp: string;
  status: 'active' | 'sold';
  images?: string[];
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface Chat {
  id: string;
  participants: string[];
  participantNames: { [key: string]: string };
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
}

export type CategoryType = 'food' | 'vehicle' | 'shopping' | 'services';

export interface Category {
  id: CategoryType;
  name: string;
  emoji: string;
  color: string;
}

export interface MapMarker {
  id: string;
  type: 'request' | 'deal';
  category: CategoryType;
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  price?: number;
  budget?: number;
}