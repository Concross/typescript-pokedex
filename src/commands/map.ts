import { type State } from "../state.js";

export async function commandMap(state: State) {
	const baseUrl = "https://pokeapi.co/api/v2/location-area/";
	try {
		const response = await fetch(baseUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error("Error fetching map data:", error);
	}
}