export class PokeAPI {
	private static readonly BASE_URL = "https://pokeapi.co/api/v2";

	constructor() {}

	async fetchLocationAreas(pageURL?: string): Promise<ShallowLocationArea[]> {
		const url = pageURL || `${PokeAPI.BASE_URL}/location-area/`;
		try {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			return data.results;
		} catch (error) {
			console.error("Error fetching location areas:", error);
			throw error;
		}
	}

	async fetchLocationArea(locationName: string): Promise<LocationArea> {
		const url = `${PokeAPI.BASE_URL}/location-area/${locationName}`;
		try {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Error fetching location area:", error);
			throw error;
		}
	}
}

export type ShallowLocationArea = {
	id: number;
	name: string;
	game_index: number;
};

export type LocationArea = {
	id: number;
	name: string;
	game_index: number;
};
