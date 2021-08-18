const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (_, argv) => {
	const isDevelopment = argv.mode === 'development'

	return {
		output: {
			path: path.join(__dirname, '/dist'),
			filename: 'index.bundle.js'
		},
		devServer: {
			port: 3000,
			watchContentBase: true
		},
		devtool: isDevelopment ? 'eval-cheap-module-source-map' : 'source-map',
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /nodeModules/,
					use: {
						loader: 'babel-loader'
					}
				},
				{
					test: /\.s(a|c)ss$/,
					exclude: /\.module.(s(a|c)ss)$/,
					use: [
						{
							loader: isDevelopment
								? 'style-loader'
								: MiniCssExtractPlugin.loader
						},
						{ loader: 'css-loader' },
						{
							loader: 'sass-loader',
							options: {
								sourceMap: isDevelopment
							}
						},
						{
							loader: 'sass-resources-loader',
							options: {
								resources: require('./src/styles/index.js')
							}
						}
					]
				}
			]
		},
		resolve: {
			alias: {
				Components: path.resolve(__dirname, 'src/views/components'),
				Pages: path.resolve(__dirname, 'src/views/pages'),
				Utils: path.resolve(__dirname, 'src/utils'),
				Hooks: path.resolve(__dirname, 'src/hooks'),
				Stores: path.resolve(__dirname, 'src/stores'),
				Configs: path.resolve(__dirname, 'src/configs')
			}
		},
		plugins: [
			new HtmlWebpackPlugin({ template: './src/index.html' }),
			new MiniCssExtractPlugin({
				filename: isDevelopment ? '[name].css' : '[name].[hash].css',
				chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
			})
		]
	}
}
