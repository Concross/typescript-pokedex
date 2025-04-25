import { commandInspect } from './inspect.js';
import { type State } from '../state.js';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('commandInspect', () => {
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
                }
            },
            readline: {
                close: vi.fn()
            }
        } as unknown as State;

        vi.clearAllMocks();
    });

    it('should display pokemon information', async () => {
        const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        await commandInspect(state, 'pikachu');

        expect(consoleLogSpy).toHaveBeenCalledWith('Name: pikachu');
        expect(consoleLogSpy).toHaveBeenCalledWith('Height: 0.4');
        expect(consoleLogSpy).toHaveBeenCalledWith('Weight: 6');
        expect(consoleLogSpy).toHaveBeenCalledWith('Stats:');
        expect(consoleLogSpy).toHaveBeenCalledWith('  -speed: 90');
        expect(consoleLogSpy).toHaveBeenCalledWith('  -attack: 55');
        expect(consoleLogSpy).toHaveBeenCalledWith('Types:');
        expect(consoleLogSpy).toHaveBeenCalledWith('  -electric');

        consoleLogSpy.mockRestore();
    });

    it('should display error message for unknown pokemon', async () => {
        const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        await commandInspect(state, 'unknown');

        expect(consoleLogSpy).toHaveBeenCalledWith('you have not caught that pokemon');

        consoleLogSpy.mockRestore();
    });

    it('should display error message when no pokemon name is provided', async () => {
        const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        await commandInspect(state);

        expect(consoleLogSpy).toHaveBeenCalledWith('Please provide a pokemon name to inspect.');

        consoleLogSpy.mockRestore();
    });
});
