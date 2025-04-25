import { type State } from '../state.js';

export async function commandMap(state: State) {
    try {
        const response = await state.PokeAPI.fetchLocationAreas(state.nextLocationAreasURL);
        state.nextLocationAreasURL = response.next ?? '';
        state.prevLocationAreasURL = response.previous ?? '';
        console.log(response.results?.map((area) => area.name).join('\n'));
    } catch (error) {
        console.error('Error fetching map data:', error);
    }
}
