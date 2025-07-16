import { Cache } from "./pokecache.js";
export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cache: Cache;

    constructor(interval: number) {
        this.cache = new Cache(interval);
    }

    closeCache() {
      this.cache.stopReapLoop();
    }
    
    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area/`;

        const cached = this.cache.get<ShallowLocations>(url);

        if (cached) {
          console.log("!!Cached!!");
          return cached;
        }

        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`${response.status}: ${response.statusText}`);
            }
            
            const locations: ShallowLocations = await response.json(); 
            this.cache.add(url, locations);
           return locations;

        }catch (e) {
            throw new Error(`Error in locations fetching...: ${(e as Error).message}`);
        }
        
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

        const cached = this.cache.get<Location>(url);
        if (cached) {
          console.log("!!Cached!!");
          return cached;
        }

        try {
            const response = await fetch(url);

            const location: Location = await response.json();
            return location;
        }catch (e) {
            throw new Error(`Error in location fetching...: ${(e as Error).message}`);
        }

    }

}

export type ShallowLocations = {
    count: number;
    next: string;
    previous: string;
    results: {
        name: string;
        url: string;
    }[];
};

export type Location = {
    encounter_method_rates: {
      encounter_method: {
        name: string;
        url: string;
      };
      version_details: {
        rate: number;
        version: {
          name: string;
          url: string;
        };
      }[];
    }[];
    game_index: number;
    id: number;
    location: {
      name: string;
      url: string;
    };
    name: string;
    names: {
      language: {
        name: string;
        url: string;
      };
      name: string;
    }[];
    pokemon_encounters: {
      pokemon: {
        name: string;
        url: string;
      };
      version_details: {
        encounter_details: {
          chance: number;
          condition_values: any[];
          max_level: number;
          method: {
            name: string;
            url: string;
          };
          min_level: number;
        }[];
        max_chance: number;
        version: {
          name: string;
          url: string;
        };
      }[];
    }[];
};