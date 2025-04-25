import type { CLICommand } from 'src/state.js';
import { commandExit } from './exit.js';
import { commandHelp } from './help.js';
import { commandMap } from './map.js';
import { commandMapb } from './mapb.js';
import { commandExplore } from './explore.js';
import { commandCatch } from './catch.js';

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: 'exit',
            description: 'Exit the Pokedex',
            callback: commandExit
        },
        help: {
            name: 'help',
            description: 'Displays a help message',
            callback: commandHelp
        },
        map: {
            name: 'map',
            description: 'Displays the location areas',
            callback: commandMap
        },
        mapb: {
            name: 'mapb',
            description: 'Displays the previous list of location areas',
            callback: commandMapb
        },
        explore: {
            name: 'explore',
            description: 'Explore a given location',
            callback: commandExplore
        },
        catch: {
            name: 'catch',
            description: 'Catch a Pokemon',
            callback: commandCatch
        }
    };
}
