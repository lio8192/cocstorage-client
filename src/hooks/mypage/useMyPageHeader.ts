import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import { putAvatar } from 'modules/mypage';
import { RootState } from 'modules';

export type PutUserAvatarFormData = {
	value: FileList | null;
	url: string;
};

export default function useMyPageHeader() {
	const dispatch = useDispatch();
	const {
		user: { id, avatarUrl, isAuthenticated }
	} = useSelector((state: RootState) => state.common);
	const myPageState = useSelector((state: RootState) => state.mypage);

	const [putUserAvatarFormData, setPutUserAvatarFormData] = useState<PutUserAvatarFormData>({
		value: null,
		url: ''
	});

	const onChangeAvatarFile = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { files } = event.target;

			const reader = new FileReader();
			reader.onload = () => {
				const base64URL = String(reader.result);
				setPutUserAvatarFormData({
					value: files,
					url: base64URL.toString()
				});

				if (files) {
					dispatch(
						putAvatar({
							userId: id,
							avatar: files[0]
						})
					);
				}
			};

			try {
				if (files) {
					reader.readAsDataURL(files[0]);
				}
			} catch (error) {
				console.log(error);
			}
		},
		[dispatch, id]
	);

	useEffect(() => {
		if (isAuthenticated) {
			setPutUserAvatarFormData({
				value: null,
				url: avatarUrl
			});
		}
	}, [avatarUrl, isAuthenticated]);

	return {
		...myPageState,
		putUserAvatarFormData,
		onChangeAvatarFile
	};
}
