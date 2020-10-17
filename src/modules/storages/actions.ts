import { createAction } from 'typesafe-actions';
import { HYDRATE } from 'next-redux-wrapper';
import { PostStoragePayload } from './types';

export const hydrate = createAction(HYDRATE)<any>();

export const HANDLE_STORAGE_MANAGE_DIALOG = 'storages/HANDLE_STORAGE_MANAGE_DIALOG';

export const POST_STORAGE = 'storages/POST_STORAGE';
export const POST_STORAGE_SUCCEEDED = 'storages/POST_STORAGE_SUCCEEDED';
export const POST_STORAGE_FAILED = 'storages/POST_STORAGE_FAILED';

export const handleStorageManageDialog = createAction(HANDLE_STORAGE_MANAGE_DIALOG)();

export const postStorage = createAction(POST_STORAGE)<PostStoragePayload>();
export const postStorageSucceeded = createAction(POST_STORAGE_SUCCEEDED)();
export const postStorageFailed = createAction(POST_STORAGE_FAILED)();
