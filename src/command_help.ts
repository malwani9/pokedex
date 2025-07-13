import { State } from "./state.js";

export function commandHelp(state: State){
    console.log("Welcome to the Pokedex!");
    console.log("Usage:");
    console.log();

    for (let cdm in state.commands) {
        console.log(`${state.commands[cdm].name}: ${state.commands[cdm].description}`)
    }

    /*
        alternative looping using for in:

    for (const cmd of Object.values(state.commands)) {
        console.log(`${cmd.name}: ${cmd.description}`);
    }
    */
};