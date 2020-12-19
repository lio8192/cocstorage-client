import { createReducer } from 'typesafe-actions';
import { HYDRATE } from 'next-redux-wrapper';
import {
	FETCH_BOARDS,
	FETCH_BOARDS_SUCCEEDED,
	HANDLE_BOARDS_SEARCH_STATE,
	HANDLE_BOARDS_CLICK_COUNT_STATE,
	CLEAR_BOARDS_RELATED_STATE,
	FETCH_BOARDS_FAILED,
	HANDLE_PAGINATION
} from './actions';
import { BoardAction, BoardState } from './types';

const initialState: BoardState = {
	boardList: [],
	category: {
		id: null,
		name: null,
		register_date: null,
		update_date: null
	},
	searchState: {
		handle: false,
		type: 'all',
		value: ''
	},
	pagination: {
		allCount: 0,
		page: 1,
		pageBlock: 0,
		pageCount: 0,
		row: 0,
		startPage: 0,
		endPage: 0
	},
	count: 0,
	error: false,
	errorMessage: null
};

const board = createReducer<BoardState, BoardAction>(initialState, {
	[HYDRATE]: (state, { payload }) => ({
		...state,
		...payload.board
	}),
	[FETCH_BOARDS]: (state) => ({
		...state,
		pending: true,
		error: false,
		errorMessage: null
	}),
	[FETCH_BOARDS_SUCCEEDED]: (state, { payload }) => ({
		...state,
		...payload,
		pending: false,
		error: false,
		errorMessage: null
	}),
	[FETCH_BOARDS_FAILED]: (state) => ({
		...state,
		pending: false,
		error: true,
		errorMessage: '알 수 없는 오류입니다.'
	}),
	[HANDLE_BOARDS_SEARCH_STATE]: (state, { payload }) => ({
		...state,
		searchState: {
			...payload
		}
	}),
	[HANDLE_BOARDS_CLICK_COUNT_STATE]: (state) => ({
		...state,
		count: state.count + 1
	}),
	[CLEAR_BOARDS_RELATED_STATE]: (state) => ({
		...state,
		searchState: {
			handle: false,
			type: 'all',
			value: ''
		},
		pagination: {
			allCount: 0,
			page: 1,
			pageBlock: 0,
			pageCount: 0,
			row: 0,
			startPage: 0,
			endPage: 0
		}
	}),
	[HANDLE_PAGINATION]: (state, { payload: pagination }) => ({
		...state,
		pagination
	})
});

export default board;
