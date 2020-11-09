import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import {
	handlePasswordFinderDialog, handleSignInDialog, handleSignUpDialog, postSignIn
} from 'modules/common';
import { RootState } from 'modules';

export type PostSignInBody = {
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
	showPassword: boolean;
};

export default function useSignIn() {
	const dispatch = useDispatch();
	const commonState = useSelector((state: RootState) => state.common);

	const [postSignInBody, setPostSignInBody] = useState<PostSignInBody>({
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
		showPassword: false
	});

	const onHandleSignInDialog = useCallback(() => dispatch(handleSignInDialog()), [dispatch]);
	const onHandleSignUpDialog = useCallback(() => dispatch(handleSignUpDialog()), [dispatch]);
	const onHandlePasswordFinderDialog = useCallback(() => dispatch(handlePasswordFinderDialog()), [dispatch]);

	const onHandleSignInDialogTextField = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const name: string = event.currentTarget.name || '';
			const value: string = event.currentTarget.value || '';

			setPostSignInBody({
				...postSignInBody,
				[name]: {
					value,
					error: false,
					helperText: ''
				}
			});
		},
		[postSignInBody]
	);

	const onShowSignInDialogPassword = useCallback(
		() => setPostSignInBody({ ...postSignInBody, showPassword: !postSignInBody.showPassword }),
		[postSignInBody]
	);

	const onPostSignIn = useCallback(() => {
		const { email, password } = postSignInBody;

		// Initialize PostSignBody
		setPostSignInBody({
			...postSignInBody,
			email: {
				...email,
				error: false,
				helperText: ''
			},
			password: {
				...password,
				error: false,
				helperText: ''
			}
		});

		if (!email.value) {
			setPostSignInBody({
				...postSignInBody,
				email: {
					...postSignInBody.email,
					error: true,
					helperText: '이메일을 입력해주세요.'
				}
			});

			return false;
		}
		if (!password.value) {
			setPostSignInBody({
				...postSignInBody,
				password: {
					...postSignInBody.password,
					error: true,
					helperText: '비밀번호를 입력해주세요.'
				}
			});

			return false;
		}

		dispatch(
			postSignIn({
				email: email.value,
				password: password.value
			})
		);
		setPostSignInBody({
			...postSignInBody,
			password: {
				...postSignInBody.password,
				value: ''
			}
		});
		return true;
	}, [dispatch, postSignInBody]);

	const onKeyUpHandleDialog = useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			if (event.key === 'Backspace') {
				dispatch(handleSignInDialog());
			}
		},
		[dispatch]
	);

	useEffect(() => {
		if (!commonState.signIn.open) {
			setPostSignInBody({
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
				showPassword: false
			});
		}
	}, [commonState.signIn.open]);

	return {
		...commonState.signIn,
		postSignInBody,
		onHandleSignInDialog,
		onHandleSignUpDialog,
		onHandlePasswordFinderDialog,
		onHandleSignInDialogTextField,
		onShowSignInDialogPassword,
		onPostSignIn,
		onKeyUpHandleDialog
	};
}
