import { getActiveUser, getUserById } from "./user.js";

export function randomNumber(max){
    return Math.floor(Math.random() * max);
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

export function actualiseFooter(){
    const footerComponent = document.querySelector('main-footer');
    footerComponent.render();
}

export function actualisePokedex(){
    const pokedexComponent = document.querySelector('show-pokedex');
    if(pokedexComponent){
        pokedexComponent.render();
    }
}

export function actualiseHeader(){
    const headerComponent = document.querySelector('main-header');
    headerComponent.render();
}

export function updateCatchCount(){
    const userId = getActiveUser();
    const userData = getUserById(userId)
    const counter = document.querySelector('stats-counter.catch');
    counter.setAttribute('val',userData.catch);
}

export function updateEscapeCount(){
    const userId = getActiveUser();
    const userData = getUserById(userId)
    const counter = document.querySelector('stats-counter.escape');
    counter.setAttribute('val',userData.escape);
}
