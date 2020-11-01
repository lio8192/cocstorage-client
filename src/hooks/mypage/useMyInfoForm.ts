import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import { RootState } from 'modules';
import { handlePrivacyAuthDialog, fetchPrivacy, putPassword } from 'modules/mypage';

export type FetchPrivacyBody = {
	password: string;
	error: boolean;
	helperText: string;
};

export type PutPasswordBody = {
	currentPassword: {
		value: string | null;
		error: boolean;
		helperText: string;
		showPassword: boolean;
	};
	password: {
		value: string | null;
		error: boolean;
		helperText: string;
		showPassword: boolean;
	};
	retypePassword: {
		value: string | null;
		error: boolean;
		helperText: string;
		showPassword: boolean;
	};
};

export default function useMyInfoForm() {
	const dispatch = useDispatch();
	const { user } = useSelector((state: RootState) => state.common);
	const myPageState = useSelector((state: RootState) => state.mypage);

	const [fetchPrivacyAuthBody, setFetchPrivacyAuthBody] = useState<FetchPrivacyBody>({
		password: '',
		error: false,
		helperText: ''
	});

	const [showPassword, setShowPassword] = useState<boolean>(false);

	const [putPasswordBody, setPutPasswordBody] = useState<PutPasswordBody>({
		currentPassword: {
			value: null,
			error: false,
			helperText: '',
			showPassword: false
		},
		password: {
			value: null,
			error: false,
			helperText: '',
			showPassword: false
		},
		retypePassword: {
			value: null,
			error: false,
			helperText: '',
			showPassword: false
		}
	});

	const onHandlePasswordTextField = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const name: string = event.currentTarget.name || '';
			const value: string = event.currentTarget.value || '';

			setPutPasswordBody({
				...putPasswordBody,
				[name]: {
					value,
					error: false,
					helperText: ''
				}
			});
		},
		[putPasswordBody]
	);

	const onHandlePrivacyAuthDialog = useCallback(() => dispatch(handlePrivacyAuthDialog()), [dispatch]);

	const onHandlePrivacyAuthDialogTextField = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const name: string = event.currentTarget.name || '';
			const value: string = event.currentTarget.value || '';

			setFetchPrivacyAuthBody({
				...fetchPrivacyAuthBody,
				[name]: value
			});
		},
		[fetchPrivacyAuthBody]
	);

	const onShowCurrentPassword = useCallback(
		() =>
			setPutPasswordBody({
				...putPasswordBody,
				currentPassword: {
					...putPasswordBody.currentPassword,
					showPassword: !putPasswordBody.currentPassword.showPassword
				}
			}),
		[putPasswordBody]
	);

	const onShowPassword = useCallback(
		() =>
			setPutPasswordBody({
				...putPasswordBody,
				password: {
					...putPasswordBody.password,
					showPassword: !putPasswordBody.password.showPassword
				}
			}),
		[putPasswordBody]
	);

	const onShowReTypePassword = useCallback(
		() =>
			setPutPasswordBody({
				...putPasswordBody,
				retypePassword: {
					...putPasswordBody.retypePassword,
					showPassword: !putPasswordBody.retypePassword.showPassword
				}
			}),
		[putPasswordBody]
	);

	const onShowPrivacyAuthDialogPassword = useCallback(() => setShowPassword(!showPassword), [showPassword]);

	const onFetchPrivacy = useCallback(() => {
		const { password } = fetchPrivacyAuthBody;

		setFetchPrivacyAuthBody({
			...fetchPrivacyAuthBody,
			error: false,
			helperText: ''
		});

		if (!password) {
			setFetchPrivacyAuthBody({
				...fetchPrivacyAuthBody,
				error: true,
				helperText: '비밀번호를 입력해주세요.'
			});
			return false;
		}

		dispatch(
			fetchPrivacy({
				userId: user.id,
				password
			})
		);
		return true;
	}, [dispatch, user.id, fetchPrivacyAuthBody]);

	const onPutPassword = useCallback(() => {
		const { currentPassword, password, retypePassword } = putPasswordBody;

		setPutPasswordBody({
			currentPassword: {
				...putPasswordBody.currentPassword,
				error: false,
				helperText: '',
				showPassword: false
			},
			password: {
				...putPasswordBody.password,
				error: false,
				helperText: '',
				showPassword: false
			},
			retypePassword: {
				...putPasswordBody.retypePassword,
				error: false,
				helperText: '',
				showPassword: false
			}
		});

		const specialCharRegExp = '[ !@\\#$%^&*(),.?\\":{}|<>]';

		if (!currentPassword.value) {
			setPutPasswordBody({
				...putPasswordBody,
				currentPassword: {
					...putPasswordBody.currentPassword,
					error: true,
					helperText: '현재 비밀번호를 입력해주세요.'
				}
			});
			return false;
		}

		if (!password.value) {
			setPutPasswordBody({
				...putPasswordBody,
				password: {
					...putPasswordBody.password,
					error: true,
					helperText: '새 비밀번호를 입력해주세요.'
				}
			});
			return false;
		}

		if (!retypePassword.value) {
			setPutPasswordBody({
				...putPasswordBody,
				retypePassword: {
					...putPasswordBody.retypePassword,
					error: true,
					helperText: '새 비밀번호를 다시 한번 입력해주세요.'
				}
			});
			return false;
		}

		if (password.value.length < 7) {
			setPutPasswordBody({
				...putPasswordBody,
				password: {
					...putPasswordBody.password,
					error: true,
					helperText: '비밀번호는 최소 7자 이상으로 입력해주세요.'
				}
			});
			return false;
		}

		if (!new RegExp(specialCharRegExp).test(password.value)) {
			setPutPasswordBody({
				...putPasswordBody,
				password: {
					...putPasswordBody.password,
					error: true,
					helperText: '비밀번호에 특수문자 1개 이상을 반드시 포함해주세요.'
				}
			});
			return false;
		}

		if (password.value !== retypePassword.value) {
			setPutPasswordBody({
				...putPasswordBody,
				password: {
					...putPasswordBody.password,
					error: true,
					helperText: '비밀번호가 일치하지 않습니다.'
				},
				retypePassword: {
					...putPasswordBody.retypePassword,
					error: true,
					helperText: '비밀번호가 일치하지 않습니다.'
				}
			});
			return false;
		}

		dispatch(
			putPassword({
				userId: user.id,
				currentPassword: currentPassword.value,
				password: password.value
			})
		);

		setPutPasswordBody({
			currentPassword: {
				value: '',
				error: false,
				helperText: '',
				showPassword: false
			},
			password: {
				value: '',
				error: false,
				helperText: '',
				showPassword: false
			},
			retypePassword: {
				value: '',
				error: false,
				helperText: '',
				showPassword: false
			}
		});
		return true;
	}, [dispatch, user.id, putPasswordBody]);

	useEffect(() => {
		if (myPageState.privacy.open) {
			setFetchPrivacyAuthBody({
				password: '',
				error: false,
				helperText: ''
			});
		}
	}, [myPageState.privacy.open]);

	return {
		...myPageState,
		user,
		putPasswordBody,
		fetchPrivacyAuthBody,
		showPassword,
		onHandlePasswordTextField,
		onHandlePrivacyAuthDialog,
		onHandlePrivacyAuthDialogTextField,
		onShowPrivacyAuthDialogPassword,
		onFetchPrivacy,
		onShowCurrentPassword,
		onShowPassword,
		onShowReTypePassword,
		onPutPassword
	};
}
