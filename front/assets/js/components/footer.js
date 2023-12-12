import { createUsers, getUsers, getActiveUser, switchActiveUser } from "../functions/user.js";
import { actualisePokedex , updateCatchCount, updateEscapeCount } from "../functions/utils.js";
export default class Footer extends HTMLElement {
    constructor(){
        super();

        const UsersExist = getUsers();
        if(!UsersExist) {
            createUsers();
            console.log('intialisation user')
        }
    }

    render(){
        const activeUser = getActiveUser();
        const usersData = getUsers();
        const users = usersData.map((user) => {
            return `
                <div class="userCard ${activeUser === user.id ? "currentUser" : ""}" userId="${user.id}">
                  <img src="${user.img}" alt="${user.name}"/>
                  <h4>${user.name}</h4>
                  <span class="nbrPkm">Pokemon possédés : ${user.total} / 30</span>
                </div>
            `;
        }).join('');
    
        this.innerHTML = `
            <footer>
                <div class="users">
                    ${users}   
                </div>
            </footer>
        `;

        document.querySelectorAll('.userCard').forEach((card) =>{
            card.addEventListener('click',(event)=>{
                switchActiveUser(event);
                actualisePokedex();
                updateCatchCount();
                updateEscapeCount();
            });
        });
    }
    connectedCallback(){
        this.render();
    }
}