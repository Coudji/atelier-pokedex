import { getActiveUser, getUserById, switchActiveUser } from "../utils/user.js";

export default class UserCard extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.render();
    }

    render(){
        const userId = Number(this.getAttribute('userid'));
        const currentUser = getActiveUser();
        const userData = getUserById(userId);

        if(userId === currentUser){
            this.classList.add('currentUser')
        }

        const cardMarkup = `
            <img src="${userData.img}" alt="${userData.name}"/>
            <h4>${userData.name}</h4>
            <span class="nbrPkm">Pokemon possédés : <counter-comp class="total" val="${userData.total}"></counter-comp> / 30</span>
        `;

        this.innerHTML = cardMarkup;
        this.setupListenners();
    }

    setupListenners(){
        this.addEventListener('click',(event)=>{
            switchActiveUser(event);
        });
    }
}