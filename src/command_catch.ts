import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]){
    if (args.length !== 1) {
        throw new Error("Error: Provide valid pokemon name to explore, hint: catch <pokemon name>");
    }
    const pokemonName = args[0];
    const pokemon = await state.pokeapi.fetchPokemon(pokemonName); 

    console.log(`Throwing a Pokeball at ${pokemon.name}...`);

    const roll = Math.floor(Math.random() * pokemon.base_experience);
    if (roll > 40) { 
        console.log(`${pokemon.name} escaped!`);
        return;
    }
    
    console.log(`${pokemon.name} was caught!`);
    console.log("You may now inspect it with the inspect command");
    state.pokedex[pokemon.name] = pokemon;
};