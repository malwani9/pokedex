import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeapi: PokeAPI;
    nextLocaionsURL: string;
    prevLocationsURL: string;
};

export function initState(interval: number): State {
    
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "pokedex > ",
    });
    

    return {
        readline: rl,
        commands: getCommands(),
        pokeapi: new PokeAPI(interval),
        nextLocaionsURL: "",
        prevLocationsURL: "",
    }

}
