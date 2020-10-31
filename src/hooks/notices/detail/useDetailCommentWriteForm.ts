import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

// Modules
import { RootState } from 'modules';
import { postNonMemberNoticeDetailComment, postNoticeDetailComment } from 'modules/notices/detail';

export type PostNoticeDetailCommentBody = {
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
	const noticeDetailState = useSelector((state: RootState) => state.noticeDetail);

	const [postNoticeDetailCommentBody, setPostNoticeDetailCommentBody] = useState<PostNoticeDetailCommentBody>({
		nickname: null,
		password: null,
		content: ''
	});

	const [showPassword, setShowPassword] = useState<boolean>(false);

	const onHandleNoticeDetailCommentTextField = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const name: string = event.currentTarget.name || '';
			const value: string = event.currentTarget.value || '';

			setPostNoticeDetailCommentBody({
				...postNoticeDetailCommentBody,
				[name]: value
			});
		},
		[postNoticeDetailCommentBody]
	);

	const onShowNoticeDetailCommentPassword = useCallback(() => setShowPassword(!showPassword), [showPassword]);

	const onPostNoticeDetailComment = useCallback(() => {
		const { content } = postNoticeDetailCommentBody;

		if (!content) {
			enqueueSnackbar('내용을 입력해주세요.', {
				variant: 'warning'
			});
			return false;
		}

		dispatch(
			postNoticeDetailComment({
				noticeId: noticeDetailState.detail.id,
				content
			})
		);

		setPostNoticeDetailCommentBody({
			...postNoticeDetailCommentBody,
			content: ''
		});
		return true;
	}, [dispatch, enqueueSnackbar, noticeDetailState.detail.id, postNoticeDetailCommentBody]);

	const onPostNonMemberNoticeDetailComment = useCallback(() => {
		const { nickname, password, content } = postNoticeDetailCommentBody;

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
			postNonMemberNoticeDetailComment({
				noticeId: noticeDetailState.detail.id,
				nickname,
				password,
				content
			})
		);

		setPostNoticeDetailCommentBody({
			...postNoticeDetailCommentBody,
			content: ''
		});
		return true;
	}, [dispatch, enqueueSnackbar, noticeDetailState.detail.id, postNoticeDetailCommentBody]);

	return {
		...noticeDetailState,
		postNoticeDetailCommentBody,
		showPassword,
		isAuthenticated,
		onHandleNoticeDetailCommentTextField,
		onShowNoticeDetailCommentPassword,
		onPostNoticeDetailComment,
		onPostNonMemberNoticeDetailComment
	};
}
