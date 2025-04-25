import { commandPokedex } from './pokedex.js';
import { type State } from '../state.js';
import { PokeAPI } from '../api/pokeapi.js';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('commandPokedex', () => {
    let state: State;

    beforeEach(() => {
        state = {
            pokedex: {
                pikachu: {
                    name: 'pikachu',
                    height: 0.4,
                    weight: 6,
                    stats: [
                        { stat: { name: 'speed' }, base_stat: 90 },
                        { stat: { name: 'attack' }, base_stat: 55 }
                    ],
                    types: [{ type: { name: 'electric' } }]
                },
                charizard: {
                    name: 'charizard',
                    height: 1.7,
                    weight: 90,
                    stats: [
                        { stat: { name: 'speed' }, base_stat: 100 },
                        { stat: { name: 'attack' }, base_stat: 84 }
                    ],
                    types: [{ type: { name: 'fire' } }, { type: { name: 'flying' } }]
                }
            },
            readline: {
                close: vi.fn()
            },
            PokeAPI: new PokeAPI()
        } as unknown as State;

        vi.clearAllMocks();
    });

    it('should list the caught pokement', async () => {
        const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        await commandPokedex(state);

        expect(consoleLogSpy).nthCalledWith(1, 'Your Pokedex:');
        expect(consoleLogSpy).nthCalledWith(2, '  - pikachu');
        expect(consoleLogSpy).nthCalledWith(3, '  - charizard');

        consoleLogSpy.mockRestore();
    });
});
