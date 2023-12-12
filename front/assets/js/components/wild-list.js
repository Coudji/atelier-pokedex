import { getWildList, setWildList, swapList } from "../functions/pokemon.js";
import { displayCaptureModal } from "../functions/capture.js";

export default class WildList extends HTMLElement {
    constructor(){
        super();
        (async ()=>{
            const isWildListStored = await getWildList('wildList');
            if(!isWildListStored){
                await setWildList('wildList');
                await setWildList('tempWildList');
                console.log('wildList initialised');
            }
        })()
    }

    connectedCallback() {
        this.innerHTML = `
        <div id="reloadWildList"><img class="rotate-img" src="./public/img/refresh.png"></div>
            <table>
                <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>Nom</th>
                        <th>Types</th>
                    </tr>
                </thead>
                <tbody class="wildListBody">
  
                </tbody>
            </table>
        `;

        const reloadBtn = document.getElementById('reloadWildList');
        const reloadIcon = document.querySelector('.rotate-img');
        let isButtonDisabled = false;
        reloadBtn.addEventListener('click', ()=>{
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
                this.displayWildList();
            }

        })
  
        this.displayWildList()
    }

    async displayWildList(){
        await swapList();
        const wildList = await getWildList('wildList');
        const tabBody = document.querySelector('.wildListBody');
        let pkmList ='';
        for (const [index,pkm] of wildList.entries()) {
            pkmList += `
                <tr class="wildPkmRow" index="${index}">
                    <td>${pkm.pokedexId}</td>
                    <td><img src=${pkm.sprite} style="height:32px;">${pkm.name}</td>
                    <td>${pkm.type.map((t) => t.name).join(', ')}</td>
                </tr>
            `;  
        }

        tabBody.innerHTML = pkmList;

        document.querySelectorAll('.wildPkmRow').forEach(row => {
            row.addEventListener('click', (event)=>{
                const isModalOpen = document.querySelector('.captureModal');
                if (isModalOpen) return
                displayCaptureModal(event)
            })
        });
    }
}