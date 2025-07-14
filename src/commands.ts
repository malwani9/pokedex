import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMapForward, commandMapBackward } from "./command_map.js";


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
    }
}  