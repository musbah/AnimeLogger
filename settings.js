
var animeURLs;
var list = document.getElementById("list");

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
		console.log("Error:" + error);
	}

	var getting = browser.storage.local.get("urls");
	getting.then(setCurrentChoice, onError);
}

function saveOptions(e) {
	e.preventDefault();

	var newUrl = document.getElementById("url").value;
	animeURLs.push(newUrl);
	browser.storage.local.set({
		urls: animeURLs
	});
	addListElements([newUrl]);
}

function addListElements(urlArray) {

	for (var i = 0; i < urlArray.length; i++) {
		var li = document.createElement("li");
		li.textContent = urlArray[i];
		list.appendChild(li);
	}

}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("form").addEventListener("submit", saveOptions);