import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]){
    if (args.length !== 1) {
        throw new Error("Error: Provide valid location name to explore, hint: explore <location name>");
    }
    const locationName = args[0];
    const location = await state.pokeapi.fetchLocation(locationName); 
    console.log(`Exploring ${locationName}...`);
    console.log("Found Pokemon:");
    for (const pokemon_encounter of location.pokemon_encounters) {
       console.log(` - ${pokemon_encounter.pokemon.name}`);
    }
};