import { type State } from '../state.js';

export async function commandHelp(state: State) {
    console.log('Welcome to the Pokedex!');
    console.log('Usage:');
    const commands = state.commands;
    for (const command in commands) {
        const cmd = commands[command];
        console.log(`  ${cmd.name}: ${cmd.description}`);
    }
}
