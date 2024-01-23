import Header from './components/header.js';
import WildList from './components/wildPokemonList.js';
import Capture from './components/captureModal.js';
import Footer from './components/footer.js';
import UserCard from './components/userCard.js';
import History from './components/historyLog.js';
import HistorySelect from './components/historySelect.js';
import Pokedex from './components/pokedexMain.js';
import PokedexCards from './components/pokedexCard.js';
import PokedexDetail from './components/pokedexDetails.js';
import Title from './components/title.js';
import Counter from './components/counter.js';

// baseline => customElements.define('',);
customElements.define('header-comp', Header);
customElements.define('pokemon-list-comp', WildList);
customElements.define('capture-comp', Capture);
customElements.define('footer-comp', Footer);
customElements.define('usercard-comp', UserCard);
customElements.define('history-select-comp', HistorySelect);
customElements.define('history-comp', History);
customElements.define('pokedex-comp', Pokedex);
customElements.define('pokedexcard-comp', PokedexCards);
customElements.define('pokedexdetail-comp', PokedexDetail);
customElements.define('title-comp', Title);
customElements.define('counter-comp', Counter);
