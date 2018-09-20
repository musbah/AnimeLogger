const { h, app } = require("hyperapp");

const host = window.location.hostname;
const numRegex = "[0-9]+[.]{0,1}[0-9]*";

const state = {
	dragging: false,
	x: 0,
	y: 0,
	offsetX: 0,
	offsetY: 0,

	inputAnime: document.title,
	inputEpisode: document.title,

	animeName: "",
	animeEpisode: "",

	savedAnimeEpisode: "",

	addAnime: "none",
	updateAnime: "none",

	notConfigured: "none",
	configure: "none",
	configured: "none"
};

const actions = {
	drop: () => ({ dragging: false }),
	grab: e => {

		if (e.target.tagName != "BUTTON" && e.target.tagName != "INPUT") {
			e.preventDefault();

			return {
				x: e.pageX,
				y: e.pageY,
				offsetX: e.offsetX,
				offsetY: e.offsetY,
				dragging: true
			};
		}
	},
	move: ({ x, y }) => state => state.dragging && { x, y },
	saveConfig: () => state => {

		var formattedTitle = document.title.replace(state.inputAnime, "%s");
		while (formattedTitle.indexOf(state.inputAnime) >= 0) {
			formattedTitle = formattedTitle.replace(state.inputAnime, ".+");
		}

		//doing it this way because the regex contains numbers which could mess with indexOf
		while (formattedTitle.indexOf(state.inputEpisode) >= 0) {
			formattedTitle = formattedTitle.replace(state.inputEpisode, "%d");
		}

		while (formattedTitle.indexOf("%d") >= 0) {
			formattedTitle = formattedTitle.replace("%d", numRegex);
		}

		var objToSet = {};
		objToSet[host] = { formattedTitle: formattedTitle, isConfigured: true };

		browser.storage.local.set(objToSet);

		var animeInfo = loadAnimeInfo(objToSet[host].formattedTitle);

		return { configured: "block", configure: "none", animeName: animeInfo.name, animeEpisode: animeInfo.episode, addAnime: "block" };
	},
	addOrUpdateAnime: () => state => {

		var anime = {};
		anime[state.animeName] = { episode: state.animeEpisode };

		browser.storage.local.set(anime);

		if (state.addAnime == "block") {
			return { addAnime: "none" };
		} else if (state.updateAnime == "block") {
			return { updateAnime: "none" };
		}

	},
	stateAssign: data => Object.assign({}, data)
};

const view = (state, actions) =>
	h("div", {
		id: "anime-logger-div",
		style: {
			height: "100px",
			backgroundColor: "white",
			zIndex: "10",
			position: "absolute",
			left: state.x - state.offsetX + "px",
			top: state.y - state.offsetY + "px",
			display: "block"
		}, onmousedown: (e) => actions.grab(e)
	},
		h("div", { style: { display: state.notConfigured } }, [
			"Go to a page that contains an anime ep then press done?", h("br"),
			h("button", { onclick: () => actions.stateAssign({ configure: "block", notConfigured: "none" }) }, "done")
		]),
		h("div", { style: { display: state.configure } }, [
			"Only keep the anime name in the first textbox, and type the episode in the 2nd one (if site starts episode with 00 include them, for example 001):",
			h("input", { type: "text", value: state.inputAnime, oninput: e => actions.stateAssign({ inputAnime: e.target.value }), style: { width: "90%" } }), h("br"),
			h("input", { type: "text", value: state.inputEpisode, oninput: e => actions.stateAssign({ inputEpisode: e.target.value }), style: { width: "90%" } }), h("br"),
			h("button", { onclick: () => actions.saveConfig() }, "done")
		]),
		h("div", { style: { display: state.configured } }, [
			"name:" + state.animeName, h("br"),

			h("div", { style: { display: state.updateAnime } }, [
				"saved episode:" + state.savedAnimeEpisode, h("br"),
			]),

			"episode:" + state.animeEpisode, h("br"),
			h("div", { style: { display: state.addAnime } }, [
				h("button", { onclick: () => actions.addOrUpdateAnime() }, "add")
			]),
			h("div", { style: { display: state.updateAnime } }, [
				h("button", { onclick: () => actions.addOrUpdateAnime() }, "update")
			])
		])
	);

function getSiteDetails(hyper) {
	var getting = browser.storage.local.get(host);
	getting.then(function (site) {

		console.log("got site information");

		if (site[host] != undefined && site[host].isConfigured) {
			console.log("site configured");
			var animeInfo = loadAnimeInfo(site[host].formattedTitle);

			var gettingSavedAnime = browser.storage.local.get(animeInfo.name);
			gettingSavedAnime.then(function (anime) {

				console.log("got anime info");

				var savedAnimeEpisode = -1;
				if (anime[animeInfo.name] != undefined) {
					savedAnimeEpisode = anime[animeInfo.name].episode;
				}

				var addAnime = "none";
				var updateAnime = "none";
				if (savedAnimeEpisode > -1) {
					updateAnime = "block";
				} else {
					addAnime = "block";
				}

				hyper.stateAssign({ animeName: animeInfo.name, animeEpisode: animeInfo.episode, configured: "block", savedAnimeEpisode: savedAnimeEpisode, addAnime: addAnime, updateAnime: updateAnime });

			}, function (error) {
				console.log("could not get anime information," + error);
			});

		} else {
			console.log("site not configured");
			hyper.stateAssign({ notConfigured: "block" });
		}


	}, function (error) {
		console.log("could not get host information," + error);
	});
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

	var splitForEpisode = formattedTitle.split(numRegex);

	var episode = documentTitle.replace(splitForEpisode[0], "");
	splitForEpisode[0] = "";
	var endStr = splitForEpisode.join(numRegex);
	endStr = endStr.substring(numRegex.length, endStr.length);
	episode = episode.replace(RegExp(endStr, "g"), "");

	return { name: animeName, episode: episode };
}

function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

if (!window.loaded) {
	console.log("loaded");
	window.loaded = true;

	var div = document.createElement("div");
	document.body.appendChild(div);

	const hyper = app(state, actions, view, div);
	addEventListener("mouseup", hyper.drop);
	addEventListener("mousemove", e => hyper.move({ x: e.pageX, y: e.pageY }));

	getSiteDetails(hyper);
}