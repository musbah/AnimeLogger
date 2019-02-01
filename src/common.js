const debug = true;

export function extractAnimeListFromStorageInfo(storageInfo) {

	var animeList = [];
	for (var animeInfo in storageInfo) {
		if (storageInfo.hasOwnProperty(animeInfo) && storageInfo[animeInfo]["episode"] != undefined) {
			animeList.push({ name: animeInfo, episode: storageInfo[animeInfo]["episode"], url: storageInfo[animeInfo]["url"] });
		}
	}

	return animeList;
}

export function log(message) {
	if (debug) {
		console.log(message);
	}
}

export function onError(error) {
	console.error(`Error: ${error}`);
}

export function getHostName(url) {

	url = url.trim();
	url = url.replace("https://", "");
	url = url.replace("http://", "");
	url = url.replace(/^(www\.)/, "");

	if (url.substr(url.length - 1) == "/") {
		url = url.substr(0, url.length - 1);
	}

	return url;
}