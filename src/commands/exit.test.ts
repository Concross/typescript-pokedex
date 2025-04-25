import { commandExit } from './exit';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { type State } from '../state';

describe('commandExit', () => {
    let state: State;

    beforeEach(() => {
        state = {
            readline: {
                close: vi.fn()
            }
        } as unknown as State;

        vi.clearAllMocks();
    });

    test('should close the readline interface', async () => {
        vi.spyOn(process, 'exit').mockImplementation((code) => {
            expect(code).toBe(0);
            return undefined as never;
        });
        await commandExit(state);
        expect(state.readline.close).toHaveBeenCalled();
    });

    test('should exit the process', async () => {
        const exitSpy = vi.spyOn(process, 'exit').mockImplementation((code) => {
            expect(code).toBe(0);
            return undefined as never;
        });

        await commandExit(state);

        expect(exitSpy).toHaveBeenCalledWith(0);
        exitSpy.mockRestore();
    });
});
