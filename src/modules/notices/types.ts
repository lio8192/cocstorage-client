import { ActionType } from 'typesafe-actions';
import {
	hydrate,
	fetchFirstNotices,
	fetchFirstNoticesSucceeded,
	fetchFirstNoticesFailed,
	fetchNotices,
	fetchNoticesSucceeded,
	fetchNoticesFailed,
	handleFetchParams,
	handlePagination,
	clearNotices,
	postNoticeDraft,
	postNoticeDraftSucceeded,
	postNoticeDraftFailed,
	putNotice,
	putNoticeSucceeded,
	putNoticeFailed,
	fetchNoticeEditDetail,
	fetchNoticeEditDetailSucceeded,
	fetchNoticeEditDetailFailed
} from './actions';

const actions = {
	hydrate,
	fetchFirstNotices,
	fetchFirstNoticesSucceeded,
	fetchFirstNoticesFailed,
	fetchNotices,
	fetchNoticesSucceeded,
	fetchNoticesFailed,
	handleFetchParams,
	handlePagination,
	clearNotices,
	postNoticeDraft,
	postNoticeDraftSucceeded,
	postNoticeDraftFailed,
	putNotice,
	putNoticeSucceeded,
	putNoticeFailed,
	fetchNoticeEditDetail,
	fetchNoticeEditDetailSucceeded,
	fetchNoticeEditDetailFailed
};

export type NoticesActions = ActionType<typeof actions>;

export type Notice = {
	id: number;
	user: {
		id: number;
		nickname: string;
		role: string;
		avatarUrl: string | null;
	};
	subject: string;
	content: string;
	description: string;
	viewCount: number;
	isDraft: boolean;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	thumbnailUrl: string | null;
	commentTotalCount: number;
};

export type Pagination = {
	totalPages: number;
	currentPage: number;
	prevPage: number | null;
	nextPage: number | null;
	perPage: number;
	isLastPage: boolean;
};

export type FetchParams = {
	per: number;
	page: number;
	orderBy: string;
};

export type FetchNoticesPayload = {
	per: number;
	page: number;
	orderBy: string;
};

export type PutNoticePayload = {
	id: number;
	subject: string;
	content: string;
	description: string;
};

export type NoticesState = {
	notices: Notice[];
	pagination: Pagination;
	fetchParams: FetchParams;
	pending: boolean;
	manage: {
		id: number;
		detail: Notice;
		pending: boolean;
	};
	hasPageHistory: boolean;
};
