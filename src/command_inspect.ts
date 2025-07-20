import { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]){
    if (args.length !== 1) {
        throw new Error("Error: Provide valid poemon name to inspect, hint: inspect <pokemon name>");
    }
    const pokemonName = args[0];
    const pokemon = state.caughtPokemon[pokemonName];
    if (!pokemon) {
        throw new Error("you have not caught that pokemon");     
    }

    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log(`Stats:`);
    for (let stat of pokemon.stats) {
        console.log(`  -${stat.stat.name}: ${stat.base_stat}`)
    }
    console.log("Types:")
    for (let type of pokemon.types) {
        console.log(`  - ${type.type.name}`);
    }
};