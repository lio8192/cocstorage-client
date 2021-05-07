import { AxiosRequestConfig } from 'axios';
import {
	FetchStorageBoardsPayload,
	PutNonMemberStorageBoardPayload,
	PutStorageBoardPayload,
	FetchNonMemberStorageBoardEditDetailPayload,
	FetchStorageBoardEditDetailPayload
} from 'modules/storages/board';

import axios from '../../index';

export function fetchStorageDetail(path: number | string) {
	const config: AxiosRequestConfig = {
		url: `/storages/${path}`,
		method: 'GET'
	};

	return axios(true)(config);
}

export function fetchStorageBoards(data: FetchStorageBoardsPayload) {
	const {
		storageId, path, search, orderBy, per, page
	} = data;

	if (search?.value) {
		let params = {
			[search.type]: search.value,
			orderBy,
			per,
			page
		};

		if (search.type === 'all') {
			params = {
				nickname: search.value,
				subject: search.value,
				content: search.value,
				orderBy,
				per,
				page
			};
		}

		const config: AxiosRequestConfig = {
			url: `/storages/${storageId || path}/boards`,
			method: 'GET',
			params
		};

		return axios(true)(config);
	}
	const config: AxiosRequestConfig = {
		url: `/storages/${storageId || path}/boards`,
		method: 'GET',
		params: {
			orderBy,
			per,
			page
		}
	};

	return axios(true)(config);
}

export function postStorageBoardDraft(id: number) {
	const config: AxiosRequestConfig = {
		url: `/storages/${id}/boards/drafts`,
		method: 'POST'
	};

	return axios()(config);
}

export function postNonMemberStorageBoardDraft(id: number) {
	const config: AxiosRequestConfig = {
		url: `/storages/${id}/boards/non-members/drafts`,
		method: 'POST'
	};

	return axios(true)(config);
}

export function postStorageBoardImage(storageId: number, storageBoardId: number, image: File) {
	const formData = new FormData();
	formData.append('image', image);
	const config: AxiosRequestConfig = {
		url: `/storages/${storageId}/boards/non-members/${storageBoardId}/images`,
		method: 'POST',
		data: formData
	};

	return axios()(config);
}

export function postNonMemberStorageBoardImage(storageId: number, storageBoardId: number, image: File) {
	const formData = new FormData();
	formData.append('image', image);
	const config: AxiosRequestConfig = {
		url: `/storages/${storageId}/boards/non-members/${storageBoardId}/images`,
		method: 'POST',
		data: formData
	};

	return axios(true)(config);
}

export function putStorageBoard(data: PutStorageBoardPayload) {
	const { storageId, id } = data;
	const config: AxiosRequestConfig = {
		url: `/storages/${storageId}/boards/${id}`,
		method: 'PUT',
		data
	};

	return axios()(config);
}

export function putNonMemberStorageBoard(data: PutNonMemberStorageBoardPayload) {
	const { storageId, id } = data;
	const config: AxiosRequestConfig = {
		url: `/storages/${storageId}/boards/non-members/${id}`,
		method: 'PUT',
		data
	};

	return axios(true)(config);
}

export function fetchStorageBoardEditDetail(data: FetchStorageBoardEditDetailPayload) {
	const { storageId, id } = data;
	const config: AxiosRequestConfig = {
		url: `/storages/${storageId}/boards/${id}/edit`,
		method: 'GET'
	};

	return axios()(config);
}

export function fetchNonMemberStorageBoardEditDetail(data: FetchNonMemberStorageBoardEditDetailPayload) {
	const { storageId, id, password } = data;
	const config: AxiosRequestConfig = {
		url: `/storages/${storageId}/boards/non-members/${id}/edit`,
		method: 'PATCH',
		data: {
			password
		}
	};

	return axios(true)(config);
}
