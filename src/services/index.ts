import axios from 'axios';

export default function axiosInstance(notAuthorization?: boolean) {
	axios.defaults.baseURL = process.env.API_BASE_URL;
	axios.defaults.headers = {
		Authorization: window.localStorage.getItem('coc-jwt'),
		'X-Api-Key': process.env.X_API_KEY
	};

	if (notAuthorization) {
		delete axios.defaults.headers.Authorization;
	}

	return axios;
}
