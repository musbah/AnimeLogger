import { onError, getHostName, log } from "./common";

const websites = {
	"www.animerush.tv": {
		formattedTitle: "%s Episode [0-9]+[.]{0,1}[0-9]* Subbed Online Free - AnimeRush",
		isConfigured: true
	},
	"www.crunchyroll.com": {
		formattedTitle: "%s Episode [0-9]+[.]{0,1}[0-9]* - Watch on Crunchyroll",
		isConfigured: true
	}
};

var animeURLs;
function loadURLs() {
	var getting = browser.storage.local.get("urls");
	getting.then(function (result) {

		if (result.urls == undefined) {
			animeURLs = [];
		} else {
			animeURLs = result.urls;
		}
	}, onError);
}

function addWebsites(e) {
	e.preventDefault();

	var checkedBoxes = document.getElementsByClassName("checkboxes");

	var oldAnimeURLs = animeURLs;

	var websitesToSet = {};
	var permissionsToRequest = { origins: [] };

	for (var i = 0; i < checkedBoxes.length; i++) {

		if (checkedBoxes[i].checked) {
			websitesToSet[checkedBoxes[i].value] = websites[checkedBoxes[i].value];

			var hostname = getHostName(checkedBoxes[i].value);

			var urlExists = false;
			for (var y = 0; y < animeURLs.length; y++) {
				if (animeURLs[y] == hostname) {
					urlExists = true;
					break;
				}
			}

			if (!urlExists) {
				animeURLs.push(hostname);
				permissionsToRequest.origins.push("*://" + hostname + "/*", "*://www." + hostname + "/*");
			}

		}
	}

	browser.permissions.request(permissionsToRequest)
		.then(function (response) {

			if (response) {

				websitesToSet["urls"] = animeURLs;
				browser.storage.local.set(websitesToSet);

			} else {
				animeURLs = oldAnimeURLs;
				log("permission denied");
			}

			window.close();
		});
}


//Can't load urls on click because permissions.request isn't detected as in an input handler when in a promise
document.addEventListener("DOMContentLoaded", loadURLs);
browser.storage.onChanged.addListener(loadURLs);
document.getElementById("addWebsiteButton").addEventListener("click", addWebsites);