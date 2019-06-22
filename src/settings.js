import { extractAnimeListFromStorageInfo, log, onError, getHostName } from "./common";

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

	var permissionsToRequest = { origins: ["*://" + hostname + "/*"] };

	browser.permissions.request(permissionsToRequest)
		.then(function (response) {

			if (response) {

				animeURLs.push(hostname);
				browser.storage.local.set({
					urls: animeURLs
				});
				addListElements([hostname]);

			} else {
				log("permission denied");
			}
		});
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

	browser.storage.local.remove(split[0]);
	
	var index = animeURLs.indexOf(split[0]);

	animeURLs.splice(index, 1);
	browser.storage.local.set({
		urls: animeURLs
	});

	liElement.parentNode.removeChild(liElement);
}

function exportAnimeList() {

	var gettingStorage = browser.storage.local.get();
	gettingStorage.then(function (storedInfo) {

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
				log(`Started downloading: ${item}`);
			},
			function (error) {
				log(`Download failed: ${error}`);
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

			browser.storage.local.set(anime);
		};

		reader.onerror = onError();
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