import { logger } from '../utils/logger';
import type { User } from './types';

// Mock storage for users
const USERS_STORAGE_KEY = 'mock_users';
const AUTH_USER_KEY = 'mock_current_user';

const getStoredUsers = (): User[] => {
  try {
    return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

const setStoredUsers = (users: User[]) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

const getCurrentUser = (): User | null => {
  try {
    return JSON.parse(localStorage.getItem(AUTH_USER_KEY) || 'null');
  } catch {
    return null;
  }
};

const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_USER_KEY);
  }
};

export const initNetlifyIdentity = () => {
  logger.info('Initializing Mock Auth');
  const currentUser = getCurrentUser();
  if (currentUser) {
    logger.info('Found existing session', { data: { email: currentUser.email } });
  }
};

export const netlifyAuth = {
  signup(email: string, password: string, userData: Partial<User> = {}) {
    const users = getStoredUsers();
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      role: 'user',
      created_at: new Date().toISOString(),
      email_verified: false,
      ...userData
    };

    users.push(newUser);
    setStoredUsers(users);
    setCurrentUser(newUser);
    
    logger.success('User signed up successfully', { data: { email } });
    return newUser;
  },

  login(email: string, password: string) {
    const users = getStoredUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    setCurrentUser(user);
    logger.success('User logged in successfully', { data: { email } });
    return user;
  },

  logout() {
    setCurrentUser(null);
    logger.info('User logged out');
  },

  getCurrentUser(): User | null {
    return getCurrentUser();
  }
};