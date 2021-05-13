import { ActionType } from 'typesafe-actions';
import {
	hydrate,
	fetchStorageDetailAndStorageBoardDetail,
	fetchStorageDetailAndStorageBoardDetailSucceeded,
	fetchStorageDetailAndStorageBoardDetailFailed,
	fetchStorageBoardDetail,
	fetchStorageBoardDetailSucceeded,
	fetchStorageBoardDetailFailed,
	putStorageBoardDetailViewCount,
	putStorageBoardDetailViewCountSucceeded,
	putStorageBoardDetailViewCountFailed,
	putStorageBoardDetailRecommend,
	putStorageBoardDetailRecommendSucceeded,
	putStorageBoardDetailRecommendFailed,
	putNonMemberStorageBoardDetailRecommend,
	putNonMemberStorageBoardDetailRecommendSucceeded,
	putNonMemberStorageBoardDetailRecommendFailed,
	closeStorageBoardDetailRecommendSnackbar,
	closeStorageBoardDetailRecommendErrorSnackbar,
	fetchStorageBoardDetailComments,
	fetchStorageBoardDetailCommentsSucceeded,
	fetchStorageBoardDetailCommentsFailed,
	postStorageBoardDetailComment,
	postStorageBoardDetailCommentSucceeded,
	postStorageBoardDetailCommentFailed,
	postNonMemberStorageBoardDetailComment,
	postNonMemberStorageBoardDetailCommentSucceeded,
	postNonMemberStorageBoardDetailCommentFailed,
	handleStorageBoardDetailReplyWriteForm,
	handleStorageBoardDetailCommentsFetchParams,
	postStorageBoardDetailReply,
	postStorageBoardDetailReplySucceeded,
	postStorageBoardDetailReplyFailed,
	postNonMemberStorageBoardDetailReply,
	postNonMemberStorageBoardDetailReplySucceeded,
	postNonMemberStorageBoardDetailReplyFailed,
	handleStorageBoardDetailDeleteAuthDialog,
	deleteStorageBoardDetail,
	deleteStorageBoardDetailSucceeded,
	deleteStorageBoardDetailFailed,
	deleteNonMemberStorageBoardDetail,
	deleteNonMemberStorageBoardDetailSucceeded,
	deleteNonMemberStorageBoardDetailFailed,
	deleteStorageBoardDetailComment,
	deleteStorageBoardDetailCommentSucceeded,
	deleteStorageBoardDetailCommentFailed,
	deleteNonMemberStorageBoardDetailComment,
	deleteNonMemberStorageBoardDetailCommentSucceeded,
	deleteNonMemberStorageBoardDetailCommentFailed,
	deleteStorageBoardDetailReply,
	deleteStorageBoardDetailReplySucceeded,
	deleteStorageBoardDetailReplyFailed,
	deleteNonMemberStorageBoardDetailReply,
	deleteNonMemberStorageBoardDetailReplySucceeded,
	deleteNonMemberStorageBoardDetailReplyFailed
} from './actions';

const actions = {
	hydrate,
	fetchStorageDetailAndStorageBoardDetail,
	fetchStorageDetailAndStorageBoardDetailSucceeded,
	fetchStorageDetailAndStorageBoardDetailFailed,
	fetchStorageBoardDetail,
	fetchStorageBoardDetailSucceeded,
	fetchStorageBoardDetailFailed,
	putStorageBoardDetailViewCount,
	putStorageBoardDetailViewCountSucceeded,
	putStorageBoardDetailViewCountFailed,
	putStorageBoardDetailRecommend,
	putStorageBoardDetailRecommendSucceeded,
	putStorageBoardDetailRecommendFailed,
	putNonMemberStorageBoardDetailRecommend,
	putNonMemberStorageBoardDetailRecommendSucceeded,
	putNonMemberStorageBoardDetailRecommendFailed,
	closeStorageBoardDetailRecommendSnackbar,
	closeStorageBoardDetailRecommendErrorSnackbar,
	fetchStorageBoardDetailComments,
	fetchStorageBoardDetailCommentsSucceeded,
	fetchStorageBoardDetailCommentsFailed,
	postStorageBoardDetailComment,
	postStorageBoardDetailCommentSucceeded,
	postStorageBoardDetailCommentFailed,
	postNonMemberStorageBoardDetailComment,
	postNonMemberStorageBoardDetailCommentSucceeded,
	postNonMemberStorageBoardDetailCommentFailed,
	handleStorageBoardDetailReplyWriteForm,
	handleStorageBoardDetailCommentsFetchParams,
	postStorageBoardDetailReply,
	postStorageBoardDetailReplySucceeded,
	postStorageBoardDetailReplyFailed,
	postNonMemberStorageBoardDetailReply,
	postNonMemberStorageBoardDetailReplySucceeded,
	postNonMemberStorageBoardDetailReplyFailed,
	handleStorageBoardDetailDeleteAuthDialog,
	deleteStorageBoardDetail,
	deleteStorageBoardDetailSucceeded,
	deleteStorageBoardDetailFailed,
	deleteNonMemberStorageBoardDetail,
	deleteNonMemberStorageBoardDetailSucceeded,
	deleteNonMemberStorageBoardDetailFailed,
	deleteStorageBoardDetailComment,
	deleteStorageBoardDetailCommentSucceeded,
	deleteStorageBoardDetailCommentFailed,
	deleteNonMemberStorageBoardDetailComment,
	deleteNonMemberStorageBoardDetailCommentSucceeded,
	deleteNonMemberStorageBoardDetailCommentFailed,
	deleteStorageBoardDetailReply,
	deleteStorageBoardDetailReplySucceeded,
	deleteStorageBoardDetailReplyFailed,
	deleteNonMemberStorageBoardDetailReply,
	deleteNonMemberStorageBoardDetailReplySucceeded,
	deleteNonMemberStorageBoardDetailReplyFailed
};

