import { AxiosRequestConfig } from 'axios';
import {
	PutStorageBoardDetailRecommendPayload,
	FetchStorageBoardDetailCommentsPayload,
	PostStorageBoardDetailCommentPayload,
	PostNonMemberStorageBoardDetailCommentPayload,
	PostStorageBoardDetailReplyPayload,
	PostNonMemberStorageBoardDetailReplyPayload,
	DeleteStorageBoardDetailPayload,
	DeleteNonMemberStorageBoardDetailPayload,
	DeleteStorageBoardDetailCommentPayload,
	DeleteNonMemberStorageBoardDetailCommentPayload,
	DeleteStorageBoardDetailReplyPayload,
	DeleteNonMemberStorageBoardDetailReplyPayload
} from 'modules/storages/board/detail';

import axios from '../../../index';

export function fetchStorageBoardDetail(storageId: number, id: number) {
	const config: AxiosRequestConfig = {
		url: `/storages/${storageId}/boards/${id}`,
		method: 'GET'
	};

	return axios(true)(config);
}

export function putStorageBoardDetailViewCount(storageId: number, id: number) {
	const config: AxiosRequestConfig = {
		url: `/storages/${storageId}/boards/${id}/view-count`,
		method: 'PUT'
	};

	return axios(true)(config);
}

export function putStorageBoardDetailRecommend(data: PutStorageBoardDetailRecommendPayload) {
	const { storageId, id, type } = data;
	const config: AxiosRequestConfig = {
		url: `/storages/${storageId}/boards/${id}/recommend`,
		method: 'PUT',
		data: {
			type
		}
	};

	return axios()(config);
}

export function putNonMemberStorageBoardDetailRecommend(data: PutStorageBoardDetailRecommendPayload) {
	const { storageId, id, type } = data;
	const config: AxiosRequestConfig = {
		url: `/storages/${storageId}/boards/non-members/${id}/recommend`,
		method: 'PUT',
		data: {
			type
		}
	};

	return axios(true)(config);
}

export function fetchStorageBoardDetailComments(data: FetchStorageBoardDetailCommentsPayload) {
	const {
		storageId, storageBoardId, per, page, orderBy
	} = data;
	const config: AxiosRequestConfig = {
		url: `/storages/${storageId}/boards/${storageBoardId}/comments`,
		method: 'GET',
		params: {
			per,
			page,
			orderBy
		}
	};

	return axios(true)(config);
}

export function postStorageBoardDetailComment(data: PostStorageBoardDetailCommentPayload) {
	const { storageId, storageBoardId, content } = data;
	const config: AxiosRequestConfig = {
		url: `/storages/${storageId}/boards/${storageBoardId}/comments`,
		method: 'POST',
		data: {
			content
		}
	};

	return axios()(config);
}

export function postNonMemberStorageBoardDetailComment(data: PostNonMemberStorageBoardDetailCommentPayload) {
	const {
		storageId, storageBoardId, nickname, password, content
	} = data;
	const config: AxiosRequestConfig = {
		url: `/storages/${storageId}/boards/${storageBoardId}/comments/non-members`,
		method: 'POST',
		data: {
			nickname,
			password,
			content
		}
	};

	return axios(true)(config);
}

export function postStorageBoardDetailReply(data: PostStorageBoardDetailReplyPayload) {
	const {
		storageId, storageBoardId, storageBoardCommentId, content
	} = data;
	const config: AxiosRequestConfig = {
		url: `/storages/${storageId}/boards/${storageBoardId}/comments/${storageBoardCommentId}/replies`,
		method: 'POST',
		data: {
			content
		}
	};

	return axios()(config);
}

export function postNonMemberStorageBoardDetailReply(data: PostNonMemberStorageBoardDetailReplyPayload) {
	const {
		storageId, storageBoardId, storageBoardCommentId, nickname, password, content
	} = data;
	const config: AxiosRequestConfig = {
		url: `/storages/${storageId}/boards/${storageBoardId}/comments/${storageBoardCommentId}/replies/non-members`,
		method: 'POST',
		data: {
			nickname,
			password,
			content
		}
	};

	return axios(true)(config);
}

export function deleteStorageBoardDetail(data: DeleteStorageBoardDetailPayload) {
	const { storageId, id } = data;
	const config: AxiosRequestConfig = {
		url: `/storages/${storageId}/boards/${id}`,
		method: 'DELETE'
	};

	return axios()(config);
}

export function deleteNonMemberStorageBoardDetail(data: DeleteNonMemberStorageBoardDetailPayload) {
	const { storageId, id, password } = data;
	const config: AxiosRequestConfig = {
		url: `/storages/${storageId}/boards/non-members/${id}`,
		method: 'DELETE',
		data: {
			password
		}
	};

	return axios(true)(config);
}

export function deleteStorageBoardDetailComment(data: DeleteStorageBoardDetailCommentPayload) {
	const { storageId, storageBoardId, id } = data;
	const config: AxiosRequestConfig = {
		url: `/storages/${storageId}/boards/${storageBoardId}/comments/${id}`,
		method: 'DELETE'
	};

	return axios()(config);
}

export function deleteNonMemberStorageBoardDetailComment(data: DeleteNonMemberStorageBoardDetailCommentPayload) {
	const {
		storageId, storageBoardId, id, password
	} = data;
	const config: AxiosRequestConfig = {
		url: `/storages/${storageId}/boards/${storageBoardId}/comments/non-members/${id}`,
		method: 'DELETE',
		data: {
			password
		}
	};

	return axios(true)(config);
}

export function deleteStorageBoardDetailReply(data: DeleteStorageBoardDetailReplyPayload) {
	const {
		storageId, storageBoardId, storageBoardCommentId, id
	} = data;
	const config: AxiosRequestConfig = {
		url: `/storages/${storageId}/boards/${storageBoardId}/comments/${storageBoardCommentId}/replies/${id}`,
		method: 'DELETE'
	};

	return axios()(config);
}

export function deleteNonMemberStorageBoardDetailReply(data: DeleteNonMemberStorageBoardDetailReplyPayload) {
	const {
		storageId, storageBoardId, storageBoardCommentId, id, password
	} = data;
	const config: AxiosRequestConfig = {
		url: `/storages/${storageId}/boards/${storageBoardId}/comments/${storageBoardCommentId}/replies/non-members/${id}`,
		method: 'DELETE',
		data: {
			password
		}
	};

	return axios(true)(config);
}
