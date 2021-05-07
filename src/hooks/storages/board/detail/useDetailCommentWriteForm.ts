import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

// Modules
import { RootState } from 'modules';
import { postNonMemberStorageBoardDetailComment, postStorageBoardDetailComment } from 'modules/storages/board/detail';

export type PostStorageBoardDetailCommentBody = {
	nickname: string | null;
	password: string | null;
	content: string;
};

export default function useDetailCommentWriteForm() {
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const {
		user: { isAuthenticated }
	} = useSelector((state: RootState) => state.common);
	const storageBoardDetailState = useSelector((state: RootState) => state.storageBoardDetail);

	const [
		postStorageBoardDetailCommentBody,
		setPostStorageBoardDetailCommentBody
	] = useState<PostStorageBoardDetailCommentBody>({
		nickname: null,
		password: null,
		content: ''
	});

	const [showPassword, setShowPassword] = useState<boolean>(false);

	const onHandleStorageBoardDetailCommentTextField = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const name: string = event.currentTarget.name || '';
			const value: string = event.currentTarget.value || '';

			setPostStorageBoardDetailCommentBody({
				...postStorageBoardDetailCommentBody,
				[name]: value
			});
		},
		[postStorageBoardDetailCommentBody]
	);

	const onShowStorageBoardDetailCommentPassword = useCallback(() => setShowPassword(!showPassword), [showPassword]);

	const onPostStorageBoardDetailComment = useCallback(() => {
		const { content } = postStorageBoardDetailCommentBody;

		if (!content) {
			enqueueSnackbar('내용을 입력해주세요.', {
				variant: 'warning'
			});
			return false;
		}

		dispatch(
			postStorageBoardDetailComment({
				storageId: storageBoardDetailState.detail.storage.id,
				storageBoardId: storageBoardDetailState.detail.id,
				content
			})
		);

		setPostStorageBoardDetailCommentBody({
			...postStorageBoardDetailCommentBody,
			content: ''
		});
		return true;
	}, [
		dispatch,
		enqueueSnackbar,
		storageBoardDetailState.detail.storage.id,
		storageBoardDetailState.detail.id,
		postStorageBoardDetailCommentBody
	]);

	const onPostNonMemberStorageBoardDetailComment = useCallback(() => {
		const { nickname, password, content } = postStorageBoardDetailCommentBody;

		const nicknameRegExp = /[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]{2,10}/;
		const specialCharRegExp = '[ !@\\#$%^&*(),.?\\":{}|<>]';

		if (!new RegExp(nicknameRegExp).test(nickname || '') || new RegExp(specialCharRegExp).test(nickname || '')) {
			enqueueSnackbar('올바른 닉네임을 입력해주세요.', {
				variant: 'warning'
			});
			return false;
		}

		if (!password || password.length < 7) {
			enqueueSnackbar('비밀번호는 7자 이상으로 입력해주세요.', {
				variant: 'warning'
			});
			return false;
		}

		if (!content) {
			enqueueSnackbar('내용을 입력해주세요.', {
				variant: 'warning'
			});
			return false;
		}

		dispatch(
			postNonMemberStorageBoardDetailComment({
				storageId: storageBoardDetailState.detail.storage.id,
				storageBoardId: storageBoardDetailState.detail.id,
				nickname,
				password,
				content
			})
		);

		setPostStorageBoardDetailCommentBody({
			...postStorageBoardDetailCommentBody,
			content: ''
		});
		return true;
	}, [
		dispatch,
		enqueueSnackbar,
		storageBoardDetailState.detail.storage.id,
		storageBoardDetailState.detail.id,
		postStorageBoardDetailCommentBody
	]);

	return {
		...storageBoardDetailState,
		postStorageBoardDetailCommentBody,
		showPassword,
		isAuthenticated,
		onHandleStorageBoardDetailCommentTextField,
		onShowStorageBoardDetailCommentPassword,
		onPostStorageBoardDetailComment,
		onPostNonMemberStorageBoardDetailComment
	};
}
