import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import { changeMyPageTab, putNickname } from 'modules/mypage';
import { RootState } from 'modules';

export type PutNicknameBody = {
	value: string | null;
	error: boolean;
	helperText: string;
	editNickname: boolean;
};

export default function useMyPageMenu() {
	const dispatch = useDispatch();
	const { user } = useSelector((state: RootState) => state.common);
	const myPageState = useSelector((state: RootState) => state.mypage);

	const [putNicknameBody, setPutNicknameBody] = useState<PutNicknameBody>({
		value: null,
		error: false,
		helperText: '',
		editNickname: false
	});

	const onChangeMyPageTab = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			const value = Number(event.currentTarget.getAttribute('data-tab-value') || 0);

			dispatch(changeMyPageTab(value));
		},
		[dispatch]
	);

	const onHandleNicknameTextField = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value: string = event.currentTarget.value || '';

			setPutNicknameBody({
				...putNicknameBody,
				value
			});
		},
		[putNicknameBody]
	);

	const onClickEditNickname = useCallback(
		() =>
			setPutNicknameBody({
				...putNicknameBody,
				editNickname: !putNicknameBody.editNickname
			}),
		[putNicknameBody]
	);

	const onPutNickname = useCallback(() => {
		const { value } = putNicknameBody;

		setPutNicknameBody({
			...putNicknameBody,
			error: false,
			helperText: ''
		});

		if (!value) {
			setPutNicknameBody({
				...putNicknameBody,
				error: true,
				helperText: '닉네임을 입력해주세요.'
			});
			return false;
		}

		dispatch(
			putNickname({
				userId: user.id,
				nickname: value
			})
		);

		setPutNicknameBody({
			...putNicknameBody,
			error: false,
			helperText: '',
			editNickname: false
		});
		return true;
	}, [dispatch, user.id, putNicknameBody]);

	useEffect(() => {
		if (user.nickname && !putNicknameBody.value) {
			setPutNicknameBody({
				...putNicknameBody,
				value: user.nickname
			});
		}
	}, [user.nickname, putNicknameBody]);

	return {
		...myPageState,
		user,
		putNicknameBody,
		onChangeMyPageTab,
		onHandleNicknameTextField,
		onClickEditNickname,
		onPutNickname
	};
}
