// vue.config.js
const path = require("path");
const glob = require("glob");
const vuePath = "./src";
const globPattern = `${vuePath}/pages/**/**`;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");

const getPages = function() {
	//console.log("1234");
};
getPages();
module.exports = {
    css: {
        extract: false,
    },
    configureWebpack: {
        optimization: {
            splitChunks: false, // makes there only be 1 js file - leftover from earlier attempts but doesn't hurt
		},
		//pages: getPages(),
        plugins: [
            // new HtmlWebpackPlugin({
			// 	//cache: true,
			// 	//vue: true,
            //     filename: "output.html", // the output file name that will be created
            //     template: "src/output-template.html", // this is important - a template file to use for insertion
            //     inlineSource: ".(js|css)$", // embed all javascript and css inline
            // }),
            new HtmlWebpackInlineSourcePlugin(),
        ],
    },
};
