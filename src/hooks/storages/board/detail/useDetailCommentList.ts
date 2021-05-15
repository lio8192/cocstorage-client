import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import {
	deleteStorageBoardDetailComment,
	deleteStorageBoardDetailReply,
	handleStorageBoardDetailDeleteAuthDialog,
	handleStorageBoardDetailReplyWriteForm
} from 'modules/storages/board/detail';
import { RootState } from 'modules';

export default function useDetailCommentList() {
	const dispatch = useDispatch();
	const {
		user: { id: userId }
	} = useSelector((state: RootState) => state.common);
	const storageBoardDetailState = useSelector((state: RootState) => state.storageBoardDetail);

	const onHandleStorageBoardDetailReplyWriteForm = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			const id = Number(event.currentTarget.getAttribute('data-comment-id'));

			dispatch(handleStorageBoardDetailReplyWriteForm(id));
		},
		[dispatch]
	);

	const onHandleStorageBoardDetailDeleteAuthDialog = useCallback(
		(event: React.MouseEvent<HTMLLIElement>) => {
			const dataId = Number(event.currentTarget.getAttribute('data-id') || 0);
			const subTitle = String(event.currentTarget.getAttribute('data-sub-title') || '');
			const type = String(event.currentTarget.getAttribute('data-type') || '');

			dispatch(
				handleStorageBoardDetailDeleteAuthDialog({
					dataId,
					subTitle,
					type
				})
			);
		},
		[dispatch]
	);

	const onDeleteStorageBoardDetailComment = useCallback(
		(event: React.MouseEvent<HTMLLIElement>) => {
			const id = Number(event.currentTarget.getAttribute('data-comment-id') || 0);

			let page = storageBoardDetailState.comments.pagination.currentPage;

			if (page !== 1 && storageBoardDetailState.comments.data.length === 1) page -= 1;

			dispatch(
				deleteStorageBoardDetailComment({
					storageId: storageBoardDetailState.detail.storage.id,
					storageBoardId: storageBoardDetailState.detail.id,
					id,
					page,
					per: storageBoardDetailState.comments.fetchParams.per,
					orderBy: storageBoardDetailState.comments.fetchParams.orderBy
				})
			);
		},
		[
			dispatch,
			storageBoardDetailState.detail.id,
			storageBoardDetailState.detail.storage.id,
			storageBoardDetailState.comments.data,
			storageBoardDetailState.comments.fetchParams.per,
			storageBoardDetailState.comments.fetchParams.orderBy,
			storageBoardDetailState.comments.pagination.currentPage
		]
	);

	const onDeleteStorageBoardDetailReply = useCallback(
		(event: React.MouseEvent<HTMLLIElement>) => {
			const storageBoardCommentId = Number(event.currentTarget.getAttribute('data-comment-id') || 0);
			const id = Number(event.currentTarget.getAttribute('data-reply-id') || 0);

			dispatch(
				deleteStorageBoardDetailReply({
					storageId: storageBoardDetailState.detail.storage.id,
					storageBoardId: storageBoardDetailState.detail.id,
					storageBoardCommentId,
					id,
					page: storageBoardDetailState.comments.fetchParams.page,
					per: storageBoardDetailState.comments.fetchParams.per,
					orderBy: storageBoardDetailState.comments.fetchParams.orderBy
				})
			);
		},
		[
			dispatch,
			storageBoardDetailState.detail.id,
			storageBoardDetailState.detail.storage.id,
			storageBoardDetailState.comments.fetchParams.page,
			storageBoardDetailState.comments.fetchParams.per,
			storageBoardDetailState.comments.fetchParams.orderBy
		]
	);

	return {
		...storageBoardDetailState,
		userId,
		onHandleStorageBoardDetailReplyWriteForm,
		onHandleStorageBoardDetailDeleteAuthDialog,
		onDeleteStorageBoardDetailComment,
		onDeleteStorageBoardDetailReply
	};
}
