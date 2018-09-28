
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
		li.textContent = urlArray[i];
		list.appendChild(li);
	}

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

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("form").addEventListener("submit", saveOptions);