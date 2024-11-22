import { Location } from '../types/content';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresIn: number;
}

class ContentCache {
  private templateCache: Map<string, CacheItem<any>> = new Map();
  private locationCache: Map<string, CacheItem<any>> = new Map();
  private demographicCache: Map<string, CacheItem<any>> = new Map();
  
  // Default cache duration: 24 hours
  private DEFAULT_CACHE_DURATION = 24 * 60 * 60 * 1000;

  // Template cache methods
  async getTemplate(topic: string): Promise<any | null> {
    return this.get(this.templateCache, topic);
  }

  setTemplate(topic: string, data: any, expiresIn: number = this.DEFAULT_CACHE_DURATION): void {
    this.set(this.templateCache, topic, data, expiresIn);
  }

  // Location cache methods
  async getLocationDetails(location: Location): Promise<any | null> {
    const key = `${location.city}-${location.state}`;
    return this.get(this.locationCache, key);
  }

  setLocationDetails(location: Location, data: any, expiresIn: number = this.DEFAULT_CACHE_DURATION): void {
    const key = `${location.city}-${location.state}`;
    this.set(this.locationCache, key, data, expiresIn);
  }

  // Demographic cache methods
  async getDemographicPatterns(demographic: string): Promise<any | null> {
    return this.get(this.demographicCache, demographic);
  }

  setDemographicPatterns(demographic: string, data: any, expiresIn: number = this.DEFAULT_CACHE_DURATION): void {
    this.set(this.demographicCache, demographic, data, expiresIn);
  }

  // Generic cache methods
  private async get<T>(cache: Map<string, CacheItem<T>>, key: string): Promise<T | null> {
    const item = cache.get(key);
    
    if (!item) {
      return null;
    }

    // Check if cached item has expired
    if (Date.now() - item.timestamp > item.expiresIn) {
      cache.delete(key);
      return null;
    }

    return item.data;
  }

  private set<T>(cache: Map<string, CacheItem<T>>, key: string, data: T, expiresIn: number): void {
    cache.set(key, {
      data,
      timestamp: Date.now(),
      expiresIn
    });
  }

  // Cache maintenance
  clearExpiredItems(): void {
    const now = Date.now();
    
    [this.templateCache, this.locationCache, this.demographicCache].forEach(cache => {
      for (const [key, item] of cache.entries()) {
        if (now - item.timestamp > item.expiresIn) {
          cache.delete(key);
        }
      }
    });
  }

  // Clear all caches
  clearAll(): void {
    this.templateCache.clear();
    this.locationCache.clear();
    this.demographicCache.clear();
  }
}

// Export singleton instance
export const contentCache = new ContentCache();
