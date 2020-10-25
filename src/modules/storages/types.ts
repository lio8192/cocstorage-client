import { ActionType } from 'typesafe-actions';
import {
	hydrate,
	handleStorageManageDialog,
	fetchStorages,
	fetchStoragesSucceeded,
	fetchStoragesFailed,
	handlePagination,
	handleFetchParams,
	postStorage,
	postStorageSucceeded,
	postStorageFailed
} from './actions';

const actions = {
	hydrate,
	handleStorageManageDialog,
	fetchStorages,
	fetchStoragesSucceeded,
	fetchStoragesFailed,
	handlePagination,
	handleFetchParams,
	postStorage,
	postStorageSucceeded,
	postStorageFailed
};

export type StoragesActions = ActionType<typeof actions>;

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
	name: string | null;
	orderBy: string;
};

export type FetchStoragesPayload = {
	name: string | null;
	per: number;
	page: number;
	orderBy: string;
};

export type PostStoragePayload = {
	name: string;
	description: string;
	path: string;
	avatar: FileList | null;
};

export type StoragesState = {
	storages: Storage[];
	pagination: Pagination;
	fetchParams: FetchParams;
	pending: boolean;
	manage: {
		open: boolean;
		pending: boolean;
	};
};
