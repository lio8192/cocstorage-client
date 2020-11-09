import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import { handleSignInDialog, handleSignUpDialog, postSignUp } from 'modules/common';
import { RootState } from 'modules';

export type PostSignUpBody = {
	name: {
		value: string;
		error: boolean;
		helperText: string;
	};
	email: {
		value: string;
		error: boolean;
		helperText: string;
	};
	password: {
		value: string;
		error: boolean;
		helperText: string;
	};
	policy: {
		checked: boolean;
		error: boolean;
		helperText: string;
	};
	showPassword: boolean;
};

export default function useSignUp() {
	const dispatch = useDispatch();
	const commonState = useSelector((state: RootState) => state.common);

	const [postSignUpBody, setPostSignUpBody] = useState<PostSignUpBody>({
		name: {
			value: '',
			error: false,
			helperText: ''
		},
		email: {
			value: '',
			error: false,
			helperText: ''
		},
		password: {
			value: '',
			error: false,
			helperText: ''
		},
		policy: {
			checked: false,
			error: false,
			helperText: ''
		},
		showPassword: false
	});

	const onHandleSignInDialog = useCallback(() => dispatch(handleSignInDialog()), [dispatch]);
	const onHandleSignUpDialog = useCallback(() => dispatch(handleSignUpDialog()), [dispatch]);

	const onHandleSignUpDialogTextField = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const name: string = event.currentTarget.name || '';
			const value: string = event.currentTarget.value || '';

			setPostSignUpBody({
				...postSignUpBody,
				[name]: {
					value,
					error: false,
					helperText: ''
				}
			});
		},
		[postSignUpBody]
	);

	const onHandleSignUpDialogCheckbox = useCallback(
		() =>
			setPostSignUpBody({
				...postSignUpBody,
				policy: { ...postSignUpBody.policy, checked: !postSignUpBody.policy.checked }
			}),
		[postSignUpBody]
	);
	const onShowSignUpDialogPassword = useCallback(
		() => setPostSignUpBody({ ...postSignUpBody, showPassword: !postSignUpBody.showPassword }),
		[postSignUpBody]
	);

	const onPostSignUp = useCallback(() => {
		const {
			name, email, password, policy
		} = postSignUpBody;

		// Initialize PostSignBody
		setPostSignUpBody({
			...postSignUpBody,
			name: {
				...name,
				error: false,
				helperText: ''
			},
			email: {
				...email,
				error: false,
				helperText: ''
			},
			password: {
				...password,
				error: false,
				helperText: ''
			},
			policy: {
				...policy,
				error: false,
				helperText: ''
			}
		});

		const nameRegExp = /[가-힣]{2,5}/;
		// eslint-disable-next-line no-useless-escape
		const emailRegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
		const specialCharRegExp = '[!@\\#$%^&*(),.?\\":{}|<>]';

		if (!new RegExp(nameRegExp).test(name.value) || new RegExp(specialCharRegExp).test(name.value)) {
			setPostSignUpBody({
				...postSignUpBody,
				name: {
					...postSignUpBody.name,
					error: true,
					helperText: '올바른 이름을 입력해주세요.'
				}
			});

			return false;
		}
		if (!new RegExp(emailRegExp).test(email.value)) {
			setPostSignUpBody({
				...postSignUpBody,
				email: {
					...postSignUpBody.email,
					error: true,
					helperText: '올바른 이메일을 입력해주세요.'
				}
			});

			return false;
		}
		if (!password.value) {
			setPostSignUpBody({
				...postSignUpBody,
				password: {
					...postSignUpBody.password,
					error: true,
					helperText: '비밀번호를 입력해주세요.'
				}
			});

			return false;
		}
		if (password.value.length < 7) {
			setPostSignUpBody({
				...postSignUpBody,
				password: {
					...postSignUpBody.password,
					error: true,
					helperText: '비밀번호는 최소 7자 이상으로 입력해주세요.'
				}
			});

			return false;
		}
		if (!new RegExp(specialCharRegExp).test(password.value)) {
			setPostSignUpBody({
				...postSignUpBody,
				password: {
					...postSignUpBody.password,
					error: true,
					helperText: '비밀번호에 특수문자 1개 이상을 반드시 포함해주세요.'
				}
			});

			return false;
		}
		if (!policy.checked) {
			setPostSignUpBody({
				...postSignUpBody,
				policy: {
					...postSignUpBody.policy,
					error: true,
					helperText: '이용약관, 개인정보처리방침에 동의해주세요.'
				}
			});

			return false;
		}

		dispatch(
			postSignUp({
				name: name.value,
				email: email.value,
				password: password.value
			})
		);
		return true;
	}, [dispatch, postSignUpBody]);

	const onKeyUpHandleDialog = useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			if (event.key === 'Backspace') {
				dispatch(handleSignUpDialog());
			}
		},
		[dispatch]
	);

	useEffect(() => {
		if (!commonState.signUp.open) {
			setPostSignUpBody({
				name: {
					value: '',
					error: false,
					helperText: ''
				},
				email: {
					value: '',
					error: false,
					helperText: ''
				},
				password: {
					value: '',
					error: false,
					helperText: ''
				},
				policy: {
					checked: false,
					error: false,
					helperText: ''
				},
				showPassword: false
			});
		}
	}, [commonState.signUp.open]);

	return {
		...commonState.signUp,
		postSignUpBody,
		onHandleSignInDialog,
		onHandleSignUpDialog,
		onHandleSignUpDialogTextField,
		onHandleSignUpDialogCheckbox,
		onShowSignUpDialogPassword,
		onPostSignUp,
		onKeyUpHandleDialog
	};
}
