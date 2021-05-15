import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import {
	putNoticeDetailViewCount,
	fetchNoticeDetailComments,
	handleNoticeDetailCommentsFetchParams,
	handleNoticeDetailDeleteAuthDialog,
	deleteNonMemberNoticeDetailComment,
	deleteNonMemberNoticeDetailReply
} from 'modules/notices/detail';
import { RootState } from 'modules';

export type DeleteAuthDialogBody = {
	password: string;
	error: boolean;
	helperText: string;
};

export default function useNoticeDetail() {
	const dispatch = useDispatch();
	const noticeDetailState = useSelector((state: RootState) => state.noticeDetail);

	const [deleteAuthDialogBody, setDeleteAuthDialogBody] = useState<DeleteAuthDialogBody>({
		password: '',
		error: false,
		helperText: ''
	});

	const [showPassword, setShowPassword] = useState<boolean>(false);

	const onPutNoticeDetailViewCount = useCallback(() => {
		dispatch(putNoticeDetailViewCount(noticeDetailState.detail.id));
	}, [dispatch, noticeDetailState.detail.id]);

	const onFetchNoticeDetailComments = useCallback(() => {
		const noticeId = noticeDetailState.detail.id;
		const per = noticeDetailState.comments.fetchParams.per;
		const page = noticeDetailState.detail.commentLatestPage === 0 ? 1 : noticeDetailState.detail.commentLatestPage;

		dispatch(
			handleNoticeDetailCommentsFetchParams({
				noticeId,
				per,
				page,
				orderBy: 'old'
			})
		);
		dispatch(
			fetchNoticeDetailComments({
				noticeId,
				per,
				page,
				orderBy: 'old'
			})
		);
	}, [
		dispatch,
		noticeDetailState.detail.id,
		noticeDetailState.detail.commentLatestPage,
		noticeDetailState.comments.fetchParams.per
	]);

	const onHandleNoticeDetailCommentsPagination = useCallback(
		(event: React.ChangeEvent<unknown>, value: number) => {
			dispatch(
				handleNoticeDetailCommentsFetchParams({
					...noticeDetailState.comments.fetchParams,
					page: value
				})
			);
			dispatch(
				fetchNoticeDetailComments({
					...noticeDetailState.comments.fetchParams,
					page: value
				})
			);
		},
		[dispatch, noticeDetailState.comments.fetchParams]
	);

	const onHandleDeleteAuthDialog = useCallback(
		() =>
			dispatch(
				handleNoticeDetailDeleteAuthDialog({
					dataId: 0,
					subTitle: '',
					type: ''
				})
			),
		[dispatch]
	);

	const onHandleDeleteAuthDialogTextField = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const name: string = event.currentTarget.name || '';
			const value: string = event.currentTarget.value || '';

			setDeleteAuthDialogBody({
				...deleteAuthDialogBody,
				[name]: value
			});
		},
		[deleteAuthDialogBody]
	);

	const onShowDeleteAuthDialogPassword = useCallback(() => setShowPassword(!showPassword), [showPassword]);

	const onDeleteNonMemberNoticeDetail = useCallback(() => {
		const { password } = deleteAuthDialogBody;
		setDeleteAuthDialogBody({
			...deleteAuthDialogBody,
			error: false,
			helperText: ''
		});

		if (!password) {
			setDeleteAuthDialogBody({
				...deleteAuthDialogBody,
				error: true,
				helperText: '비밀번호를 입력해주세요.'
			});
			return false;
		}

		if (noticeDetailState.manage.deleteAuth.type === 'comment') {
			let page = noticeDetailState.comments.pagination.currentPage;

			if (page !== 1 && noticeDetailState.comments.data.length === 1) page -= 1;

			dispatch(
				deleteNonMemberNoticeDetailComment({
					noticeId: noticeDetailState.detail.id,
					id: noticeDetailState.manage.deleteAuth.dataId,
					password,
					page,
					per: noticeDetailState.comments.fetchParams.per,
					orderBy: noticeDetailState.comments.fetchParams.orderBy
				})
			);
		} else if (noticeDetailState.manage.deleteAuth.type === 'reply') {
			let noticeCommentId = 0;

			noticeDetailState.comments.data.forEach((item) => {
				item.replies.forEach((reply) => {
					if (reply.id === noticeDetailState.manage.deleteAuth.dataId) {
						noticeCommentId = reply.noticeCommentId;
						return false;
					}
					return true;
				});
			});

			dispatch(
				deleteNonMemberNoticeDetailReply({
					noticeId: noticeDetailState.detail.id,
					noticeCommentId,
					id: noticeDetailState.manage.deleteAuth.dataId,
					password,
					page: noticeDetailState.comments.fetchParams.page,
					per: noticeDetailState.comments.fetchParams.per,
					orderBy: noticeDetailState.comments.fetchParams.orderBy
				})
			);
		}

		setDeleteAuthDialogBody({
			password: '',
			error: false,
			helperText: ''
		});
		return true;
	}, [
		dispatch,
		noticeDetailState.detail.id,
		noticeDetailState.manage.deleteAuth.type,
		noticeDetailState.manage.deleteAuth.dataId,
		noticeDetailState.comments.data,
		noticeDetailState.comments.fetchParams.page,
		noticeDetailState.comments.fetchParams.per,
		noticeDetailState.comments.fetchParams.orderBy,
		noticeDetailState.comments.pagination.currentPage,
		deleteAuthDialogBody
	]);

	return {
		...noticeDetailState,
		deleteAuthDialogBody,
		showPassword,
		onPutNoticeDetailViewCount,
		onFetchNoticeDetailComments,
		onHandleNoticeDetailCommentsPagination,
		onHandleDeleteAuthDialog,
		onShowDeleteAuthDialogPassword,
		onHandleDeleteAuthDialogTextField,
		onDeleteNonMemberNoticeDetail
	};
}
