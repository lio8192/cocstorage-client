import { ActionType } from 'typesafe-actions';
import {
	hydrate,
	handleSignInDialog,
	handleSignUpDialog,
	handlePasswordFinderDialog,
	postSignUp,
	postSignUpSucceeded,
	postSignUpFailed,
	handleNotificationModal,
	putUserAuthentication,
	putUserAuthenticationSucceeded,
	putUserAuthenticationFailed,
	postPasswordFinder,
	postPasswordFinderSucceeded,
	postPasswordFinderFailed,
	postSignIn,
	postSignInSucceeded,
	postSignInFailed,
	setUserAuthentication,
	updateUserAuthentication,
	deleteSignOut,
	deleteSignOutSucceeded,
	deleteSignOutFailed,
	handlePaletteType,
	setPaletteType
} from './actions';

const actions = {
	hydrate,
	handleSignInDialog,
	handleSignUpDialog,
	handlePasswordFinderDialog,
	postSignUp,
	postSignUpSucceeded,
	postSignUpFailed,
	handleNotificationModal,
	putUserAuthentication,
	putUserAuthenticationSucceeded,
	putUserAuthenticationFailed,
	postPasswordFinder,
	postPasswordFinderSucceeded,
	postPasswordFinderFailed,
	postSignIn,
	postSignInSucceeded,
	postSignInFailed,
	setUserAuthentication,
	updateUserAuthentication,
	deleteSignOut,
	deleteSignOutSucceeded,
	deleteSignOutFailed,
	handlePaletteType,
	setPaletteType
};

export type CommonActions = ActionType<typeof actions>;

export type Notification = {
	open: boolean;
	title: string;
	contentText: string;
	severity: string;
	route: string;
};

export type User = {
	id: number;
	nickname: string;
	avatarUrl: string;
	role: string;
	isAuthenticated: boolean;
};

export type CommonState = {
	paletteType: string;
	signIn: {
		open: boolean;
		pending: boolean;
	};
	signUp: {
		open: boolean;
		pending: boolean;
	};
	passwordFinder: {
		open: boolean;
		pending: boolean;
	};
	userAuthentication: {
		pending: boolean;
		error: boolean;
		helperText: string;
	};
	notification: Notification;
	user: User;
};
