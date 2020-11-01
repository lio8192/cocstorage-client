import { AxiosRequestConfig } from 'axios';
import {
	DeleteUserPayload,
	FetchPrivacyPayload,
	PutPasswordPayload,
	PutNicknamePayload,
	PutAvatarPayload
} from 'modules/mypage';

import axios from '../index';

export function fetchPrivacy(data: FetchPrivacyPayload) {
	const { userId, password } = data;
	const config: AxiosRequestConfig = {
		url: `/users/${userId}/privacy`,
		method: 'PATCH',
		data: {
			password
		}
	};

	return axios()(config);
}

export function putPassword(data: PutPasswordPayload) {
	const { userId, currentPassword, password } = data;
	const config: AxiosRequestConfig = {
		url: `/users/${userId}`,
		method: 'PUT',
		data: {
			current_password: currentPassword,
			password
		}
	};

	return axios()(config);
}

export function deleteUser(data: DeleteUserPayload) {
	const { userId, password } = data;
	const config: AxiosRequestConfig = {
		url: `/users/${userId}`,
		method: 'DELETE',
		data: {
			password
		}
	};

	return axios()(config);
}

export function putNickname(data: PutNicknamePayload) {
	const { userId, nickname } = data;
	const config: AxiosRequestConfig = {
		url: `/users/${userId}`,
		method: 'PUT',
		data: {
			nickname
		}
	};

	return axios()(config);
}

export function putAvatar(data: PutAvatarPayload) {
	const { userId, avatar } = data;
	const formData = new FormData();
	formData.append('avatar', avatar);
	const config: AxiosRequestConfig = {
		url: `/users/${userId}`,
		method: 'PUT',
		data: formData
	};

	return axios()(config);
}
