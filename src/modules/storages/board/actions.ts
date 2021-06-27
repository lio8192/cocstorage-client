import { createAction } from 'typesafe-actions';
import { HYDRATE } from 'next-redux-wrapper';
import {
	FetchStorageBoardsPayload,
	PutStorageBoardPayload,
	PutNonMemberStorageBoardPayload,
	Storage,
	StorageBoard,
	StorageBoardDetail,
	Pagination,
	FetchNonMemberStorageBoardEditDetailPayload,
	FetchStorageBoardEditDetailPayload
} from './types';

export const hydrate = createAction(HYDRATE)<any>();

export const FETCH_STORAGE_DETAIL = 'storages/board/FETCH_STORAGE_DETAIL';
export const FETCH_STORAGE_DETAIL_SUCCEEDED = 'storages/board/FETCH_STORAGE_DETAIL_SUCCEEDED';
export const FETCH_STORAGE_DETAIL_FAILED = 'storages/board/FETCH_STORAGE_DETAIL_FAILED';

export const FETCH_STORAGE_BOARDS = 'storages/board/FETCH_STORAGE_BOARDS';
export const FETCH_STORAGE_BOARDS_SUCCEEDED = 'storages/board/FETCH_STORAGE_BOARDS_SUCCEEDED';
export const FETCH_STORAGE_BOARDS_FAILED = 'storages/board/FETCH_STORAGE_BOARDS_FAILED';

export const POST_STORAGE_BOARD_DRAFT = 'storages/board/POST_STORAGE_BOARD_DRAFT';
export const POST_STORAGE_BOARD_DRAFT_SUCCEEDED = 'storages/board/POST_STORAGE_BOARD_DRAFT_SUCCEEDED';
export const POST_STORAGE_BOARD_DRAFT_FAILED = 'storages/board/POST_STORAGE_BOARD_DRAFT_FAILED';

export const POST_NON_MEMBER_STORAGE_BOARD_DRAFT = 'storages/board/POST_NON_MEMBER_STORAGE_BOARD_DRAFT';
export const POST_NON_MEMBER_STORAGE_BOARD_DRAFT_SUCCEEDED =	'storages/board/POST_NON_MEMBER_STORAGE_BOARD_DRAFT_SUCCEEDED';
export const POST_NON_MEMBER_STORAGE_BOARD_DRAFT_FAILED = 'storages/board/POST_NON_MEMBER_STORAGE_BOARD_DRAFT_FAILED';

export const PUT_STORAGE_BOARD = 'storages/board/PUT_STORAGE_BOARD';
export const PUT_STORAGE_BOARD_SUCCEEDED = 'storages/board/PUT_STORAGE_BOARD_SUCCEEDED';
export const PUT_STORAGE_BOARD_FAILED = 'storages/board/PUT_STORAGE_BOARD_FAILED';

export const PUT_NON_MEMBER_STORAGE_BOARD = 'storages/board/PUT_NON_MEMBER_STORAGE_BOARD';
export const PUT_NON_MEMBER_STORAGE_BOARD_SUCCEEDED = 'storages/board/PUT_NON_MEMBER_STORAGE_BOARD_SUCCEEDED';
export const PUT_NON_MEMBER_STORAGE_BOARD_FAILED = 'storages/board/PUT_NON_MEMBER_STORAGE_BOARD_FAILED';

export const FETCH_STORAGE_BOARD_EDIT_DETAIL = 'storages/board/FETCH_STORAGE_BOARD_EDIT_DETAIL';
export const FETCH_STORAGE_BOARD_EDIT_DETAIL_SUCCEEDED = 'storages/board/FETCH_STORAGE_BOARD_EDIT_DETAIL_SUCCEEDED';
export const FETCH_STORAGE_BOARD_EDIT_DETAIL_FAILED = 'storages/board/FETCH_STORAGE_BOARD_EDIT_DETAIL_FAILED';

export const FETCH_NON_MEMBER_STORAGE_BOARD_EDIT_DETAIL = 'storages/board/FETCH_NON_MEMBER_STORAGE_BOARD_EDIT_DETAIL';
export const FETCH_NON_MEMBER_STORAGE_BOARD_EDIT_DETAIL_SUCCEEDED =	'storages/board/FETCH_NON_MEMBER_STORAGE_BOARD_EDIT_DETAIL_SUCCEEDED';
export const FETCH_NON_MEMBER_STORAGE_BOARD_EDIT_DETAIL_FAILED =	'storages/board/FETCH_NON_MEMBER_STORAGE_BOARD_EDIT_DETAIL_FAILED';

