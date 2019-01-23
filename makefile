windowsRun:
	start web-ext run --firefox="D:\Program Files\Mozilla Firefox\firefox.exe"
	npm run watch

run:
	web-ext run --firefox &
	npm run watch

build:
	npm run build
	web-ext build --ignore-files .\src .\package-lock.json .\makefile .\package.json .\webpack.config.js