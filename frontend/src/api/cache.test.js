import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { cache } from './cache';

describe('cache', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useRealTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('stores and retrieves a value', () => {
    cache.set('k', { a: 1 });
    expect(cache.get('k')).toEqual({ a: 1 });
  });

  it('returns null for a missing key', () => {
    expect(cache.get('nope')).toBeNull();
  });

  it('expires entries after the TTL', () => {
    vi.useFakeTimers();
    cache.set('k', 'value', 1000);
    expect(cache.get('k')).toBe('value');

    vi.advanceTimersByTime(1001);
    expect(cache.get('k')).toBeNull();
  });
});
