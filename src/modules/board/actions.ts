import { createAction } from 'typesafe-actions';
import { HYDRATE } from 'next-redux-wrapper';
import {
	BoardState, Pagination, SearchState, FetchBoardPayload
} from './types';

export const hydrate = createAction(HYDRATE)<any>();

export const FETCH_BOARDS = 'board/FETCH_BOARDS';
export const FETCH_BOARDS_SUCCEEDED = 'board/FETCH_BOARDS_SUCCEEDED';
export const FETCH_BOARDS_FAILED = 'board/FETCH_BOARDS_FAILED';

export const HANDLE_BOARDS_SEARCH_STATE = 'board/HANDLE_BOARDS_SEARCH_STATE';

export const HANDLE_BOARDS_CLICK_COUNT_STATE = 'board/HANDLE_BOARDS_CLICK_COUNT_STATE';

export const CLEAR_BOARDS_RELATED_STATE = 'board/CLEAR_BOARDS_RELATED_STATE';

export const HANDLE_PENDING = 'board/HANDLE_PENDING';

export const HANDLE_PAGINATION = 'board/HANDLE_PAGINATION';

export const fetchBoards = createAction(FETCH_BOARDS)<FetchBoardPayload>();
export const fetchBoardsSucceeded = createAction(FETCH_BOARDS_SUCCEEDED)<BoardState>();
export const fetchBoardsFailed = createAction(FETCH_BOARDS_FAILED)();

export const handleBoardsSearchState = createAction(HANDLE_BOARDS_SEARCH_STATE)<SearchState>();

export const handleBoardClickCountState = createAction(HANDLE_BOARDS_CLICK_COUNT_STATE)();

export const clearBoardsRelatedState = createAction(CLEAR_BOARDS_RELATED_STATE)();

export const handlePending = createAction(HANDLE_PENDING)<boolean>();

export const handlePagination = createAction(HANDLE_PAGINATION)<Pagination>();
