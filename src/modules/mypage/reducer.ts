import { createReducer } from 'typesafe-actions';
import { HYDRATE } from 'next-redux-wrapper';
import { MyPageState, MyPageActions } from './types';
import {
	CHANGE_MY_PAGE_TAB,
	HANDLE_PRIVACY_AUTH_DIALOG,
	FETCH_PRIVACY,
	FETCH_PRIVACY_SUCCEEDED,
	FETCH_PRIVACY_FAILED,
	CLEAR_PRIVACY,
	PUT_PASSWORD,
	PUT_PASSWORD_SUCCEEDED,
	PUT_PASSWORD_FAILED,
	HANDLE_DELETE_USER_AUTH_DIALOG,
	DELETE_USER,
	DELETE_USER_SUCCEEDED,
	DELETE_USER_FAILED,
	PUT_NICKNAME,
	PUT_NICKNAME_SUCCEEDED,
	PUT_NICKNAME_FAILED,
	PUT_AVATAR,
	PUT_AVATAR_SUCCEEDED,
	PUT_AVATAR_FAILED
} from './actions';

const initialState: MyPageState = {
	pending: false,
	activatedTab: 0,
	privacy: {
		open: false,
		name: '***',
		email: '*****@******.***',
		pending: false
	},
	deleteAuth: {
		open: false,
		pending: false
	}
};

const mypage = createReducer<MyPageState, MyPageActions>(initialState, {
	[HYDRATE]: (state, { payload }) => {
		const nextState = {
			...state,
			...payload.notices
		};

		if (state.privacy) nextState.privacy = state.privacy;

		return {
			...state,
			...nextState
		};
	},
	[CHANGE_MY_PAGE_TAB]: (state, { payload: data }) => ({
		...state,
		activatedTab: data
	}),
	[HANDLE_PRIVACY_AUTH_DIALOG]: (state) => ({
		...state,
		privacy: {
			...state.privacy,
			open: !state.privacy.open
		}
	}),
	[FETCH_PRIVACY]: (state) => ({
		...state,
		privacy: {
			...state.privacy,
			pending: true
		}
	}),
	[FETCH_PRIVACY_SUCCEEDED]: (state, { payload: { name, email } }) => ({
		...state,
		privacy: {
			...state.privacy,
			open: false,
			name,
			email,
			pending: false
		}
	}),
	[FETCH_PRIVACY_FAILED]: (state) => ({
		...state,
		privacy: {
			...state.privacy,
			pending: false
		}
	}),
	[CLEAR_PRIVACY]: (state) => ({
		...state,
		privacy: {
			open: false,
			name: '***',
			email: '*****@******.***',
			pending: false
		}
	}),
	[PUT_PASSWORD]: (state) => ({
		...state,
		pending: true
	}),
	[PUT_PASSWORD_SUCCEEDED]: (state) => ({
		...state,
		pending: false
	}),
	[PUT_PASSWORD_FAILED]: (state) => ({
		...state,
		pending: false
	}),
	[HANDLE_DELETE_USER_AUTH_DIALOG]: (state) => ({
		...state,
		deleteAuth: {
			...state.deleteAuth,
			open: !state.deleteAuth.open
		}
	}),
	[DELETE_USER]: (state) => ({
		...state,
		deleteAuth: {
			...state.deleteAuth,
			pending: true
		}
	}),
	[DELETE_USER_SUCCEEDED]: (state) => ({
		...state,
		deleteAuth: {
			...state.deleteAuth,
			open: false,
			pending: false
		}
	}),
	[DELETE_USER_FAILED]: (state) => ({
		...state,
		deleteAuth: {
			...state.deleteAuth,
			pending: false
		}
	}),
	[PUT_NICKNAME]: (state) => ({
		...state,
		pending: true
	}),
	[PUT_NICKNAME_SUCCEEDED]: (state) => ({
		...state,
		pending: false
	}),
	[PUT_NICKNAME_FAILED]: (state) => ({
		...state,
		pending: false
	}),
	[PUT_AVATAR]: (state) => ({
		...state,
		pending: true
	}),
	[PUT_AVATAR_SUCCEEDED]: (state) => ({
		...state,
		pending: false
	}),
	[PUT_AVATAR_FAILED]: (state) => ({
		...state,
		pending: false
	})
});

export default mypage;
