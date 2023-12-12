import { getUserSortedPokedex } from "../utils/pokedex.js";
import { getActiveUser } from "../utils/user.js";

export default class Pokedex extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.render();
    }

    render(){
        const activeUserId = getActiveUser();
        const pokedexData = getUserSortedPokedex(activeUserId);
        const cardList = pokedexData.map((pokemon) => {
            return `
                <pokedexcard-comp uniqueId="${pokemon.uniqueId}"></pokedexcard-comp>
            `
        }).join("");

        this.innerHTML = `
            ${cardList}
        `;
    }
}