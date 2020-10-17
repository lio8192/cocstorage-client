import { takeLatest, call, put } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';

// Modules
import { postStorage, postStorageSucceeded, postStorageFailed } from 'modules/storages';

// Service
import * as Service from 'services/storages';
import { handleNotificationModal } from 'modules/common';
import { getErrorMessageByCode } from 'snippets/common';

function* watchPostStorages(action: ActionType<typeof postStorage>) {
	const { payload } = action;
	try {
		yield call(Service.postStorage, payload);
		yield put(postStorageSucceeded());
		yield put(
			handleNotificationModal({
				open: true,
				title: '등록 완료',
				contentText: '저장소가 등록되었습니다.',
				severity: 'success',
				route: ''
			})
		);
	} catch (error) {
		yield put(postStorageFailed());
		yield put(
			handleNotificationModal({
				open: true,
				title: '안내',
				contentText: getErrorMessageByCode(error.response.data.code),
				severity: 'warning',
				route: ''
			})
		);
	}
}

function* storagesSaga() {
	yield takeLatest(postStorage, watchPostStorages);
}

export default storagesSaga;
