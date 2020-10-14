import { AxiosRequestConfig } from 'axios';
import axios from './index';

export function postSignUp(data: { [key: string]: string }) {
	const config: AxiosRequestConfig = {
		url: '/users/sign-up',
		method: 'POST',
		data
	};
	return axios(true)(config);
}

export function putUserAuthentication(token: string) {
	const config: AxiosRequestConfig = {
		url: `/users/authentication/${token}`,
		method: 'PUT'
	};
	return axios(true)(config);
}

export function postPasswordFinder(data: { [key: string]: string }) {
	const config: AxiosRequestConfig = {
		url: '/users/password',
		method: 'POST',
		data: {
			v1_user: data
		}
	};
	return axios(true)(config);
}

export function postSignIn(data: { [key: string]: string }) {
	const config: AxiosRequestConfig = {
		url: '/users/sign-in',
		method: 'POST',
		data: {
			v1_user: data
		}
	};
	return axios(true)(config);
}

export function deleteSignOut() {
	const config: AxiosRequestConfig = {
		url: '/users/sign-out',
		method: 'DELETE'
	};
	return axios()(config);
}
