import { commandHelp } from './help.js';
import { type State } from '../state.js';
import { describe, expect, it, vi } from 'vitest';

describe('commandHelp', () => {
    it('should display the help message with available commands', async () => {
        const mockState: State = {
            commands: {
                pokedex: {
                    name: 'pokedex',
                    description: 'View your Pokedex.'
                },
                exit: {
                    name: 'exit',
                    description: 'Exit the game.'
                }
            },
            readline: {} as any
        } as unknown as State;

        const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        await commandHelp(mockState);

        expect(consoleLogSpy).nthCalledWith(1, 'Welcome to the Pokedex!');
        expect(consoleLogSpy).nthCalledWith(2, 'Usage:');
        expect(consoleLogSpy).nthCalledWith(3, '  pokedex: View your Pokedex.');
        expect(consoleLogSpy).nthCalledWith(4, '  exit: Exit the game.');

        consoleLogSpy.mockRestore();
    });
});
