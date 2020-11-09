import { takeLatest, call, put } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import Router from 'next/router';

// Modules
import {
	fetchNoticeDetail,
	fetchNoticeDetailSucceeded,
	fetchNoticeDetailFailed,
	putNoticeDetailViewCountSucceeded,
	fetchNoticeDetailComments,
	fetchNoticeDetailCommentsSucceeded,
	fetchNoticeDetailCommentsFailed,
	postNoticeDetailComment,
	postNoticeDetailCommentSucceeded,
	postNoticeDetailCommentFailed,
	postNonMemberNoticeDetailComment,
	postNonMemberNoticeDetailCommentSucceeded,
	postNonMemberNoticeDetailCommentFailed,
	postNoticeDetailReply,
	postNoticeDetailReplySucceeded,
	postNoticeDetailReplyFailed,
	postNonMemberNoticeDetailReply,
	postNonMemberNoticeDetailReplySucceeded,
	postNonMemberNoticeDetailReplyFailed,
	deleteNoticeDetail,
	deleteNoticeDetailSucceeded,
	deleteNoticeDetailFailed,
	deleteNoticeDetailComment,
	deleteNoticeDetailCommentSucceeded,
	deleteNoticeDetailCommentFailed,
	deleteNonMemberNoticeDetailComment,
	deleteNonMemberNoticeDetailCommentSucceeded,
	deleteNonMemberNoticeDetailCommentFailed,
	deleteNoticeDetailReply,
	deleteNoticeDetailReplySucceeded,
	deleteNoticeDetailReplyFailed,
	deleteNonMemberNoticeDetailReply,
	deleteNonMemberNoticeDetailReplySucceeded,
	deleteNonMemberNoticeDetailReplyFailed
} from 'modules/notices/detail';
import { handleNotificationModal } from 'modules/common';

// Service
import * as Service from 'services/notices/detail';

// Snippets
import { getErrorMessageByCode } from 'snippets/common';

function* watchFetchNoticeDetail(action: ActionType<typeof fetchNoticeDetail>) {
	const { payload } = action;
	try {
		let response = yield call(Service.fetchNoticeDetail, payload);
		yield put(fetchNoticeDetailSucceeded(response.data));
		response = yield call(Service.putNoticeDetailViewCount, payload);
		yield put(putNoticeDetailViewCountSucceeded(response.data.viewCount));
	} catch (error) {
		yield put(fetchNoticeDetailFailed());
		if (error.response.status === 404) {
			yield put(
				handleNotificationModal({
					open: true,
					title: '안내',
					contentText: '이미 삭제되었거나 존재하지 않는 소식입니다.',
					severity: 'info',
					route: '/notices'
				})
			);
		} else {
			yield put(
				handleNotificationModal({
					open: true,
					title: '안내',
					contentText: getErrorMessageByCode(error.response.data.code),
					severity: 'error',
					route: '/notices'
				})
			);
		}
	}
}

