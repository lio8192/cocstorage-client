import { takeLatest, call, put } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import Router from 'next/router';

// Modules
import {
	fetchPrivacy,
	fetchPrivacySucceeded,
	fetchPrivacyFailed,
	putPassword,
	putPasswordSucceeded,
	putPasswordFailed,
	deleteUser,
	deleteUserSucceeded,
	deleteUserFailed,
	putNickname,
	putNicknameSucceeded,
	putNicknameFailed,
	putAvatar,
	putAvatarSucceeded,
	putAvatarFailed
} from 'modules/mypage';
import {
	deleteSignOut, postSignInSucceeded, handleNotificationModal, updateUserAuthentication
} from 'modules/common';

// Service
import * as Service from 'services/mypage';

// Snippets
import { getErrorMessageByCode } from 'snippets/common';

function* watchFetchPrivacy(action: ActionType<typeof fetchPrivacy>) {
	const { payload } = action;
	try {
		const response = yield call(Service.fetchPrivacy, payload);
		yield put(
			fetchPrivacySucceeded({
				name: response.data.name,
				email: response.data.email
			})
		);
	} catch (error) {
		yield put(fetchPrivacyFailed());
		yield put(
			handleNotificationModal({
				open: true,
				title: '안내',
				content: getErrorMessageByCode(error.response.data.code),
				severity: 'warning',
				route: ''
			})
		);
	}
}

function* watchPutPassword(action: ActionType<typeof putPassword>) {
	const { payload } = action;
	try {
		yield call(Service.putPassword, payload);
		yield put(putPasswordSucceeded());
		yield put(
			handleNotificationModal({
				open: true,
				title: '변경 완료',
				content: '비밀번호가 정상적으로 변경되었습니다.',
				severity: 'success',
				route: ''
			})
		);
	} catch (error) {
		yield put(putPasswordFailed());
		yield put(
			handleNotificationModal({
				open: true,
				title: '안내',
				content: getErrorMessageByCode(error.response.data.code),
				severity: 'warning',
				route: ''
			})
		);
	}
}

function* watchDeleteUser(action: ActionType<typeof deleteUser>) {
	const { payload } = action;
	try {
		yield call(Service.deleteUser, payload);
		yield put(deleteUserSucceeded());
		yield put(deleteSignOut());
		yield call(Router.push, '/', '/');
	} catch (error) {
		yield put(deleteUserFailed());
		yield put(
			handleNotificationModal({
				open: true,
				title: '안내',
				content: getErrorMessageByCode(error.response.data.code),
				severity: 'warning',
				route: ''
			})
		);
	}
}

function* watchPutNickname(action: ActionType<typeof putNickname>) {
	const { payload } = action;
	try {
		const response = yield call(Service.putNickname, payload);
		yield put(putNicknameSucceeded());
		yield put(postSignInSucceeded(response.data));
		yield put(updateUserAuthentication(response.data));
	} catch (error) {
		yield put(putNicknameFailed());
		yield put(
			handleNotificationModal({
				open: true,
				title: '안내',
				content: getErrorMessageByCode(error.response.data.code),
				severity: 'warning',
				route: ''
			})
		);
	}
}

function* watchPutAvatar(action: ActionType<typeof putAvatar>) {
	const { payload } = action;
	try {
		const response = yield call(Service.putAvatar, payload);
		yield put(putAvatarSucceeded());
		yield put(postSignInSucceeded(response.data));
		yield put(updateUserAuthentication(response.data));
	} catch (error) {
		yield put(putAvatarFailed());
		yield put(
			handleNotificationModal({
				open: true,
				title: '안내',
				content: getErrorMessageByCode(error.response.data.code),
				severity: 'warning',
				route: ''
			})
		);
	}
}

function* mypageSaga() {
	yield takeLatest(fetchPrivacy, watchFetchPrivacy);
	yield takeLatest(putPassword, watchPutPassword);
	yield takeLatest(deleteUser, watchDeleteUser);
	yield takeLatest(putNickname, watchPutNickname);
	yield takeLatest(putAvatar, watchPutAvatar);
}

export default mypageSaga;
