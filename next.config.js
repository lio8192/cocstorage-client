const withImages = require('next-images');

module.exports = withImages({
	webpack(config) {
		return config;
	},
	env: {
		PREVIOUS_API_BASE_URL: process.env.REACT_APP_PREVIOUS_API_BASE_URL,
		API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
		X_API_KEY: process.env.REACT_APP_X_API_KEY,
		JWT_SECRET_KEY: process.env.REACT_APP_JWT_SECRET_KEY
	}
});
