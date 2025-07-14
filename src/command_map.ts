import { State } from "./state.js";

export async function commandMapForward(state: State){
    const locatios = await state.pokeapi.fetchLocations(state.nextLocaionsURL);

    state.nextLocaionsURL = locatios.next;
    state.prevLocationsURL = locatios.previous;

    for (let location of locatios.results) {
        console.log(location.name);
    }
};

export async function commandMapBackward(state: State){
    if (!state.prevLocationsURL) {
        throw new Error("you're on the first page")
    }
    const locatios = await state.pokeapi.fetchLocations(state.prevLocationsURL);

    state.nextLocaionsURL = locatios.next;
    state.prevLocationsURL = locatios.previous;

    for (let location of locatios.results) {
        console.log(location.name);
    }
};