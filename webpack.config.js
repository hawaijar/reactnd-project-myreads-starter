const path = require('path');

module.exports = {
	entry: {
		app: path.join(__dirname, 'index.js')
	},
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js'
	},
	devtool: 'cheap-eval-source-map',

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
			{
				test: /\.jsx?$/,
				use: 'babel-loader'
			}
		]
	}
};
