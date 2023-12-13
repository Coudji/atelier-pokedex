import { getUsers } from "../utils/user.js";

export default class Footer extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.render();
    }

    render(){
        const usersData = getUsers();
       
        const userCards = usersData.map((user)=>{
            return `
                <usercard-comp userid="${user.id}"></usercard-comp>
            `
        }).join("");

        this.innerHTML = userCards;
    }
}