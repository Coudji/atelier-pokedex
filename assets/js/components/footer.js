import { getActiveUser, getUsers } from "../utils/user.js";

export default class Footer extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.render();
    }

    render(){
        const activeUser = getActiveUser();
        const usersData = getUsers();
        const userCards = usersData.map((user) => {
            return `
                <usercard-comp class="${activeUser === user.id ? "currentUser" : ""}" userid="${user.id}"></usercard-comp>
            `
        }).join('');

        this.innerHTML = userCards;
    }
}