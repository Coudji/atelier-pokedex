import { createUsers, getActiveUser, getUserById, getUsers, setActiveUser } from "../utils/user.js";

export default class Header extends HTMLElement{
    constructor(){
        super();
        const isUsersCreated = getUsers();
        const isActiveUserSet = getActiveUser();
        if( !isUsersCreated ) createUsers();
        if( !isActiveUserSet) setActiveUser(1);
    }

    connectedCallback(){
        this.render();
    }

    render(){
        const current = this.getAttribute('current');
        const activeUser = getActiveUser();
        const userData = getUserById(activeUser);
        this.innerHTML = `
            <a href="./" class="logo"><img src="public/img/logo-banner.png" alt="logo pokemon"></a>
            <nav>
                <ul>
                    <li><a href="./" class="${current === 'world' ? 'activeLink' : ''}">Monde</a></li>
                    <li><a href="./pokedex.html" class="${current === 'pokedex' ? 'activeLink' : ''}">Pokedex</a></li>
                    <li><a href="./history.html" class="${current === 'history' ? 'activeLink' : ''}">Historique</a></li>
                </ul>
            </nav>
            <div class="counters">
                <div>
                    <img src="public/img/catch.svg" alt="catch icon">
                    <counter-comp class="catch" val="${userData.catch}"></counter-comp>
                </div>
                <div>
                    <img src="public/img/escape.svg" alt="escape icon">
                    <counter-comp class="escape" val="${userData.escape}"></counter-comp>
                </div>
            </div>     
        `;
    }
}