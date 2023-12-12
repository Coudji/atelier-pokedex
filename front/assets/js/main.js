import {Header,Footer,WildList,Pokedex,History,Counter} from "./utils/components.js";
customElements.define('main-header', Header);
customElements.define('main-footer', Footer);
customElements.define('wild-list', WildList);
customElements.define('show-pokedex', Pokedex);
customElements.define('history-log',History);
customElements.define('stats-counter',Counter);


if ('localStorage' in window && window['localStorage'] !== null) {
    const totalSpace = 1024 * 1024 * 10; // 10 Mo
    const usedSpace = encodeURIComponent(JSON.stringify(localStorage)).replace(/%[0-9A-F]{2}/g, 'U').length;

    const remainingSpace = totalSpace - usedSpace;
    const percentageRemaining = (remainingSpace / totalSpace) * 100;

    console.log(`Espace total: ${totalSpace} octets`);
    console.log(`Espace utilisé: ${usedSpace} octets`);
    console.log(`Espace restant: ${remainingSpace} octets`);
    console.log(`Pourcentage restant: ${percentageRemaining.toFixed(2)}%`);
} else {
    console.log('Le Local Storage n\'est pas pris en charge dans ce navigateur.');
}

