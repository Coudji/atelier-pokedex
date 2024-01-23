import { switchActiveHistory } from '../utils/history.js';

export default class HistorySelect extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		const markup = `
            <div class="historySelector">
                <div class="btnSelH selectOne">
                    <img src="./public/img/trainer-blue.svg" class="oneBlue">
                </div>
                <div class="btnSelH selectAll">
                    <img src="./public/img/trainer-blue.svg" class="allBlue">
                    <img src="./public/img/trainer-grey.svg" class="allGrey">
                    <img src="./public/img/trainer-red.svg" class="allRed">
                </div>
                <div class="btnSelH selectAllSorted">
                    <img src="./public/img/trainer-blue.svg" class="allSortBlue">
                    <img src="./public/img/trainer-grey.svg" class="allSortGrey">
                    <img src="./public/img/trainer-red.svg" class="allSortRed">
                </div>
            </div>
            <history-comp></history-comp>
            <footer-comp></footer-comp>
        `;

		this.innerHTML = markup;
		this.setupListenner();
	}

	setupListenner() {
		document.querySelectorAll('.btnSelH').forEach((btn) => {
			btn.addEventListener('click', (event) => {
				switchActiveHistory(event);
			});
		});
	}
}
