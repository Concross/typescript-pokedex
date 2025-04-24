import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
	return input
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, " ")
        .split(" ")
        .filter(Boolean) // Remove empty strings
		.map((word) => word.toLowerCase()); // Convert to lowercase
}

export function startCLI(state: State) {
	const rl = state.readline;
	const commands = state.commands;

	rl.prompt();

	rl.on("line", (line) => {
		const cleanedInput = cleanInput(line);
		if (cleanedInput.length === 0) {
			rl.prompt();
			return;
		}

		const command = cleanedInput[0];

		if (command) {
			const requestedCommand = commands[command];
			if (requestedCommand) {
				requestedCommand.callback(state);
			} else {
				console.log(`Unknown command: ${command}`);
			}
		}

		rl.prompt();
	});
}