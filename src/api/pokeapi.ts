import { Cache } from '../cache/pokecache.js';
export class PokeAPI {
    private static readonly BASE_URL = 'https://pokeapi.co/api/v2';
    private cache: Cache;

    constructor() {
        this.cache = new Cache(1000 * 60 * 60); // 1 hour
    }

    async fetchLocationAreas(pageURL?: string): Promise<LocationAreasResponse> {
        const url = pageURL || `${PokeAPI.BASE_URL}/location-area/`;
        const cachedResponse = this.cache.get<LocationAreasResponse>(url);
        if (cachedResponse) {
            console.log(`Cache hit for ${url}`);
            return cachedResponse;
        }

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.cache.add(url, data);
            return data;
        } catch (error) {
            console.error('Error fetching location areas:', error);
            throw error;
        }
    }

    async fetchLocationArea(locationName: string): Promise<LocationAreaResponse> {
        const url = `${PokeAPI.BASE_URL}/location-area/${locationName}`;
        const cachedResponse = this.cache.get<LocationAreaResponse>(url);

        if (cachedResponse) {
            return cachedResponse;
        }

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.cache.add(url, data);
            return data;
        } catch (error) {
            console.error('Error fetching location area:', error);
            throw error;
        }
    }

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const url = `${PokeAPI.BASE_URL}/pokemon/${pokemonName}`;
        const cachedResponse = this.cache.get<Pokemon>(url);

        if (cachedResponse) {
            return cachedResponse;
        }

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.cache.add(url, data);
            return data;
        } catch (error) {
            console.error('Error fetching pokemon:', error);
            throw error;
        }
    }
}

export type ShallowLocationArea = {
    id: number;
    name: string;
    game_index: number;
};

export type LocationAreasResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: ShallowLocationArea[];
};

export type LocationArea = {
    id: number;
    name: string;
    game_index: number;
};

export type LocationAreaResponse = {
    id: number;
    name: string;
    game_index: number;
    encounter_method_rates: {
        encounter_method: {
            name: string;
            url: string;
        };
        version_details: {
            rate: number;
            version: {
                name: string;
                url: string;
            };
        }[];
    }[];
    location: {
        name: string;
        url: string;
    };
    names: {
        name: string;
        language: {
            name: string;
            url: string;
        };
    }[];
    pokemon_encounters: {
        pokemon: {
            name: string;
            url: string;
        };
        version_details: {
            version: {
                name: string;
                url: string;
            };
            max_chance: number;
            encounter_details: {
                min_level: number;
                max_level: number;
                condition_values: any[];
                chance: number;
                method: {
                    name: string;
                    url: string;
                };
            }[];
        }[];
    }[];
};

export type Pokemon = {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    abilities: {
        ability: {
            name: string;
            url: string;
        };
        is_hidden: boolean;
        slot: number;
    }[];
    forms: {
        name: string;
        url: string;
    }[];
    game_indices: {
        game_index: number;
        version: {
            name: string;
            url: string;
        };
    }[];
    held_items: {
        item: {
            name: string;
            url: string;
        };
        version_details: {
            rarity: number;
            version: {
                name: string;
                url: string;
            };
        }[];
    }[];
};
