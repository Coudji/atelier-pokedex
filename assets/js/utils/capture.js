import { addToHistory } from "./history.js";
import { addToPokedex } from "./pokedex.js";
import { getActiveUser, getUserById, patchUser } from "./user.js";
import { dateFormat, getOnePokemonData, randomNumber, updateCatchCount, updateEscapeCount, updateTotalCount } from "./util.js";

export function insertCaptureModal(event){
    const row = event.target.closest('.wildPkmRow')
    const pkdId = row.getAttribute('pkdid');
    const rowIndex = row.getAttribute('rowindex');
    const body = document.querySelector('body');
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('captureModalContainer');
    modalContainer.innerHTML = `<capture-comp pkdid="${pkdId}" rowindex="${rowIndex}"></capture-comp>`;
    body.appendChild(modalContainer);
}

export function closeCaptureModal(){
    const modalContainer = document.querySelector('.captureModalContainer');
    modalContainer.remove();
}

export function tryToCaptureThisPokemon(event){
    const rowIndex= event.target.closest('#btn-capture').getAttribute('rowindex');
    const row = document.querySelector(`[rowindex="${rowIndex}"]`);
    const modalMsg = document.getElementById('modal-msg');

    const userData = getUserById(getActiveUser());
    const pkdId= event.target.closest('#btn-capture').getAttribute('pkdid');
    const pokemonData= getOnePokemonData(pkdId);

    const isCaptured = calculateCaptureChance(pokemonData,userData);

    if(userData.total === 30) return alert('Ton pokedex est plein ! Relâche un pokemon si tu veux en capturer d\'autres');

    if(isCaptured === false){
        captureFail({row, modalMsg, userData, pokemonData})
    }else{
        captureSucces({row, modalMsg, userData, pokemonData})
    }
}

function captureFail({row, modalMsg, userData, pokemonData}){
    row.remove();
    modalMsg.innerText = `${pokemonData.name} prend la fuite`;
    modalMsg.style.backgroundColor = "red";
    userData.escape +=1;
    patchUser(userData.id, userData);
    addToHistory({userData,pokemonData,"msg":"fail"});
    updateEscapeCount();
}

function captureSucces({row, modalMsg, userData, pokemonData}){
    row.remove()
    modalMsg.innerText = `Vous avez capturé ${pokemonData.name}`;
    modalMsg.style.backgroundColor = "green";
    pokemonData.ownerId = userData.id;
    pokemonData.fav = false;
    pokemonData.comment = '';
    pokemonData.uniqueId = Date.now();
    pokemonData.catchDate = dateFormat();
    userData.total +=1;
    userData.catch +=1;
    addToPokedex(pokemonData);
    patchUser(userData.id, userData);
    addToHistory({userData,pokemonData,"msg":"success"});
    updateCatchCount();
    updateTotalCount();
}

function calculateCaptureChance(pokemonData,userData){
    const dice = randomNumber(20)+1;
    const speed = pokemonData.stats.speed
    const bonus = Math.floor(Math.log2(userData.catch / 10));
    let result = ''
    let capture =''

    if(userData.catch >= 10){
        result = dice - (speed/10) + bonus
    }else{
        result = dice - (speed/10)
    }

    if(result > 0){
        capture = true
    }else{
        capture = false
    }

    return capture
}