import { createReducer } from 'typesafe-actions';
import { HYDRATE } from 'next-redux-wrapper';
import { StoragesState, StoragesActions } from './types';
import {
	HANDLE_STORAGE_MANAGE_DIALOG, POST_STORAGE, POST_STORAGE_SUCCEEDED, POST_STORAGE_FAILED
} from './actions';

const initialState: StoragesState = {
	manage: {
		open: false,
		pending: false
	}
};

const storages = createReducer<StoragesState, StoragesActions>(initialState, {
	[HYDRATE]: (state, { payload }) => ({
		...state,
		...payload.storages
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
	}),
	[HANDLE_STORAGE_MANAGE_DIALOG]: (state) => ({
		...state,
		manage: {
			...state.manage,
			open: !state.manage.open
		}
	})
});

export default storages;
