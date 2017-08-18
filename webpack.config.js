const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		app: path.join(__dirname, './src/App.jsx')
	},
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js'
	},
	devtool: 'cheap-eval-source-map',
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		compress: true,
		port: 9000,
		historyApiFallback: true
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	stats: {
		colors: true,
		reasons: true,
		chunks: true
	},
	module: {
		rules: [
			// inside rules, before babel-loader
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'eslint-loader',
				exclude: /node_modules/
			},
			{
				test: /\.jsx?$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			},
			{
				test: /\.svg$/,
				loader: 'svg-url-loader'
			}
		]
	},
	plugins: [new ExtractTextPlugin('style.css')]
};
