import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

// Modules
import {
	putStorageBoard,
	putNonMemberStorageBoard,
	fetchNonMemberStorageBoardEditDetail
} from 'modules/storages/board';
import { RootState } from 'modules';

// Services
import * as Service from 'services/storages/board';

// Snippets
import { getErrorMessageByCode } from 'snippets/common';

type PutStorageBoardBody = {
	nickname: string | null;
	password: string | null;
	subject: string;
	content: string;
	description: string;
};

export default function useEditForm() {
	const dispatch = useDispatch();
	const router = useRouter();
	const { enqueueSnackbar } = useSnackbar();
	const {
		user: { isAuthenticated }
	} = useSelector((state: RootState) => state.common);
	const storageBoardState = useSelector((state: RootState) => state.storageBoard);

	const [putStorageBoardBody, setPutStorageBoardBody] = useState<PutStorageBoardBody>({
		nickname: null,
		password: null,
		subject: '',
		content: '',
		description: ''
	});

	const [passwordError, setPasswordError] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const onHandleEditFormTextField = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const name: string = event.currentTarget.name || '';
			const value: string = event.currentTarget.value || '';

			setPutStorageBoardBody({
				...putStorageBoardBody,
				[name]: value
			});
		},
		[putStorageBoardBody]
	);

	const onShowEditFormPassword = useCallback(() => setShowPassword(!showPassword), [showPassword]);

	const onHandleEditFormRichEditor = useCallback(
		(event) => {
			setPutStorageBoardBody({
				...putStorageBoardBody,
				content: event.level.content,
				description: event.level.content.replace(/(<([^>]+)>)/gi, '')
			});
		},
		[putStorageBoardBody]
	);

	const onPostStorageBoardImage = useCallback(
		(
			blobInfo: BlobInfo,
			success: (url: string) => void,
			failure: (err: string, options?: UploadFailureOptions) => void
		) => {
			Service.postStorageBoardImage(storageBoardState.storage.id, storageBoardState.manage.id, blobInfo.blob())
				.then((response) => {
					success(response.data.imageUrl);
				})
				.catch((error) => failure(getErrorMessageByCode(error.response.data.code)));
		},
		[storageBoardState.storage.id, storageBoardState.manage.id]
	);

	const onPostNonMemberStorageBoardImage = useCallback(
		(
			blobInfo: BlobInfo,
			success: (url: string) => void,
			failure: (err: string, options?: UploadFailureOptions) => void
		) => {
			Service.postStorageBoardImage(storageBoardState.storage.id, storageBoardState.manage.id, blobInfo.blob())
				.then((response) => {
					success(response.data.imageUrl);
				})
				.catch((error) => failure(getErrorMessageByCode(error.response.data.code)));
		},
		[storageBoardState.storage.id, storageBoardState.manage.id]
	);

	const onPutStorageBoard = useCallback(() => {
		const { subject, content } = putStorageBoardBody;

		if (!subject) {
			enqueueSnackbar('제목을 입력해주세요.', {
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
			putStorageBoard({
				...putStorageBoardBody,
				storageId: storageBoardState.storage.id,
				id: storageBoardState.manage.id
			})
		);
		return true;
	}, [dispatch, enqueueSnackbar, storageBoardState.storage.id, storageBoardState.manage.id, putStorageBoardBody]);

	const onPutNonMemberStorageBoard = useCallback(() => {
		const {
			nickname, password, subject, content
		} = putStorageBoardBody;

		const nicknameRegExp = /[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]{2,10}/;
		// eslint-disable-next-line no-useless-escape
		const specialCharRegExp = '[ !@\\#$%^&*(),.?\\":{}|<>]';

		if (!new RegExp(nicknameRegExp).test(nickname || '') || new RegExp(specialCharRegExp).test(nickname || '')) {
			enqueueSnackbar('올바른 닉네임을 입력해주세요,', {
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

		if (!subject) {
			enqueueSnackbar('제목을 입력해주세요.', {
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
			putNonMemberStorageBoard({
				...putStorageBoardBody,
				storageId: storageBoardState.storage.id,
				id: storageBoardState.manage.id
			})
		);
		return true;
	}, [dispatch, enqueueSnackbar, storageBoardState.storage.id, storageBoardState.manage.id, putStorageBoardBody]);

	const onFetchNonMemberStorageBoardEditDetail = useCallback(() => {
		setPasswordError(false);

		if (!putStorageBoardBody.password) {
			setPasswordError(true);
			return false;
		}

		dispatch(
			fetchNonMemberStorageBoardEditDetail({
				storageId: storageBoardState.storage.id,
				id: Number(router.query.id),
				password: String(putStorageBoardBody.password)
			})
		);
		return true;
	}, [dispatch, router, storageBoardState.storage.id, putStorageBoardBody.password]);

	useEffect(() => {
		if (storageBoardState.manage.detail.id !== 0) {
			setPutStorageBoardBody({
				nickname: storageBoardState.manage.detail.nickname,
				password: putStorageBoardBody.password,
				subject: storageBoardState.manage.detail.subject,
				content: storageBoardState.manage.detail.content,
				description: storageBoardState.manage.detail.description
			});
		}
	}, [storageBoardState.manage.detail, putStorageBoardBody.password]);

	return {
		...storageBoardState,
		putStorageBoardBody,
		showPassword,
		isAuthenticated,
		passwordError,
		onHandleEditFormTextField,
		onShowEditFormPassword,
		onHandleEditFormRichEditor,
		onPostNonMemberStorageBoardImage,
		onPostStorageBoardImage,
		onPutStorageBoard,
		onPutNonMemberStorageBoard,
		onFetchNonMemberStorageBoardEditDetail
	};
}
