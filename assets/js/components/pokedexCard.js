import { displayPokemonDetails, getPokedexEntryById } from "../utils/pokedex.js";

export default class PokedexCards extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.render();
        this.setupListenners();
    }

    render(){
        const uid = this.getAttribute('uniqueid');
        const pokemon = getPokedexEntryById(uid);
        const titleData= JSON.stringify({
            pokedexId : pokemon.pokedexId,
            name : pokemon.name,
            fav: pokemon.fav
        });

        const cardMarkup = `
            <title-comp pkm-data='${titleData}'></title-comp>
            <img src=${pokemon.image} alt="Image de ${pokemon.name}" class="img-pokemon">
            <div class="speed"><img class="speed-img" alt="Vitesse du pokemon" src="./public/img/vitesse.png"> ${pokemon.stats.speed}</div>
        `;

        this.innerHTML = cardMarkup;
    }

    setupListenners(){
        this.querySelector('.img-pokemon').addEventListener('click',(event) => {
            displayPokemonDetails(event);
        });
    }
}