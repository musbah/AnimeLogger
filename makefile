run:
	start web-ext run --firefox="D:\Program Files\Mozilla Firefox\firefox.exe"
	watchify .\src\content-script.js -o .\src\generated-content-script.js -v
	# watchify .\src\popup.js -o .\src\generated-popup.js -v