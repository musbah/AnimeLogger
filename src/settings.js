
var animeURLs;
var list = document.getElementById("settingsList");

function restoreOptions() {

	function setCurrentChoice(result) {

		if (result.urls == undefined) {
			animeURLs = [];
		} else {
			animeURLs = result.urls;
			addListElements(animeURLs);
		}
	}

	function onError(error) {
		console.log(`Error: ${error}`);
	}

	var getting = browser.storage.local.get("urls");
	getting.then(setCurrentChoice, onError);
}

function saveOptions(e) {
	e.preventDefault();

	var newUrl = document.getElementById("url").value;

	if (newUrl == "") {
		return;
	}

	var hostname = getHostName(newUrl);

	for (var i = 0; i < animeURLs.length; i++) {
		if (animeURLs[i] == hostname) {
			alert("This site has already been saved");
			return;
		}
	}

	animeURLs.push(hostname);
	browser.storage.local.set({
		urls: animeURLs
	});
	addListElements([hostname]);
}

function addListElements(urlArray) {

	for (var i = 0; i < urlArray.length; i++) {
		var li = document.createElement("li");
		li.innerText = urlArray[i];

		var button = document.createElement("button");
		button.innerText = "delete";
		button.className = "deleteButton";

		button.addEventListener("click", deleteURL);

		li.appendChild(button);

		list.appendChild(li);
	}

}

function deleteURL(e) {
	e.preventDefault();

	var liElement = e.target.parentNode;
	var split = liElement.innerText.split("\n");

	var index = animeURLs.indexOf(split[0]);

	animeURLs.splice(index, 1);
	browser.storage.local.set({
		urls: animeURLs
	});

	liElement.parentNode.removeChild(liElement);
}

function getHostName(url) {

	url = url.trim();
	url = url.replace("https://", "");
	url = url.replace("http://", "");
	url = url.replace(/^(www\.)/, "");

	if (url.substr(url.length - 1) == "/") {
		url = url.substr(0, url.length - 1);
	}

	return url;
}

function exportAnimeList() {

	var gettingStorage = browser.storage.local.get();
	gettingStorage.then(function (storedInfo) {

		// eslint-disable-next-line no-undef
		var animeList = extractAnimeListFromStorageInfo(storedInfo);

		var blob = new Blob([JSON.stringify(animeList)], { type: "application/json" });
		var blobURL = URL.createObjectURL(blob);

		var downloading = browser.downloads.download({
			url: blobURL,
			filename: "anime-logger-export.json",
			saveAs: true
		});

		downloading.then(
			function (item) {
				console.log(`Started downloading: ${item}`);
			},
			function (error) {
				console.log(`Download failed: ${error}`);
			});
	});
}

function importAnimeList() {

	var file = this.files[0];
	if (file) {
		var reader = new FileReader();
		reader.readAsText(file, "UTF-8");

		reader.onload = function (e) {
			var animeArray = JSON.parse(e.target.result);

			var anime = {};
			for (var i = 0; i < animeArray.length; i++) {
				anime[animeArray[i].name] = { episode: animeArray[i].episode, url: animeArray[i].url };
			}

			console.log(anime);
			browser.storage.local.set(anime);
		};

		reader.onerror = function () {
			console.log("could not read file");
		};
	}
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("saveButton").addEventListener("click", saveOptions);
document.getElementById("exportButton").addEventListener("click", exportAnimeList);

var importInput = document.getElementById("importInput");
importInput.addEventListener("change", importAnimeList);
document.getElementById("importButton").addEventListener("click", function () {
	importInput.click();
});