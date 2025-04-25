import { describe, test, expect } from 'vitest';
import { Cache } from './pokecache.js';

describe('Pokecache', () => {
    test('should add and retrieve data from the cache', () => {
        const cache = new Cache(1000); // 1 second TTL
        const key = 'testKey';
        const value = { name: 'testValue' };

        cache.add(key, value);
        const cachedValue = cache.get(key);

        expect(cachedValue).toEqual(value);
    });

    test('should return undefined for expired cache entries', async () => {
        const cache = new Cache(1); // 1 millisecond TTL
        const key = 'testKey';
        const value = { name: 'testValue' };

        cache.add(key, value);
        await new Promise((resolve) => setTimeout(resolve, 4)); // wait for the cache to expire

        const cachedValue = cache.get(key);
        expect(cachedValue).toBeUndefined();
    });
});
