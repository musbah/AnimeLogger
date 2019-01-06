const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");

module.exports = {
	entry: {
		"content-script": "./src/content-script.js",
		"popup": "./src/popup.js",
		"settings": "./src/settings.js",
		"background-script": "./src/background-script.js"
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].js"
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			chunks: ["popup"],
			filename: "popup.html",
			template: "./src/popup.html"
		}),
		new HtmlWebpackPlugin({
			inject: true,
			chunks: ["settings"],
			filename: "settings.html",
			template: "./src/settings.html"
		}),
		new CopyWebpackPlugin([
			{ from: "./src/styles.css", to: "styles.css" },
		]),
		new HtmlWebpackIncludeAssetsPlugin({
			files: ["popup.html", "settings.html"],
			assets: ["styles.css"],
			append: true
		}),
	]
};
