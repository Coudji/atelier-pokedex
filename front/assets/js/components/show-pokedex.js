import { favToggle } from "../functions/favoris.js";
import { displayPokemonDetails, getUserPokedex, patchPokedexEntry , deleteOnePokedexEntry, getUserSortedPokedex} from "../functions/pokedex.js";
import { getActiveUser, getUserById, patchUser } from "../functions/user.js";
import { actualiseFooter } from "../functions/utils.js";

export default class Pokedex extends HTMLElement {
    constructor(){
        super();

    }

    render(){
        const activeUserId = getActiveUser();
        const pokedexData = getUserSortedPokedex(activeUserId);

        const cardList = pokedexData.map((pokemon) => {
            return `
                <div class="pokemonCard" uniqueId="${pokemon.uniqueId}">
                    <div class="cardTitle">
                        <div class="pokemonId">N° ${pokemon.pokedexId}</div>
                        <div class="pokemonName">${pokemon.name}</div>
                        <div class="pokedexBtn">
                            ${pokemon.fav === true ? 
                            `<img class="favoris active" alt="Bouton favoris" src="./public/img/favoris.png">` :
                            `<img class="favoris" alt="Bouton favoris" src="./public/img/favoris-modified-gray.png">`
                            }
                            <img class="delete ${pokemon.fav === true ? "hidden" : ""}" alt="Bouton delete" src="./public/img/delete.png">
                        </div>
                    </div>
                    <img src=${pokemon.image} alt="Image de ${pokemon.name}" class="img-pokemon">
                    <div class="speed"><img class="speed-img" alt="Vitesse du pokemon" src="./public/img/vitesse.png"> ${pokemon.stats.speed}</div>
                </div>
            `
        }).join("");

        this.innerHTML = `
            <div class="pokedex">
                ${cardList}
            </div>
        `;

        document.querySelectorAll('.favoris').forEach((btn) => {
            btn.addEventListener('click',(event) => {
                const uid = Number(event.target.closest('.pokemonCard').getAttribute('uniqueId'));
                favToggle(uid);
            })
        });

        document.querySelectorAll('.img-pokemon').forEach((img) => {
            img.addEventListener('click',(event)=>{
                displayPokemonDetails(event);
            })
        });

        document.querySelectorAll('.delete').forEach((btn) => {
            btn.addEventListener('click',(event)=>{
                const card = event.target.closest('.pokemonCard');
                const uid = Number(card.getAttribute('uniqueId')); 
                const isConfirmed = window.confirm("Voulez-vous vraiment relâcher ce pokemon ?");
                const userData = getUserById(activeUserId);
                if(isConfirmed){
                    deleteOnePokedexEntry(uid);
                    card.remove();
                    userData.total -= 1;
                    patchUser(activeUserId,userData);
                    actualiseFooter();
                }
            })
        });
    }

    connectedCallback(){
        this.render();
    }
}