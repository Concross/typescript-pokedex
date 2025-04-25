export type CacheEntry<T> = {
    created_at: number;
    val: T;
};

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    #reap() {
        const now = Date.now();
        for (const [key, entry] of this.#cache.entries()) {
            if (now - this.#interval > entry.created_at) {
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop() {
        if (this.#reapIntervalId) return;
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }

    stopReapLoop() {
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }

    add<T>(key: string, val: T): void {
        const now = Date.now();
        this.#cache.set(key, { created_at: now, val });
    }

    get<T>(key: string): T | undefined {
        const entry = this.#cache.get(key);
        if (!entry) return undefined;

        return entry.val;
    }
}
