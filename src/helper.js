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

function addWebsites(e) {
	e.preventDefault();

	var checkedBoxes = document.getElementsByClassName("checkboxes");

	var websitesToSet = {};
	var permissionsToRequest = { origins: [] };
	var animeURLs = [];

	for (var i = 0; i < checkedBoxes.length; i++) {

		if (checkedBoxes[i].checked) {
			websitesToSet[checkedBoxes[i].value] = websites[checkedBoxes[i].value];

			var hostname = getHostName(checkedBoxes[i].value);

			animeURLs.push(hostname);
			permissionsToRequest.origins.push("*://" + hostname + "/*", "*://www." + hostname + "/*");
		}
	}

	browser.permissions.request(permissionsToRequest)
		.then(function (response) {

			var getting = browser.storage.local.get("urls");
			getting.then(function (result) {

				var savedAnimeURLs = [];
				if (result.urls != undefined) {
					savedAnimeURLs = result.urls;
				}

				savedAnimeURLs = savedAnimeURLs.concat(animeURLs);

				if (response) {

					websitesToSet["urls"] = savedAnimeURLs;
					browser.storage.local.set(websitesToSet);

				} else {
					log("permission denied");
				}

				window.close();

			}, onError);
		});
}

document.getElementById("addWebsiteButton").addEventListener("click", addWebsites);