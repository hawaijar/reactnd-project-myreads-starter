const path = require('path');

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
		port: 9000
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
				use: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: 'style!css'
			}
		]
	}
};
