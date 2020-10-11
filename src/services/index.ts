import axios from 'axios';

export default function axiosInstance() {
	axios.defaults.baseURL = process.env.API_BASE_URL;
	axios.defaults.headers = {
		'X-Api-Key': process.env.X_API_KEY
	};

	return axios;
}
