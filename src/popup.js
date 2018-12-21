var createTrie = require("./autosuggest-trie");

var list = document.getElementById("popupList");
var searchInput = document.getElementById("search");

function addListElements(array) {

	for (var i = 0; i < array.length; i++) {
		var li = document.createElement("li");
		li.textContent = array[i].text;
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

function onError(error) {
	console.log(`Error: ${error}`);
}

var trieAnimeTree;

var gettingSavedAnime = browser.storage.local.get();
gettingSavedAnime.then(function (anime) {

	var animeList = [];
	for (var animeInfo in anime) {
		if (anime.hasOwnProperty(animeInfo) && anime[animeInfo]["episode"] != undefined) {
			var text = animeInfo + " ep: " + anime[animeInfo]["episode"];
			animeList.push({ text: text, url: anime[animeInfo]["url"] });
		}
	}

	trieAnimeTree = createTrie(animeList, "text");
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