import { actualiseHistory, dateFormat } from './util.js';

export function getHistory() {
	const history = JSON.parse(localStorage.getItem('history')) || [];
	return history;
}

export function addToHistory(log) {
	const { userData, pokemonData, msg } = log;
	const historyLength = checkHistoryLength(userData.id);
	const cleanLog = {
		id: userData.id,
		name: userData.name,
		date: pokemonData.catchDate || dateFormat(),
		pkmName: `${pokemonData.name}`,
		message: msg,
	};
	let history = getHistory();

	if (historyLength >= 30) {
		history = deleteOneEntrieFromUserHistory(userData.id);
	}

	history.push(cleanLog);

	localStorage.setItem('history', JSON.stringify(history));
}

export function checkHistoryLength(userId) {
	const history = getUserHistory(userId);
	return history.length;
}

export function getUserHistory(userId) {
	const history = getHistory();
	const userHistory = history.filter((entry) => entry.id === userId) || [];
	return userHistory;
}

export function splitHistory() {
	const history = getHistory();

	const userHistories = history.reduce((acc, entry) => {
		const { id } = entry;

		if (!acc[id]) {
			acc[id] = [];
		}

		acc[id].push(entry);
		return acc;
	}, {});

	return userHistories;
}

function deleteOneEntrieFromUserHistory(userId) {
	const histories = splitHistory();
	histories[userId].shift();
	const mergedHistory = Object.values(histories).reduce((acc, userHistory) => {
		return acc.concat(userHistory);
	}, []);
	return mergedHistory;
}

export function switchActiveHistory(event) {
	const previousActive = document.querySelector('.activeHistory');
	const currentActive = event.target.closest('.btnSelH');
	previousActive.classList.remove('activeHistory');
	currentActive.classList.add('activeHistory');
	actualiseHistory();
}
