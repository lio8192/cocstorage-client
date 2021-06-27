import { ActionType } from 'typesafe-actions';
import {
	hydrate,
	fetchStorageDetail,
	fetchStorageDetailSucceeded,
	fetchStorageDetailFailed,
	fetchStorageBoards,
	fetchStorageBoardsSucceeded,
	fetchStorageBoardsFailed,
	postStorageBoardDraft,
	postStorageBoardDraftSucceeded,
	postStorageBoardDraftFailed,
	postNonMemberStorageBoardDraft,
	postNonMemberStorageBoardDraftSucceeded,
	postNonMemberStorageBoardDraftFailed,
	putStorageBoard,
	putStorageBoardSucceeded,
	putStorageBoardFailed,
	putNonMemberStorageBoard,
	putNonMemberStorageBoardSucceeded,
	putNonMemberStorageBoardFailed,
	fetchStorageBoardEditDetail,
	fetchStorageBoardEditDetailSucceeded,
	fetchStorageBoardEditDetailFailed,
	fetchNonMemberStorageBoardEditDetail,
	fetchNonMemberStorageBoardEditDetailSucceeded,
	fetchNonMemberStorageBoardEditDetailFailed,
	clearNonMemberStorageBoardEditAuthenticated
} from './actions';

const actions = {
	hydrate,
	fetchStorageDetail,
	fetchStorageDetailSucceeded,
	fetchStorageDetailFailed,
	fetchStorageBoards,
	fetchStorageBoardsSucceeded,
	fetchStorageBoardsFailed,
	postStorageBoardDraft,
	postStorageBoardDraftSucceeded,
	postStorageBoardDraftFailed,
	postNonMemberStorageBoardDraft,
	postNonMemberStorageBoardDraftSucceeded,
	postNonMemberStorageBoardDraftFailed,
	putStorageBoard,
	putStorageBoardSucceeded,
	putStorageBoardFailed,
	putNonMemberStorageBoard,
	putNonMemberStorageBoardSucceeded,
	putNonMemberStorageBoardFailed,
	fetchStorageBoardEditDetail,
	fetchStorageBoardEditDetailSucceeded,
	fetchStorageBoardEditDetailFailed,
	fetchNonMemberStorageBoardEditDetail,
	fetchNonMemberStorageBoardEditDetailSucceeded,
	fetchNonMemberStorageBoardEditDetailFailed,
	clearNonMemberStorageBoardEditAuthenticated
};

export type StorageBoardActions = ActionType<typeof actions>;

export type User = {
	id: number;
	nickname: string;
	role: string;
	avatarUrl: string | null;
};

export type Storage = {
	id: number;
	storageCategoryId: number;
	user: User;
	path: string;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	avatarUrl: string | null;
	pending: boolean;
};

export type StorageBoard = {
	id: number;
	storage: Storage;
	user: User;
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
};

export type Pagination = {
	totalPages: number;
	currentPage: number;
	prevPage: number | null;
	nextPage: number | null;
	perPage: number;
	isLastPage: boolean;
};

export type StorageBoardDetail = {
	id: number;
	storage: {
		id: number;
		storageCategoryId: number;
		path: string;
		name: string;
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
	createdIp: string;
	createdAt: string;
	updatedAt: string;
	thumbnailUrl: string | null;
	commentTotalCount: number;
};

export type FetchStorageBoardsPayload = {
	storageId: number;
	path?: string;
	search?: {
		type: string;
		value: string | null;
	};
	orderBy: string;
	per: number;
	page: number;
};

export type PutStorageBoardPayload = {
	storageId: number;
	id: number;
	subject: string;
	content: string;
	description: string;
};

export type PutNonMemberStorageBoardPayload = {
	storageId: number;
	id: number;
	nickname: string | null;
	password: string | null;
	subject: string;
	content: string;
	description: string;
};

export type FetchStorageBoardEditDetailPayload = {
	storageId: number;
	id: number;
};

export type FetchNonMemberStorageBoardEditDetailPayload = {
	storageId: number;
	id: number;
	password: string;
};

export type StorageBoardState = {
	storage: Storage;
	boards: StorageBoard[];
	pagination: Pagination;
	pending: boolean;
	manage: {
		id: number;
		detail: StorageBoardDetail;
		editAuthenticated: boolean;
		pending: boolean;
	};
};