export type StorageBoardDetailActions = ActionType<typeof actions>;

export type StorageBoardDetail = {
	id: number;
	storage: {
		id: number;
		storageCategoryId: number;
		path: string;
		name: string;
		avatarUrl: string | null;
	};
	user: {
		id: number;
		nickname: string;
		role: string;
		avatarUrl: string | null;
	} | null;
	nickname: string | null;
	subject: string;
	content: string;
	description: string;
	viewCount: number;
	thumbUp: number;
	thumbDown: number;
	hasImage: boolean;
	hasVideo: boolean;
	isDraft: boolean;
	isActive: boolean;
	isMember: boolean;
	isPopular: boolean;
	createdIp: string;
	createdAt: string;
	updatedAt: string;
	thumbnailUrl: string | null;
	commentTotalCount: number;
	commentLatestPage: number;
	scrapCode: string;
	sourceCode: string;
};

export interface StorageBoardDetailComment {
	id: number;
	storageBoardId: number;
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
	replies: StorageBoardDetailReply[];
	selected: boolean;
}

export interface StorageBoardDetailReply {
	id: number;
	storageBoardCommentId: number;
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
}

export type Pagination = {
	totalPages: number;
	currentPage: number;
	prevPage: number | null;
	nextPage: number | null;
	perPage: number;
	isLastPage: boolean;
};

export type StorageBoardDetailCommentsFetchParams = {
	storageId: number;
	storageBoardId: number;
	orderBy: string;
	per: number;
	page: number;
};

export type PutStorageBoardDetailRecommendPayload = {
	storageId: number;
	id: number;
	type: number;
};

export type FetchStorageBoardDetailCommentsPayload = {
	storageId: number;
	storageBoardId: number;
	per: number;
	page: number;
	orderBy: string;
};

export type PostStorageBoardDetailCommentPayload = {
	storageId: number;
	storageBoardId: number;
	content: string;
};

export type PostNonMemberStorageBoardDetailCommentPayload = {
	storageId: number;
	storageBoardId: number;
	nickname: string | null;
	password: string | null;
	content: string;
};

export type PostStorageBoardDetailReplyPayload = {
	storageId: number;
	storageBoardId: number;
	storageBoardCommentId: number;
	content: string;
	page?: number;
};

export type PostNonMemberStorageBoardDetailReplyPayload = {
	storageId: number;
	storageBoardId: number;
	storageBoardCommentId: number;
	nickname: string | null;
	password: string | null;
	content: string;
	page?: number;
};

export type DeleteStorageBoardDetailPayload = {
	storageId: number;
	id: number;
};

export type DeleteNonMemberStorageBoardDetailPayload = {
	storageId: number;
	id: number;
	password: string;
};

export type DeleteStorageBoardDetailCommentPayload = {
	storageId: number;
	storageBoardId: number;
	id: number;
};

export type DeleteNonMemberStorageBoardDetailCommentPayload = {
	storageId: number;
	storageBoardId: number;
	id: number;
	password: string;
};

export type DeleteStorageBoardDetailReplyPayload = {
	storageId: number;
	storageBoardId: number;
	storageBoardCommentId: number;
	id: number;
	page?: number;
};

export type DeleteNonMemberStorageBoardDetailReplyPayload = {
	storageId: number;
	storageBoardId: number;
	storageBoardCommentId: number;
	id: number;
	password: string;
	page?: number;
};

export type StorageBoardDetailState = {
	detail: StorageBoardDetail;
	recommend: {
		open: boolean;
		message: string;
		error: {
			open: boolean;
			message: string;
		};
		pending: boolean;
	};
	comments: {
		data: StorageBoardDetailComment[];
		pagination: Pagination;
		fetchParams: StorageBoardDetailCommentsFetchParams;
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
