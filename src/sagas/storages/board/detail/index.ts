import { takeLatest, call, put } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import Router from 'next/router';

// Modules
import {
	fetchStorageDetailAndStorageBoardDetail,
	fetchStorageDetailAndStorageBoardDetailSucceeded,
	fetchStorageDetailAndStorageBoardDetailFailed,
	fetchStorageBoardDetail,
	fetchStorageBoardDetailFailed,
	fetchStorageBoardDetailSucceeded,
	putStorageBoardDetailViewCount,
	putStorageBoardDetailViewCountSucceeded,
	putStorageBoardDetailViewCountFailed,
	putStorageBoardDetailRecommend,
	putStorageBoardDetailRecommendSucceeded,
	putStorageBoardDetailRecommendFailed,
	putNonMemberStorageBoardDetailRecommend,
	putNonMemberStorageBoardDetailRecommendSucceeded,
	putNonMemberStorageBoardDetailRecommendFailed,
	fetchStorageBoardDetailComments,
	fetchStorageBoardDetailCommentsSucceeded,
	fetchStorageBoardDetailCommentsFailed,
	postStorageBoardDetailComment,
	postStorageBoardDetailCommentSucceeded,
	postStorageBoardDetailCommentFailed,
	postNonMemberStorageBoardDetailComment,
	postNonMemberStorageBoardDetailCommentSucceeded,
	postNonMemberStorageBoardDetailCommentFailed,
	postStorageBoardDetailReply,
	postStorageBoardDetailReplySucceeded,
	postStorageBoardDetailReplyFailed,
	postNonMemberStorageBoardDetailReply,
	postNonMemberStorageBoardDetailReplySucceeded,
	postNonMemberStorageBoardDetailReplyFailed,
	deleteStorageBoardDetail,
	deleteStorageBoardDetailSucceeded,
	deleteStorageBoardDetailFailed,
	deleteNonMemberStorageBoardDetail,
	deleteNonMemberStorageBoardDetailSucceeded,
	deleteNonMemberStorageBoardDetailFailed,
	deleteStorageBoardDetailComment,
	deleteStorageBoardDetailCommentSucceeded,
	deleteStorageBoardDetailCommentFailed,
	deleteNonMemberStorageBoardDetailComment,
	deleteNonMemberStorageBoardDetailCommentSucceeded,
	deleteNonMemberStorageBoardDetailCommentFailed,
	deleteStorageBoardDetailReply,
	deleteStorageBoardDetailReplySucceeded,
	deleteStorageBoardDetailReplyFailed,
	deleteNonMemberStorageBoardDetailReply,
	deleteNonMemberStorageBoardDetailReplySucceeded,
	deleteNonMemberStorageBoardDetailReplyFailed
} from 'modules/storages/board/detail';
import { fetchStorageDetailSucceeded } from 'modules/storages/board';
import { handleNotificationModal } from 'modules/common';

// Service
import * as Service from 'services/storages/board/detail';
import { fetchStorageDetail } from 'services/storages/board';

// Snippets
import { getErrorMessageByCode } from 'snippets/common';

function* watchFetchStorageDetailAndStorageBoardDetail(
	action: ActionType<typeof fetchStorageDetailAndStorageBoardDetail>
) {
	const {
		payload: { storageId, id }
	} = action;
	try {
		const response = yield call(fetchStorageDetail, storageId);
		yield put(fetchStorageDetailSucceeded(response.data));
		const detailResponse = yield call(Service.fetchStorageBoardDetail, response.data.id, id);
		yield put(fetchStorageDetailAndStorageBoardDetailSucceeded(detailResponse.data));
	} catch (error) {
		yield put(fetchStorageDetailAndStorageBoardDetailFailed());
		if (error.response.status === 404) {
			yield put(
				handleNotificationModal({
					open: true,
					title: '안내',
					contentText: '이미 삭제되었거나 존재하지 않는 개념글입니다.',
					severity: 'info',
					route: `/storages/${storageId}`
				})
			);
		} else {
			yield put(
				handleNotificationModal({
					open: true,
					title: '안내',
					contentText: getErrorMessageByCode(error.response.data.code),
					severity: 'error',
					route: `/storages/${storageId}`
				})
			);
		}
	}
}

