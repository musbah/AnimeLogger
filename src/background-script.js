function onExecuted(result) {
	console.log("executed , result is " + result);
}

function onError(error) {
	console.error(error);
}


function pageNavigation(details) {
	console.log("navigated to: " + details.url);

	var executing = browser.tabs.executeScript({
		file: "/src/generated-content-script.js"
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
				filter.url.push({ hostEquals: "www." + result.urls[i] });
			}

			console.log("loaded settings");
		}

	}, onError).then(function () {
		browser.webNavigation.onCommitted.removeListener(pageNavigation);
		browser.webNavigation.onCommitted.addListener(pageNavigation, filter);

		console.log("added webNavigation listener");
	});
}

loadSettingsAndAddListener(undefined);
browser.storage.onChanged.addListener(loadSettingsAndAddListener);