import { favToggle } from "../utils/favoris.js";
import { deleteOnePokedexEntry } from "../utils/pokedex.js";

export default class Title extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.render();
        this.setupListenners();
    }

    render(){
        const pokemonData = JSON.parse(this.getAttribute('pkm-data'));
        this.innerHTML = `
            <div class="pokemonId">N° ${pokemonData.pokedexId}</div>
            <div class="pokemonName">${pokemonData.name}</div>
            <div class="pokedexBtn">
                ${pokemonData.fav === true ? 
                `<img class="favoris active" alt="Bouton favoris" src="./public/img/favoris.png">` :
                `<img class="favoris" alt="Bouton favoris" src="./public/img/favoris-modified-gray.png">`
                }
                <img class="delete ${pokemonData.fav === true ? "hidden" : ""}" alt="Bouton delete" src="./public/img/delete.png">
            </div>
        `;
    }

    setupListenners(){
        const card = this.closest('pokedexcard-comp');
        const detail = this.closest('pokedexdetail-comp');
        const uid = `${card ? card.getAttribute('uniqueid') : detail.getAttribute('uniqueid')}`
        this.querySelector('.favoris').addEventListener('click',()=>{
            favToggle(uid);
        });

        this.querySelector('.delete').addEventListener('click',()=>{
            deleteOnePokedexEntry(uid);
        });
    }
}