function* watchFetchStorageBoardDetail(action: ActionType<typeof fetchStorageBoardDetail>) {
	const {
		payload: { storageId, id }
	} = action;
	try {
		const response = yield call(Service.fetchStorageBoardDetail, storageId, id);
		yield put(fetchStorageBoardDetailSucceeded(response.data));
	} catch (error) {
		yield put(fetchStorageBoardDetailFailed());
		if (error.response.status === 404) {
			yield put(
				handleNotificationModal({
					open: true,
					title: '안내',
					contentText: '이미 삭제되었거나 존재하지 않는 개념글입니다.',
					severity: 'error',
					route: `/storages/${Router.query.path}`
				})
			);
		} else {
			yield put(
				handleNotificationModal({
					open: true,
					title: '안내',
					contentText: getErrorMessageByCode(error.response.data.code),
					severity: 'error',
					route: `/storages/${Router.query.path}`
				})
			);
		}
	}
}

function* watchPutStorageBoardDetailViewCount(action: ActionType<typeof putStorageBoardDetailViewCount>) {
	const {
		payload: { storageId, id }
	} = action;
	try {
		const response = yield call(Service.putStorageBoardDetailViewCount, storageId, id);
		yield put(putStorageBoardDetailViewCountSucceeded(response.data.viewCount));
	} catch (error) {
		yield put(putStorageBoardDetailViewCountFailed());
	}
}

function* watchPutStorageBoardDetailRecommend(action: ActionType<typeof putStorageBoardDetailRecommend>) {
	const { payload } = action;
	try {
		const response = yield call(Service.putStorageBoardDetailRecommend, payload);
		yield put(
			putStorageBoardDetailRecommendSucceeded({
				message: payload.type === 0 ? '추천을 누르셨습니다.' : '비추천을 누르셨습니다.',
				thumbUp: response.data.thumbUp,
				thumbDown: response.data.thumbDown
			})
		);
	} catch (error) {
		yield put(putStorageBoardDetailRecommendFailed(getErrorMessageByCode(error.response.data.code)));
	}
}

function* watchPutNonMemberStorageBoardDetailRecommend(
	action: ActionType<typeof putNonMemberStorageBoardDetailRecommend>
) {
	const { payload } = action;
	try {
		const response = yield call(Service.putNonMemberStorageBoardDetailRecommend, payload);
		yield put(
			putNonMemberStorageBoardDetailRecommendSucceeded({
				message: payload.type === 0 ? '추천을 누르셨습니다.' : '비추천을 누르셨습니다.',
				thumbUp: response.data.thumbUp,
				thumbDown: response.data.thumbDown
			})
		);
	} catch (error) {
		yield put(putNonMemberStorageBoardDetailRecommendFailed(getErrorMessageByCode(error.response.data.code)));
	}
}

function* watchFetchStorageBoardDetailComments(action: ActionType<typeof fetchStorageBoardDetailComments>) {
	const { payload } = action;
	try {
		const response = yield call(Service.fetchStorageBoardDetailComments, payload);
		yield put(
			fetchStorageBoardDetailCommentsSucceeded({
				data: response.data.comments,
				pagination: response.data.pagination
			})
		);
	} catch (error) {
		yield put(fetchStorageBoardDetailCommentsFailed());
		yield put(
			handleNotificationModal({
				open: true,
				title: '안내',
				contentText: getErrorMessageByCode(error.response.data.code),
				severity: 'error',
				route: `/storages/${Router.query.path}`
			})
		);
	}
}

function* watchPostStorageBoardDetailComment(action: ActionType<typeof postStorageBoardDetailComment>) {
	const { payload } = action;
	try {
		yield call(Service.postStorageBoardDetailComment, payload);
		yield put(postStorageBoardDetailCommentSucceeded());
		yield put(
			fetchStorageBoardDetailComments({
				storageId: payload.storageId,
				storageBoardId: payload.storageBoardId,
				per: payload.per || 10,
				page: payload.page || 1,
				orderBy: payload.orderBy || 'latest'
			})
		);
	} catch (error) {
		yield put(postStorageBoardDetailCommentFailed());
		yield put(
			handleNotificationModal({
				open: true,
				title: '안내',
				contentText: getErrorMessageByCode(error.response.data.code),
				severity: 'error',
				route: `/storages/${Router.query.path}`
			})
		);
	}
}

