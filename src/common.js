// eslint-disable-next-line no-unused-vars
function extractAnimeListFromStorageInfo(storageInfo) {

	var animeList = [];
	for (var animeInfo in storageInfo) {
		if (storageInfo.hasOwnProperty(animeInfo) && storageInfo[animeInfo]["episode"] != undefined) {
			animeList.push({ name: animeInfo, episode: storageInfo[animeInfo]["episode"], url: storageInfo[animeInfo]["url"] });
		}
	}

	return animeList;
}