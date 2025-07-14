import { State } from "./state.js";

export function cleanInput(input: string): string[] {
    let inputArray = input.toLocaleLowerCase().trim().split(" ").filter((input) => input !== "");
    return inputArray;
}



export async function startREPL(state: State){

    state.readline.prompt();

    state.readline.on("line", async (input) => {
        const words = cleanInput(input);
        if (words.length === 0) {
            state.readline.prompt();
            return;
        }
        const command = words[0].toLowerCase();
        const cdm = state.commands[command]
        if (!cdm) {
            console.log(`Unknown command: '${command}'. Type 'help' for list of commands.`);
            state.readline.prompt();
            return;
        }
        
        try{
            await cdm.callback(state);
        }catch (error) {
            console.log((error as Error).message);
        }

        state.readline.prompt();
    });

}