function* watchFetchNoticeDetailComments(action: ActionType<typeof fetchNoticeDetailComments>) {
	const { payload } = action;
	try {
		const response = yield call(Service.fetchNoticeDetailComments, payload);
		yield put(
			fetchNoticeDetailCommentsSucceeded({
				data: response.data.comments,
				pagination: response.data.pagination
			})
		);
	} catch (error) {
		yield put(fetchNoticeDetailCommentsFailed());
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

function* watchPostNoticeDetailComment(action: ActionType<typeof postNoticeDetailComment>) {
	const { payload } = action;
	try {
		yield call(Service.postNoticeDetailComment, payload);
		yield put(postNoticeDetailCommentSucceeded());
		yield put(
			fetchNoticeDetailComments({
				noticeId: payload.noticeId,
				per: 5,
				page: 1,
				orderBy: 'latest'
			})
		);
	} catch (error) {
		yield put(postNoticeDetailCommentFailed());
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

function* watchPostNonMemberNoticeDetailComment(action: ActionType<typeof postNonMemberNoticeDetailComment>) {
	const { payload } = action;
	try {
		yield call(Service.postNonMemberNoticeDetailComment, payload);
		yield put(postNonMemberNoticeDetailCommentSucceeded());
		yield put(
			fetchNoticeDetailComments({
				noticeId: payload.noticeId,
				per: 5,
				page: 1,
				orderBy: 'latest'
			})
		);
	} catch (error) {
		yield put(postNonMemberNoticeDetailCommentFailed());
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

function* watchPostNoticeDetailReply(action: ActionType<typeof postNoticeDetailReply>) {
	const { payload } = action;
	try {
		yield call(Service.postNoticeDetailReply, payload);
		yield put(postNoticeDetailReplySucceeded());
		yield put(
			fetchNoticeDetailComments({
				noticeId: payload.noticeId,
				per: 5,
				page: payload.page || 1,
				orderBy: 'latest'
			})
		);
	} catch (error) {
		yield put(postNoticeDetailReplyFailed());
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

function* watchPostNonMemberNoticeDetailReply(action: ActionType<typeof postNonMemberNoticeDetailReply>) {
	const { payload } = action;
	try {
		yield call(Service.postNonMemberNoticeDetailReply, payload);
		yield put(postNonMemberNoticeDetailReplySucceeded());
		yield put(
			fetchNoticeDetailComments({
				noticeId: payload.noticeId,
				per: 5,
				page: payload.page || 1,
				orderBy: 'latest'
			})
		);
	} catch (error) {
		yield put(postNonMemberNoticeDetailReplyFailed());
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

function* watchDeleteNoticeDetail(action: ActionType<typeof deleteNoticeDetail>) {
	const { payload } = action;
	try {
		yield call(Service.deleteNoticeDetail, payload);
		yield put(deleteNoticeDetailSucceeded());
		yield call(Router.push, '/notices', '/notices');
	} catch (error) {
		yield put(deleteNoticeDetailFailed());
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

function* watchDeleteNoticeDetailComment(action: ActionType<typeof deleteNoticeDetailComment>) {
	const { payload } = action;
	try {
		yield call(Service.deleteNoticeDetailComment, payload);
		yield put(deleteNoticeDetailCommentSucceeded());
		yield put(
			fetchNoticeDetailComments({
				noticeId: payload.noticeId,
				per: 5,
				page: 1,
				orderBy: 'latest'
			})
		);
	} catch (error) {
		yield put(deleteNoticeDetailCommentFailed());
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

function* watchDeleteNonMemberNoticeDetailComment(action: ActionType<typeof deleteNonMemberNoticeDetailComment>) {
	const { payload } = action;
	try {
		yield call(Service.deleteNonMemberNoticeDetailComment, payload);
		yield put(deleteNonMemberNoticeDetailCommentSucceeded());
		yield put(
			fetchNoticeDetailComments({
				noticeId: payload.noticeId,
				per: 5,
				page: 1,
				orderBy: 'latest'
			})
		);
	} catch (error) {
		yield put(deleteNonMemberNoticeDetailCommentFailed());
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

function* watchDeleteNoticeDetailReply(action: ActionType<typeof deleteNoticeDetailReply>) {
	const { payload } = action;
	try {
		yield call(Service.deleteNoticeDetailReply, payload);
		yield put(deleteNoticeDetailReplySucceeded());
		yield put(
			fetchNoticeDetailComments({
				noticeId: payload.noticeId,
				per: 5,
				page: payload.page || 1,
				orderBy: 'latest'
			})
		);
	} catch (error) {
		yield put(deleteNoticeDetailReplyFailed());
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

function* watchDeleteNonMemberNoticeDetailReply(action: ActionType<typeof deleteNonMemberNoticeDetailReply>) {
	const { payload } = action;
	try {
		yield call(Service.deleteNonMemberNoticeDetailReply, payload);
		yield put(deleteNonMemberNoticeDetailReplySucceeded());
		yield put(
			fetchNoticeDetailComments({
				noticeId: payload.noticeId,
				per: 5,
				page: payload.page || 1,
				orderBy: 'latest'
			})
		);
	} catch (error) {
		yield put(deleteNonMemberNoticeDetailReplyFailed());
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

function* noticeDetailSaga() {
	yield takeLatest(fetchNoticeDetail, watchFetchNoticeDetail);
	yield takeLatest(fetchNoticeDetailComments, watchFetchNoticeDetailComments);
	yield takeLatest(postNoticeDetailComment, watchPostNoticeDetailComment);
	yield takeLatest(postNonMemberNoticeDetailComment, watchPostNonMemberNoticeDetailComment);
	yield takeLatest(postNoticeDetailReply, watchPostNoticeDetailReply);
	yield takeLatest(postNonMemberNoticeDetailReply, watchPostNonMemberNoticeDetailReply);
	yield takeLatest(deleteNoticeDetail, watchDeleteNoticeDetail);
	yield takeLatest(deleteNoticeDetailComment, watchDeleteNoticeDetailComment);
	yield takeLatest(deleteNonMemberNoticeDetailComment, watchDeleteNonMemberNoticeDetailComment);
	yield takeLatest(deleteNoticeDetailReply, watchDeleteNoticeDetailReply);
	yield takeLatest(deleteNonMemberNoticeDetailReply, watchDeleteNonMemberNoticeDetailReply);
}

export default noticeDetailSaga;
