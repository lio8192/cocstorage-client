import React, {
	useEffect, useState, useCallback, useRef
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { convertToRaw, EditorState } from 'draft-js';
import { useSnackbar } from 'notistack';

// Modules
import {
	putStorageBoard,
	putNonMemberStorageBoard,
	fetchNonMemberStorageBoardEditDetail
} from 'modules/storages/board';
import { RootState } from 'modules';
import { TAsyncAtomicBlockResponse, TMUIRichTextEditorRef } from 'mui-rte/src/MUIRichTextEditor';

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

	const ref = useRef<TMUIRichTextEditorRef>(null);
	const [anchor, setAnchor] = useState<HTMLElement | null>(null);

	const [putStorageBoardBody, setPutStorageBoardBody] = useState<PutStorageBoardBody>({
		nickname: null,
		password: null,
		subject: '',
		content: '',
		description: ''
	});
	const [convertDefaultContent, setConvertDefaultContent] = useState<string>('');
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
		(editorState: EditorState) => {
			const currentContent = editorState.getCurrentContent();
			setPutStorageBoardBody({
				...putStorageBoardBody,
				content: JSON.stringify(convertToRaw(currentContent)),
				description: currentContent.getPlainText()
			});
		},
		[putStorageBoardBody]
	);

	const onPostStorageBoardImage = useCallback(
		(file: File) =>
			new Promise((resolve) => {
				Service.postStorageBoardImage(storageBoardState.storage.id, storageBoardState.manage.id, file)
					.then((response) => {
						resolve(response.data.imageUrl);
					})
					.catch((error) => {
						enqueueSnackbar(getErrorMessageByCode(error.response.data.code), {
							variant: 'error'
						});
					});
			}),
		[enqueueSnackbar, storageBoardState.storage.id, storageBoardState.manage.id]
	);

	const onPostNonMemberStorageBoardImage = useCallback(
		(file: File) =>
			new Promise((resolve) => {
				Service.postNonMemberStorageBoardImage(storageBoardState.storage.id, storageBoardState.manage.id, file)
					.then((response) => {
						resolve(response.data.imageUrl);
					})
					.catch((error) => {
						enqueueSnackbar(getErrorMessageByCode(error.response.data.code), {
							variant: 'error'
						});
					});
			}),
		[enqueueSnackbar, storageBoardState.storage.id, storageBoardState.manage.id]
	);

	const onUploadImage = useCallback(
		(file: File) =>
			new Promise<TAsyncAtomicBlockResponse>(async (resolve, reject) => {
				const url = isAuthenticated
					? await onPostStorageBoardImage(file)
					: await onPostNonMemberStorageBoardImage(file);
				if (!url) {
					reject();
					return;
				}
				resolve({
					data: {
						url,
						width: 'auto',
						height: 'auto',
						alignment: 'left',
						type: 'image'
					}
				});
			}),
		[isAuthenticated, onPostStorageBoardImage, onPostNonMemberStorageBoardImage]
	);

	const onHandleFileUpload = useCallback(
		(file: File) => {
			ref.current?.insertAtomicBlockAsync('IMAGE', onUploadImage(file), '업로드 중...');
		},
		[ref, onUploadImage]
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

			setConvertDefaultContent(storageBoardState.manage.detail.content);
		}
	}, [storageBoardState.manage.detail, putStorageBoardBody.password]);

	return {
		...storageBoardState,
		putStorageBoardBody,
		convertDefaultContent,
		showPassword,
		isAuthenticated,
		ref,
		anchor,
		setAnchor,
		passwordError,
		onHandleEditFormTextField,
		onShowEditFormPassword,
		onHandleEditFormRichEditor,
		onHandleFileUpload,
		onPutStorageBoard,
		onPutNonMemberStorageBoard,
		onFetchNonMemberStorageBoardEditDetail
	};
}
