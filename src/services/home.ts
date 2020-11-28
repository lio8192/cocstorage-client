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

export function fetchLatestStorageBoards() {
	const config: AxiosRequestConfig = {
		url: '/storages/boards/latest',
		method: 'GET'
	};

	return axios(true)(config);
}

export function fetchPopularStorageBoards() {
	const config: AxiosRequestConfig = {
		url: '/storages/boards/popular',
		method: 'GET'
	};

	return axios(true)(config);
}
