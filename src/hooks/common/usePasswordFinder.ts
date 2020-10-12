import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import { handleSignInDialog, handlePasswordFinderDialog, postPasswordFinder } from 'modules/common';
import { RootState } from 'modules';

export type PostPasswordFinderBody = {
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
};

export default function usePasswordFinder() {
	const dispatch = useDispatch();
	const commonState = useSelector((state: RootState) => state.common);

	const [postPasswordFinderBody, setPostPasswordFinderBody] = useState<PostPasswordFinderBody>({
		name: {
			value: '',
			error: false,
			helperText: ''
		},
		email: {
			value: '',
			error: false,
			helperText: ''
		}
	});

	const onHandleSignInDialog = useCallback(() => dispatch(handleSignInDialog()), [dispatch]);
	const onHandlePasswordFinderDialog = useCallback(() => dispatch(handlePasswordFinderDialog()), [dispatch]);

	const onHandlePasswordFinderDialogTextField = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const name: string = event.currentTarget.name || '';
			const value: string = event.currentTarget.value || '';

			setPostPasswordFinderBody({
				...postPasswordFinderBody,
				[name]: {
					value,
					error: false,
					helperText: ''
				}
			});
		},
		[postPasswordFinderBody]
	);

	const onPostPasswordFinder = useCallback(() => {
		const { name, email } = postPasswordFinderBody;

		// Initialize PostPasswordFinderBody
		setPostPasswordFinderBody({
			name: {
				...name,
				error: false,
				helperText: ''
			},
			email: {
				...email,
				error: false,
				helperText: ''
			}
		});

		const nameRegExp = /[가-힣]{2,5}/;
		// eslint-disable-next-line no-useless-escape
		const emailRegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
		const specialCharRegExp = '[ !@\\#$%^&*(),.?\\":{}|<>]';

		if (!new RegExp(nameRegExp).test(name.value) || new RegExp(specialCharRegExp).test(name.value)) {
			setPostPasswordFinderBody({
				...postPasswordFinderBody,
				name: {
					...postPasswordFinderBody.name,
					error: true,
					helperText: '올바른 이름을 입력해주세요.'
				}
			});

			return false;
		}
		if (!new RegExp(emailRegExp).test(email.value)) {
			setPostPasswordFinderBody({
				...postPasswordFinderBody,
				email: {
					...postPasswordFinderBody.email,
					error: true,
					helperText: '올바른 이메일을 입력해주세요.'
				}
			});

			return false;
		}

		dispatch(
			postPasswordFinder({
				name: name.value,
				email: email.value
			})
		);
		return true;
	}, [dispatch, postPasswordFinderBody]);

	useEffect(() => {
		if (!commonState.passwordFinder.open) {
			setPostPasswordFinderBody({
				name: {
					value: '',
					error: false,
					helperText: ''
				},
				email: {
					value: '',
					error: false,
					helperText: ''
				}
			});
		}
	}, [commonState.passwordFinder.open]);

	return {
		...commonState.passwordFinder,
		postPasswordFinderBody,
		onHandleSignInDialog,
		onHandlePasswordFinderDialog,
		onHandlePasswordFinderDialogTextField,
		onPostPasswordFinder
	};
}
