import { addToHistory } from "./history.js";
import { addToPokedex } from "./pokedex.js";
import { getWildList } from "./pokemon.js";
import { getActiveUser, getUserById, patchUser } from "./user.js";
import { actualiseFooter, dateFormat, randomNumber, updateCatchCount, updateEscapeCount } from "./utils.js";

export async function displayCaptureModal(event){
    const pkmIndex = Number(event.target.closest('.wildPkmRow').getAttribute('index'));
    const wildList = await getWildList('wildList');
    const pkmData = wildList[pkmIndex];
    
    const body = document.querySelector('body');
    const modalContainer = document.createElement('div');

    const captureMarkUp = `
        <p>Un ${pkmData.name} sauvage apparait !</p>
        <div><img src="${pkmData.image}"</div>
        <p id="modal-msg">Voulez-vous tenter de le capturer ?</p>
        <div>
            <img src="./public/img/back-arrow.svg" alt="Capturer Pokemon" id="btn-back">
            <button id="btn-capture"><img src="./public/img/pokeball.png" alt="Capturer Pokemon"></button>
        </div>
    `;

    modalContainer.classList.add('captureModal');
    modalContainer.innerHTML = captureMarkUp;
    body.appendChild(modalContainer);

    document.getElementById('btn-back').addEventListener('click', () => {
      modalContainer.remove();
    });
    document.getElementById('btn-capture').addEventListener('click', () => {
      capturePokemon(pkmData,pkmIndex);
    });
}

function capturePokemon(pkmData,pkmIndex){
    const row = document.querySelector(`[index="${pkmIndex}"]`);
    const modalMsg = document.getElementById('modal-msg');
    const userId = getActiveUser();
    const userData = getUserById(userId);
    const isCaptured = calculateCaptureChance(pkmData,userData);

    if(userData.total === 30) return alert('Ton pokedex est plein ! Relâche un pokemon si tu veux en capturer d\'autres');

    if(isCaptured === false){
        captureFail({row, modalMsg, userData, pkmData})
    }else{
        captureSucces({row, modalMsg, userData, pkmData})
    }
}

function captureFail({row, modalMsg, userData, pkmData}){
    row.remove();
    modalMsg.innerText = `${pkmData.name} prend la fuite`;
    modalMsg.style.backgroundColor = "red";
    userData.escape +=1;
    patchUser(userData.id, userData);
    addToHistory({userData,pkmData,"msg":"fail"});
    updateEscapeCount();
}

function captureSucces({row, modalMsg, userData, pkmData}){
    row.remove()
    modalMsg.innerText = `Vous avez capturé ${pkmData.name}`;
    modalMsg.style.backgroundColor = "green";
    pkmData.ownerId = userData.id;
    pkmData.fav = false;
    pkmData.comment = '';
    pkmData.uniqueId = Date.now();
    pkmData.catchDate = dateFormat();
    userData.total +=1;
    userData.catch +=1;
    addToPokedex(pkmData);
    patchUser(userData.id, userData);
    addToHistory({userData,pkmData,"msg":"success"});
    actualiseFooter();
    updateCatchCount();
}

function calculateCaptureChance(pokemon,userData){
    const dice = randomNumber(20)+1;
    const speed = pokemon.stats.speed
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