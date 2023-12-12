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

//putain merci chatGPT car là c'était tendu pour mon petit cerveau
function makeEvoLine(pokedexId, rawList) {
    const pokemonData = rawList.find(pokemon => pokemon.pokedexId === pokedexId);

    if (!pokemonData) {
        return [];
    }

    const visitedPokemon = new Set();

    function findEvolutionChain(pokemon, chain = []) {
        if (visitedPokemon.has(pokemon.pokedexId)) {
            return chain;
        }

        visitedPokemon.add(pokemon.pokedexId);

        chain.push({
            "pokedexId": pokemon.pokedexId,
            "name": pokemon.name,
            "sprite": pokemon.sprite,
        });

        if (pokemon.apiPreEvolution) {
            const preEvolution = rawList.find(p => p.name === pokemon.apiPreEvolution.name);
            if (preEvolution) {
                findEvolutionChain(preEvolution, chain);
            }
        }

        if (pokemon.apiEvolutions && pokemon.apiEvolutions.length > 0) {
            for (const evolution of pokemon.apiEvolutions) {
                const evolvedPokemon = rawList.find(p => p.name === evolution.name);
                if (evolvedPokemon) {
                    findEvolutionChain(evolvedPokemon, chain);
                }
            }
        }

        return chain;
    }

    return findEvolutionChain(pokemonData);
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

