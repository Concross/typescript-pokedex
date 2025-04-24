import { startCLI } from './cliUtils.js';
import { initState } from './state.js';

function main() {
	const state = initState();
	startCLI(state);
}

main();