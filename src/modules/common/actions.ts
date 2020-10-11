import { createAction } from 'typesafe-actions';
import { Notification } from 'modules/common/types';

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
