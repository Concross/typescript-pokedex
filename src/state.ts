import { createInterface, type Interface } from 'readline';
import { getCommands } from './commands/registry.js';
import { PokeAPI, type Pokemon } from './api/pokeapi.js';

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    commands: Record<string, CLICommand>;
    readline: Interface;
    PokeAPI: PokeAPI;
    nextLocationAreasURL: string;
    prevLocationAreasURL: string;
    pokedex: Record<string, Pokemon>;
};

export function initState(): State {
    const state: State = {
        commands: getCommands(),
        readline: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: 'Pokedex > '
        }),
        PokeAPI: new PokeAPI(),
        nextLocationAreasURL: '',
        prevLocationAreasURL: '',
        pokedex: {}
    };

    return state;
}
