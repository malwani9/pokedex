import { State } from "./state.js";

export async function commandPokedex(state: State){
    console.log("Your Pokedex:");

    for (let pokemon of Object.values(state.caughtPokemon)) {
        console.log(` - ${pokemon.name}`);
    }
};