import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import { deleteUser, handleDeleteUserAuthDialog } from 'modules/mypage';
import { RootState } from 'modules';

export type DeleteUserBody = {
	checked: boolean;
	error: boolean;
	helperText: string;
};

export type DeleteUserAuthBody = {
	password: string;
	error: boolean;
	helperText: string;
};

export default function useMyWithdrawalForm() {
	const dispatch = useDispatch();
	const { user } = useSelector((state: RootState) => state.common);
	const myPageState = useSelector((state: RootState) => state.mypage);

	const [deleteUserBody, setDeleteUserBody] = useState<DeleteUserBody>({
		checked: false,
		error: false,
		helperText: ''
	});

	const [deleteUserAuthBody, setDeleteUserAuthBody] = useState<DeleteUserAuthBody>({
		password: '',
		error: false,
		helperText: ''
	});

	const [showPassword, setShowPassword] = useState<boolean>(false);

	const onHandlePolicyCheckBox = useCallback(
		() =>
			setDeleteUserBody({
				...deleteUserBody,
				checked: !deleteUserBody.checked
			}),
		[deleteUserBody]
	);

	const onHandleDeleteUserAuthDialog = useCallback(() => {
		setDeleteUserBody({
			...deleteUserBody,
			error: false,
			helperText: ''
		});

		if (!myPageState.deleteAuth.open && !deleteUserBody.checked) {
			setDeleteUserBody({
				...deleteUserBody,
				error: true,
				helperText: '위 내용을 확인했음에 동의해주세요.'
			});
			return false;
		}
		dispatch(handleDeleteUserAuthDialog());
		return true;
	}, [dispatch, myPageState.deleteAuth.open, deleteUserBody]);

	const onHandleDeleteUserAuthTextField = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value: string = event.currentTarget.value || '';

			setDeleteUserAuthBody({
				...deleteUserAuthBody,
				password: value
			});
		},
		[deleteUserAuthBody]
	);

	const onShowDeleteUserAuthDialogPassword = useCallback(() => setShowPassword(!showPassword), [showPassword]);

	const onDeleteUser = useCallback(() => {
		const { password } = deleteUserAuthBody;

		setDeleteUserAuthBody({
			...deleteUserAuthBody,
			error: false,
			helperText: ''
		});

		if (!password) {
			setDeleteUserAuthBody({
				...deleteUserAuthBody,
				error: true,
				helperText: '비밀번호를 입력해주세요.'
			});
			return false;
		}

		dispatch(
			deleteUser({
				userId: user.id,
				password
			})
		);
		return true;
	}, [dispatch, user.id, deleteUserAuthBody]);

	return {
		...myPageState,
		user,
		deleteUserBody,
		deleteUserAuthBody,
		showPassword,
		onHandlePolicyCheckBox,
		onHandleDeleteUserAuthDialog,
		onHandleDeleteUserAuthTextField,
		onShowDeleteUserAuthDialogPassword,
		onDeleteUser
	};
}
