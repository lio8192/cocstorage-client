import { AxiosRequestConfig } from 'axios';
import { FetchNoticesPayload, PutNoticePayload } from 'modules/notices';

import axios from '../index';

export function fetchNotices(params: FetchNoticesPayload) {
	const config: AxiosRequestConfig = {
		url: '/notices',
		method: 'GET',
		params
	};

	return axios(true)(config);
}

export function postNoticeDraft() {
	const config: AxiosRequestConfig = {
		url: '/admin/notices/drafts',
		method: 'POST'
	};

	return axios()(config);
}

export function postNoticeImage(id: number, image: Blob) {
	const formData = new FormData();
	formData.append('image', image);
	const config: AxiosRequestConfig = {
		url: `/admin/notices/${id}/images`,
		method: 'POST',
		data: formData
	};

	return axios()(config);
}

export function putNotice(data: PutNoticePayload) {
	const {
		id, subject, content, description
	} = data;
	const config: AxiosRequestConfig = {
		url: `/admin/notices/${id}`,
		method: 'PUT',
		data: {
			subject,
			content,
			description
		}
	};

	return axios()(config);
}

export function fetchNoticeEditDetail(id: number) {
	const config: AxiosRequestConfig = {
		url: `/admin/notices/${id}/edit`,
		method: 'GET'
	};

	return axios()(config);
}
