import { ActionType } from 'typesafe-actions';
import {
	hydrate,
	changeMyPageTab,
	handlePrivacyAuthDialog,
	fetchPrivacy,
	fetchPrivacySucceeded,
	fetchPrivacyFailed,
	clearPrivacy,
	putPassword,
	putPasswordSucceeded,
	putPasswordFailed,
	handleDeleteUserAuthDialog,
	deleteUser,
	deleteUserSucceeded,
	deleteUserFailed,
	putNickname,
	putNicknameSucceeded,
	putNicknameFailed,
	putAvatar,
	putAvatarSucceeded,
	putAvatarFailed
} from './actions';

const actions = {
	hydrate,
	changeMyPageTab,
	handlePrivacyAuthDialog,
	fetchPrivacy,
	fetchPrivacySucceeded,
	fetchPrivacyFailed,
	clearPrivacy,
	putPassword,
	putPasswordSucceeded,
	putPasswordFailed,
	handleDeleteUserAuthDialog,
	deleteUser,
	deleteUserSucceeded,
	deleteUserFailed,
	putNickname,
	putNicknameSucceeded,
	putNicknameFailed,
	putAvatar,
	putAvatarSucceeded,
	putAvatarFailed
};

export type MyPageActions = ActionType<typeof actions>;

export type FetchPrivacyPayload = {
	userId: number;
	password: string;
};

export type PutPasswordPayload = {
	userId: number;
	currentPassword: string;
	password: string;
};

export type DeleteUserPayload = {
	userId: number;
	password: string;
};

export type PutNicknamePayload = {
	userId: number;
	nickname: string;
};

export type PutAvatarPayload = {
	userId: number;
	avatar: File;
};

export type MyPageState = {
	pending: boolean;
	activatedTab: number;
	privacy: {
		open: boolean;
		name: string;
		email: string;
		pending: boolean;
	};
	deleteAuth: {
		open: boolean;
		pending: boolean;
	};
};
