import { AxiosRequestConfig } from 'axios';
import {
	FetchNoticeDetailCommentsPayload,
	PostNoticeDetailCommentPayload,
	PostNonMemberNoticeDetailCommentPayload,
	PostNoticeDetailReplyPayload,
	PostNonMemberNoticeDetailReplyPayload,
	DeleteNoticeDetailPayload,
	DeleteNoticeDetailCommentPayload,
	DeleteNonMemberNoticeDetailCommentPayload,
	DeleteNoticeDetailReplyPayload,
	DeleteNonMemberNoticeDetailReplyPayload
} from 'modules/notices/detail';

import axios from '../../index';

export function fetchNoticeDetail(id: number) {
	const config: AxiosRequestConfig = {
		url: `/admin/notices/${id}`,
		method: 'GET'
	};

	return axios(true)(config);
}

export function putNoticeDetailViewCount(id: number) {
	const config: AxiosRequestConfig = {
		url: `/admin/notices/${id}/view-count`,
		method: 'PUT'
	};

	return axios(true)(config);
}

export function fetchNoticeDetailComments(data: FetchNoticeDetailCommentsPayload) {
	const {
		noticeId, per, page, orderBy
	} = data;
	const config: AxiosRequestConfig = {
		url: `/admin/notices/${noticeId}/comments`,
		method: 'GET',
		params: {
			per,
			page,
			orderBy
		}
	};

	return axios(true)(config);
}

export function postNoticeDetailComment(data: PostNoticeDetailCommentPayload) {
	const { noticeId, content } = data;
	const config: AxiosRequestConfig = {
		url: `/admin/notices/${noticeId}/comments`,
		method: 'POST',
		data: {
			content
		}
	};

	return axios()(config);
}

export function postNonMemberNoticeDetailComment(data: PostNonMemberNoticeDetailCommentPayload) {
	const {
		noticeId, nickname, password, content
	} = data;
	const config: AxiosRequestConfig = {
		url: `/admin/notices/${noticeId}/comments/non-members`,
		method: 'POST',
		data: {
			nickname,
			password,
			content
		}
	};

	return axios(true)(config);
}

export function postNoticeDetailReply(data: PostNoticeDetailReplyPayload) {
	const { noticeId, noticeCommentId, content } = data;
	const config: AxiosRequestConfig = {
		url: `/admin/notices/${noticeId}/comments/${noticeCommentId}/replies`,
		method: 'POST',
		data: {
			content
		}
	};

	return axios()(config);
}

export function postNonMemberNoticeDetailReply(data: PostNonMemberNoticeDetailReplyPayload) {
	const {
		noticeId, noticeCommentId, nickname, password, content
	} = data;
	const config: AxiosRequestConfig = {
		url: `/admin/notices/${noticeId}/comments/${noticeCommentId}/replies/non-members`,
		method: 'POST',
		data: {
			nickname,
			password,
			content
		}
	};

	return axios(true)(config);
}

export function deleteNoticeDetail(data: DeleteNoticeDetailPayload) {
	const { id } = data;
	const config: AxiosRequestConfig = {
		url: `/admin/notices/${id}`,
		method: 'DELETE'
	};

	return axios()(config);
}

export function deleteNoticeDetailComment(data: DeleteNoticeDetailCommentPayload) {
	const { noticeId, id } = data;
	const config: AxiosRequestConfig = {
		url: `/admin/notices/${noticeId}/comments/${id}`,
		method: 'DELETE'
	};

	return axios()(config);
}

export function deleteNonMemberNoticeDetailComment(data: DeleteNonMemberNoticeDetailCommentPayload) {
	const { noticeId, id, password } = data;
	const config: AxiosRequestConfig = {
		url: `/admin/notices/${noticeId}/comments/non-members/${id}`,
		method: 'DELETE',
		data: {
			password
		}
	};

	return axios(true)(config);
}

export function deleteNoticeDetailReply(data: DeleteNoticeDetailReplyPayload) {
	const { noticeId, noticeCommentId, id } = data;
	const config: AxiosRequestConfig = {
		url: `/admin/notices/${noticeId}/comments/${noticeCommentId}/replies/${id}`,
		method: 'DELETE'
	};

	return axios()(config);
}

export function deleteNonMemberNoticeDetailReply(data: DeleteNonMemberNoticeDetailReplyPayload) {
	const {
		noticeId, noticeCommentId, id, password
	} = data;
	const config: AxiosRequestConfig = {
		url: `/admin/notices/${noticeId}/comments/${noticeCommentId}/replies/non-members/${id}`,
		method: 'DELETE',
		data: {
			password
		}
	};

	return axios(true)(config);
}
