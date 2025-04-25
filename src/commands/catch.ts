import { type State } from '../state.js';

export async function commandCatch(state: State, ...args: string[]) {
    if (args.length === 0) {
        console.log('Please provide a pokemon name to catch.');
        return;
    }
    const pokemonName = args[0];
    try {
        const pokemon = await state.PokeAPI.fetchPokemon(pokemonName);

        console.log(`Throwing a Pokeball at ${pokemonName}...`);
        const wasCaught = pokemon.base_experience * Math.random() < 50; // Simulate a catch chance based on base experience
        if (wasCaught) {
            state.pokedex[pokemonName] = pokemon;
            console.log(`${pokemonName} was caught!`);
        } else {
            console.log(`${pokemonName} escaped!`);
        }
    } catch (error) {
        console.error('Error catching pokemon:', error);
    }
}
