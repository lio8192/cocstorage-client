import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

// Modules
import { postStorageBoardDetailReply, postNonMemberStorageBoardDetailReply } from 'modules/storages/board/detail';
import { RootState } from 'modules';

export type PostStorageBoardDetailReplyBody = {
	nickname: string | null;
	password: string | null;
	content: string;
};

export default function useDetailReplyWriteForm() {
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const {
		user: { isAuthenticated }
	} = useSelector((state: RootState) => state.common);
	const storageBoardDetailState = useSelector((state: RootState) => state.storageBoardDetail);

	const [postStorageBoardDetailReplyBody, setPostStorageBoardDetailReplyBody] = useState<
		PostStorageBoardDetailReplyBody
	>({
		nickname: null,
		password: null,
		content: ''
	});

	const [showPassword, setShowPassword] = useState<boolean>(false);

	const onHandleStorageBoardDetailReplyTextField = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const name: string = event.currentTarget.name || '';
			const value: string = event.currentTarget.value || '';

			setPostStorageBoardDetailReplyBody({
				...postStorageBoardDetailReplyBody,
				[name]: value
			});
		},
		[postStorageBoardDetailReplyBody]
	);

	const onShowStorageBoardDetailReplyPassword = useCallback(() => setShowPassword(!showPassword), [showPassword]);

	const onPostStorageBoardDetailReply = useCallback(() => {
		const { content } = postStorageBoardDetailReplyBody;

		if (!content) {
			enqueueSnackbar('내용을 입력해주세요.', {
				variant: 'warning'
			});
			return false;
		}

		dispatch(
			postStorageBoardDetailReply({
				storageId: storageBoardDetailState.detail.storage.id,
				storageBoardId: storageBoardDetailState.detail.id,
				storageBoardCommentId: storageBoardDetailState.comments.manage.id,
				content,
				page: storageBoardDetailState.comments.fetchParams.page
			})
		);

		setPostStorageBoardDetailReplyBody({
			...postStorageBoardDetailReplyBody,
			content: ''
		});
		return true;
	}, [
		dispatch,
		enqueueSnackbar,
		storageBoardDetailState.detail.storage.id,
		storageBoardDetailState.detail.id,
		storageBoardDetailState.comments.manage.id,
		storageBoardDetailState.comments.fetchParams.page,
		postStorageBoardDetailReplyBody
	]);

	const onPostNonMemberStorageBoardDetailReply = useCallback(() => {
		const { nickname, password, content } = postStorageBoardDetailReplyBody;

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
			postNonMemberStorageBoardDetailReply({
				storageId: storageBoardDetailState.detail.storage.id,
				storageBoardId: storageBoardDetailState.detail.id,
				storageBoardCommentId: storageBoardDetailState.comments.manage.id,
				nickname,
				password,
				content,
				page: storageBoardDetailState.comments.fetchParams.page
			})
		);

		setPostStorageBoardDetailReplyBody({
			...postStorageBoardDetailReplyBody,
			content: ''
		});
		return true;
	}, [
		dispatch,
		enqueueSnackbar,
		storageBoardDetailState.detail.storage.id,
		storageBoardDetailState.detail.id,
		storageBoardDetailState.comments.manage.id,
		storageBoardDetailState.comments.fetchParams.page,
		postStorageBoardDetailReplyBody
	]);

	return {
		...storageBoardDetailState,
		postStorageBoardDetailReplyBody,
		showPassword,
		isAuthenticated,
		onHandleStorageBoardDetailReplyTextField,
		onShowStorageBoardDetailReplyPassword,
		onPostStorageBoardDetailReply,
		onPostNonMemberStorageBoardDetailReply
	};
}
