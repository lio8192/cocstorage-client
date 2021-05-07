import React, {
	useEffect, useState, useCallback, useRef
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { convertToRaw, EditorState } from 'draft-js';
import { useSnackbar } from 'notistack';

// Modules
import { putNotice } from 'modules/notices';
import { RootState } from 'modules';
import { TAsyncAtomicBlockResponse, TMUIRichTextEditorRef } from 'mui-rte';

// Services
import * as Service from 'services/notices';

// Snippets
import { getErrorMessageByCode } from 'snippets/common';

type PutNoticeBody = {
	subject: string;
	content: string;
	description: string;
};

export default function useEditForm() {
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const {
		user: { isAuthenticated }
	} = useSelector((state: RootState) => state.common);
	const noticesState = useSelector((state: RootState) => state.notices);

	const ref = useRef<TMUIRichTextEditorRef>(null);
	const [anchor, setAnchor] = useState<HTMLElement | null>(null);

	const [putNoticeBody, setPutNoticeBody] = useState<PutNoticeBody>({
		subject: '',
		content: '',
		description: ''
	});
	const [convertDefaultContent, setConvertDefaultContent] = useState<string>('');

	const onHandleEditFormTextField = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const name: string = event.currentTarget.name || '';
			const value: string = event.currentTarget.value || '';

			setPutNoticeBody({
				...putNoticeBody,
				[name]: value
			});
		},
		[putNoticeBody]
	);

	const onHandleEditFormRichEditor = useCallback(
		(editorState: EditorState) => {
			const currentContent = editorState.getCurrentContent();
			setPutNoticeBody({
				...putNoticeBody,
				content: JSON.stringify(convertToRaw(currentContent)),
				description: currentContent.getPlainText()
			});
		},
		[putNoticeBody]
	);

	const onPostNoticeImage = useCallback(
		(file: File) =>
			new Promise((resolve) => {
				Service.postNoticeImage(noticesState.manage.id, file)
					.then((response) => {
						resolve(response.data.imageUrl);
					})
					.catch((error) => {
						enqueueSnackbar(getErrorMessageByCode(error.response.data.code), {
							variant: 'error'
						});
					});
			}),
		[enqueueSnackbar, noticesState.manage.id]
	);

	const onUploadImage = useCallback(
		(file: File) =>
			new Promise<TAsyncAtomicBlockResponse>(async (resolve, reject) => {
				const url = await onPostNoticeImage(file);
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
		[onPostNoticeImage]
	);

	const onHandleFileUpload = useCallback(
		(file: File) => {
			ref.current?.insertAtomicBlockAsync('IMAGE', onUploadImage(file), '업로드 중...');
		},
		[ref, onUploadImage]
	);

	const onPutNotice = useCallback(() => {
		const { subject, content } = putNoticeBody;

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
			putNotice({
				...putNoticeBody,
				id: noticesState.manage.id
			})
		);
		return true;
	}, [dispatch, enqueueSnackbar, noticesState.manage.id, putNoticeBody]);

	useEffect(() => {
		if (noticesState.manage.detail.id !== 0) {
			setPutNoticeBody({
				subject: noticesState.manage.detail.subject,
				content: noticesState.manage.detail.content,
				description: noticesState.manage.detail.description
			});

			setConvertDefaultContent(noticesState.manage.detail.content);
		}
	}, [noticesState.manage.detail]);

	return {
		...noticesState,
		putNoticeBody,
		convertDefaultContent,
		isAuthenticated,
		ref,
		anchor,
		setAnchor,
		onHandleEditFormTextField,
		onHandleEditFormRichEditor,
		onHandleFileUpload,
		onPutNotice
	};
}
