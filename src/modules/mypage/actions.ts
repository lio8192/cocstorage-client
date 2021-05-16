import { createAction } from 'typesafe-actions';
import { HYDRATE } from 'next-redux-wrapper';
import {
	FetchPrivacyPayload,
	PutPasswordPayload,
	DeleteUserPayload,
	PutNicknamePayload,
	PutAvatarPayload
} from './types';

export const hydrate = createAction(HYDRATE)<any>();

export const CHANGE_MY_PAGE_TAB = 'mypage/CHANGE_MY_PAGE_TAB';

export const HANDLE_PRIVACY_AUTH_DIALOG = 'mypage/HANDLE_PRIVACY_AUTH_DIALOG';

export const FETCH_PRIVACY = 'mypage/FETCH_PRIVACY';
export const FETCH_PRIVACY_SUCCEEDED = 'mypage/FETCH_PRIVACY_SUCCEEDED';
export const FETCH_PRIVACY_FAILED = 'mypage/FETCH_PRIVACY_FAILED';

export const CLEAR_PRIVACY = 'mypage/CLEAR_PRIVACY';

export const PUT_PASSWORD = 'mypage/PUT_PASSWORD';
export const PUT_PASSWORD_SUCCEEDED = 'mypage/PUT_PASSWORD_SUCCEEDED';
export const PUT_PASSWORD_FAILED = 'mypage/PUT_PASSWORD_FAILED';

export const HANDLE_DELETE_USER_AUTH_DIALOG = 'mypage/HANDLE_DELETE_USER_AUTH_DIALOG';

export const DELETE_USER = 'mypage/DELETE_USER';
export const DELETE_USER_SUCCEEDED = 'mypage/DELETE_USER_SUCCEEDED';
export const DELETE_USER_FAILED = 'mypage/DELETE_USER_FAILED';

export const PUT_NICKNAME = 'mypage/PUT_USER_NICKNAME';
export const PUT_NICKNAME_SUCCEEDED = 'mypage/PUT_USER_NICKNAME_SUCCEEDED';
export const PUT_NICKNAME_FAILED = 'mypage/PUT_USER_NICKNAME_FAILED';

export const PUT_AVATAR = 'mypage/PUT_AVATAR';
export const PUT_AVATAR_SUCCEEDED = 'mypage/PUT_AVATAR_SUCCEEDED';
export const PUT_AVATAR_FAILED = 'mypage/PUT_AVATAR_FAILED';

export const changeMyPageTab = createAction(CHANGE_MY_PAGE_TAB)<number>();

export const handlePrivacyAuthDialog = createAction(HANDLE_PRIVACY_AUTH_DIALOG)();

export const fetchPrivacy = createAction(FETCH_PRIVACY)<FetchPrivacyPayload>();
export const fetchPrivacySucceeded =	createAction(FETCH_PRIVACY_SUCCEEDED)<{
		name: string;
		email: string;
	}>();
export const fetchPrivacyFailed = createAction(FETCH_PRIVACY_FAILED)();

export const clearPrivacy = createAction(CLEAR_PRIVACY)();

export const putPassword = createAction(PUT_PASSWORD)<PutPasswordPayload>();
export const putPasswordSucceeded = createAction(PUT_PASSWORD_SUCCEEDED)();
export const putPasswordFailed = createAction(PUT_PASSWORD_FAILED)();

export const handleDeleteUserAuthDialog = createAction(HANDLE_DELETE_USER_AUTH_DIALOG)();

export const deleteUser = createAction(DELETE_USER)<DeleteUserPayload>();
export const deleteUserSucceeded = createAction(DELETE_USER_SUCCEEDED)();
export const deleteUserFailed = createAction(DELETE_USER_FAILED)();

export const putNickname = createAction(PUT_NICKNAME)<PutNicknamePayload>();
export const putNicknameSucceeded = createAction(PUT_NICKNAME_SUCCEEDED)();
export const putNicknameFailed = createAction(PUT_NICKNAME_FAILED)();

export const putAvatar = createAction(PUT_AVATAR)<PutAvatarPayload>();
export const putAvatarSucceeded = createAction(PUT_AVATAR_SUCCEEDED)();
export const putAvatarFailed = createAction(PUT_AVATAR_FAILED)();
