import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandInspect } from "./command_inspect.js";
import { commandMapForward, commandMapBackward } from "./command_map.js";
import { commandPokedex } from "./command_pokedex.js";


import { CLICommand } from "./state.js"


export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Log help message for the pokedex usage",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Get the next page of loactions",
            callback: commandMapForward,
        },
        mapb: {
            name: "mapb",
            description: "Get previous page of locations",
            callback: commandMapBackward,
        },
        explore: {
            name: "explore <location name>",
            description: "Explore location area",
            callback: commandExplore,
        },
        catch: {
            name: "catch <pokemon name>",
            description: "Attempt to catch a pokemon",
            callback: commandCatch,
        },
        inspect: {
            name: "inspect <pokemon name>",
            description: "View caught pokemon details",
            callback: commandInspect,
        },
        pokedex: {
            name: "pokedex",
            description: "View caught pokemons in your own pokedex",
            callback: commandPokedex,
        },
    }
}  