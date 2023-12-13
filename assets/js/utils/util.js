import { getActiveUser, getUserById } from "./user.js";

export function randomNumber(max){
    return Math.floor(Math.random() * max);
}

export function getOnePokemonData(pkdId){
    const pokemonList= JSON.parse(localStorage.getItem('pokemonList'));
    const pokemonData = pokemonList.find(pkm => pkm.pokedexId === Number(pkdId));
    return pokemonData;
}

export function updateCatchCount(){
    const userId = getActiveUser();
    const userData = getUserById(userId)
    const counter = document.querySelector('counter-comp.catch');
    counter.setAttribute('val',userData.catch);
}

export function updateEscapeCount(){
    const userId = getActiveUser();
    const userData = getUserById(userId)
    const counter = document.querySelector('counter-comp.escape');
    counter.setAttribute('val',userData.escape);
}

export function updateTotalCount(){
    const userId = getActiveUser();
    const userData = getUserById(userId)
    const card = document.querySelector(`usercard-comp[userid="${userId}"]`);
    const counter = card.querySelector('counter-comp.total');
    counter.setAttribute('val',userData.total);
}

export function actualisePokedex(){
    const pokedexComponent = document.querySelector('pokedex-comp');
    if(pokedexComponent){
        pokedexComponent.render();
    }
}

export function actualisePokemonList(){
    const pokemonList = document.querySelector('pokemon-list-comp');
    if(pokemonList) pokemonList.render();
}

export function actualiseHistory(){
    const history = document.querySelector('history-comp');
    if(history) history.render();
}

export function dateFormat(){
    const date = new Date();

    const dateperso = date.toLocaleString('fr-FR',{
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });

    return dateperso
}