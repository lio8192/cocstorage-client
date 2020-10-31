import { createAction } from 'typesafe-actions';
import { HYDRATE } from 'next-redux-wrapper';
import {
	Notice, Pagination, FetchNoticesPayload, PutNoticePayload, FetchParams
} from './types';

export const hydrate = createAction(HYDRATE)<any>();

export const FETCH_NOTICES = 'notices/FETCH_NOTICES';
export const FETCH_NOTICES_SUCCEEDED = 'notices/FETCH_NOTICES_SUCCEEDED';
export const FETCH_NOTICES_FAILED = 'notices/FETCH_NOTICES_FAILED';

export const HANDLE_FETCH_PARAMS = 'notices/HANDLE_FETCH_PARAMS';
export const HANDLE_PAGINATION = 'notices/HANDLE_PAGINATION';

export const CLEAR_NOTICES = 'notices/CLEAR_NOTICES';

export const POST_NOTICE_DRAFT = 'notices/POST_NOTICE_DRAFT';
export const POST_NOTICE_DRAFT_SUCCEEDED = 'notices/POST_NOTICE_DRAFT_SUCCEEDED';
export const POST_NOTICE_DRAFT_FAILED = 'notices/POST_NOTICE_DRAFT_FAILED';

export const PUT_NOTICE = 'notices/PUT_NOTICE';
export const PUT_NOTICE_SUCCEEDED = 'notices/PUT_NOTICE_SUCCEEDED';
export const PUT_NOTICE_FAILED = 'notices/PUT_NOTICE_FAILED';

export const FETCH_NOTICE_EDIT_DETAIL = 'notices/FETCH_NOTICE_EDIT_DETAIL';
export const FETCH_NOTICE_EDIT_DETAIL_SUCCEEDED = 'notices/FETCH_NOTICE_EDIT_DETAIL_SUCCEEDED';
export const FETCH_NOTICE_EDIT_DETAIL_FAILED = 'notices/FETCH_NOTICE_EDIT_DETAIL_FAILED';

export const fetchNotices = createAction(FETCH_NOTICES)<FetchNoticesPayload>();
export const fetchNoticesSucceeded = createAction(FETCH_NOTICES_SUCCEEDED)<Notice[]>();
export const fetchNoticesFailed = createAction(FETCH_NOTICES_FAILED)();

export const handleFetchParams = createAction(HANDLE_FETCH_PARAMS)<FetchParams>();
export const handlePagination = createAction(HANDLE_PAGINATION)<Pagination>();

export const clearNotices = createAction(CLEAR_NOTICES)();

export const postNoticeDraft = createAction(POST_NOTICE_DRAFT)();
export const postNoticeDraftSucceeded = createAction(POST_NOTICE_DRAFT_SUCCEEDED)<number>();
export const postNoticeDraftFailed = createAction(POST_NOTICE_DRAFT_FAILED)();

export const putNotice = createAction(PUT_NOTICE)<PutNoticePayload>();
export const putNoticeSucceeded = createAction(PUT_NOTICE_SUCCEEDED)();
export const putNoticeFailed = createAction(PUT_NOTICE_FAILED)();

export const fetchNoticeEditDetail = createAction(FETCH_NOTICE_EDIT_DETAIL)<number>();
export const fetchNoticeEditDetailSucceeded = createAction(FETCH_NOTICE_EDIT_DETAIL_SUCCEEDED)<Notice>();
export const fetchNoticeEditDetailFailed = createAction(FETCH_NOTICE_EDIT_DETAIL_FAILED)();
