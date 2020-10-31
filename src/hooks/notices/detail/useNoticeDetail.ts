import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import {
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

	const onFetchNoticeDetailComments = useCallback(() => {
		dispatch(
			handleNoticeDetailCommentsFetchParams({
				noticeId: noticeDetailState.detail.id,
				per: 5,
				page: 1,
				orderBy: 'latest'
			})
		);
		dispatch(
			fetchNoticeDetailComments({
				noticeId: noticeDetailState.detail.id,
				per: 5,
				page: 1,
				orderBy: 'latest'
			})
		);
	}, [dispatch, noticeDetailState.detail.id]);

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
			dispatch(
				deleteNonMemberNoticeDetailComment({
					noticeId: noticeDetailState.detail.id,
					id: noticeDetailState.manage.deleteAuth.dataId,
					password
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
					page: noticeDetailState.comments.fetchParams.page
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
		deleteAuthDialogBody
	]);

	return {
		...noticeDetailState,
		deleteAuthDialogBody,
		showPassword,
		onFetchNoticeDetailComments,
		onHandleNoticeDetailCommentsPagination,
		onHandleDeleteAuthDialog,
		onShowDeleteAuthDialogPassword,
		onHandleDeleteAuthDialogTextField,
		onDeleteNonMemberNoticeDetail
	};
}
