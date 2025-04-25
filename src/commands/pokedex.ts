import { type State } from '../state.js';

export async function commandPokedex(state: State) {
    const pokemons = Object.keys(state.pokedex);
    if (pokemons.length === 0) {
        console.log('You have not caught any pokemon yet.');
        return;
    }
    console.log('Your Pokedex:');
    pokemons.forEach((pokemonName) => {
        const pokemon = state.pokedex[pokemonName];
        console.log(`  - ${pokemon.name}`);
    });
}
