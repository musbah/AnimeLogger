run:
	start web-ext run --firefox="D:\Program Files\Mozilla Firefox\firefox.exe"
	watchify .\src\content-script.js -o .\src\generated-content-script.js -v
	# watchify .\src\popup.js -o .\src\generated-popup.js -v

build:
	web-ext build --ignore-files .\src\content-script.js .\src\popup.js .\src\autosuggest-trie .\package-lock.json .\makefile