function* watchPostNonMemberStorageBoardDetailComment(
	action: ActionType<typeof postNonMemberStorageBoardDetailComment>
) {
	const { payload } = action;
	try {
		yield call(Service.postNonMemberStorageBoardDetailComment, payload);
		yield put(postNonMemberStorageBoardDetailCommentSucceeded());
		yield put(
			fetchStorageBoardDetailComments({
				storageId: payload.storageId,
				storageBoardId: payload.storageBoardId,
				per: payload.per || 10,
				page: payload.page || 1,
				orderBy: payload.orderBy || 'latest'
			})
		);
	} catch (error) {
		yield put(postNonMemberStorageBoardDetailCommentFailed());
		yield put(
			handleNotificationModal({
				open: true,
				title: '안내',
				contentText: getErrorMessageByCode(error.response.data.code),
				severity: 'error',
				route: ''
			})
		);
	}
}

function* watchPostStorageBoardDetailReply(action: ActionType<typeof postStorageBoardDetailReply>) {
	const { payload } = action;
	try {
		yield call(Service.postStorageBoardDetailReply, payload);
		yield put(postStorageBoardDetailReplySucceeded());
		yield put(
			fetchStorageBoardDetailComments({
				storageId: payload.storageId,
				storageBoardId: payload.storageBoardId,
				per: payload.per || 10,
				page: payload.page || 1,
				orderBy: payload.orderBy || 'latest'
			})
		);
	} catch (error) {
		yield put(postStorageBoardDetailReplyFailed());
		yield put(
			handleNotificationModal({
				open: true,
				title: '안내',
				contentText: getErrorMessageByCode(error.response.data.code),
				severity: 'error',
				route: ''
			})
		);
	}
}

function* watchPostNonMemberStorageBoardDetailReply(action: ActionType<typeof postNonMemberStorageBoardDetailReply>) {
	const { payload } = action;
	try {
		yield call(Service.postNonMemberStorageBoardDetailReply, payload);
		yield put(postNonMemberStorageBoardDetailReplySucceeded());
		yield put(
			fetchStorageBoardDetailComments({
				storageId: payload.storageId,
				storageBoardId: payload.storageBoardId,
				per: payload.per || 10,
				page: payload.page || 1,
				orderBy: payload.orderBy || 'latest'
			})
		);
	} catch (error) {
		yield put(postNonMemberStorageBoardDetailReplyFailed());
		yield put(
			handleNotificationModal({
				open: true,
				title: '안내',
				contentText: getErrorMessageByCode(error.response.data.code),
				severity: 'error',
				route: ''
			})
		);
	}
}

function* watchDeleteStorageBoardDetail(action: ActionType<typeof deleteStorageBoardDetail>) {
	const { payload } = action;
	try {
		yield call(Service.deleteStorageBoardDetail, payload);
		yield put(deleteStorageBoardDetailSucceeded());
		yield call(Router.push, '/storages/[path]', `/storages/${Router.query.path}`);
	} catch (error) {
		yield put(deleteStorageBoardDetailFailed());
		yield put(
			handleNotificationModal({
				open: true,
				title: '안내',
				contentText: getErrorMessageByCode(error.response.data.code),
				severity: 'error',
				route: ''
			})
		);
	}
}

function* watchDeleteNonMemberStorageBoardDetail(action: ActionType<typeof deleteNonMemberStorageBoardDetail>) {
	const { payload } = action;
	try {
		yield call(Service.deleteNonMemberStorageBoardDetail, payload);
		yield put(deleteNonMemberStorageBoardDetailSucceeded());
		yield call(Router.push, '/storages/[path]', `/storages/${Router.query.path}`);
	} catch (error) {
		yield put(deleteNonMemberStorageBoardDetailFailed());
		yield put(
			handleNotificationModal({
				open: true,
				title: '안내',
				contentText: getErrorMessageByCode(error.response.data.code),
				severity: 'error',
				route: ''
			})
		);
	}
}

function* watchDeleteStorageBoardDetailComment(action: ActionType<typeof deleteStorageBoardDetailComment>) {
	const { payload } = action;
	try {
		yield call(Service.deleteStorageBoardDetailComment, payload);
		yield put(deleteStorageBoardDetailCommentSucceeded());
		yield put(
			fetchStorageBoardDetailComments({
				storageId: payload.storageId,
				storageBoardId: payload.storageBoardId,
				page: payload.page || 1,
				per: payload.per || 10,
				orderBy: payload.orderBy || 'latest'
			})
		);
	} catch (error) {
		yield put(deleteStorageBoardDetailCommentFailed());
		yield put(
			handleNotificationModal({
				open: true,
				title: '안내',
				contentText: getErrorMessageByCode(error.response.data.code),
				severity: 'error',
				route: ''
			})
		);
	}
}

