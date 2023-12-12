import { patchPokedexEntry } from "./pokedex.js";

export function favToggle(uid){
    document.querySelectorAll(`[uniqueid="${uid}"] .favoris`).forEach((favoriteIcon)=>{
        favoriteIcon.classList.toggle('active')
        if (favoriteIcon.classList.contains('active')) {
            favoriteIcon.src="./public/img/favoris.png";
            favoriteIcon.nextElementSibling.classList.add('hidden');
            patchPokedexEntry(uid,{fav:true})
        }else{
          favoriteIcon.src="./public/img/favoris-modified-gray.png"
          favoriteIcon.nextElementSibling.classList.remove('hidden');
          patchPokedexEntry(uid,{fav:false})
        }
    });
    const pokedexComponent = document.querySelector('pokedex-comp');
    pokedexComponent.render();
}