import { getActiveUser, getUserById, patchUser } from "./user.js";
import { updateTotalCount } from "./util.js";


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
    const filteredPokedex = pokedex.filter(pokemon => pokemon.uniqueId === Number(uid));
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
    const pokedex = getPokedex();
    const indexToDelete = Number(getIndex(uid));
    pokedex.splice(indexToDelete, 1);
    savePokedex(pokedex);
}



export function displayPokemonDetails(event){
    const uid = Number(event.target.closest('pokedexcard-comp').getAttribute('uniqueid'));

    const body = document.querySelector('body');
    const modalContainer = document.createElement('pokedexdetail-comp');
    modalContainer.setAttribute('uniqueid',uid);
    body.appendChild(modalContainer);

    
    modalContainer.querySelector('.delete').addEventListener('click',(event)=>{
        const isConfirmed = window.confirm("Voulez-vous vraiment relâcher ce pokemon ?");
        const userId = getActiveUser();
        const userData = getUserById(userId);

        if(isConfirmed){
            deleteOnePokedexEntry(uid);
            modalContainer.remove();
            const card = document.querySelector(`[uniqueid="${uid}"]`);
            card.remove();
            userData.total -= 1;
            patchUser(userId, userData);
            updateTotalCount();
        }
    })
}


