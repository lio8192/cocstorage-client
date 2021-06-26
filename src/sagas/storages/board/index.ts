import { takeLatest, call, put } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import Router from 'next/router';

// Modules
import {
	fetchStorageDetail,
	fetchStorageDetailSucceeded,
	fetchStorageDetailFailed,
	fetchStorageBoards,
	fetchStorageBoardsSucceeded,
	fetchStorageBoardsFailed,
	postStorageBoardDraft,
	postStorageBoardDraftSucceeded,
	postStorageBoardDraftFailed,
	postNonMemberStorageBoardDraft,
	postNonMemberStorageBoardDraftSucceeded,
	postNonMemberStorageBoardDraftFailed,
	putStorageBoard,
	putStorageBoardSucceeded,
	putStorageBoardFailed,
	putNonMemberStorageBoard,
	putNonMemberStorageBoardSucceeded,
	putNonMemberStorageBoardFailed,
	fetchStorageBoardEditDetail,
	fetchStorageBoardEditDetailSucceeded,
	fetchStorageBoardEditDetailFailed,
	fetchNonMemberStorageBoardEditDetail,
	fetchNonMemberStorageBoardEditDetailSucceeded,
	fetchNonMemberStorageBoardEditDetailFailed
} from 'modules/storages/board';
import { handleNotificationModal } from 'modules/common';

// Service
import * as Service from 'services/storages/board';

// Snippets
import { getErrorMessageByCode } from 'snippets/common';

function* watchFetchStorageDetail(action: ActionType<typeof fetchStorageDetail>) {
	const { payload } = action;
	try {
		const response = yield call(Service.fetchStorageDetail, payload);
		yield put(fetchStorageDetailSucceeded(response.data));
	} catch (error) {
		yield put(fetchStorageDetailFailed());
		if (error.response.data.code === 'COC006') {
			yield put(
				handleNotificationModal({
					open: true,
					title: '안내',
					content: '저장소가 존재하지 않습니다.',
					severity: 'info',
					route: '/storages'
				})
			);
		} else {
			yield put(
				handleNotificationModal({
					open: true,
					title: '안내',
					content: getErrorMessageByCode(error.response.data.code),
					severity: 'error',
					route: '/storages'
				})
			);
		}
	}
}

function* watchFetchStorageBoards(action: ActionType<typeof fetchStorageBoards>) {
	const { payload } = action;
	try {
		const response = yield call(Service.fetchStorageBoards, payload);
		yield put(fetchStorageBoardsSucceeded(response.data));
	} catch (error) {
		yield put(fetchStorageBoardsFailed());
		if (error.response.data.code === 'COC006') {
			yield put(
				handleNotificationModal({
					open: true,
					title: '안내',
					content: '저장소가 존재하지 않습니다.',
					severity: 'info',
					route: '/storages'
				})
			);
		} else {
			yield put(
				handleNotificationModal({
					open: true,
					title: '안내',
					content: getErrorMessageByCode(error.response.data.code),
					severity: 'error',
					route: '/storages'
				})
			);
		}
	}
}

function* watchPostStorageBoardDraft(action: ActionType<typeof postStorageBoardDraft>) {
	const { payload } = action;
	try {
		const response = yield call(Service.postStorageBoardDraft, payload);
		yield put(postStorageBoardDraftSucceeded(response.data.id));
	} catch (error) {
		yield put(postStorageBoardDraftFailed());
	}
}

function* watchPostNonMemberStorageBoardDraft(action: ActionType<typeof postNonMemberStorageBoardDraft>) {
	const { payload } = action;
	try {
		const response = yield call(Service.postNonMemberStorageBoardDraft, payload);
		yield put(postNonMemberStorageBoardDraftSucceeded(response.data.id));
	} catch (error) {
		yield put(postNonMemberStorageBoardDraftFailed());
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

function* watchPutStorageBoard(action: ActionType<typeof putStorageBoard>) {
	const { payload } = action;
	try {
		const response = yield call(Service.putStorageBoard, payload);
		yield put(putStorageBoardSucceeded());
		yield call(Router.push, '/storages/[path]/[id]', `/storages/${Router.query.path}/${response.data.id}`);
	} catch (error) {
		yield put(putStorageBoardFailed());
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

function* watchPutNonMemberStorageBoard(action: ActionType<typeof putNonMemberStorageBoard>) {
	const { payload } = action;
	try {
		const response = yield call(Service.putNonMemberStorageBoard, payload);
		yield put(putNonMemberStorageBoardSucceeded());
		yield call(Router.push, '/storages/[path]/[id]', `/storages/${Router.query.path}/${response.data.id}`);
	} catch (error) {
		yield put(putNonMemberStorageBoardFailed());
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

function* watchFetchStorageBoardEditDetail(action: ActionType<typeof fetchStorageBoardEditDetail>) {
	const { payload } = action;
	try {
		const response = yield call(Service.fetchStorageBoardEditDetail, payload);
		yield put(fetchStorageBoardEditDetailSucceeded(response.data));
	} catch (error) {
		yield put(fetchStorageBoardEditDetailFailed());
		yield put(
			handleNotificationModal({
				open: true,
				title: '안내',
				content: '올바르지 않은 접근입니다.',
				severity: 'error',
				route: `/storages/${Router.query.path}`
			})
		);
	}
}

function* watchFetchNonMemberStorageBoardEditDetail(action: ActionType<typeof fetchNonMemberStorageBoardEditDetail>) {
	const { payload } = action;
	try {
		const response = yield call(Service.fetchNonMemberStorageBoardEditDetail, payload);
		yield put(fetchNonMemberStorageBoardEditDetailSucceeded(response.data));
	} catch (error) {
		yield put(fetchNonMemberStorageBoardEditDetailFailed());
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

function* storageBoardSaga() {
	yield takeLatest(fetchStorageDetail, watchFetchStorageDetail);
	yield takeLatest(fetchStorageBoards, watchFetchStorageBoards);
	yield takeLatest(postStorageBoardDraft, watchPostStorageBoardDraft);
	yield takeLatest(postNonMemberStorageBoardDraft, watchPostNonMemberStorageBoardDraft);
	yield takeLatest(putStorageBoard, watchPutStorageBoard);
	yield takeLatest(putNonMemberStorageBoard, watchPutNonMemberStorageBoard);
	yield takeLatest(fetchStorageBoardEditDetail, watchFetchStorageBoardEditDetail);
	yield takeLatest(fetchNonMemberStorageBoardEditDetail, watchFetchNonMemberStorageBoardEditDetail);
}

export default storageBoardSaga;
