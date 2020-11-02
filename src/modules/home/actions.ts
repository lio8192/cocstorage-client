import { createAction } from 'typesafe-actions';
import { HYDRATE } from 'next-redux-wrapper';
import { PreviousState, Notice, Storage } from './types';

export const hydrate = createAction(HYDRATE)<any>();

export const FETCH_MAIN_CONTENTS = 'home/FETCH_MAIN_CONTENTS';
export const FETCH_MAIN_CONTENTS_SUCCEEDED = 'home/FETCH_MAIN_CONTENTS_SUCCEEDED';
export const FETCH_MAIN_CONTENTS_FAILED = 'home/FETCH_MAIN_CONTENTS_FAILED';

export const FETCH_NOTICES = 'home/FETCH_NOTICES';
export const FETCH_NOTICES_SUCCEEDED = 'home/FETCH_NOTICES_SUCCEEDED';
export const FETCH_NOTICES_FAILED = 'home/FETCH_NOTICES_FAILED';

export const FETCH_STORAGES = 'home/FETCH_STORAGES';
export const FETCH_STORAGES_SUCCEEDED = 'home/FETCH_STORAGES_SUCCEEDED';
export const FETCH_STORAGES_FAILED = 'home/FETCH_STORAGES_FAILED';

export const fetchMainContents = createAction(FETCH_MAIN_CONTENTS)();
export const fetchMainContentsSucceeded = createAction(FETCH_MAIN_CONTENTS_SUCCEEDED)<PreviousState>();
export const fetchMainContentsFailed = createAction(FETCH_MAIN_CONTENTS_FAILED)<string>();

export const fetchNotices = createAction(FETCH_NOTICES)();
export const fetchNoticesSucceeded = createAction(FETCH_NOTICES_SUCCEEDED)<Notice[]>();
export const fetchNoticesFailed = createAction(FETCH_NOTICES_FAILED)();

export const fetchStorages = createAction(FETCH_STORAGES)();
export const fetchStoragesSucceeded = createAction(FETCH_STORAGES_SUCCEEDED)<Storage[]>();
export const fetchStoragesFailed = createAction(FETCH_STORAGES_FAILED)();
