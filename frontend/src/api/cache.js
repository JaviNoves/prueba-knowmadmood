import { CACHE_PREFIX, ONE_HOUR_MS } from '../constants';

/**
 * Permite obtener o settear un valor en el localStorage.
 */
export const cache = {
  get(key) {
    try {
      const itemLocalStorage = localStorage.getItem(CACHE_PREFIX + key);
      if (!itemLocalStorage) return null;
      const { value, expiresAt } = JSON.parse(itemLocalStorage);
      if (Date.now() > expiresAt) {
        localStorage.removeItem(CACHE_PREFIX + key);
        return null;
      }
      return value;
    } catch {
      return null;
    }
  },

  set(key, value, ttl = ONE_HOUR_MS) {
    try {
      const entry = { value, expiresAt: Date.now() + ttl };
      localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
    } catch {
      //
    }
  },
};
