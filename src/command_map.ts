import { State } from "./state.js";

export async function commandMapForward(state: State){
    
    const locations = await state.pokeapi.fetchLocations(state.nextLocaionsURL);

    state.nextLocaionsURL = locations.next;
    state.prevLocationsURL = locations.previous;

    for (let location of locations.results) {
        console.log(location.name);
    }
    
};

export async function commandMapBackward(state: State){
    if (!state.prevLocationsURL) {
        throw new Error("you're on the first page")
    }

    const locations = await state.pokeapi.fetchLocations(state.prevLocationsURL);

    state.nextLocaionsURL = locations.next;
    state.prevLocationsURL = locations.previous;

    for (let location of locations.results) {
        console.log(location.name);
    }
    
};