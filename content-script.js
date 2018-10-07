(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(e.hyperapp={})}(this,function(e){"use strict";e.h=function(e,n){for(var t=[],r=[],o=arguments.length;o-- >2;)t.push(arguments[o]);for(;t.length;){var u=t.pop();if(u&&u.pop)for(o=u.length;o--;)t.push(u[o]);else null!=u&&!0!==u&&!1!==u&&r.push(u)}return"function"==typeof e?e(n||{},r):{nodeName:e,attributes:n||{},children:r,key:n&&n.key}},e.app=function(e,n,t,r){var o,u=[].map,i=r&&r.children[0]||null,l=i&&function e(n){return{nodeName:n.nodeName.toLowerCase(),attributes:{},children:u.call(n.childNodes,function(n){return 3===n.nodeType?n.nodeValue:e(n)})}}(i),f=[],a=!0,c=p(e),s=function e(n,t,r){for(var o in r)"function"==typeof r[o]?function(e,o){r[e]=function(e){var u=o(e);return"function"==typeof u&&(u=u(y(n,c),r)),u&&u!==(t=y(n,c))&&!u.then&&h(c=m(n,p(t,u),c)),u}}(o,r[o]):e(n.concat(o),t[o]=p(t[o]),r[o]=p(r[o]));return r}([],c,p(n));return h(),s;function d(e){return"function"==typeof e?d(e(c,s)):null!=e?e:""}function v(){o=!o;var e=d(t);for(r&&!o&&(i=function e(n,t,r,o,u){if(o===r);else if(null==r||r.nodeName!==o.nodeName){var i=function e(n,t){var r="string"==typeof n||"number"==typeof n?document.createTextNode(n):(t=t||"svg"===n.nodeName)?document.createElementNS("http://www.w3.org/2000/svg",n.nodeName):document.createElement(n.nodeName),o=n.attributes;if(o){o.oncreate&&f.push(function(){o.oncreate(r)});for(var u=0;u<n.children.length;u++)r.appendChild(e(n.children[u]=d(n.children[u]),t));for(var i in o)b(r,i,o[i],null,t)}return r}(o,u);n.insertBefore(i,t),null!=r&&k(n,t,r),t=i}else if(null==r.nodeName)t.nodeValue=o;else{!function(e,n,t,r){for(var o in p(n,t))t[o]!==("value"===o||"checked"===o?e[o]:n[o])&&b(e,o,t[o],n[o],r);var u=a?t.oncreate:t.onupdate;u&&f.push(function(){u(e,n)})}(t,r.attributes,o.attributes,u=u||"svg"===o.nodeName);for(var l={},c={},s=[],v=r.children,h=o.children,m=0;m<v.length;m++){s[m]=t.childNodes[m];var y=g(v[m]);null!=y&&(l[y]=[s[m],v[m]])}for(var m=0,N=0;N<h.length;){var y=g(v[m]),w=g(h[N]=d(h[N]));if(c[y])m++;else if(null==w||a)null==y&&(e(t,s[m],v[m],h[N],u),N++),m++;else{var x=l[w]||[];y===w?(e(t,x[0],x[1],h[N],u),m++):x[0]?e(t,t.insertBefore(x[0],s[m]),x[1],h[N],u):e(t,s[m],null,h[N],u),c[w]=h[N],N++}}for(;m<v.length;)null==g(v[m])&&k(t,s[m],v[m]),m++;for(var m in l)c[m]||k(t,l[m][0],l[m][1])}return t}(r,i,l,l=e)),a=!1;f.length;)f.pop()()}function h(){o||(o=!0,setTimeout(v))}function p(e,n){var t={};for(var r in e)t[r]=e[r];for(var r in n)t[r]=n[r];return t}function m(e,n,t){var r={};return e.length?(r[e[0]]=e.length>1?m(e.slice(1),n,t[e[0]]):n,p(t,r)):n}function y(e,n){for(var t=0;t<e.length;)n=n[e[t++]];return n}function g(e){return e?e.key:null}function N(e){return e.currentTarget.events[e.type](e)}function b(e,n,t,r,o){if("key"===n);else if("style"===n)for(var u in p(r,t)){var i=null==t||null==t[u]?"":t[u];"-"===u[0]?e[n].setProperty(u,i):e[n][u]=i}else"o"===n[0]&&"n"===n[1]?(n=n.slice(2),e.events?r||(r=e.events[n]):e.events={},e.events[n]=t,t?r||e.addEventListener(n,N):e.removeEventListener(n,N)):n in e&&"list"!==n&&!o?e[n]=null==t?"":t:null!=t&&!1!==t&&e.setAttribute(n,t),null!=t&&!1!==t||e.removeAttribute(n)}function k(e,n,t){function r(){e.removeChild(function e(n,t){var r=t.attributes;if(r){for(var o=0;o<t.children.length;o++)e(n.childNodes[o],t.children[o]);r.ondestroy&&r.ondestroy(n)}return n}(n,t))}var o=t.attributes&&t.attributes.onremove;o?o(n,r):r()}}});

},{}],2:[function(require,module,exports){
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
	drop: e => state => {

		if (state.dragging && e.target.tagName != "BUTTON" && e.target.tagName != "INPUT") {
			var getting = browser.storage.local.get(host);
			getting.then(function (site) {

				if (site[host] == undefined) {
					site[host] = {};
				}

				site[host]["x"] = state.x;
				site[host]["y"] = state.y;
				site[host]["offsetX"] = state.offsetX;
				site[host]["offsetY"] = state.offsetY;

				browser.storage.local.set(site);
			});
		}

		return { dragging: false };
	},
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
		objToSet[host] = { formattedTitle: formattedTitle, isConfigured: true, x: state.x, y: state.y, offsetX: state.offsetX, offsetY: state.offsetY };

		browser.storage.local.set(objToSet);

		var animeInfo = loadAnimeInfo(objToSet[host].formattedTitle);
		return { configured: "block", configure: "none", animeName: animeInfo.name, animeEpisode: animeInfo.episode, addAnime: "block" };
	},
	addOrUpdateAnime: () => state => {

		var anime = {};
		var episode = state.animeEpisode;

		anime[state.animeName] = { episode: episode };

		browser.storage.local.set(anime);

		if (state.addAnime == "block") {
			return { addAnime: "none", updateAnime: "block", savedAnimeEpisode: episode };
		} else {
			return { savedAnimeEpisode: episode };
		}

	},
	deleteAnime: () => state => {
		browser.storage.local.remove(state.animeName);
		return { addAnime: "block", updateAnime: "none", savedAnimeEpisode: "" };
	},
	stateAssign: data => Object.assign({}, data)
};

