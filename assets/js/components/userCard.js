import { getUserById, switchActiveUser } from "../utils/user.js";
import { updateCatchCount, updateEscapeCount } from "../utils/util.js";

export default class UserCard extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.render();
        this.setupListenners();
    }

    render(){
        const userId = this.getAttribute('userid');
        const userData = getUserById(Number(userId));

        const cardMarkup = `
            <img src="${userData.img}" alt="${userData.name}"/>
            <h4>${userData.name}</h4>
            <span class="nbrPkm">Pokemon possédés : <counter-comp class="total" val="${userData.total}"></counter-comp> / 30</span>
        `;

        this.innerHTML = cardMarkup;
    }

    setupListenners(){
        this.addEventListener('click',(event)=>{
            switchActiveUser(event);
        });
    }
}