run:
	start web-ext run --firefox="D:\Program Files\Mozilla Firefox\firefox.exe"
	watchify .\src\main.js -o .\src\content-script.js -v