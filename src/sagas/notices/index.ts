import { takeLatest, call, put } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import Router from 'next/router';

// Modules
import {
	fetchFirstNotices,
	fetchFirstNoticesSucceeded,
	fetchFirstNoticesFailed,
	fetchNotices,
	fetchNoticesSucceeded,
	fetchNoticesFailed,
	handlePagination,
	postNoticeDraft,
	postNoticeDraftSucceeded,
	postNoticeDraftFailed,
	putNotice,
	putNoticeSucceeded,
	putNoticeFailed,
	fetchNoticeEditDetail,
	fetchNoticeEditDetailSucceeded,
	fetchNoticeEditDetailFailed
} from 'modules/notices';
import { handleNotificationModal } from 'modules/common';

// Service
import * as Service from 'services/notices';

// Snippets
import { getErrorMessageByCode } from 'snippets/common';

function* watchFetchFirstNotices(action: ActionType<typeof fetchFirstNotices>) {
	const { payload } = action;
	try {
		const response = yield call(Service.fetchNotices, payload);
		yield put(fetchFirstNoticesSucceeded(response.data.notices));
		yield put(handlePagination(response.data.pagination));
	} catch (error) {
		yield put(fetchFirstNoticesFailed());
		yield put(
			handleNotificationModal({
				open: true,
				title: '안내',
				content: getErrorMessageByCode(error.response.data.code),
				severity: 'error',
				route: ''
			})
		);
	}
}

function* watchFetchNotices(action: ActionType<typeof fetchNotices>) {
	const { payload } = action;
	try {
		const response = yield call(Service.fetchNotices, payload);
		yield put(fetchNoticesSucceeded(response.data.notices));
		yield put(handlePagination(response.data.pagination));
	} catch (error) {
		yield put(fetchNoticesFailed());
		yield put(
			handleNotificationModal({
				open: true,
				title: '안내',
				content: getErrorMessageByCode(error.response.data.code),
				severity: 'error',
				route: ''
			})
		);
	}
}

function* watchPostNoticeDraft() {
	try {
		const response = yield call(Service.postNoticeDraft);
		yield put(postNoticeDraftSucceeded(response.data.id));
	} catch (error) {
		yield put(postNoticeDraftFailed());
		yield put(
			handleNotificationModal({
				open: true,
				title: '오류',
				content: getErrorMessageByCode(error.response.data.code),
				severity: 'error',
				route: '/notices'
			})
		);
	}
}

function* watchPutNotice(action: ActionType<typeof putNotice>) {
	const { payload } = action;
	try {
		const response = yield call(Service.putNotice, payload);
		yield put(putNoticeSucceeded());
		yield call(Router.push, '/notices/[id]', `/notices/${response.data.id}`);
		// yield put(clearNotices());
	} catch (error) {
		yield put(putNoticeFailed());
		yield put(
			handleNotificationModal({
				open: true,
				title: '오류',
				content: getErrorMessageByCode(error.response.data.code),
				severity: 'error',
				route: '/notices'
			})
		);
	}
}

function* watchFetchNoticeEditDetail(action: ActionType<typeof fetchNoticeEditDetail>) {
	const { payload } = action;
	try {
		const response = yield call(Service.fetchNoticeEditDetail, payload);
		yield put(fetchNoticeEditDetailSucceeded(response.data));
	} catch (error) {
		yield put(fetchNoticeEditDetailFailed());
		yield put(
			handleNotificationModal({
				open: true,
				title: '오류',
				content: '올바르지 않은 접근입니다.',
				severity: 'error',
				route: '/notices'
			})
		);
	}
}

function* noticesSaga() {
	yield takeLatest(fetchFirstNotices, watchFetchFirstNotices);
	yield takeLatest(fetchNotices, watchFetchNotices);
	yield takeLatest(postNoticeDraft, watchPostNoticeDraft);
	yield takeLatest(putNotice, watchPutNotice);
	yield takeLatest(fetchNoticeEditDetail, watchFetchNoticeEditDetail);
}

export default noticesSaga;
