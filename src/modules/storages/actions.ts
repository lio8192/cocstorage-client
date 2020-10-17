import { createAction } from 'typesafe-actions';
import { HYDRATE } from 'next-redux-wrapper';
import {
	FetchStoragesPayload, PostStoragePayload, Storage, Pagination
} from './types';

export const hydrate = createAction(HYDRATE)<any>();

export const HANDLE_STORAGE_MANAGE_DIALOG = 'storages/HANDLE_STORAGE_MANAGE_DIALOG';

export const FETCH_STORAGES = 'storages/FETCH_STORAGES';
export const FETCH_STORAGES_SUCCEEDED = 'storages/FETCH_STORAGES_SUCCEEDED';
export const FETCH_STORAGES_FAILED = 'storages/FETCH_STORAGES_FAILED';

export const HANDLE_PAGINATION = 'storages/HANDLE_PAGINATION';

export const POST_STORAGE = 'storages/POST_STORAGE';
export const POST_STORAGE_SUCCEEDED = 'storages/POST_STORAGE_SUCCEEDED';
export const POST_STORAGE_FAILED = 'storages/POST_STORAGE_FAILED';

export const handleStorageManageDialog = createAction(HANDLE_STORAGE_MANAGE_DIALOG)();

export const fetchStorages = createAction(FETCH_STORAGES)<FetchStoragesPayload>();
export const fetchStoragesSucceeded = createAction(FETCH_STORAGES_SUCCEEDED)<Storage[]>();
export const fetchStoragesFailed = createAction(FETCH_STORAGES_FAILED)();

export const handlePagination = createAction(HANDLE_PAGINATION)<Pagination>();

export const postStorage = createAction(POST_STORAGE)<PostStoragePayload>();
export const postStorageSucceeded = createAction(POST_STORAGE_SUCCEEDED)();
export const postStorageFailed = createAction(POST_STORAGE_FAILED)();
