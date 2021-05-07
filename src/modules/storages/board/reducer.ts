import { createReducer } from 'typesafe-actions';
import { HYDRATE } from 'next-redux-wrapper';
import {
	FETCH_STORAGE_DETAIL,
	FETCH_STORAGE_DETAIL_SUCCEEDED,
	FETCH_STORAGE_DETAIL_FAILED,
	FETCH_STORAGE_BOARDS,
	FETCH_STORAGE_BOARDS_SUCCEEDED,
	FETCH_STORAGE_BOARDS_FAILED,
	HANDLE_FETCH_PARAMS,
	HANDLE_FETCH_SEARCH_PARAMS,
	POST_STORAGE_BOARD_DRAFT,
	POST_STORAGE_BOARD_DRAFT_SUCCEEDED,
	POST_STORAGE_BOARD_DRAFT_FAILED,
	POST_NON_MEMBER_STORAGE_BOARD_DRAFT,
	POST_NON_MEMBER_STORAGE_BOARD_DRAFT_SUCCEEDED,
	POST_NON_MEMBER_STORAGE_BOARD_DRAFT_FAILED,
	PUT_STORAGE_BOARD,
	PUT_STORAGE_BOARD_SUCCEEDED,
	PUT_STORAGE_BOARD_FAILED,
	PUT_NON_MEMBER_STORAGE_BOARD,
	PUT_NON_MEMBER_STORAGE_BOARD_SUCCEEDED,
	PUT_NON_MEMBER_STORAGE_BOARD_FAILED,
	FETCH_STORAGE_BOARD_EDIT_DETAIL,
	FETCH_STORAGE_BOARD_EDIT_DETAIL_SUCCEEDED,
	FETCH_STORAGE_BOARD_EDIT_DETAIL_FAILED,
	FETCH_NON_MEMBER_STORAGE_BOARD_EDIT_DETAIL,
	FETCH_NON_MEMBER_STORAGE_BOARD_EDIT_DETAIL_SUCCEEDED,
	FETCH_NON_MEMBER_STORAGE_BOARD_EDIT_DETAIL_FAILED,
	CLEAR_NON_MEMBER_STORAGE_BOARD_EDIT_AUTHENTICATED
} from './actions';
import { StorageBoardState, StorageBoardActions } from './types';

const initialState: StorageBoardState = {
	storage: {
		id: 0,
		storageCategoryId: 0,
		user: {
			id: 0,
			nickname: '',
			role: '',
			avatarUrl: ''
		},
		name: '',
		path: '',
		description: '',
		createdAt: '',
		updatedAt: '',
		avatarUrl: null,
		pending: false
	},
	boards: [],
	pagination: {
		totalPages: 0,
		currentPage: 1,
		prevPage: null,
		nextPage: null,
		perPage: 10,
		isLastPage: true
	},
	fetchParams: {
		storageId: 0,
		orderBy: 'latest',
		per: 10
	},
	fetchSearchParams: {
		type: 'all',
		value: null
	},
	pending: false,
	manage: {
		id: 0,
		detail: {
			id: 0,
			storage: {
				id: 0,
				storageCategoryId: 0,
				path: '',
				name: ''
			},
			user: null,
			nickname: null,
			subject: '',
			content: '',
			description: '',
			viewCount: 0,
			thumbUp: 0,
			thumbDown: 0,
			hasImage: false,
			hasVideo: false,
			isDraft: false,
			isActive: false,
			isMember: false,
			createdIp: '',
			createdAt: '',
			updatedAt: '',
			thumbnailUrl: '',
			commentTotalCount: 0
		},
		editAuthenticated: false,
		pending: false
	}
};

