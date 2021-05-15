import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

// Modules
import { postNoticeDetailReply, postNonMemberNoticeDetailReply } from 'modules/notices/detail';
import { RootState } from 'modules';

export type PostNoticeDetailReplyBody = {
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
	const noticeDetailState = useSelector((state: RootState) => state.noticeDetail);

	const [postNoticeDetailReplyBody, setPostNoticeDetailReplyBody] = useState<PostNoticeDetailReplyBody>({
		nickname: null,
		password: null,
		content: ''
	});

	const [showPassword, setShowPassword] = useState<boolean>(false);

	const onHandleNoticeDetailReplyTextField = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const name: string = event.currentTarget.name || '';
			const value: string = event.currentTarget.value || '';

			setPostNoticeDetailReplyBody({
				...postNoticeDetailReplyBody,
				[name]: value
			});
		},
		[postNoticeDetailReplyBody]
	);

	const onShowNoticeDetailReplyPassword = useCallback(() => setShowPassword(!showPassword), [showPassword]);

	const onPostNoticeDetailReply = useCallback(() => {
		const { content } = postNoticeDetailReplyBody;

		if (!content) {
			enqueueSnackbar('내용을 입력해주세요.', {
				variant: 'warning'
			});
			return false;
		}

		dispatch(
			postNoticeDetailReply({
				noticeId: noticeDetailState.detail.id,
				noticeCommentId: noticeDetailState.comments.manage.id,
				content,
				page: noticeDetailState.comments.fetchParams.page,
				per: noticeDetailState.comments.fetchParams.per,
				orderBy: noticeDetailState.comments.fetchParams.orderBy
			})
		);

		setPostNoticeDetailReplyBody({
			...postNoticeDetailReplyBody,
			content: ''
		});
		return true;
	}, [
		dispatch,
		enqueueSnackbar,
		noticeDetailState.detail.id,
		noticeDetailState.comments.manage.id,
		noticeDetailState.comments.fetchParams.page,
		noticeDetailState.comments.fetchParams.per,
		noticeDetailState.comments.fetchParams.orderBy,
		postNoticeDetailReplyBody
	]);

	const onPostNonMemberNoticeDetailReply = useCallback(() => {
		const { nickname, password, content } = postNoticeDetailReplyBody;

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
			postNonMemberNoticeDetailReply({
				noticeId: noticeDetailState.detail.id,
				noticeCommentId: noticeDetailState.comments.manage.id,
				nickname,
				password,
				content,
				page: noticeDetailState.comments.fetchParams.page,
				per: noticeDetailState.comments.fetchParams.per,
				orderBy: noticeDetailState.comments.fetchParams.orderBy
			})
		);

		setPostNoticeDetailReplyBody({
			...postNoticeDetailReplyBody,
			content: ''
		});
		return true;
	}, [
		dispatch,
		enqueueSnackbar,
		noticeDetailState.detail.id,
		noticeDetailState.comments.manage.id,
		noticeDetailState.comments.fetchParams.page,
		noticeDetailState.comments.fetchParams.per,
		noticeDetailState.comments.fetchParams.orderBy,
		postNoticeDetailReplyBody
	]);

	return {
		...noticeDetailState,
		postNoticeDetailReplyBody,
		showPassword,
		isAuthenticated,
		onHandleNoticeDetailReplyTextField,
		onShowNoticeDetailReplyPassword,
		onPostNoticeDetailReply,
		onPostNonMemberNoticeDetailReply
	};
}
