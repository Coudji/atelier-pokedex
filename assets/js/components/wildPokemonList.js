import { insertCaptureModal } from "../utils/capture.js";
import { pokemonListInit } from "../utils/list.js";
import { randomNumber } from "../utils/util.js";

const list = localStorage.getItem('pokemonList');
let isButtonDisabled = false;

export default class WildList extends HTMLElement{
    constructor(list, isButtonDisabled){
        super();
        this.list = list;
        this.isButtonDisabled = isButtonDisabled;
        if(!list){
            pokemonListInit();
        }
    }

    connectedCallback(){
        if(!list){
            this.preRender();
            setTimeout(() => {
                this.render();
            }, 2000);
        }else{
            this.render();
        }
    }

    preRender(){
        this.innerHTML = `
            <div id="reloadWildList"><img class="rotate-img" src="./public/img/refresh.png"></div>
            <table>
                <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>Sprite</th>
                        <th>Nom</th>
                        <th>Types</th>
                    </tr>
                </thead>
                <tbody class="wildListBody">
                </tbody>
            </table>
            <div class="preload"><img src="./public/img/simple_pokeball.gif"</div>
        `;
    }

    render(){
        this.innerHTML = `
            <div id="reloadWildList"><img class="rotate-img" src="./public/img/refresh.png"></div>
            <table>
                <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>Sprite</th>
                        <th>Nom</th>
                        <th>Types</th>
                    </tr>
                </thead>
                <tbody class="wildListBody">
                    ${this.generateRowMarkup()}
                </tbody>
            </table>
        `;
        this.setupListenners();
    }

    generateList(){
        const pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
        const pokemonSelection = [];
        for (let i = 0; i < 50; i++) {
            const rand = randomNumber(898);
            const pokemonData = pokemonList[rand];
            pokemonSelection.push(pokemonData);
        }
        return pokemonSelection;
    }

    generateRowMarkup(){
        const pokemons = this.generateList();
        let list = '';
        pokemons.map((pkm, index) => {
            list += `
            <tr class="wildPkmRow" pkdid="${pkm.pokedexId}" rowindex="${index}">
                <td>${pkm.pokedexId}</td>
                <td><img src=${pkm.sprite}></td>
                <td>${pkm.name}</td>
                <td>${pkm.type.map((t) => t.name).join(', ')}</td>
            </tr>
            `;
        }).join('');
        return list;
    }

    reloadList(event){
        const reloadBtn = event.target.closest('#reloadWildList');
        const reloadIcon = document.querySelector('.rotate-img');
        const tabBody = document.querySelector('.wildListBody');
        if(!isButtonDisabled){
            isButtonDisabled = true;
            reloadBtn.classList.toggle('inactive');
            reloadIcon.classList.add('rotate');
            setTimeout(()=>{
                isButtonDisabled = false;
                reloadBtn.classList.toggle('inactive');
            },1500);
            reloadIcon.addEventListener('animationend', () => {
                reloadIcon.classList.remove('rotate');
            }, { once: true });
            tabBody.innerHTML = this.generateRowMarkup();
        }
    }

    setupListenners(){
        document.getElementById('reloadWildList').addEventListener('click', (event)=> {
            this.reloadList(event);
        });
        
        document.querySelectorAll('.wildPkmRow').forEach((row) => {
            row.addEventListener('click', (event) => {
                insertCaptureModal(event);
            });
        });
    }
}