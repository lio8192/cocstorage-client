import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

// Modules
import { putNotice } from 'modules/notices';
import { RootState } from 'modules';

// Services
import * as Service from 'services/notices';

// Snippets
import { getErrorMessageByCode } from 'snippets/common';

type PutNoticeBody = {
	subject: string;
	content: string;
	description: string;
};

export default function useWriteForm() {
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const noticesState = useSelector((state: RootState) => state.notices);

	const [putNoticeBody, setPutNoticeBody] = useState<PutNoticeBody>({
		subject: '',
		content: '',
		description: ''
	});

	const [showPassword, setShowPassword] = useState<boolean>(false);

	const onHandleWriteFormTextField = useCallback(
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

	const onShowWriteFormPassword = useCallback(() => setShowPassword(!showPassword), [showPassword]);

	const onHandleWriteFormRichEditor = useCallback(
		(event) => {
			setPutNoticeBody({
				...putNoticeBody,
				content: event.level.content,
				description: event.level.content.replace(/(<([^>]+)>)/gi, '')
			});
		},
		[putNoticeBody]
	);

	const onPostNoticeImage = useCallback(
		(
			blobInfo: BlobInfo,
			success: (url: string) => void,
			failure: (err: string, options?: UploadFailureOptions) => void
		) =>
			Service.postNoticeImage(noticesState.manage.id, blobInfo.blob())
				.then((response) => {
					success(response.data.imageUrl);
				})
				.catch((error) => failure(getErrorMessageByCode(error.response.data.code))),
		[noticesState.manage.id]
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

	return {
		...noticesState,
		putNoticeBody,
		showPassword,
		onHandleWriteFormTextField,
		onShowWriteFormPassword,
		onHandleWriteFormRichEditor,
		onPostNoticeImage,
		onPutNotice
	};
}
