import { commandExit } from "./command_exit.js"
import { commandHelp } from "./command_help.js"

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
        }
    }
}  