const view = (state, actions) =>
	h("div", {
		id: "anime-logger-div",
		style: {
			height: "100px",
			backgroundColor: "white",
			zIndex: "100",
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
				"saved episode:" + state.savedAnimeEpisode, h("br")
			]),

			"episode:",
			h("button", { onclick: () => actions.stateAssign({ animeEpisode: parseInt(state.animeEpisode) - 1 }) }, "-"),
			state.animeEpisode,
			h("button", { onclick: () => actions.stateAssign({ animeEpisode: parseInt(state.animeEpisode) + 1 }) }, "+"),
			h("br"),
			h("div", { style: { display: state.addAnime } }, [
				h("button", { onclick: () => actions.addOrUpdateAnime() }, "add")
			]),
			h("div", { style: { display: state.updateAnime } }, [
				h("button", { onclick: () => actions.addOrUpdateAnime() }, "update"),
				h("button", { onclick: () => actions.deleteAnime() }, "delete")
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

			if (animeInfo == null) {
				return;
			}

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

				hyper.stateAssign({ animeName: animeInfo.name, animeEpisode: animeInfo.episode, configured: "block", savedAnimeEpisode: savedAnimeEpisode, addAnime: addAnime, updateAnime: updateAnime, x: site[host].x, y: site[host].y, offsetX: site[host].offsetX, offsetY: site[host].offsetY });

			}, function (error) {
				console.log("could not get anime information," + error);
			});

		} else {
			console.log("site not configured");

			var tempState = { notConfigured: "block" };

			if (site[host] != undefined) {
				tempState["x"] = site[host].x;
				tempState["y"] = site[host].y;
				tempState["offsetX"] = site[host].offsetX;
				tempState["offsetY"] = site[host].offsetY;
			}

			hyper.stateAssign(tempState);
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
		return null;
	}

	var matchEnd = RegExp(splitTitle[1], "g").exec(documentTitle);
	if (matchEnd) {
		console.log("ending match " + matchEnd.index);
		endIndex = matchEnd.index;
	} else {
		console.log("no match");
		return null;
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
	addEventListener("mouseup", e => hyper.drop(e));
	addEventListener("mousemove", e => hyper.move({ x: e.pageX, y: e.pageY }));

	getSiteDetails(hyper);
}
},{"hyperapp":1}]},{},[2]);
