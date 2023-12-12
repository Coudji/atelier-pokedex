import { favToggle } from "./favoris.js";
import { getActiveUser, getUserById, patchUser } from "./user.js";
import { actualiseFooter } from "./utils.js";

function getPokedex(){
    const pokedex = JSON.parse(localStorage.getItem('pokedex')) || [];
    return pokedex
}

export function getUserPokedex(userId){
    const pokedex = getPokedex();
    const filteredPokedex = pokedex.filter(pokemon => pokemon.ownerId === userId);
    return filteredPokedex;
}

export function getUserSortedPokedex(userId){
    const pokedex = getUserPokedex(userId);
    pokedex.sort((a,b) => {
        if (a.fav && !b.fav) {
            return -1;
        } else if (!a.fav && b.fav) {
            return 1;
        }
        return a.pokedexId - b.pokedexId;
    });
    return pokedex
}

export function getPokedexEntryById(uid){
    const pokedex = getPokedex();
    const filteredPokedex = pokedex.filter(pokemon => pokemon.uniqueId === uid);
    return filteredPokedex[0];
}

function savePokedex(pokedex){
    localStorage.setItem('pokedex', JSON.stringify(pokedex));
}

export function addToPokedex(pkmData){
    const pokedex = getPokedex();
    pokedex.push(pkmData);
    savePokedex(pokedex);
}

function getIndex(uid){
    const pokedex = getPokedex();
    const index = pokedex.findIndex(pokemon => pokemon.uniqueId === uid);
    return index
}

export function patchPokedexEntry(uid, updatedData){
    const pokedex = getPokedex();
    const indexToUpdate = getIndex(uid);
    pokedex[indexToUpdate] = { ...pokedex[indexToUpdate], ...updatedData };
    savePokedex(pokedex);
}

export function deleteOnePokedexEntry(uid){
    const pokedex = getPokedex();console.log('ee');
    const indexToDelete = getIndex(uid);
    pokedex.splice(indexToDelete, 1);
    savePokedex(pokedex);
}



export function displayPokemonDetails(event){
    const uid = Number(event.target.closest('.pokemonCard').getAttribute('uniqueId'));
    const pkmData = getPokedexEntryById(uid);

    const body = document.querySelector('body');
    const modalContainer = document.createElement('div');

    const typesMarkup = pkmData.type.map((type)=> {
        return `
            <div>
                <img src="${type.image}">
                <p>${type.name}</p>
            </div>
        `;
    }).join("");

    const displayMarkup = `
        <div class="title" uniqueId="${pkmData.uniqueId}">
            <div class="pokemonId">N° ${pkmData.pokedexId}</div>
            <div class="pokemonName">${pkmData.name}</div>
            <div class="pokedexBtn">
                ${pkmData.fav === true ? 
                `<img class="favoris active" alt="Bouton favoris" src="./public/img/favoris.png">` :
                `<img class="favoris" alt="Bouton favoris" src="./public/img/favoris-modified-gray.png">`
                }
                <img class="delete ${pkmData.fav === true ? "hidden" : ""}" alt="Bouton delete" src="./public/img/delete.png">
            </div>
        </div>
        <div class="test">
            <img src=${pkmData.image} alt="Image de ${pkmData.name}" class="img-pokemon">
            <div class="infoBox">
                <div class="stats">
                    <div>
                        <img src="./public/img/heart.svg" class="stats-img">
                        <p>${pkmData.stats.HP}</p>
                    </div>
                    <div>
                        <img src="./public/img/sword.svg" class="stats-img">
                        <p>${pkmData.stats.attack}</p>
                    </div>
                    <div>
                        <img src="./public/img/shield.svg" class="stats-img">
                        <p>${pkmData.stats.defense}</p>
                    </div>
                    <div>
                        <img src="./public/img/sword-power.svg" class="stats-img">
                        <p>${pkmData.stats.special_attack}</p>
                    </div>
                    <div>
                        <img src="./public/img/shield-power.svg" class="stats-img">
                        <p>${pkmData.stats.special_defense}</p>
                    </div>
                    <div>
                        <img src="./public/img/vitesse.png" class="stats-img">
                        <p>${pkmData.stats.speed}</p>
                    </div>
                </div>
                <div class="types">
                    ${typesMarkup}
                </div>
            </div>
        </div>
        <div class="comment">
                <p class="showComment">${pkmData.comment ? pkmData.comment : ''}</p>
                <textarea class="commentField"></textarea>
                <img src="./public/img/back-arrow.svg" alt="Capturer Pokemon" id="btn-back">
        </div>

    `
    modalContainer.classList.add('pokedexModal');
    modalContainer.innerHTML = displayMarkup;
    body.appendChild(modalContainer);
    
    document.getElementById('btn-back').addEventListener('click', () => {
        modalContainer.remove();
    });

    modalContainer.querySelector('.favoris').addEventListener('click',(event)=>{
        const uid = Number(event.target.closest('.title').getAttribute('uniqueId'));
        favToggle(uid);
    })
    
    modalContainer.querySelector('.delete').addEventListener('click',(event)=>{
        const isConfirmed = window.confirm("Voulez-vous vraiment relâcher ce pokemon ?");
        const userId = getActiveUser();
        const userData = getUserById(userId);

        if(isConfirmed){
            deleteOnePokedexEntry(uid);
            event.target.closest('.pokedexModal').remove();
            const card = document.querySelector(`[uniqueId="${uid}"]`);
            card.remove();
            userData.total -= 1;
            patchUser(userId, userData);
            actualiseFooter();
        }
    })
}


