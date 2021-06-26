import { createReducer } from 'typesafe-actions';
import { HYDRATE } from 'next-redux-wrapper';

// Snippets
import { setUserStateByJsonWebToken, updateUserStateByJsonWebToken, setPaletteType } from 'snippets/common';

import { CommonActions, CommonState } from './types';
import {
	HANDLE_SIGN_IN_DIALOG,
	HANDLE_SIGN_UP_DIALOG,
	HANDLE_PASSWORD_FINDER_DIALOG,
	POST_SIGN_UP,
	POST_SIGN_UP_SUCCEEDED,
	POST_SIGN_UP_FAILED,
	HANDLE_NOTIFICATION_MODAL,
	PUT_USER_AUTHENTICATION,
	PUT_USER_AUTHENTICATION_SUCCEEDED,
	PUT_USER_AUTHENTICATION_FAILED,
	POST_PASSWORD_FINDER,
	POST_PASSWORD_FINDER_SUCCEEDED,
	POST_PASSWORD_FINDER_FAILED,
	POST_SIGN_IN,
	POST_SIGN_IN_SUCCEEDED,
	POST_SIGN_IN_FAILED,
	SET_USER_AUTHENTICATION,
	UPDATE_USER_AUTHENTICATION,
	DELETE_SIGN_OUT_SUCCEEDED,
	HANDLE_PALETTE_TYPE,
	SET_PALETTE_TYPE
} from './actions';

const initialState: CommonState = {
	paletteType: 'light',
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
		content: '',
		severity: '',
		route: ''
	},
	userAuthentication: {
		pending: false,
		error: false,
		helperText: ''
	},
	user: {
		id: 0,
		nickname: '',
		avatarUrl: '',
		role: '',
		isAuthenticated: false
	}
};

const common = createReducer<CommonState, CommonActions>(initialState, {
	[HYDRATE]: (state, { payload }) => {
		const nextState = {
			...state,
			...payload.common
		};

		if (state.paletteType) nextState.paletteType = state.paletteType;
		if (state.user) nextState.user = state.user;

		return {
			...state,
			...nextState
		};
	},
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
	}),
	[POST_PASSWORD_FINDER]: (state) => ({
		...state,
		passwordFinder: {
			...state.passwordFinder,
			pending: true
		}
	}),
	[POST_PASSWORD_FINDER_SUCCEEDED]: (state) => ({
		...state,
		passwordFinder: {
			open: false,
			pending: false
		}
	}),
	[POST_PASSWORD_FINDER_FAILED]: (state) => ({
		...state,
		passwordFinder: {
			...state.passwordFinder,
			pending: false
		}
	}),
	[POST_SIGN_IN]: (state) => ({
		...state,
		signIn: {
			...state.signIn,
			pending: true
		}
	}),
	[POST_SIGN_IN_SUCCEEDED]: (state, { payload: data }) => ({
		...state,
		signIn: {
			...state.signIn,
			open: false,
			pending: false
		},
		user: data
	}),
	[POST_SIGN_IN_FAILED]: (state) => ({
		...state,
		signIn: {
			...state.signIn,
			pending: false
		}
	}),
	[SET_USER_AUTHENTICATION]: (state) => ({
		...state,
		user: setUserStateByJsonWebToken()
	}),
	[UPDATE_USER_AUTHENTICATION]: (state, { payload }) => ({
		...state,
		user: updateUserStateByJsonWebToken(payload)
	}),
	[DELETE_SIGN_OUT_SUCCEEDED]: (state) => ({
		...state,
		user: {
			id: 0,
			nickname: '',
			avatarUrl: '',
			role: '',
			isAuthenticated: false
		}
	}),
	[HANDLE_PALETTE_TYPE]: (state, { payload: paletteType }) => ({
		...state,
		paletteType
	}),
	[SET_PALETTE_TYPE]: (state) => ({
		...state,
		paletteType: setPaletteType()
	})
});

export default common;
