import { commandCatch } from './catch';
import { State } from '../state';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { Pokemon } from 'src/api/pokeapi';

describe('commandCatch', () => {
    let state: State;

    beforeEach(() => {
        state = {
            PokeAPI: {
                fetchPokemon: async (name: string) => ({
                    name,
                    base_experience: 50
                })
            },
            pokedex: {},
            readline: {
                close: () => {}
            }
        } as unknown as State;
    });

    test('should catch a pokemon', async () => {
        await commandCatch(state, 'pikachu');
        expect(state.pokedex['pikachu']).toBeDefined();
    });

    test('should not catch a pokemon if it escapes', async () => {
        state.PokeAPI.fetchPokemon = async (name: string) =>
            ({
                name,
                base_experience: 100
            } as Pokemon);
        await commandCatch(state, 'charizard');
        expect(state.pokedex['charizard']).toBeUndefined();
    });

    test('should handle errors when catching pokemon', async () => {
        state.PokeAPI.fetchPokemon = async () => {
            throw new Error('Network error');
        };
        console.error = vi.fn();
        await commandCatch(state, 'mewtwo');
        expect(console.error).toHaveBeenCalledWith('Error catching pokemon:', expect.any(Error));
        expect(state.pokedex['mewtwo']).toBeUndefined();
    });
});