function* watchDeleteNonMemberStorageBoardDetailComment(
	action: ActionType<typeof deleteNonMemberStorageBoardDetailComment>
) {
	const { payload } = action;
	try {
		yield call(Service.deleteNonMemberStorageBoardDetailComment, payload);
		yield put(deleteNonMemberStorageBoardDetailCommentSucceeded());
		yield put(
			fetchStorageBoardDetailComments({
				storageId: payload.storageId,
				storageBoardId: payload.storageBoardId,
				page: payload.page || 1,
				per: payload.per || 10,
				orderBy: payload.orderBy || 'latest'
			})
		);
	} catch (error) {
		yield put(deleteNonMemberStorageBoardDetailCommentFailed());
		yield put(
			handleNotificationModal({
				open: true,
				title: '안내',
				contentText: getErrorMessageByCode(error.response.data.code),
				severity: 'error',
				route: ''
			})
		);
	}
}

function* watchDeleteStorageBoardDetailReply(action: ActionType<typeof deleteStorageBoardDetailReply>) {
	const { payload } = action;
	try {
		yield call(Service.deleteStorageBoardDetailReply, payload);
		yield put(deleteStorageBoardDetailReplySucceeded());
		yield put(
			fetchStorageBoardDetailComments({
				storageId: payload.storageId,
				storageBoardId: payload.storageBoardId,
				page: payload.page || 1,
				per: payload.per || 10,
				orderBy: payload.orderBy || 'latest'
			})
		);
	} catch (error) {
		yield put(deleteStorageBoardDetailReplyFailed());
		yield put(
			handleNotificationModal({
				open: true,
				title: '안내',
				contentText: getErrorMessageByCode(error.response.data.code),
				severity: 'error',
				route: ''
			})
		);
	}
}

function* watchDeleteNonMemberStorageBoardDetailReply(
	action: ActionType<typeof deleteNonMemberStorageBoardDetailReply>
) {
	const { payload } = action;
	try {
		yield call(Service.deleteNonMemberStorageBoardDetailReply, payload);
		yield put(deleteNonMemberStorageBoardDetailReplySucceeded());
		yield put(
			fetchStorageBoardDetailComments({
				storageId: payload.storageId,
				storageBoardId: payload.storageBoardId,
				page: payload.page || 1,
				per: payload.per || 10,
				orderBy: payload.orderBy || 'latest'
			})
		);
	} catch (error) {
		yield put(deleteNonMemberStorageBoardDetailReplyFailed());
		yield put(
			handleNotificationModal({
				open: true,
				title: '안내',
				contentText: getErrorMessageByCode(error.response.data.code),
				severity: 'error',
				route: ''
			})
		);
	}
}

function* storageBoardDetailSaga() {
	yield takeLatest(fetchStorageDetailAndStorageBoardDetail, watchFetchStorageDetailAndStorageBoardDetail);
	yield takeLatest(fetchStorageBoardDetail, watchFetchStorageBoardDetail);
	yield takeLatest(putStorageBoardDetailViewCount, watchPutStorageBoardDetailViewCount);
	yield takeLatest(putStorageBoardDetailRecommend, watchPutStorageBoardDetailRecommend);
	yield takeLatest(putNonMemberStorageBoardDetailRecommend, watchPutNonMemberStorageBoardDetailRecommend);
	yield takeLatest(fetchStorageBoardDetailComments, watchFetchStorageBoardDetailComments);
	yield takeLatest(postStorageBoardDetailComment, watchPostStorageBoardDetailComment);
	yield takeLatest(postNonMemberStorageBoardDetailComment, watchPostNonMemberStorageBoardDetailComment);
	yield takeLatest(postStorageBoardDetailReply, watchPostStorageBoardDetailReply);
	yield takeLatest(postNonMemberStorageBoardDetailReply, watchPostNonMemberStorageBoardDetailReply);
	yield takeLatest(deleteStorageBoardDetail, watchDeleteStorageBoardDetail);
	yield takeLatest(deleteNonMemberStorageBoardDetail, watchDeleteNonMemberStorageBoardDetail);
	yield takeLatest(deleteStorageBoardDetailComment, watchDeleteStorageBoardDetailComment);
	yield takeLatest(deleteNonMemberStorageBoardDetailComment, watchDeleteNonMemberStorageBoardDetailComment);
	yield takeLatest(deleteStorageBoardDetailReply, watchDeleteStorageBoardDetailReply);
	yield takeLatest(deleteNonMemberStorageBoardDetailReply, watchDeleteNonMemberStorageBoardDetailReply);
}

export default storageBoardDetailSaga;
