import { takeLatest, call, put } from 'redux-saga/effects';

// Modules
import {
	fetchMainContents,
	fetchMainContentsSucceeded,
	fetchMainContentsFailed,
	fetchNotices,
	fetchNoticesSucceeded,
	fetchNoticesFailed,
	fetchStorages,
	fetchStoragesSucceeded,
	fetchStoragesFailed,
	fetchLatestStorageBoards,
	fetchPopularStorageBoardsSucceeded,
	fetchPopularStorageBoardsFailed,
	fetchPopularStorageBoards,
	fetchLatestStorageBoardsSucceeded,
	fetchLatestStorageBoardsFailed
} from 'modules/home';

// Service
import * as PreviousService from 'services/previous/homeService';
import * as Service from 'services/home';

function* watchMainContents() {
	try {
		const response = yield call(PreviousService.fetchMainContents);
		yield put(fetchMainContentsSucceeded(response.data));
	} catch (error) {
		yield put(fetchMainContentsFailed(error));
	}
}

function* watchFetchNotices() {
	try {
		const response = yield call(Service.fetchNotices);
		yield put(fetchNoticesSucceeded(response.data.notices));
	} catch (error) {
		yield put(fetchNoticesFailed());
	}
}

function* watchFetchStorages() {
	try {
		const response = yield call(Service.fetchStorages);
		yield put(fetchStoragesSucceeded(response.data.storages));
	} catch (error) {
		yield put(fetchStoragesFailed());
	}
}

function* watchFetchLatestStorageBoards() {
	try {
		const response = yield call(Service.fetchLatestStorageBoards);
		yield put(fetchLatestStorageBoardsSucceeded(response.data));
	} catch (error) {
		yield put(fetchLatestStorageBoardsFailed());
	}
}

function* watchFetchPopularStorageBoards() {
	try {
		const response = yield call(Service.fetchPopularStorageBoards);
		yield put(fetchPopularStorageBoardsSucceeded(response.data));
	} catch (error) {
		yield put(fetchPopularStorageBoardsFailed());
	}
}

function* homeSaga() {
	yield takeLatest(fetchNotices, watchFetchNotices);
	yield takeLatest(fetchStorages, watchFetchStorages);
	yield takeLatest(fetchLatestStorageBoards, watchFetchLatestStorageBoards);
	yield takeLatest(fetchPopularStorageBoards, watchFetchPopularStorageBoards);
	yield takeLatest(fetchMainContents, watchMainContents);
}

export default homeSaga;
