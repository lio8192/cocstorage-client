import { ActionType } from 'typesafe-actions';
import {
	hydrate,
	fetchNotices,
	fetchNoticesSucceeded,
	fetchNoticesFailed,
	fetchStorages,
	fetchStoragesSucceeded,
	fetchStoragesFailed,
	fetchLatestStorageBoards,
	fetchLatestStorageBoardsSucceeded,
	fetchLatestStorageBoardsFailed,
	fetchPopularStorageBoards,
	fetchPopularStorageBoardsSucceeded,
	fetchPopularStorageBoardsFailed
} from './actions';

const actions = {
	hydrate,
	fetchNotices,
	fetchNoticesSucceeded,
	fetchNoticesFailed,
	fetchStorages,
	fetchStoragesSucceeded,
	fetchStoragesFailed,
	fetchLatestStorageBoards,
	fetchLatestStorageBoardsSucceeded,
	fetchLatestStorageBoardsFailed,
	fetchPopularStorageBoards,
	fetchPopularStorageBoardsSucceeded,
	fetchPopularStorageBoardsFailed
};

export type HomeActions = ActionType<typeof actions>;

export type Category = {
	id: string | null;
	name: string | null;
	register_date: string | null;
	update_date: string | null;
};

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

export type Storage = {
	id: number;
	storageCategoryId: number;
	userId: number;
	path: string;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	avatarUrl: string | null;
};

export type User = {
	id: number;
	nickname: string;
	role: string;
	avatarUrl: string | null;
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

export type HomeState = {
	notices: {
		data: Notice[];
		pending: boolean;
	};
	storages: {
		data: Storage[];
		pending: boolean;
	};
	latestStorageBoards: {
		data: StorageBoard[];
		pending: boolean;
	};
	popularStorageBoards: {
		data: StorageBoard[];
		pending: boolean;
	};
};
