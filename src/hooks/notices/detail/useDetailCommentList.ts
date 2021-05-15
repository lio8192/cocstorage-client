import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import {
	deleteNoticeDetailComment,
	deleteNoticeDetailReply,
	handleNoticeDetailDeleteAuthDialog,
	handleNoticeDetailReplyWriteForm
} from 'modules/notices/detail';
import { RootState } from 'modules';

export default function useDetailCommentList() {
	const dispatch = useDispatch();
	const {
		user: { id: userId }
	} = useSelector((state: RootState) => state.common);
	const noticeDetailState = useSelector((state: RootState) => state.noticeDetail);

	const onHandleNoticeDetailReplyWriteForm = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			const id = Number(event.currentTarget.getAttribute('data-comment-id'));

			dispatch(handleNoticeDetailReplyWriteForm(id));
		},
		[dispatch]
	);

	const onHandleNoticeDetailDeleteAuthDialog = useCallback(
		(event: React.MouseEvent<HTMLLIElement>) => {
			const dataId = Number(event.currentTarget.getAttribute('data-id') || 0);
			const subTitle = String(event.currentTarget.getAttribute('data-sub-title') || '');
			const type = String(event.currentTarget.getAttribute('data-type') || '');

			dispatch(
				handleNoticeDetailDeleteAuthDialog({
					dataId,
					subTitle,
					type
				})
			);
		},
		[dispatch]
	);

	const onDeleteNoticeDetailComment = useCallback(
		(event: React.MouseEvent<HTMLLIElement>) => {
			const id = Number(event.currentTarget.getAttribute('data-comment-id') || 0);

			let page = noticeDetailState.comments.pagination.currentPage;

			if (page !== 1 && noticeDetailState.comments.data.length === 1) page -= 1;

			dispatch(
				deleteNoticeDetailComment({
					noticeId: noticeDetailState.detail.id,
					id,
					page,
					per: noticeDetailState.comments.fetchParams.per,
					orderBy: noticeDetailState.comments.fetchParams.orderBy
				})
			);
		},
		[
			dispatch,
			noticeDetailState.detail.id,
			noticeDetailState.comments.data,
			noticeDetailState.comments.fetchParams.per,
			noticeDetailState.comments.fetchParams.orderBy,
			noticeDetailState.comments.pagination.currentPage
		]
	);

	const onDeleteNoticeDetailReply = useCallback(
		(event: React.MouseEvent<HTMLLIElement>) => {
			const noticeCommentId = Number(event.currentTarget.getAttribute('data-comment-id') || 0);
			const id = Number(event.currentTarget.getAttribute('data-reply-id') || 0);

			dispatch(
				deleteNoticeDetailReply({
					noticeId: noticeDetailState.detail.id,
					noticeCommentId,
					id,
					page: noticeDetailState.comments.fetchParams.page,
					per: noticeDetailState.comments.fetchParams.per,
					orderBy: noticeDetailState.comments.fetchParams.orderBy
				})
			);
		},
		[
			dispatch,
			noticeDetailState.detail.id,
			noticeDetailState.comments.fetchParams.page,
			noticeDetailState.comments.fetchParams.per,
			noticeDetailState.comments.fetchParams.orderBy
		]
	);

	return {
		...noticeDetailState,
		userId,
		onHandleNoticeDetailReplyWriteForm,
		onHandleNoticeDetailDeleteAuthDialog,
		onDeleteNoticeDetailComment,
		onDeleteNoticeDetailReply
	};
}
