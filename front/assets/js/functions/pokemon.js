import { randomNumber } from "./utils.js";

export async function fetchWildList(){
    const clearList = [];
    await fetch("https://pokebuildapi.fr/api/v1/pokemon")
    .then((response) => response.json())
    .then((data) => {
        for (let i = 0; i < 50; i++) {
            const rand = randomNumber(898);
            const pokemonData = data[rand];
            const pokemon = {
                "pokedexId": pokemonData.pokedexId,
                "name" : pokemonData.name,
                "type": pokemonData.apiTypes,
                "stats" : pokemonData.stats,
                "image" : pokemonData.image,
                "sprite" : pokemonData.sprite,
            }
            clearList.push(pokemon); 
        } 
    });
    return clearList;
}

export async function setWildList(key) {
    const wildList = await fetchWildList();
    localStorage.setItem(key, JSON.stringify(wildList));
}

export async function getWildList(key){
    const list = await JSON.parse(localStorage.getItem(key));
    return list
}

export async function swapList(){
    const tempList = await getWildList('tempWildList');
    localStorage.setItem('wildList',JSON.stringify(tempList));
    Promise.resolve(setWildList('tempWildList'));
}
