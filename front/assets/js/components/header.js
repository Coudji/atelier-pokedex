import { getActiveUser, getUserById, setActiveUser } from "../functions/user.js";

export default class Header extends HTMLElement{
    constructor(){
        super();
        const activeUserExist = getActiveUser();
        if(!activeUserExist){
            setActiveUser(1)
            console.log('initialisation active user from header')
        }
    }

    render(){
        const current = this.getAttribute('current');
        const userId = getActiveUser();
        const userData = getUserById(userId);
        this.innerHTML =`<header>
            <a href="./" class="logo"><img src="public/img/logo-banner.png" alt="logo pokemon"></a>
            <nav>
                <ul>
                    <li><a href="./" class="${current === 'world' ? 'activeLink' : ''}">Monde</a></li>
                    <li><a href="./pokedex.html" class="${current === 'pokedex' ? 'activeLink' : ''}">Pokedex</a></li>
                    <li><a href="./history.html" class="${current === 'history' ? 'activeLink' : ''}">Historique</a></li>
                </ul>
            </nav>
            <div class="counter">
                <div id="activeUserDisplay"></div>
                <stats-counter class="catch" val="${userData.catch}"></stats-counter>
                <stats-counter class="escape" val="${userData.escape}"></stats-counter>
            </div>     
        </header>`;
    }

    connectedCallback(){
        this.render();
    }
}