import { AxiosRequestConfig } from 'axios';

import axios from './index';

export function fetchNotices() {
	const config: AxiosRequestConfig = {
		url: '/notices',
		method: 'GET',
		params: {
			page: 1,
			per: 4,
			orderBy: 'latest'
		}
	};

	return axios(true)(config);
}

export function fetchStorages() {
	const config: AxiosRequestConfig = {
		url: '/storages',
		method: 'GET',
		params: {
			page: 1,
			per: 4,
			orderBy: 'latest'
		}
	};

	return axios(true)(config);
}

export function fetchStorageBoards() {
	const config: AxiosRequestConfig = {
		url: '/storages',
		method: 'GET',
		params: {
			page: 1,
			per: 4,
			orderBy: 'latest'
		}
	};

	return axios(true)(config);
}
