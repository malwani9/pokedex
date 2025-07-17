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
        const args = words.slice(1);
        const cdm = state.commands[command]
        if (!cdm) {
            console.log(`Unknown command: '${command}'. Type 'help' for list of commands.`);
            state.readline.prompt();
            return;
        }
        
        try{
            await cdm.callback(state, ...args);
        }catch (error) {
            console.log((error as Error).message);
        }

        state.readline.prompt();
    });

}