import { createReducer } from 'typesafe-actions';
import { CommonActions, CommonState } from 'modules/common/types';

import {
	HANDLE_PAGE_SCOPE,
	HANDLE_SIGN_IN_DIALOG,
	HANDLE_SIGN_UP_DIALOG,
	HANDLE_PASSWORD_FINDER_DIALOG,
	POST_SIGN_UP,
	POST_SIGN_UP_SUCCEEDED,
	POST_SIGN_UP_FAILED,
	HANDLE_NOTIFICATION_MODAL,
	PUT_USER_AUTHENTICATION,
	PUT_USER_AUTHENTICATION_SUCCEEDED,
	PUT_USER_AUTHENTICATION_FAILED
} from './actions';

const initialState: CommonState = {
	pageScope: 'storage',
	signIn: {
		open: false,
		pending: false
	},
	signUp: {
		open: false,
		pending: false
	},
	passwordFinder: {
		open: false,
		pending: false
	},
	notification: {
		open: false,
		title: '',
		contentText: '',
		severity: '',
		route: ''
	},
	userAuthentication: {
		pending: false,
		error: false,
		helperText: ''
	}
};

const common = createReducer<CommonState, CommonActions>(initialState, {
	[HANDLE_PAGE_SCOPE]: (state, { payload: value }) => ({
		...state,
		pageScope: value
	}),
	[HANDLE_SIGN_IN_DIALOG]: (state) => ({
		...state,
		signIn: {
			open: !state.signIn.open,
			pending: false
		},
		signUp: {
			open: !state.signIn.open && false,
			pending: false
		},
		passwordFinder: {
			open: !state.signIn.open && false,
			pending: false
		}
	}),
	[HANDLE_SIGN_UP_DIALOG]: (state) => ({
		...state,
		signUp: {
			open: !state.signUp.open,
			pending: false
		},
		signIn: {
			open: !state.signUp.open && false,
			pending: false
		},
		passwordFinder: {
			open: !state.signUp.open && false,
			pending: false
		}
	}),
	[HANDLE_PASSWORD_FINDER_DIALOG]: (state) => ({
		...state,
		passwordFinder: {
			open: !state.passwordFinder.open,
			pending: false
		},
		signIn: {
			open: !state.passwordFinder.open && false,
			pending: false
		},
		signUp: {
			open: !state.passwordFinder.open && false,
			pending: false
		}
	}),
	[POST_SIGN_UP]: (state) => ({
		...state,
		signUp: {
			...state.signUp,
			pending: true
		}
	}),
	[POST_SIGN_UP_SUCCEEDED]: (state) => ({
		...state,
		signUp: {
			open: false,
			pending: false
		}
	}),
	[POST_SIGN_UP_FAILED]: (state) => ({
		...state,
		signUp: {
			...state.signUp,
			pending: false
		}
	}),
	[HANDLE_NOTIFICATION_MODAL]: (state, { payload: data }) => ({
		...state,
		notification: data
	}),
	[PUT_USER_AUTHENTICATION]: (state) => ({
		...state,
		userAuthentication: {
			...state.userAuthentication,
			pending: true
		}
	}),
	[PUT_USER_AUTHENTICATION_SUCCEEDED]: (state) => ({
		...state,
		userAuthentication: {
			...state.userAuthentication,
			pending: false
		}
	}),
	[PUT_USER_AUTHENTICATION_FAILED]: (state, { payload: value }) => ({
		...state,
		userAuthentication: {
			...state.userAuthentication,
			pending: false,
			error: true,
			helperText: value
		}
	})
});

export default common;