const storageBoard = createReducer<StorageBoardState, StorageBoardActions>(initialState, {
	[HYDRATE]: (state, { payload }) => {
		const nextState = {
			...state,
			...payload.storageBoard
		};

		if (state.pending) nextState.pending = state.pending;
		if (state.manage.pending) nextState.manage.pending = state.manage.pending;
		if (state.manage.editAuthenticated) nextState.manage.editAuthenticated = state.manage.editAuthenticated;
		if (state.manage) nextState.manage = state.manage;

		return {
			...state,
			...nextState
		};
	},
	[FETCH_STORAGE_DETAIL]: (state) => ({
		...state,
		storage: {
			...state.storage,
			id: 0,
			name: '',
			description: '',
			avatarUrl: null,
			pending: true
		},
		pending: true
	}),
	[FETCH_STORAGE_DETAIL_SUCCEEDED]: (state, { payload: data }) => ({
		...state,
		storage: {
			...data,
			pending: false
		},
		fetchParams: {
			storageId: 0,
			orderBy: 'latest',
			per: 10,
			page: 1
		},
		fetchSearchParams: {
			type: 'all',
			value: null
		}
	}),
	[FETCH_STORAGE_DETAIL_FAILED]: (state) => ({
		...state,
		storage: {
			...state.storage,
			pending: false
		}
	}),
	[FETCH_STORAGE_BOARDS]: (state) => ({
		...state,
		pending: true
	}),
	[FETCH_STORAGE_BOARDS_SUCCEEDED]: (state, { payload: data }) => ({
		...state,
		boards: data.boards,
		pagination: data.pagination,
		pending: false
	}),
	[FETCH_STORAGE_BOARDS_FAILED]: (state) => ({
		...state,
		pending: false
	}),
	[HANDLE_FETCH_PARAMS]: (state, { payload: data }) => ({
		...state,
		fetchParams: data
	}),
	[HANDLE_FETCH_SEARCH_PARAMS]: (state, { payload: data }) => ({
		...state,
		fetchSearchParams: data
	}),
	[POST_STORAGE_BOARD_DRAFT]: (state) => ({
		...state,
		manage: {
			...state.manage,
			pending: true
		}
	}),
	[POST_STORAGE_BOARD_DRAFT_SUCCEEDED]: (state, { payload: data }) => ({
		...state,
		manage: {
			...state.manage,
			id: data,
			pending: false
		}
	}),
	[POST_STORAGE_BOARD_DRAFT_FAILED]: (state) => ({
		...state,
		manage: {
			...state.manage,
			pending: false
		}
	}),
	[POST_NON_MEMBER_STORAGE_BOARD_DRAFT]: (state) => ({
		...state,
		manage: {
			...state.manage,
			pending: true
		}
	}),
	[POST_NON_MEMBER_STORAGE_BOARD_DRAFT_SUCCEEDED]: (state, { payload: data }) => ({
		...state,
		manage: {
			...state.manage,
			id: data,
			pending: false
		}
	}),
	[POST_NON_MEMBER_STORAGE_BOARD_DRAFT_FAILED]: (state) => ({
		...state,
		manage: {
			...state.manage,
			pending: false
		}
	}),
	[PUT_STORAGE_BOARD]: (state) => ({
		...state,
		manage: {
			...state.manage,
			pending: true
		}
	}),
	[PUT_STORAGE_BOARD_SUCCEEDED]: (state) => ({
		...state,
		manage: {
			...state.manage,
			id: 0,
			editAuthenticated: false,
			pending: false
		}
	}),
	[PUT_STORAGE_BOARD_FAILED]: (state) => ({
		...state,
		manage: {
			...state.manage,
			editAuthenticated: false,
			pending: false
		}
	}),
	[PUT_NON_MEMBER_STORAGE_BOARD]: (state) => ({
		...state,
		manage: {
			...state.manage,
			pending: true
		}
	}),
	[PUT_NON_MEMBER_STORAGE_BOARD_SUCCEEDED]: (state) => ({
		...state,
		manage: {
			...state.manage,
			id: 0,
			editAuthenticated: false,
			pending: false
		}
	}),
	[PUT_NON_MEMBER_STORAGE_BOARD_FAILED]: (state) => ({
		...state,
		manage: {
			...state.manage,
			editAuthenticated: false,
			pending: false
		}
	}),
	[FETCH_STORAGE_BOARD_EDIT_DETAIL]: (state) => ({
		...state,
		manage: {
			...state.manage,
			editAuthenticated: false,
			pending: true
		}
	}),
	[FETCH_STORAGE_BOARD_EDIT_DETAIL_SUCCEEDED]: (state, { payload: data }) => ({
		...state,
		manage: {
			...state.manage,
			id: data.id,
			detail: data,
			editAuthenticated: false,
			pending: false
		}
	}),
	[FETCH_STORAGE_BOARD_EDIT_DETAIL_FAILED]: (state) => ({
		...state,
		manage: {
			...state.manage,
			editAuthenticated: false,
			pending: false
		}
	}),
	[FETCH_NON_MEMBER_STORAGE_BOARD_EDIT_DETAIL]: (state) => ({
		...state,
		manage: {
			...state.manage,
			editAuthenticated: false,
			pending: true
		}
	}),
	[FETCH_NON_MEMBER_STORAGE_BOARD_EDIT_DETAIL_SUCCEEDED]: (state, { payload: data }) => ({
		...state,
		manage: {
			...state.manage,
			id: data.id,
			detail: data,
			editAuthenticated: true,
			pending: false
		}
	}),
	[FETCH_NON_MEMBER_STORAGE_BOARD_EDIT_DETAIL_FAILED]: (state) => ({
		...state,
		manage: {
			...state.manage,
			editAuthenticated: false,
			pending: false
		}
	}),
	[CLEAR_NON_MEMBER_STORAGE_BOARD_EDIT_AUTHENTICATED]: (state) => ({
		...state,
		manage: {
			id: 0,
			detail: {
				id: 0,
				storage: {
					id: 0,
					storageCategoryId: 0,
					path: '',
					name: ''
				},
				user: null,
				nickname: null,
				subject: '',
				content: '',
				description: '',
				viewCount: 0,
				thumbUp: 0,
				thumbDown: 0,
				hasImage: false,
				hasVideo: false,
				isDraft: false,
				isActive: false,
				isMember: false,
				createdIp: '',
				createdAt: '',
				updatedAt: '',
				thumbnailUrl: '',
				commentTotalCount: 0
			},
			editAuthenticated: false,
			pending: false
		}
	})
});

export default storageBoard;
