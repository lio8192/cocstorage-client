import { ActionType } from 'typesafe-actions';
import {
	hydrate,
	fetchMainContents,
	fetchMainContentsSucceeded,
	fetchMainContentsFailed,
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
import { Board } from '../boardDetail';

const actions = {
	hydrate,
	fetchMainContents,
	fetchMainContentsSucceeded,
	fetchMainContentsFailed,
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

export type PreviousNotice = {
	admin_id: number | null;
	category_id: string | null;
	content: string | null;
	id: number | null;
	register_date: string | null;
	subject: string | null;
	view_count: number | null;
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

export type PreviousState = {
	category: Category;
	boardList: Board[];
	dailyPopularList: Board[];
	storageList: Board[];
	noticeList: PreviousNotice[];
	pending: boolean;
	error: boolean;
	errorMessage: string | null;
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
	previousState: PreviousState;
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
