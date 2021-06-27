import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import {
	putStorageBoardDetailViewCount,
	closeStorageBoardDetailRecommendErrorSnackbar,
	closeStorageBoardDetailRecommendSnackbar,
	fetchStorageBoardDetailComments,
	handleStorageBoardDetailCommentsFetchParams,
	handleStorageBoardDetailDeleteAuthDialog,
	deleteNonMemberStorageBoardDetail,
	deleteNonMemberStorageBoardDetailComment,
	deleteNonMemberStorageBoardDetailReply
} from 'modules/storages/board/detail';
import { RootState } from 'modules';
import { fetchStorageBoards } from 'modules/storages/board';
import { ParsedUrlQuery } from 'querystring';

export type DeleteAuthDialogBody = {
	password: string;
	error: boolean;
	helperText: string;
};

export default function useStorageBoardDetail() {
	const dispatch = useDispatch();
	const storageBoardState = useSelector((state: RootState) => state.storageBoard);
	const storageBoardDetailState = useSelector((state: RootState) => state.storageBoardDetail);

	const [deleteAuthDialogBody, setDeleteAuthDialogBody] = useState<DeleteAuthDialogBody>({
		password: '',
		error: false,
		helperText: ''
	});

	const [showPassword, setShowPassword] = useState<boolean>(false);

	const onPutStorageBoardDetailViewCount = useCallback(() => {
		dispatch(
			putStorageBoardDetailViewCount({
				storageId: storageBoardDetailState.detail.storage.id,
				id: storageBoardDetailState.detail.id
			})
		);
	}, [dispatch, storageBoardDetailState.detail.storage.id, storageBoardDetailState.detail.id]);

	const onFetchStorageBoardDetailComments = useCallback(() => {
		const storageId = storageBoardDetailState.detail.storage.id;
		const storageBoardId = storageBoardDetailState.detail.id;
		const per = storageBoardDetailState.comments.fetchParams.per;
		const page =			storageBoardDetailState.detail.commentLatestPage === 0 ? 1 : storageBoardDetailState.detail.commentLatestPage;

		dispatch(
			handleStorageBoardDetailCommentsFetchParams({
				storageId,
				storageBoardId,
				per,
				page,
				orderBy: 'old'
			})
		);
		dispatch(
			fetchStorageBoardDetailComments({
				storageId,
				storageBoardId,
				per,
				page,
				orderBy: 'old'
			})
		);
	}, [
		dispatch,
		storageBoardDetailState.detail.storage.id,
		storageBoardDetailState.detail.id,
		storageBoardDetailState.detail.commentLatestPage,
		storageBoardDetailState.comments.fetchParams.per
	]);

	const onFetchStorageBoards = useCallback(
		(query: ParsedUrlQuery) => {
			dispatch(
				fetchStorageBoards({
					storageId: storageBoardState.storage.id,
					orderBy: String(query.orderBy || 'latest'),
					page: Number(query.page || 1),
					per: 20,
					search: {
						type: String(query.type || 'all'),
						value: String(query.value || '')
					},
					path: String(query.path)
				})
			);
		},
		[dispatch, storageBoardState.storage.id]
	);

	const onHandleStorageBoardDetailCommentsPagination = useCallback(
		(event: React.ChangeEvent<unknown>, value: number) => {
			dispatch(
				handleStorageBoardDetailCommentsFetchParams({
					...storageBoardDetailState.comments.fetchParams,
					page: value
				})
			);
			dispatch(
				fetchStorageBoardDetailComments({
					...storageBoardDetailState.comments.fetchParams,
					page: value
				})
			);
		},
		[dispatch, storageBoardDetailState.comments.fetchParams]
	);

	const onCloseStorageBoardDetailRecommendSnackbar = useCallback(
		() => dispatch(closeStorageBoardDetailRecommendSnackbar()),
		[dispatch]
	);
	const onCloseStorageBoardDetailRecommendErrorSnackbar = useCallback(
		() => dispatch(closeStorageBoardDetailRecommendErrorSnackbar()),
		[dispatch]
	);

	const onHandleDeleteAuthDialog = useCallback(
		() =>
			dispatch(
				handleStorageBoardDetailDeleteAuthDialog({
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

	const onDeleteNonMemberStorageBoardDetail = useCallback(() => {
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

		if (storageBoardDetailState.manage.deleteAuth.type === 'boardDetail') {
			dispatch(
				deleteNonMemberStorageBoardDetail({
					storageId: storageBoardDetailState.detail.storage.id,
					id: storageBoardDetailState.detail.id,
					password
				})
			);
		} else if (storageBoardDetailState.manage.deleteAuth.type === 'comment') {
			let page = storageBoardDetailState.comments.pagination.currentPage;

			if (page !== 1 && storageBoardDetailState.comments.data.length === 1) page -= 1;

			dispatch(
				deleteNonMemberStorageBoardDetailComment({
					storageId: storageBoardDetailState.detail.storage.id,
					storageBoardId: storageBoardDetailState.detail.id,
					id: storageBoardDetailState.manage.deleteAuth.dataId,
					password,
					page,
					per: storageBoardDetailState.comments.fetchParams.per,
					orderBy: storageBoardDetailState.comments.fetchParams.orderBy
				})
			);
		} else if (storageBoardDetailState.manage.deleteAuth.type === 'reply') {
			let storageBoardCommentId = 0;

			storageBoardDetailState.comments.data.forEach((item) => {
				item.replies.forEach((reply) => {
					if (reply.id === storageBoardDetailState.manage.deleteAuth.dataId) {
						storageBoardCommentId = reply.storageBoardCommentId;
						return false;
					}
					return true;
				});
			});

			dispatch(
				deleteNonMemberStorageBoardDetailReply({
					storageId: storageBoardDetailState.detail.storage.id,
					storageBoardId: storageBoardDetailState.detail.id,
					storageBoardCommentId,
					id: storageBoardDetailState.manage.deleteAuth.dataId,
					password,
					page: storageBoardDetailState.comments.fetchParams.page,
					per: storageBoardDetailState.comments.fetchParams.per,
					orderBy: storageBoardDetailState.comments.fetchParams.orderBy
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
		storageBoardDetailState.detail.id,
		storageBoardDetailState.detail.storage.id,
		storageBoardDetailState.manage.deleteAuth.type,
		storageBoardDetailState.manage.deleteAuth.dataId,
		storageBoardDetailState.comments.data,
		storageBoardDetailState.comments.fetchParams.page,
		storageBoardDetailState.comments.fetchParams.per,
		storageBoardDetailState.comments.fetchParams.orderBy,
		storageBoardDetailState.comments.pagination.currentPage,
		deleteAuthDialogBody
	]);

	return {
		...storageBoardDetailState,
		deleteAuthDialogBody,
		showPassword,
		onPutStorageBoardDetailViewCount,
		onCloseStorageBoardDetailRecommendSnackbar,
		onCloseStorageBoardDetailRecommendErrorSnackbar,
		onFetchStorageBoardDetailComments,
		onFetchStorageBoards,
		onHandleStorageBoardDetailCommentsPagination,
		onHandleDeleteAuthDialog,
		onShowDeleteAuthDialogPassword,
		onHandleDeleteAuthDialogTextField,
		onDeleteNonMemberStorageBoardDetail
	};
}
