const withImages = require('next-images');

module.exports = withImages({
	webpack(config) {
		config.module.rules.push({
			test: /\.(woff2)$/,
			loader: 'url-loader?limit=1000000'
		});
		return config;
	},
	env: {
		API_BASE_URL: process.env.API_BASE_URL,
		X_API_KEY: process.env.X_API_KEY,
		JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
	}
});
