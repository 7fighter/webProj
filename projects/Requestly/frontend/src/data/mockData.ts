import { User, Request, Deal, Chat, Message } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'buyer',
    location: { lat: 40.7128, lng: -74.0060, address: 'New York, NY' },
    contact: '+1234567890'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'seller',
    location: { lat: 40.7589, lng: -73.9851, address: 'Times Square, NY' },
    contact: '+1234567891'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'seller',
    location: { lat: 40.7831, lng: -73.9712, address: 'Central Park, NY' },
    contact: '+1234567892'
  }
];

export const mockRequests: Request[] = [
  {
    id: '1',
    category: 'food',
    title: 'Looking for fresh pizza delivery',
    description: 'Need a good pizza place that delivers to my area. Preferably Italian style.',
    budget: 25,
    requesterId: '1',
    requesterName: 'John Doe',
    geoCoords: { lat: 40.7128, lng: -74.0060 },
    address: 'New York, NY',
    timestamp: new Date().toISOString(),
    status: 'active'
  },
  {
    id: '2',
    category: 'vehicle',
    title: 'Need a car for weekend trip',
    description: 'Looking to rent a sedan for a weekend trip to the mountains.',
    budget: 150,
    requesterId: '1',
    requesterName: 'John Doe',
    geoCoords: { lat: 40.7128, lng: -74.0060 },
    address: 'New York, NY',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: 'active'
  }
];

export const mockDeals: Deal[] = [
  {
    id: '1',
    title: 'Authentic Wood-Fired Pizza',
    description: 'Fresh ingredients, traditional Italian recipes. Free delivery within 5 miles.',
    price: 18,
    sellerId: '2',
    sellerName: 'Jane Smith',
    category: 'food',
    geoCoords: { lat: 40.7589, lng: -73.9851 },
    address: 'Times Square, NY',
    timestamp: new Date().toISOString(),
    status: 'active'
  },
  {
    id: '2',
    title: 'Premium Car Rental Service',
    description: 'Clean, reliable vehicles. Competitive rates. Available 24/7.',
    price: 120,
    sellerId: '3',
    sellerName: 'Mike Johnson',
    category: 'vehicle',
    geoCoords: { lat: 40.7831, lng: -73.9712 },
    address: 'Central Park, NY',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    status: 'active'
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    receiverId: '2',
    message: 'Hi! I saw your pizza deal. Is it still available?',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    read: true
  },
  {
    id: '2',
    senderId: '2',
    receiverId: '1',
    message: 'Yes! We have fresh pizzas ready. What would you like to order?',
    timestamp: new Date(Date.now() - 7000000).toISOString(),
    read: true
  },
  {
    id: '3',
    senderId: '1',
    receiverId: '2',
    message: 'Great! I\'d like a margherita pizza, please.',
    timestamp: new Date(Date.now() - 6800000).toISOString(),
    read: false
  }
];

export const mockChats: Chat[] = [
  {
    id: '1',
    participants: ['1', '2'],
    participantNames: { '1': 'John Doe', '2': 'Jane Smith' },
    messages: mockMessages,
    lastMessage: mockMessages[mockMessages.length - 1],
    unreadCount: 1
  }
];