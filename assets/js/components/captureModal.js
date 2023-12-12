import { closeCaptureModal, tryToCaptureThisPokemon } from "../utils/capture.js";
import { getOnePokemonData } from "../utils/util.js";

export default class Capture extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.render();
        this.setupListeners();
    }

    render(){
        const pkdId = this.getAttribute('pkdid');
        const rowIndex = this.getAttribute('rowindex');
        const pokemonData = getOnePokemonData(pkdId);

        const captureMarkUp = `
        <p>Un ${pokemonData.name} sauvage apparait !</p>
        <div><img src="${pokemonData.image}"</div>
        <p id="modal-msg">Voulez-vous tenter de le capturer ?</p>
        <div>
            <img src="./public/img/back-arrow.svg" alt="Capturer Pokemon" id="btn-back">
            <div id="btn-capture" pkdid="${pkdId}" rowindex="${rowIndex}"><img src="./public/img/pokeball.png" alt="Capturer Pokemon"></div>
        </div>
        `;

        this.innerHTML = captureMarkUp;
    }

    setupListeners() {
        document.getElementById('btn-back').addEventListener('click', closeCaptureModal);

        document.getElementById('btn-capture').addEventListener('click',(event) => {
            tryToCaptureThisPokemon(event);
        })
    }
}