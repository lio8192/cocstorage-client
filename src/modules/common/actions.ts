import { createAction } from 'typesafe-actions';
import { HYDRATE } from 'next-redux-wrapper';
import { Notification, User } from './types';

export const hydrate = createAction(HYDRATE)<any>();

export const HANDLE_PAGE_SCOPE = 'common/HANDLE_PAGE_SCOPE';
export const HANDLE_SIGN_IN_DIALOG = 'common/HANDLE_SIGN_IN_DIALOG';
export const HANDLE_SIGN_UP_DIALOG = 'common/HANDLE_SIGN_UP_DIALOG';
export const HANDLE_PASSWORD_FINDER_DIALOG = 'common/HANDLE_PASSWORD_FINDER_DIALOG';

export const POST_SIGN_UP = 'common/POST_SIGN_UP';
export const POST_SIGN_UP_SUCCEEDED = 'common/POST_SIGN_UP_SUCCEEDED';
export const POST_SIGN_UP_FAILED = 'common/POST_SIGN_UP_FAILED';

export const HANDLE_NOTIFICATION_MODAL = 'common/HANDLE_NOTIFICATION_MODAL';

export const PUT_USER_AUTHENTICATION = 'common/PUT_USER_AUTHENTICATION';
export const PUT_USER_AUTHENTICATION_SUCCEEDED = 'common/PUT_USER_AUTHENTICATION_SUCCEEDED';
export const PUT_USER_AUTHENTICATION_FAILED = 'common/PUT_USER_AUTHENTICATION_FAILED';

export const POST_PASSWORD_FINDER = 'common/POST_PASSWORD_FINDER';
export const POST_PASSWORD_FINDER_SUCCEEDED = 'common/POST_PASSWORD_FINDER_SUCCEEDED';
export const POST_PASSWORD_FINDER_FAILED = 'common/POST_PASSWORD_FINDER_FAILED';

export const POST_SIGN_IN = 'common/POST_SIGN_IN';
export const POST_SIGN_IN_SUCCEEDED = 'common/POST_SIGN_IN_SUCCEEDED';
export const POST_SIGN_IN_FAILED = 'common/POST_SIGN_IN_FAILED';

export const SET_USER_AUTHENTICATION = 'common/SET_USER_AUTHENTICATION';

export const DELETE_SIGN_OUT = 'common/DELETE_SIGN_OUT';
export const DELETE_SIGN_OUT_SUCCEEDED = 'common/DELETE_SIGN_OUT_SUCCEEDED';
export const DELETE_SIGN_OUT_FAILED = 'common/DELETE_SIGN_OUT_FAILED';

export const HANDLE_DRAWER = 'common/HANDLE_DRAWER';

export const handlePageScope = createAction(HANDLE_PAGE_SCOPE)<string>();
export const handleSignInDialog = createAction(HANDLE_SIGN_IN_DIALOG)();
export const handleSignUpDialog = createAction(HANDLE_SIGN_UP_DIALOG)();
export const handlePasswordFinderDialog = createAction(HANDLE_PASSWORD_FINDER_DIALOG)();

export const postSignUp = createAction(POST_SIGN_UP)<{ [key: string]: string }>();
export const postSignUpSucceeded = createAction(POST_SIGN_UP_SUCCEEDED)();
export const postSignUpFailed = createAction(POST_SIGN_UP_FAILED)();

export const handleNotificationModal = createAction(HANDLE_NOTIFICATION_MODAL)<Notification>();

export const putUserAuthentication = createAction(PUT_USER_AUTHENTICATION)<string>();
export const putUserAuthenticationSucceeded = createAction(PUT_USER_AUTHENTICATION_SUCCEEDED)();
export const putUserAuthenticationFailed = createAction(PUT_USER_AUTHENTICATION_FAILED)<string>();

export const postPasswordFinder = createAction(POST_PASSWORD_FINDER)<{ [key: string]: string }>();
export const postPasswordFinderSucceeded = createAction(POST_PASSWORD_FINDER_SUCCEEDED)();
export const postPasswordFinderFailed = createAction(POST_PASSWORD_FINDER_FAILED)();

export const postSignIn = createAction(POST_SIGN_IN)<{ [key: string]: string }>();
export const postSignInSucceeded = createAction(POST_SIGN_IN_SUCCEEDED)<User>();
export const postSignInFailed = createAction(POST_SIGN_IN_FAILED)();

export const setUserAuthentication = createAction(SET_USER_AUTHENTICATION)();

export const deleteSignOut = createAction(DELETE_SIGN_OUT)();
export const deleteSignOutSucceeded = createAction(DELETE_SIGN_OUT_SUCCEEDED)();
export const deleteSignOutFailed = createAction(DELETE_SIGN_OUT_FAILED)();

export const handleDrawer = createAction(HANDLE_DRAWER)();
