import axios from 'axios';

export default function axiosInstance() {
	axios.defaults.baseURL = process.env.PREVIOUS_API_BASE_URL;

	return axios;
}
