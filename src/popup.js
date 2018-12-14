var list = document.getElementById("popupList");

function addListElements(array) {

	for (var i = 0; i < array.length; i++) {
		var li = document.createElement("li");
		li.textContent = array[i].text;
		li.addEventListener("click", callback(array[i].url));
		list.appendChild(li);
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

var gettingSavedAnime = browser.storage.local.get();
gettingSavedAnime.then(function (anime) {

	var array = [];
	for (var animeInfo in anime) {
		if (anime.hasOwnProperty(animeInfo) && anime[animeInfo]["episode"] != undefined) {
			var text = animeInfo + " ep: " + anime[animeInfo]["episode"];
			array.push({ text: text, url: anime[animeInfo]["url"] });
		}
	}

	addListElements(array);
});
