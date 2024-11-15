import { logger } from '../utils/logger';
import type { StorageService, StorageOptions, StorageItem } from './types';

class LocalStorageService implements StorageService {
  private getFullKey(key: string, namespace?: string): string {
    return namespace ? `${namespace}:${key}` : key;
  }

  private isExpired(item: StorageItem<unknown>): boolean {
    if (!item.expiry) return false;
    return Date.now() - item.timestamp > item.expiry;
  }

  set<T>(key: string, value: T, options: StorageOptions = {}): void {
    try {
      const fullKey = this.getFullKey(key, options.namespace);
      const item: StorageItem<T> = {
        value,
        timestamp: Date.now(),
        expiry: options.expiry
      };

      localStorage.setItem(fullKey, JSON.stringify(item));
      
      logger.info('Stored item in localStorage', {
        data: {
          key: fullKey,
          hasExpiry: !!options.expiry
        }
      });
    } catch (error) {
      logger.error('Failed to store item in localStorage', {
        data: { key, error }
      });
      throw error;
    }
  }

  get<T>(key: string, namespace?: string): T | null {
    try {
      const fullKey = this.getFullKey(key, namespace);
      const data = localStorage.getItem(fullKey);
      
      if (!data) {
        logger.info('Item not found in localStorage', { data: { key: fullKey } });
        return null;
      }

      const item: StorageItem<T> = JSON.parse(data);

      if (this.isExpired(item)) {
        logger.info('Item expired, removing from localStorage', {
          data: { key: fullKey }
        });
        this.remove(fullKey);
        return null;
      }

      logger.info('Retrieved item from localStorage', {
        data: { key: fullKey }
      });
      return item.value;
    } catch (error) {
      logger.error('Failed to retrieve item from localStorage', {
        data: { key, error }
      });
      return null;
    }
  }

  remove(key: string, namespace?: string): void {
    try {
      const fullKey = this.getFullKey(key, namespace);
      localStorage.removeItem(fullKey);
      logger.info('Removed item from localStorage', {
        data: { key: fullKey }
      });
    } catch (error) {
      logger.error('Failed to remove item from localStorage', {
        data: { key, error }
      });
    }
  }

  clear(namespace?: string): void {
    try {
      if (namespace) {
        // Clear only items in the specified namespace
        const prefix = `${namespace}:`;
        const keys = Object.keys(localStorage).filter(key => key.startsWith(prefix));
        keys.forEach(key => localStorage.removeItem(key));
        
        logger.info('Cleared namespace from localStorage', {
          data: { namespace, itemsCleared: keys.length }
        });
      } else {
        // Clear all items
        localStorage.clear();
        logger.info('Cleared all items from localStorage');
      }
    } catch (error) {
      logger.error('Failed to clear localStorage', {
        data: { namespace, error }
      });
    }
  }

  has(key: string, namespace?: string): boolean {
    const fullKey = this.getFullKey(key, namespace);
    const exists = localStorage.getItem(fullKey) !== null;
    
    logger.info('Checked item existence in loc