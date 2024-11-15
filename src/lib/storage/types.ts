// Common types for storage service
export interface StorageOptions {
    namespace?: string;
    expiry?: number; // Time in milliseconds
  }
  
  export interface StorageItem<T> {
    value: T;
    timestamp: number;
    expiry?: number;
  }
  
  export interface StorageService {
    set<T>(key: string, value: T, options?: StorageOptions): void;
    get<T>(key: string): T | null;
    remove(key: string): void;
    clear(namespace?: string): void;
    has(key: string): boolean;
  }