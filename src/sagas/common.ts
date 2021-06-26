import { takeLatest, call, put } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';

// Modules
import {
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
	deleteSignOut,
	deleteSignOutSucceeded,
	deleteSignOutFailed
} from 'modules/common';

// Service
import * as Service from 'services/common';

// Snippets
import { getErrorMessageByCode } from 'snippets/common';

function* watchPostSignUp(action: ActionType<typeof postSignUp>) {
	const { payload } = action;
	try {
		yield call(Service.postSignUp, payload);
		yield put(postSignUpSucceeded());
		yield put(
			handleNotificationModal({
				open: true,
				title: '가입 완료',
				content:
					'입력하신 이메일로 인증 메일이 전송되었습니다. 이메일 인증 후에 개념글 저장소의 서비스를 이용하실 수 있습니다.',
				severity: 'success',
				route: ''
			})
		);
	} catch (error) {
		yield put(postSignUpFailed());
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

function* watchPutUserAuthentication(action: ActionType<typeof putUserAuthentication>) {
	const { payload } = action;
	try {
		yield call(Service.putUserAuthentication, payload);
		yield put(putUserAuthenticationSucceeded());
	} catch (error) {
		yield put(putUserAuthenticationFailed(getErrorMessageByCode(error.response.data.code)));
	}
}

function* watchPostPasswordFinder(action: ActionType<typeof postPasswordFinder>) {
	const { payload } = action;
	try {
		yield call(Service.postPasswordFinder, payload);
		yield put(postPasswordFinderSucceeded());
		yield put(
			handleNotificationModal({
				open: true,
				title: '발송 완료',
				content: '해당 이메일로 임시 비밀번호가 발송되었습니다.',
				severity: 'success',
				route: ''
			})
		);
	} catch (error) {
		yield put(postPasswordFinderFailed());
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

function* watchPostSignIn(action: ActionType<typeof postSignIn>) {
	const { payload } = action;
	try {
		const response = yield call(Service.postSignIn, payload);
		yield put(
			postSignInSucceeded({
				id: response.data.id,
				nickname: response.data.nickname,
				avatarUrl: response.data.avatarUrl,
				role: response.data.role,
				isAuthenticated: response.data.isAuthenticated
			})
		);
		window.localStorage.setItem('coc-jwt', response.headers.authorization);
		window.localStorage.removeItem('coc-info-jwt');
	} catch (error) {
		yield put(postSignInFailed());
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

function* watchDeleteSignOut() {
	try {
		yield call(Service.deleteSignOut);
		yield put(deleteSignOutSucceeded());
		yield window.localStorage.removeItem('coc-jwt');
		window.localStorage.removeItem('coc-info-jwt');
	} catch (error) {
		yield put(deleteSignOutFailed());
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

function* commonSaga() {
	yield takeLatest(postSignUp, watchPostSignUp);
	yield takeLatest(putUserAuthentication, watchPutUserAuthentication);
	yield takeLatest(postPasswordFinder, watchPostPasswordFinder);
	yield takeLatest(postSignIn, watchPostSignIn);
	yield takeLatest(deleteSignOut, watchDeleteSignOut);
}

export default commonSaga;
