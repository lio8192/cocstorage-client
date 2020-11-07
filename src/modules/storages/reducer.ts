import { createReducer } from 'typesafe-actions';
import { HYDRATE } from 'next-redux-wrapper';
import { StoragesState, StoragesActions } from './types';
import {
	FETCH_STORAGES,
	FETCH_STORAGES_SUCCEEDED,
	FETCH_STORAGES_FAILED,
	HANDLE_PAGINATION,
	HANDLE_FETCH_PARAMS,
	HANDLE_STORAGE_MANAGE_DIALOG,
	POST_STORAGE,
	POST_STORAGE_SUCCEEDED,
	POST_STORAGE_FAILED
} from './actions';

const initialState: StoragesState = {
	storages: [],
	pagination: {
		totalPages: 0,
		currentPage: 1,
		prevPage: null,
		nextPage: null,
		perPage: 20,
		isLastPage: true
	},
	fetchParams: {
		per: 20,
		page: 1,
		name: null,
		orderBy: 'latest'
	},
	pending: true,
	manage: {
		open: false,
		pending: false
	}
};

const storages = createReducer<StoragesState, StoragesActions>(initialState, {
	[HYDRATE]: (state, { payload }) => {
		const nextState = {
			...state,
			...payload.storages
		};

		if (state.pending) nextState.pending = state.pending;

		return {
			...state,
			...nextState
		};
	},
	[FETCH_STORAGES]: (state) => ({
		...state,
		pending: true
	}),
	[FETCH_STORAGES_SUCCEEDED]: (state, { payload: data }) => ({
		...state,
		storages: data,
		pending: false
	}),
	[FETCH_STORAGES_FAILED]: (state) => ({
		...state,
		pending: false
	}),
	[HANDLE_PAGINATION]: (state, { payload: data }) => ({
		...state,
		pagination: data
	}),
	[HANDLE_FETCH_PARAMS]: (state, { payload: data }) => ({
		...state,
		fetchParams: data
	}),
	[HANDLE_STORAGE_MANAGE_DIALOG]: (state) => ({
		...state,
		manage: {
			...state.manage,
			open: !state.manage.open
		}
	}),
	[POST_STORAGE]: (state) => ({
		...state,
		manage: {
			...state.manage,
			pending: true
		}
	}),
	[POST_STORAGE_SUCCEEDED]: (state) => ({
		...state,
		manage: {
			open: false,
			pending: false
		}
	}),
	[POST_STORAGE_FAILED]: (state) => ({
		...state,
		manage: {
			open: false,
			pending: false
		}
	})
});

export default storages;
