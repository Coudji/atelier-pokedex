import { actualiseHistory, actualisePokedex, actualisePokemonList, updateCatchCount, updateEscapeCount, updateTotalCount } from "./util.js";

export function createUsers(){
    const mockUsers = [
        {
          "name": "Amaury",
          "catch": 0,
          "escape": 0,
          "total": 0,
          "id": 1,
          "img": "./public/img/bulbizarre.png"
        },
        {
          "name": "Steve",
          "catch": 0,
          "escape": 0,
          "total": 0,
          "id": 2,
          "img": "./public/img/salameche.png"
        },
        {
          "name": "Amand",
          "catch": 0,
          "escape": 0,
          "total": 0,
          "id": 3,
          "img": "./public/img/carapuce.png"
        }
    ]
    localStorage.setItem('users', JSON.stringify(mockUsers));
}

export function getUsers(){
    const users = JSON.parse(localStorage.getItem('users'));
    return users;
}

export function getUserById(id){
    const users = getUsers();
    const user = users.find(user => user.id === id);
    return user;
}

export function patchUser(id, updatedData) {
    const usersData = getUsers();
    const updatedUsers = usersData.map(user => (user.id === id ? { ...user, ...updatedData } : user));
    localStorage.setItem('users', JSON.stringify(updatedUsers));
}

export function getActiveUser(){
    const activeUser = Number(JSON.parse(localStorage.getItem('activeUser')));
    return activeUser;
}

export function setActiveUser(id){
    JSON.stringify(localStorage.setItem('activeUser', id));
}

export function switchActiveUser(event){
    const card = event.target.closest('usercard-comp');
    const userId = card.getAttribute('userid');
    document.querySelector('.currentUser').classList.remove('currentUser');
    card.classList.add('currentUser');
    setActiveUser(Number(userId));
    updateCatchCount();
    updateEscapeCount();
    actualisePokedex();
    actualisePokemonList();
    actualiseHistory();
}