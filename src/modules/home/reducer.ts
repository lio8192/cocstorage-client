import { createReducer } from 'typesafe-actions';
import { HYDRATE } from 'next-redux-wrapper';
import { HomeActions, HomeState } from './types';
import {
	FETCH_NOTICES,
	FETCH_NOTICES_SUCCEEDED,
	FETCH_NOTICES_FAILED,
	FETCH_STORAGES,
	FETCH_STORAGES_SUCCEEDED,
	FETCH_STORAGES_FAILED,
	FETCH_LATEST_STORAGE_BOARDS,
	FETCH_LATEST_STORAGE_BOARDS_SUCCEEDED,
	FETCH_LATEST_STORAGE_BOARDS_FAILED,
	FETCH_POPULAR_STORAGE_BOARDS,
	FETCH_POPULAR_STORAGE_BOARDS_SUCCEEDED,
	FETCH_POPULAR_STORAGE_BOARDS_FAILED
} from './actions';

const initialState: HomeState = {
	notices: {
		data: [],
		pending: false
	},
	storages: {
		data: [],
		pending: false
	},
	latestStorageBoards: {
		data: [],
		pending: false
	},
	popularStorageBoards: {
		data: [],
		pending: false
	}
};

const home = createReducer<HomeState, HomeActions>(initialState, {
	[HYDRATE]: (state, { payload }) => {
		const nextState = {
			...state,
			...payload.home
		};

		return {
			...state,
			...nextState
		};
	},
	[FETCH_NOTICES]: (state) => ({
		...state,
		notices: {
			...state.notices,
			pending: true
		}
	}),
	[FETCH_NOTICES_SUCCEEDED]: (state, { payload: data }) => ({
		...state,
		notices: {
			data,
			pending: false
		}
	}),
	[FETCH_NOTICES_FAILED]: (state) => ({
		...state,
		notices: {
			...state.notices,
			pending: false
		}
	}),
	[FETCH_STORAGES]: (state) => ({
		...state,
		storages: {
			...state.storages,
			pending: true
		}
	}),
	[FETCH_STORAGES_SUCCEEDED]: (state, { payload: data }) => ({
		...state,
		storages: {
			data,
			pending: false
		}
	}),
	[FETCH_STORAGES_FAILED]: (state) => ({
		...state,
		storages: {
			...state.storages,
			pending: false
		}
	}),
	[FETCH_LATEST_STORAGE_BOARDS]: (state) => ({
		...state,
		latestStorageBoards: {
			...state.latestStorageBoards,
			pending: true
		}
	}),
	[FETCH_LATEST_STORAGE_BOARDS_SUCCEEDED]: (state, { payload: data }) => ({
		...state,
		latestStorageBoards: {
			data,
			pending: false
		}
	}),
	[FETCH_LATEST_STORAGE_BOARDS_FAILED]: (state) => ({
		...state,
		latestStorageBoards: {
			...state.latestStorageBoards,
			pending: false
		}
	}),
	[FETCH_POPULAR_STORAGE_BOARDS]: (state) => ({
		...state,
		popularStorageBoards: {
			...state.popularStorageBoards,
			pending: true
		}
	}),
	[FETCH_POPULAR_STORAGE_BOARDS_SUCCEEDED]: (state, { payload: data }) => ({
		...state,
		popularStorageBoards: {
			data,
			pending: false
		}
	}),
	[FETCH_POPULAR_STORAGE_BOARDS_FAILED]: (state) => ({
		...state,
		popularStorageBoards: {
			...state.popularStorageBoards,
			pending: false
		}
	})
});

export default home;
