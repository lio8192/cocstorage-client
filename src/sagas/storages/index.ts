import { takeLatest, call, put } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';

// Modules
import {
	fetchStorages,
	fetchStoragesSucceeded,
	fetchStoragesFailed,
	handlePagination,
	postStorage,
	postStorageSucceeded,
	postStorageFailed
} from 'modules/storages';
import { handleNotificationModal } from 'modules/common';

// Service
import * as Service from 'services/storages';

// Snippets
import { getErrorMessageByCode } from 'snippets/common';

function* watchFetchStorages(action: ActionType<typeof fetchStorages>) {
	const { payload } = action;
	try {
		const response = yield call(Service.fetchStorages, payload);
		yield put(fetchStoragesSucceeded(response.data.storages));
		yield put(handlePagination(response.data.pagination));
	} catch (error) {
		yield put(fetchStoragesFailed());
	}
}

function* watchPostStorages(action: ActionType<typeof postStorage>) {
	const { payload } = action;
	try {
		yield call(Service.postStorage, payload);
		yield put(postStorageSucceeded());
		yield put(
			handleNotificationModal({
				open: true,
				title: '등록 완료',
				content: '정상적으로 등록되었어요.',
				severity: 'success',
				route: ''
			})
		);
		yield put(
			fetchStorages({
				per: 180,
				page: 1,
				name: null,
				orderBy: 'latest'
			})
		);
	} catch (error) {
		yield put(postStorageFailed());
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

function* storagesSaga() {
	yield takeLatest(fetchStorages, watchFetchStorages);
	yield takeLatest(postStorage, watchPostStorages);
}

export default storagesSaga;
