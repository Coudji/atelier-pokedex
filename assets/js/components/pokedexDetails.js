import { getPokedexEntryById, patchPokedexEntry } from "../utils/pokedex.js";

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

        const evolutionLevels = pokemonData.evoLine.reduce((levels, pokemon) => {
            const level = pokemon.evolutionLevel || 0; 
            if (!levels[level]) {
                levels[level] = [];
            }
            levels[level].push(pokemon);
            return levels;
        }, {});
        
        const evolutionMarkup = Object.keys(evolutionLevels).map((level) => {
            return `
                <div>
                    <h3>Level ${level}</h3>
                    <div>
                    ${evolutionLevels[level].map((pokemon) => {
                        return `
                            <div>
                                <img src="${pokemon.sprite}">
                                <p>${pokemon.pokedexId} - ${pokemon.name}</p>
                            </div>
                        `;
                    }).join("")}
                    </div>
                </div>
            `;
        }).join("");

        const displayMarkup = `
            <title-comp pkm-data='${titleData}'></title-comp>
            <div class="detailModal">
                <img src=${pokemonData.image} alt="Image de ${pokemonData.name}" class="img-pokemon">
                <div class="infoBox">
                    <div class="stats">
                        ${statsMarkup}
                    </div>
                    <div class="types">
                        ${typesMarkup}
                    </div>
                    <div class="evoline">
                        ${evolutionMarkup}
                    </div>
                </div>
            </div>
            <div class="comment">
                    <p class="showComment">${pokemonData.comment ? pokemonData.comment : 'Espace commentaire'}</p>
                    <textarea class="commentField" maxlength="151" placeholder="Appuyez sur 'Enter' pour valider."></textarea>
                    <img src="./public/img/back-arrow.svg" alt="Capturer Pokemon" id="btn-back">
            </div>
        `;

        this.innerHTML = displayMarkup;
    }

    setupListenners(){
        this.querySelector('#btn-back').addEventListener('click',()=>{
            this.remove()
        });

        this.querySelector('.commentField').addEventListener("keypress",(event) => {
            if(event.key === 'Enter'){
                const uid = this.getAttribute('uniqueid');
                event.preventDefault();
                patchPokedexEntry(uid,{comment:`${event.target.value}`});
                this.render();
                this.setupListenners();
            }
        });
    }
}