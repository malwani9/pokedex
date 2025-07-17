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

            if (!response.ok) {
              throw new Error(`${response.status}: ${response.statusText}`);
            }

            const location: Location = await response.json();
            this.cache.add(url, location);
            return location;
        }catch (e) {
            throw new Error(`Error in location fetching...: ${(e as Error).message}`);
        }

    }
  
    async fetchPokemon(pokemonName: string): Promise<Pokemon>{
         const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

         const cached = this.cache.get<Pokemon>(url);
         if (cached) {
            console.log("!!Cached!!");
            return cached;
         }

         try {
            const response = await fetch(url);

            if (!response.ok) {
              throw new Error(`${response.status}: ${response.statusText}`);
            }

            const pokemon: Pokemon = await response.json();
            this.cache.add(url, pokemon);
            return pokemon;
          }catch (e) {
              throw new Error(`Error in location fetching...: ${(e as Error).message}`);
          }

    } 
}

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: {
    is_hidden: boolean;
    slot: number;
    ability: {
      name: string;
      url: string;
    };
  }[];
  forms: {
    name: string;
    url: string;
  }[];
  game_indices: {
    game_index: number;
    versions: {
      name: string;
      url: string;
    };
  }[];
  held_items: {
    item: {
      name: string;
      url: string;
    };
    version_details: {
      rarity: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  location_area_encounters: string;
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      version_group: {
        name: string;
        url: string;
      };
      move_learn_method: {
        name: string;
        url: string;
      }
      order: number;
    }[];
  }[];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: null;
    back_shiny: string;
    back_shiny_female: null;
    front_default: string;
    front_female: null;
    front_shiny: string;
    front_shinay_female: null;
    other: {
      dream_world: {
        front_default: string;
        front_female: null;
      };
      home: {
        front_default: string;
        front_female: null;
        front_shiny: string;
        front_shinay_female: null;
      };
      'official-artwork': {
        front_default: string;
        front_shiny: string;
      };
      showdown: {
        back_default: string;
        back_female: null;
        back_shiny: string;
        back_shiny_female: null;
        front_default: string;
        front_female: null;
        front_shiny: string;
        front_shinay_female: null;
      };
    };
    versions: {};
  };
  cries: {
    latest: string;
    legacy: string;
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  past_types: {
    generation: {
      name: string;
      url: string;
    };
    types: {
      slot: number;
      type: {
        name: string;
        url: string;
      };
    }[];
  }[];
  past_abilities: {
    generation: {
      name: string;
      url: string;
    };
    abilities: {
      ability: null;
      is_hidden: true;
      slot: number;
    }[];
  }[];

};

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