import { createReducer } from 'typesafe-actions';
import { HYDRATE } from 'next-redux-wrapper';
import { NoticesState, NoticesActions } from './types';
import {
	FETCH_NOTICES,
	FETCH_NOTICES_SUCCEEDED,
	FETCH_NOTICES_FAILED,
	HANDLE_FETCH_PARAMS,
	HANDLE_PAGINATION,
	CLEAR_NOTICES,
	POST_NOTICE_DRAFT,
	POST_NOTICE_DRAFT_SUCCEEDED,
	POST_NOTICE_DRAFT_FAILED,
	PUT_NOTICE,
	PUT_NOTICE_SUCCEEDED,
	PUT_NOTICE_FAILED,
	FETCH_NOTICE_EDIT_DETAIL,
	FETCH_NOTICE_EDIT_DETAIL_SUCCEEDED,
	FETCH_NOTICE_EDIT_DETAIL_FAILED
} from './actions';

const initialState: NoticesState = {
	notices: [],
	pagination: {
		totalPages: 0,
		currentPage: 1,
		prevPage: null,
		nextPage: null,
		perPage: 20,
		isLastPage: true
	},
	fetchParams: {
		per: 8,
		page: 1,
		orderBy: 'latest'
	},
	pending: false,
	manage: {
		id: 0,
		detail: {
			id: 0,
			user: {
				id: 0,
				nickname: '',
				role: '',
				avatarUrl: null
			},
			subject: '',
			content: '',
			description: '',
			viewCount: 0,
			isDraft: false,
			isActive: false,
			createdAt: '',
			updatedAt: '',
			thumbnailUrl: null,
			commentTotalCount: 0
		},
		pending: false
	},
	hasPageHistory: false
};

const notices = createReducer<NoticesState, NoticesActions>(initialState, {
	[HYDRATE]: (state, { payload }) => {
		const nextState = {
			...state,
			...payload.notices
		};

		if (state.fetchParams) nextState.fetchParams = state.fetchParams;
		if (state.pending) nextState.pending = state.pending;
		if (state.manage.pending) nextState.manage.pending = state.manage.pending;
		if (state.hasPageHistory) nextState.hasPageHistory = state.hasPageHistory;

		return {
			...state,
			...nextState
		};
	},
	[FETCH_NOTICES]: (state) => ({
		...state,
		pending: true
	}),
	[FETCH_NOTICES_SUCCEEDED]: (state, { payload: data }) => ({
		...state,
		notices: [...state.notices, ...data],
		pending: false
	}),
	[FETCH_NOTICES_FAILED]: (state) => ({
		...state,
		pending: false
	}),
	[HANDLE_FETCH_PARAMS]: (state, { payload: data }) => ({
		...state,
		fetchParams: data,
		hasPageHistory: false
	}),
	[HANDLE_PAGINATION]: (state, { payload: data }) => ({
		...state,
		pagination: data
	}),
	[CLEAR_NOTICES]: (state) => ({
		...state,
		fetchParams: {
			per: 8,
			page: 1,
			orderBy: 'latest'
		},
		hasPageHistory: true
	}),
	[POST_NOTICE_DRAFT]: (state) => ({
		...state,
		manage: {
			...state.manage,
			id: 0,
			pending: true
		}
	}),
	[POST_NOTICE_DRAFT_SUCCEEDED]: (state, { payload: data }) => ({
		...state,
		manage: {
			...state.manage,
			id: data,
			pending: false
		}
	}),
	[POST_NOTICE_DRAFT_FAILED]: (state) => ({
		...state,
		manage: {
			...state.manage,
			id: 0,
			pending: false
		}
	}),
	[PUT_NOTICE]: (state) => ({
		...state,
		manage: {
			...state.manage,
			pending: true
		}
	}),
	[PUT_NOTICE_SUCCEEDED]: (state) => ({
		...state,
		manage: {
			...state.manage,
			id: 0,
			pending: false
		}
	}),
	[PUT_NOTICE_FAILED]: (state) => ({
		...state,
		manage: {
			...state.manage,
			id: 0,
			pending: false
		}
	}),
	[FETCH_NOTICE_EDIT_DETAIL]: (state) => ({
		...state,
		manage: {
			...state.manage,
			id: 0,
			detail: {
				id: 0,
				user: {
					id: 0,
					nickname: '',
					role: '',
					avatarUrl: null
				},
				subject: '',
				content: '',
				description: '',
				viewCount: 0,
				isDraft: false,
				isActive: false,
				createdAt: '',
				updatedAt: '',
				thumbnailUrl: null,
				commentTotalCount: 0
			},
			pending: true
		}
	}),
	[FETCH_NOTICE_EDIT_DETAIL_SUCCEEDED]: (state, { payload: data }) => ({
		...state,
		manage: {
			...state.manage,
			id: data.id,
			detail: data,
			pending: false
		}
	}),
	[FETCH_NOTICE_EDIT_DETAIL_FAILED]: (state) => ({
		...state,
		manage: {
			...state.manage,
			id: 0,
			pending: false
		}
	})
});

export default notices;
