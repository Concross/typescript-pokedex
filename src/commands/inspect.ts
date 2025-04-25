import { type State } from '../state.js';

export async function commandInspect(state: State, ...args: string[]) {
    if (args.length === 0) {
        console.log('Please provide a pokemon name to inspect.');
        return;
    }
    const pokemonName = args[0];
    if (!state.pokedex[pokemonName]) {
        console.log(`you have not caught that pokemon`);
        return;
    }

    const pokemon = state.pokedex[pokemonName];
    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log(`Stats:`);
    pokemon.stats.forEach((stat) => {
        console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
    });
    console.log(`Types:`);
    pokemon.types.forEach((type) => {
        console.log(`  -${type.type.name}`);
    });
}
