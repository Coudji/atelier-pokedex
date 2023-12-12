import { getPokedexEntryById } from "../utils/pokedex.js";

export default class PokedexDetail extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.render();
        this.setupListenners();
    }

    render(){
        const uid = this.getAttribute('uniqueid');
        const pokemonData = getPokedexEntryById(uid);
        const titleData= JSON.stringify({
            pokedexId : pokemonData.pokedexId,
            name : pokemonData.name,
            fav: pokemonData.fav
        });

        const typesMarkup = pokemonData.type.map((type)=> {
            return `
                <div>
                    <img src="${type.image}">
                    <p>${type.name}</p>
                </div>
            `;
        }).join("");

        const statsMarkup = `
            <div>
                <img src="./public/img/heart.svg" class="stats-img">
                <p>${pokemonData.stats.HP}</p>
            </div>
            <div>
                <img src="./public/img/sword.svg" class="stats-img">
                <p>${pokemonData.stats.attack}</p>
            </div>
            <div>
                <img src="./public/img/shield.svg" class="stats-img">
                <p>${pokemonData.stats.defense}</p>
            </div>
            <div>
                <img src="./public/img/sword-power.svg" class="stats-img">
                <p>${pokemonData.stats.special_attack}</p>
            </div>
            <div>
                <img src="./public/img/shield-power.svg" class="stats-img">
                <p>${pokemonData.stats.special_defense}</p>
            </div>
            <div>
                <img src="./public/img/vitesse.png" class="stats-img">
                <p>${pokemonData.stats.speed}</p>
            </div>
        `;

        const displayMarkup = `
            <title-comp pkm-data='${titleData}'></title-comp>
            <div class="test">
                <img src=${pokemonData.image} alt="Image de ${pokemonData.name}" class="img-pokemon">
                <div class="infoBox">
                    <div class="stats">
                        ${statsMarkup}
                    </div>
                    <div class="types">
                        ${typesMarkup}
                    </div>
                </div>
            </div>
            <div class="comment">
                    <p class="showComment">${pokemonData.comment ? pokemonData.comment : ''}</p>
                    <textarea class="commentField"></textarea>
                    <img src="./public/img/back-arrow.svg" alt="Capturer Pokemon" id="btn-back">
            </div>
        `;

        this.innerHTML = displayMarkup;
    }

    setupListenners(){
        this.querySelector('#btn-back').addEventListener('click',()=>{
            this.remove()
        })
    }
}