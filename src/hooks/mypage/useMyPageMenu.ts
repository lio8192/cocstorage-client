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

		const nicknameRegExp = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]{2,10}$/;
		// eslint-disable-next-line no-useless-escape
		const specialCharRegExp = '[ !@\\#$%^&*(),.?\\":{}|<>]';

		if (!new RegExp(nicknameRegExp).test(value || '') || new RegExp(specialCharRegExp).test(value || '')) {
			setPutNicknameBody({
				...putNicknameBody,
				error: true,
				helperText: '올바른 닉네임을 입력해주세요.'
			});
			return false;
		}

		dispatch(
			putNickname({
				userId: user.id,
				nickname: value || ''
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
		if (user.nickname) {
			setPutNicknameBody({
				value: user.nickname,
				error: false,
				helperText: '',
				editNickname: false
			});
		}
	}, [user.nickname]);

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
