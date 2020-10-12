import { AxiosRequestConfig } from 'axios';
import axios from './index';

export function postSignUp(data: { [key: string]: string }) {
	const config: AxiosRequestConfig = {
		url: '/users/sign-up',
		method: 'POST',
		data
	};
	return axios()(config);
}

export function putUserAuthentication(token: string) {
	const config: AxiosRequestConfig = {
		url: `/users/authentication/${token}`,
		method: 'PUT'
	};
	return axios()(config);
}

export function postPasswordFinder(data: { [key: string]: string }) {
	const config: AxiosRequestConfig = {
		url: '/users/password',
		method: 'POST',
		data: {
			v1_user: data
		}
	};
	return axios()(config);
}
