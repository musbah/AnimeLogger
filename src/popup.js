import { extractAnimeListFromStorageInfo, log, onError } from "./common";

var createTrie = require("./autosuggest-trie");

var list = document.getElementById("popupList");
var searchInput = document.getElementById("search");

function addListElements(array) {

	for (var i = 0; i < array.length; i++) {
		var li = document.createElement("li");
		li.textContent = array[i].name + " ep: " + array[i].episode;
		li.addEventListener("click", callback(array[i].url));
		list.appendChild(li);
	}

}

function emptyList() {

	while (list.firstChild) {
		list.removeChild(list.firstChild);
	}
}

function callback(url) {
	return function () {
		createNewTab(url);
	};
}

function createNewTab(url) {
	var creating = browser.tabs.create({
		url: url
	});
	creating.then({}, onError);
}

var trieAnimeTree;

var gettingStorage = browser.storage.local.get();
gettingStorage.then(function (storedInfo) {

	var animeList = extractAnimeListFromStorageInfo(storedInfo);

	trieAnimeTree = createTrie(animeList, "name");
	addListElements(animeList);
});

searchInput.addEventListener("input", function (e) {
	var queryText = e.target.value;

	var matches;
	if (queryText == "") {
		matches = trieAnimeTree.data;
	} else {
		matches = trieAnimeTree.getMatches(queryText);
	}

	emptyList();
	addListElements(matches);
});

document.getElementById("settings").addEventListener("click", function () {
	browser.runtime.openOptionsPage().then(function () {
		log("settings page is open");
	}, onError);
});
