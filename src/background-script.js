import { log, onError } from "./common";

function onExecuted(result) {
	log("executed , result is " + result);
}

function pageNavigation(details) {
	log("navigated to: " + details.url);

	var executing = browser.tabs.executeScript(details.tabId, {
		file: "/dist/content-script.js"
	});

	executing.then(onExecuted, onError);
}

var filter = {
	url: []
};

function loadSettingsAndAddListener(changes) {

	if (changes != undefined && changes["urls"] == undefined) {
		return;
	}

	var getting = browser.storage.local.get("urls");
	getting.then(function (result) {

		if (result.urls != undefined) {
			filter.url = [];
			for (var i = 0; i < result.urls.length; i++) {
				filter.url.push({ hostEquals: result.urls[i] });
			}

			log("loaded settings");
		}

	}, onError).then(function () {
		browser.webNavigation.onCommitted.removeListener(pageNavigation);
		browser.webNavigation.onCommitted.addListener(pageNavigation, filter);

		log("added webNavigation listener");
	});
}

function handleInstalled(details) {

	//Only needs to run the first time a user installs the extension
	if (details.reason == "install") {

		var windowData = {
			type: "detached_panel",
			url: "/dist/helper.html",
			width: 400,
			height: 400
		};

		browser.windows.create(windowData).then(function () {
			log("new window was created");
		}, onError);
	}
}

loadSettingsAndAddListener(undefined);
browser.storage.onChanged.addListener(loadSettingsAndAddListener);
browser.runtime.onInstalled.addListener(handleInstalled);