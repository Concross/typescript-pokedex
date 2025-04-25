import { type State } from '../state.js';

export async function commandExplore(state: State, ...args: string[]) {
    if (args.length === 0) {
        console.log('Please provide a location name to explore.');
        return;
    }
    const locationName = args[0];
    console.log(`Exploring ${locationName}...`);
    try {
        const response = await state.PokeAPI.fetchLocationArea(locationName);
        if (!response) {
            console.log(`Location ${locationName} not found.`);
            return;
        }

        console.log('Found pokemon:');
        const pokemonList = response.pokemon_encounters.map((encounter) => `- ${encounter.pokemon.name}`);
        pokemonList.forEach((pokemon) => {
            console.log(pokemon);
        });
    } catch (error) {
        console.error('Error fetching map data:', error);
    }
}
