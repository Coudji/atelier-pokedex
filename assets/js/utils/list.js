export function pokemonListInit(){

    fetch('https://pokebuildapi.fr/api/v1/pokemon')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      localStorage.setItem('pokemonList',JSON.stringify(makeCleanList(data)));
      checkRemaningSpace();
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

function makeCleanList(rawList){
    let cleanList = [];
    for (const item of rawList) {
        const pokemon = {
            "pokedexId":item.pokedexId,
            "name":item.name,
            "type":item.apiTypes,
            "stats":item.stats,
            "image":item.image,
            "sprite":item.sprite,
            "evoLine": makeEvoLine(item.pokedexId,rawList),
        }
        cleanList.push(pokemon);
    }
    return cleanList;
}

function makeEvoLine(pokedexId, rawList) {
    const pokemonData = rawList.find(pokemon => pokemon.pokedexId === pokedexId);
    const evolineTab = findBasePokemon(pokemonData, rawList);
    
    return evolineTab;
}

function findBasePokemon(pokemonData, rawList) {
    const evolineTab = [];
    const preEvolution = rawList.find(p => p.pokedexId === pokemonData.apiPreEvolution.pokedexIdd);
    
    if (preEvolution) {
        return findBasePokemon(preEvolution, rawList, evolineTab);
    } else {
        const isAlreadyAdded = evolineTab.some(pokemon => pokemon.pokedexId === pokemonData.pokedexId);
        if (!isAlreadyAdded) {
            evolineTab.push({
                "pokedexId": pokemonData.pokedexId,
                "name": pokemonData.name,
                "sprite": pokemonData.sprite,
                "evolutionLevel": 0,
            });
            evolineTab.push(...findLevelOneEvolution(pokemonData, rawList, evolineTab));
        }
        return evolineTab;
    }
}

function findLevelOneEvolution(pokemonData, rawList, evolineTab) {
    const levelOneTab = [];
    if (pokemonData.apiEvolutions && Array.isArray(pokemonData.apiEvolutions)) {
        pokemonData.apiEvolutions.forEach(evolution => {
            const evolutionData = rawList.find(p => p.pokedexId === evolution.pokedexId);
            const isAlreadyAdded = evolineTab.some(pokemon => pokemon.pokedexId === evolutionData.pokedexId);
            if (!isAlreadyAdded) {
                levelOneTab.push({
                    "pokedexId": evolutionData.pokedexId,
                    "name": evolutionData.name,
                    "sprite": evolutionData.sprite,
                    "evolutionLevel": 1,
                });
                levelOneTab.push(...findLevelTwoEvolution(evolutionData, rawList, evolineTab));
            }
        });
    }
    return levelOneTab;
}

function findLevelTwoEvolution(evolutionData, rawList, evolineTab) {
    const levelTwoTab = [];
    if (evolutionData.apiEvolutions && Array.isArray(evolutionData.apiEvolutions)) {
        evolutionData.apiEvolutions.forEach(secondEvolution => {
            const secondEvolutionData = rawList.find(p => p.pokedexId === secondEvolution.pokedexId);
            const isAlreadyAdded = evolineTab.some(pokemon => pokemon.pokedexId === secondEvolutionData.pokedexId);

            if (!isAlreadyAdded) {
                levelTwoTab.push({
                    "pokedexId": secondEvolutionData.pokedexId,
                    "name": secondEvolutionData.name,
                    "sprite": secondEvolutionData.sprite,
                    "evolutionLevel": 2,
                });
            }
        });
    }
    return levelTwoTab;
}



function checkRemaningSpace(){
    if ('localStorage' in window && window['localStorage'] !== null) {
        const totalSpace = 1024 * 1024 * 10; // 10 Mo
        const usedSpace = encodeURIComponent(JSON.stringify(localStorage)).replace(/%[0-9A-F]{2}/g, 'U').length;
    
        const remainingSpace = totalSpace - usedSpace;
        const percentageRemaining = (remainingSpace / totalSpace) * 100;
    
        console.log(`Espace total: ${totalSpace} octets`);
        console.log(`Espace utilisé: ${usedSpace} octets`);
        console.log(`Espace restant: ${remainingSpace} octets`);
        console.log(`Pourcentage restant: ${percentageRemaining.toFixed(2)}%`);
    } else {
        console.log('Le Local Storage n\'est pas pris en charge dans ce navigateur.');
    }
}

