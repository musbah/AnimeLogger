var host = window.location.hostname;
var div;
var inputAnime;
var inputEpisode;

var loaded;

if (!loaded) {
	console.log("loaded");
	loaded = true;

	getSiteDetails();
}

function loadAnimeInfo(formattedTitle) {

	console.log("load anime info");

	var splitTitle = formattedTitle.split("%s");
	var documentTitle = document.title;

	var startIndex = 0;
	var endIndex = 0;

	var matchBeg = RegExp(splitTitle[0], "g").exec(documentTitle);
	if (matchBeg) {
		console.log("beginning match " + matchBeg.index);
		startIndex = matchBeg.index;
	} else {
		console.log("no match");
		return;
	}

	var matchEnd = RegExp(splitTitle[1], "g").exec(documentTitle);
	if (matchEnd) {
		console.log("ending match " + matchEnd.index);
		endIndex = matchEnd.index;
	} else {
		console.log("no match");
		return;
	}

	var animeName = documentTitle.substring(startIndex, endIndex);

	formattedTitle = formattedTitle.replace("%s", animeName);
	formattedTitle = formattedTitle.replace(".+", escapeRegExp(animeName));

	var splitForEpisode = formattedTitle.split("[0-9]+");

	var episode = documentTitle.replace(splitForEpisode[0], "");
	splitForEpisode[0] = "";
	var endStr = splitForEpisode.join("[0-9]+");
	endStr = endStr.substring(6, endStr.length);
	episode = episode.replace(RegExp(endStr, "g"), "");

	return { name: animeName, episode: episode };
}


function saveConfig() {
	var formattedTitle = document.title.replace(inputAnime.value, "%s");
	while (formattedTitle.indexOf(inputAnime.value) >= 0) {
		formattedTitle = formattedTitle.replace(inputAnime.value, ".+");
	}

	formattedTitle = formattedTitle.replace(inputEpisode, "[0-9]+");
	while (formattedTitle.indexOf(inputEpisode.value) >= 0) {
		formattedTitle = formattedTitle.replace(inputEpisode.value, "[0-9]+");
	}

	var objToSet = {};
	objToSet[host] = { formattedTitle: formattedTitle, isConfigured: true };

	browser.storage.local.set(objToSet);
}

function startConfig() {
	removeChildren(div);
	div.textContent = "Only keep the anime name in the first textbox, and type the episode in the 2nd one (if site starts episode with 00 include them, for example 001):";

	inputAnime = document.createElement("input");
	inputAnime.type = "text";
	inputAnime.style.width = "90%";
	inputAnime.value = document.title;

	inputEpisode = document.createElement("input");
	inputEpisode.type = "text";
	inputEpisode.style.width = "90%";
	inputEpisode.value = document.title;

	var doneConfigBtn = createButton("doneConfigBtn", "done");
	appendBr();
	div.appendChild(inputAnime);
	appendBr();
	div.appendChild(inputEpisode);
	appendBr();
	div.appendChild(doneConfigBtn);

	doneConfigBtn.addEventListener("click", saveConfig);
}

function getSiteDetails() {
	var getting = browser.storage.local.get(host);
	getting.then(function (site) {

		createDraggableDiv();
		console.log("got site information");

		if (site[host] != undefined && site[host].isConfigured) {
			console.log("site configured");
			var animeInfo = loadAnimeInfo(site[host].formattedTitle);
			console.log("anime name is: " + animeInfo.name);
			console.log("episode is: " + animeInfo.episode);
		} else {
			console.log("site not configured");
			div.textContent = "Go to a page that contains an anime ep then press done?";
			var startConfigBtn = createButton("startConfigBtn", "done");

			appendBr();
			div.appendChild(startConfigBtn);

			startConfigBtn.addEventListener("click", startConfig);
		}


	}, function (error) {
		console.log("could not get host information," + error);
	});
}

//Util functions
function createButton(id, text) {
	var button = document.createElement("button");
	button.textContent = text;
	button.id = id;

	return button;
}

function removeChildren(element) {
	while (element.firstChild) {
		element.removeChild(element.lastChild);
	}
}

function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function appendBr() {
	var br = document.createElement("br");
	div.appendChild(br);
}


//Dragging functions 
var newX = 0;
var newY = 0;
var oldX = 0;
var oldY = 0;

function createDraggableDiv() {
	div = document.createElement("div");
	div.id = "anime-logger-div";
	div.style.height = "100px";
	div.style.backgroundColor = "white";
	div.style.zIndex = 10;
	div.style.position = "absolute";
	document.body.appendChild(div);

	div.onmousedown = enableDrag;
}

function enableDrag(mouseElement) {

	if (mouseElement.target.tagName != "BUTTON" && mouseElement.target.tagName != "INPUT") {
		console.log("drag enabled");
		oldX = mouseElement.clientX;
		oldY = mouseElement.clientY;

		mouseElement.preventDefault();
		document.onmousemove = startDrag;
		document.onmouseup = disableDrag;
	}
}

function startDrag(mouseElement) {
	console.log("drag started");
	newX = oldX - mouseElement.clientX;
	newY = oldY - mouseElement.clientY;
	oldX = mouseElement.clientX;
	oldY = mouseElement.clientY;

	div.style.left = (div.offsetLeft - newX) + "px";
	div.style.top = (div.offsetTop - newY) + "px";
}

function disableDrag() {
	console.log("drag disabled");
	document.onmouseup = null;
	document.onmousemove = null;
}

//value returned to background-script
"success";