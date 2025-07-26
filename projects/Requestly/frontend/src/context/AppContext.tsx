import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, Request, Deal, Chat, Message } from '../types';
import { mockUsers, mockRequests, mockDeals, mockChats } from '../data/mockData';

interface AppState {
  currentUser: User | null;
  users: User[];
  requests: Request[];
  deals: Deal[];
  chats: Chat[];
  selectedChat: string | null;
  notifications: Notification[];
}

interface Notification {
  id: string;
  type: 'message' | 'request' | 'deal';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

type AppAction = 
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'ADD_REQUEST'; payload: Request }
  | { type: 'ADD_DEAL'; payload: Deal }
  | { type: 'ADD_MESSAGE'; payload: { chatId: string; message: Message } }
  | { type: 'SELECT_CHAT'; payload: string | null }
  | { type: 'MARK_MESSAGES_READ'; payload: string }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string };

const initialState: AppState = {
  currentUser: null,
  users: mockUsers,
  requests: mockRequests,
  deals: mockDeals,
  chats: mockChats,
  selectedChat: null,
  notifications: []
};

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({ state: initialState, dispatch: () => {} });

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, currentUser: action.payload };
    case 'LOGOUT':
      return { ...state, currentUser: null, selectedChat: null };
    case 'ADD_REQUEST':
      return { 
        ...state, 
        requests: [...state.requests, action.payload]
      };
    case 'ADD_DEAL':
      return { 
        ...state, 
        deals: [...state.deals, action.payload]
      };
    case 'ADD_MESSAGE':
      return {
        ...state,
        chats: state.chats.map(chat => 
          chat.id === action.payload.chatId
            ? {
                ...chat,
                messages: [...chat.messages, action.payload.message],
                lastMessage: action.payload.message,
                unreadCount: chat.unreadCount + 1
              }
            : chat
        )
      };
    case 'SELECT_CHAT':
      return { ...state, selectedChat: action.payload };
    case 'MARK_MESSAGES_READ':
      return {
        ...state,
        chats: state.chats.map(chat =>
          chat.id === action.payload
            ? { ...chat, unreadCount: 0, messages: chat.messages.map(msg => ({ ...msg, read: true })) }
            : chat
        )
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications]
      };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notif =>
          notif.id === action.payload ? { ...notif, read: true } : notif
        )
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('requestly_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);

  // Save user to localStorage when currentUser changes
  useEffect(() => {
    if (state.currentUser) {
      localStorage.setItem('requestly_user', JSON.stringify(state.currentUser));
    } else {
      localStorage.removeItem('requestly_user');
    }
  }, [state.currentUser]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};