var list = document.getElementById("list");

function addListElements(array) {

	for (var i = 0; i < array.length; i++) {
		var li = document.createElement("li");
		li.textContent = array[i];
		list.appendChild(li);
	}

}

var gettingSavedAnime = browser.storage.local.get();
gettingSavedAnime.then(function (anime) {

	var array = [];
	for (var animeInfo in anime) {
		if (anime.hasOwnProperty(animeInfo) && anime[animeInfo]["episode"] != undefined) {
			array.push(animeInfo + " ep: " + anime[animeInfo]["episode"]);
		}
	}

	addListElements(array);
});