export const CLEAR_NON_MEMBER_STORAGE_BOARD_EDIT_AUTHENTICATED =	'storages/board/CLEAR_NON_MEMBER_STORAGE_BOARD_EDIT_AUTHENTICATED';

export const fetchStorageDetail = createAction(FETCH_STORAGE_DETAIL)<string>();
export const fetchStorageDetailSucceeded = createAction(FETCH_STORAGE_DETAIL_SUCCEEDED)<Storage>();
export const fetchStorageDetailFailed = createAction(FETCH_STORAGE_DETAIL_FAILED)();

export const fetchStorageBoards = createAction(FETCH_STORAGE_BOARDS)<FetchStorageBoardsPayload>();
export const fetchStorageBoardsSucceeded = createAction(FETCH_STORAGE_BOARDS_SUCCEEDED)<{
	boards: StorageBoard[];
	pagination: Pagination;
}>();
export const fetchStorageBoardsFailed = createAction(FETCH_STORAGE_BOARDS_FAILED)();

export const postStorageBoardDraft = createAction(POST_STORAGE_BOARD_DRAFT)<number>();
export const postStorageBoardDraftSucceeded = createAction(POST_STORAGE_BOARD_DRAFT_SUCCEEDED)<number>();
export const postStorageBoardDraftFailed = createAction(POST_STORAGE_BOARD_DRAFT_FAILED)();

export const postNonMemberStorageBoardDraft = createAction(POST_NON_MEMBER_STORAGE_BOARD_DRAFT)<number>();
export const postNonMemberStorageBoardDraftSucceeded = createAction(
	POST_NON_MEMBER_STORAGE_BOARD_DRAFT_SUCCEEDED
)<number>();
export const postNonMemberStorageBoardDraftFailed = createAction(POST_NON_MEMBER_STORAGE_BOARD_DRAFT_FAILED)();

export const putStorageBoard = createAction(PUT_STORAGE_BOARD)<PutStorageBoardPayload>();
export const putStorageBoardSucceeded = createAction(PUT_STORAGE_BOARD_SUCCEEDED)();
export const putStorageBoardFailed = createAction(PUT_STORAGE_BOARD_FAILED)();

export const putNonMemberStorageBoard = createAction(PUT_NON_MEMBER_STORAGE_BOARD)<PutNonMemberStorageBoardPayload>();
export const putNonMemberStorageBoardSucceeded = createAction(PUT_NON_MEMBER_STORAGE_BOARD_SUCCEEDED)();
export const putNonMemberStorageBoardFailed = createAction(PUT_NON_MEMBER_STORAGE_BOARD_FAILED)();

export const fetchStorageBoardEditDetail = createAction(
	FETCH_STORAGE_BOARD_EDIT_DETAIL
)<FetchStorageBoardEditDetailPayload>();
export const fetchStorageBoardEditDetailSucceeded = createAction(
	FETCH_STORAGE_BOARD_EDIT_DETAIL_SUCCEEDED
)<StorageBoardDetail>();
export const fetchStorageBoardEditDetailFailed = createAction(FETCH_STORAGE_BOARD_EDIT_DETAIL_FAILED)();

export const fetchNonMemberStorageBoardEditDetail = createAction(
	FETCH_NON_MEMBER_STORAGE_BOARD_EDIT_DETAIL
)<FetchNonMemberStorageBoardEditDetailPayload>();
export const fetchNonMemberStorageBoardEditDetailSucceeded = createAction(
	FETCH_NON_MEMBER_STORAGE_BOARD_EDIT_DETAIL_SUCCEEDED
)<StorageBoardDetail>();
export const fetchNonMemberStorageBoardEditDetailFailed = createAction(
	FETCH_NON_MEMBER_STORAGE_BOARD_EDIT_DETAIL_FAILED
)();

export const clearNonMemberStorageBoardEditAuthenticated = createAction(
	CLEAR_NON_MEMBER_STORAGE_BOARD_EDIT_AUTHENTICATED
)();
