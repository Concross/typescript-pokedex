import { commandExplore } from './explore.js';
import { State } from '../state.js';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { PokeAPI } from 'src/api/pokeapi.js';

describe('commandExplore', () => {
    let state: State;

    beforeEach(() => {
        state = {
            PokeAPI: {
                fetchLocationAreas: async (url: string) => ({
                    pokemon_encounters: [{ pokemon: { name: 'pikachu' } }, { pokemon: { name: 'charizard' } }]
                }),
                fetchLocationArea: async (name: string) => ({
                    pokemon_encounters: [{ pokemon: { name: 'bulbasaur' } }, { pokemon: { name: 'squirtle' } }]
                })
            } as unknown as PokeAPI,
            pokedex: {},
            readline: {
                close: vi.fn()
            }
        } as unknown as State;

        vi.clearAllMocks();
    });

    test('should explore a given location', async () => {
        const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        await commandExplore(state, 'forest');

        expect(consoleLogSpy).nthCalledWith(1, 'Exploring forest...');
        expect(consoleLogSpy).nthCalledWith(2, 'Found pokemon:');
        expect(consoleLogSpy).nthCalledWith(3, '- bulbasaur');
        expect(consoleLogSpy).nthCalledWith(4, '- squirtle');

        consoleLogSpy.mockRestore();
    });

    test('should handle errors when exploring a location', async () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        state.PokeAPI.fetchLocationArea = async () => {
            throw new Error('Network error');
        };

        await commandExplore(state, 'mountain');

        expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching map data:', expect.any(Error));

        consoleErrorSpy.mockRestore();
    });

    test('should display error message when no location name is provided', async () => {
        const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        await commandExplore(state);

        expect(consoleLogSpy).toHaveBeenCalledWith('Please provide a location name to explore.');

        consoleLogSpy.mockRestore();
    });
});
