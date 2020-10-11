import { ActionType } from 'typesafe-actions';
import {
	handlePageScope,
	handleSignInDialog,
	handleSignUpDialog,
	handlePasswordFinderDialog,
	postSignUp,
	postSignUpSucceeded,
	postSignUpFailed,
	handleNotificationModal,
	putUserAuthentication,
	putUserAuthenticationSucceeded,
	putUserAuthenticationFailed
} from './actions';

const actions = {
	handlePageScope,
	handleSignInDialog,
	handleSignUpDialog,
	handlePasswordFinderDialog,
	postSignUp,
	postSignUpSucceeded,
	postSignUpFailed,
	handleNotificationModal,
	putUserAuthentication,
	putUserAuthenticationSucceeded,
	putUserAuthenticationFailed
};

export type CommonActions = ActionType<typeof actions>;

export type Notification = {
	open: boolean;
	title: string;
	contentText: string;
	severity: string;
	route: string;
};

export type CommonState = {
	pageScope: string;
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
};
