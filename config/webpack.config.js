/**
 * Webpack Custom Config.
 */

const path = require("path");
const postcssPresetEnv = require("postcss-preset-env");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const { mode, resolve } = defaultConfig;

module.exports = {
	mode,
	entry: {
		index: path.resolve(process.cwd(), "src/js", "index.js")
	},
	output: {
		filename: "[name].js",
		path: path.resolve(process.cwd(), "dist"),
		pathinfo: true
	},
	resolve,
	optimization: {
		splitChunks: {
			chunks: "all",
			cacheGroups: {
				editor: {
					name: "editor",
					test: /editor\.(sc|sa|c)ss$/,
					enforce: true
				},
				style: {
					name: "style",
					test: /style\.(sc|sa|c)ss$/,
					enforce: true
				},
				default: false
			}
		}
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							ident: "postcss",
							plugins: () => [
								// postcssPresetEnv(),
								postcssPresetEnv({
									stage: 3,
									browsers: [
										">1%",
										"last 4 versions",
										"Firefox ESR",
										"not ie < 9" // React doesn't support IE8 anyway
									]
								})
							]
						}
					},
					"sass-loader"
				]
			}
		]
	},
	plugins: [
		new FixStyleOnlyEntriesPlugin({
			silent: false
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[name].css"
		})
	]
};
