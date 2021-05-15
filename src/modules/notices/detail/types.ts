import { ActionType } from 'typesafe-actions';
import {
	hydrate,
	fetchNoticeDetail,
	fetchNoticeDetailSucceeded,
	fetchNoticeDetailFailed,
	putNoticeDetailViewCount,
	putNoticeDetailViewCountSucceeded,
	putNoticeDetailViewCountFailed,
	fetchNoticeDetailComments,
	fetchNoticeDetailCommentsSucceeded,
	fetchNoticeDetailCommentsFailed,
	postNoticeDetailComment,
	postNoticeDetailCommentSucceeded,
	postNoticeDetailCommentFailed,
	postNonMemberNoticeDetailComment,
	postNonMemberNoticeDetailCommentSucceeded,
	postNonMemberNoticeDetailCommentFailed,
	handleNoticeDetailReplyWriteForm,
	handleNoticeDetailCommentsFetchParams,
	postNoticeDetailReply,
	postNoticeDetailReplySucceeded,
	postNoticeDetailReplyFailed,
	postNonMemberNoticeDetailReply,
	postNonMemberNoticeDetailReplySucceeded,
	postNonMemberNoticeDetailReplyFailed,
	handleNoticeDetailDeleteAuthDialog,
	deleteNoticeDetail,
	deleteNoticeDetailSucceeded,
	deleteNoticeDetailFailed,
	deleteNoticeDetailComment,
	deleteNoticeDetailCommentSucceeded,
	deleteNoticeDetailCommentFailed,
	deleteNonMemberNoticeDetailComment,
	deleteNonMemberNoticeDetailCommentSucceeded,
	deleteNonMemberNoticeDetailCommentFailed,
	deleteNoticeDetailReply,
	deleteNoticeDetailReplySucceeded,
	deleteNoticeDetailReplyFailed,
	deleteNonMemberNoticeDetailReply,
	deleteNonMemberNoticeDetailReplySucceeded,
	deleteNonMemberNoticeDetailReplyFailed
} from './actions';

const actions = {
	hydrate,
	fetchNoticeDetail,
	fetchNoticeDetailSucceeded,
	fetchNoticeDetailFailed,
	putNoticeDetailViewCount,
	putNoticeDetailViewCountSucceeded,
	putNoticeDetailViewCountFailed,
	fetchNoticeDetailComments,
	fetchNoticeDetailCommentsSucceeded,
	fetchNoticeDetailCommentsFailed,
	postNoticeDetailComment,
	postNoticeDetailCommentSucceeded,
	postNoticeDetailCommentFailed,
	postNonMemberNoticeDetailComment,
	postNonMemberNoticeDetailCommentSucceeded,
	postNonMemberNoticeDetailCommentFailed,
	handleNoticeDetailReplyWriteForm,
	handleNoticeDetailCommentsFetchParams,
	postNoticeDetailReply,
	postNoticeDetailReplySucceeded,
	postNoticeDetailReplyFailed,
	postNonMemberNoticeDetailReply,
	postNonMemberNoticeDetailReplySucceeded,
	postNonMemberNoticeDetailReplyFailed,
	handleNoticeDetailDeleteAuthDialog,
	deleteNoticeDetail,
	deleteNoticeDetailSucceeded,
	deleteNoticeDetailFailed,
	deleteNoticeDetailComment,
	deleteNoticeDetailCommentSucceeded,
	deleteNoticeDetailCommentFailed,
	deleteNonMemberNoticeDetailComment,
	deleteNonMemberNoticeDetailCommentSucceeded,
	deleteNonMemberNoticeDetailCommentFailed,
	deleteNoticeDetailReply,
	deleteNoticeDetailReplySucceeded,
	deleteNoticeDetailReplyFailed,
	deleteNonMemberNoticeDetailReply,
	deleteNonMemberNoticeDetailReplySucceeded,
	deleteNonMemberNoticeDetailReplyFailed
};

export type NoticeDetailActions = ActionType<typeof actions>;

export type NoticeDetail = {
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
	commentLatestPage: number;
};

export type NoticeDetailComment = {
	id: number;
	noticeId: number;
	user: {
		id: number;
		nickname: string;
		role: string;
		avatarUrl: string | null;
	} | null;
	nickname: string | null;
	content: string;
	thumbUp: number;
	thumbDown: number;
	isActive: boolean;
	isMember: boolean;
	createdIp: string;
	createdAt: string;
	updatedAt: string;
	replies: NoticeDetailReply[];
	selected: boolean;
};

export type NoticeDetailReply = {
	id: number;
	noticeCommentId: number;
	user: {
		id: number;
		nickname: string;
		role: string;
		avatarUrl: string | null;
	} | null;
	nickname: string | null;
	content: string;
	thumbUp: number;
	thumbDown: number;
	isActive: boolean;
	isMember: boolean;
	createdIp: string;
	createdAt: string;
	updatedAt: string;
};

export type Pagination = {
	totalPages: number;
	currentPage: number;
	prevPage: number | null;
	nextPage: number | null;
	perPage: number;
	isLastPage: boolean;
};

export type NoticeDetailCommentsFetchParams = {
	noticeId: number;
	orderBy: string;
	per: number;
	page: number;
};

export type FetchNoticeDetailCommentsPayload = {
	noticeId: number;
	per: number;
	page: number;
	orderBy: string;
};

export type PostNoticeDetailCommentPayload = {
	noticeId: number;
	content: string;
	page?: number;
	per?: number;
	orderBy?: string;
};

export type PostNonMemberNoticeDetailCommentPayload = {
	noticeId: number;
	nickname: string | null;
	password: string | null;
	content: string;
	page?: number;
	per?: number;
	orderBy?: string;
};

export type PostNoticeDetailReplyPayload = {
	noticeId: number;
	noticeCommentId: number;
	content: string;
	page?: number;
	per?: number;
	orderBy?: string;
};

export type PostNonMemberNoticeDetailReplyPayload = {
	noticeId: number;
	noticeCommentId: number;
	nickname: string | null;
	password: string | null;
	content: string;
	page?: number;
	per?: number;
	orderBy?: string;
};

export type DeleteNoticeDetailPayload = {
	id: number;
};

export type DeleteNoticeDetailCommentPayload = {
	noticeId: number;
	id: number;
	page?: number;
	per?: number;
	orderBy?: string;
};

export type DeleteNonMemberNoticeDetailCommentPayload = {
	noticeId: number;
	id: number;
	password: string;
	page?: number;
	per?: number;
	orderBy?: string;
};

export type DeleteNoticeDetailReplyPayload = {
	noticeId: number;
	noticeCommentId: number;
	id: number;
	page?: number;
	per?: number;
	orderBy?: string;
};

export type DeleteNonMemberNoticeDetailReplyPayload = {
	noticeId: number;
	noticeCommentId: number;
	id: number;
	password: string;
	page?: number;
	per?: number;
	orderBy?: string;
};

export type NoticeDetailState = {
	detail: NoticeDetail;
	comments: {
		data: NoticeDetailComment[];
		pagination: Pagination;
		fetchParams: NoticeDetailCommentsFetchParams;
		pending: boolean;
		manage: {
			id: number;
			pending: boolean;
		};
	};
	replies: {
		manage: {
			id: number;
			pending: boolean;
		};
	};
	manage: {
		pending: boolean;
		deleteAuth: {
			open: boolean;
			dataId: number;
			subTitle: string;
			type: string;
		};
	};
	pending: boolean;
};
