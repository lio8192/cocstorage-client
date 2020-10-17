import { AxiosRequestConfig } from 'axios';
import { PostStoragePayload } from 'modules/storages';

import axios from '../index';

export function fetchStorages(params: any) {
	const config: AxiosRequestConfig = {
		url: '/storages',
		method: 'GET',
		params
	};

	return axios(true)(config);
}

export function postStorage(data: PostStoragePayload) {
	const formData = new FormData();
	const { avatar } = data;

	Object.keys(data).forEach((key) => {
		if (key !== 'avatar') {
			// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
			// @ts-ignore
			formData.append(key, String(data[key]).toString());
		} else if (key === 'avatar') {
			if (avatar) {
				formData.append('avatar', avatar[0]);
			}
		}
	});
	const config: AxiosRequestConfig = {
		url: '/storages',
		method: 'POST',
		data: formData
	};
	return axios()(config);
}
