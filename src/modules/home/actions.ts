import { createAction } from 'typesafe-actions';
import { HYDRATE } from 'next-redux-wrapper';
import { Notice, Storage, StorageBoard } from './types';

export const hydrate = createAction(HYDRATE)<any>();

export const FETCH_NOTICES = 'home/FETCH_NOTICES';
export const FETCH_NOTICES_SUCCEEDED = 'home/FETCH_NOTICES_SUCCEEDED';
export const FETCH_NOTICES_FAILED = 'home/FETCH_NOTICES_FAILED';

export const FETCH_STORAGES = 'home/FETCH_STORAGES';
export const FETCH_STORAGES_SUCCEEDED = 'home/FETCH_STORAGES_SUCCEEDED';
export const FETCH_STORAGES_FAILED = 'home/FETCH_STORAGES_FAILED';

export const FETCH_LATEST_STORAGE_BOARDS = 'home/FETCH_LATEST_STORAGE_BOARDS';
export const FETCH_LATEST_STORAGE_BOARDS_SUCCEEDED = 'home/FETCH_LATEST_STORAGE_BOARDS_SUCCEEDED';
export const FETCH_LATEST_STORAGE_BOARDS_FAILED = 'home/FETCH_LATEST_STORAGE_BOARDS_FAILED';

export const FETCH_POPULAR_STORAGE_BOARDS = 'home/FETCH_POPULAR_STORAGE_BOARDS';
export const FETCH_POPULAR_STORAGE_BOARDS_SUCCEEDED = 'home/FETCH_POPULAR_STORAGE_BOARDS_SUCCEEDED';
export const FETCH_POPULAR_STORAGE_BOARDS_FAILED = 'home/FETCH_POPULAR_STORAGE_BOARDS_FAILED';

export const fetchNotices = createAction(FETCH_NOTICES)();
export const fetchNoticesSucceeded = createAction(FETCH_NOTICES_SUCCEEDED)<Notice[]>();
export const fetchNoticesFailed = createAction(FETCH_NOTICES_FAILED)();

export const fetchStorages = createAction(FETCH_STORAGES)();
export const fetchStoragesSucceeded = createAction(FETCH_STORAGES_SUCCEEDED)<Storage[]>();
export const fetchStoragesFailed = createAction(FETCH_STORAGES_FAILED)();

export const fetchLatestStorageBoards = createAction(FETCH_LATEST_STORAGE_BOARDS)();
export const fetchLatestStorageBoardsSucceeded = createAction(FETCH_LATEST_STORAGE_BOARDS_SUCCEEDED)<StorageBoard[]>();
export const fetchLatestStorageBoardsFailed = createAction(FETCH_LATEST_STORAGE_BOARDS_FAILED)();

export const fetchPopularStorageBoards = createAction(FETCH_POPULAR_STORAGE_BOARDS)();
export const fetchPopularStorageBoardsSucceeded = createAction(FETCH_POPULAR_STORAGE_BOARDS_SUCCEEDED)<
	StorageBoard[]
>();
export const fetchPopularStorageBoardsFailed = createAction(FETCH_POPULAR_STORAGE_BOARDS_FAILED)();
