import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import {
	handleSignInDialog,
	handleSignUpDialog,
	handlePasswordFinderDialog,
	handleNotificationModal
} from 'modules/common';
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

export default function useLayout() {
	const dispatch = useDispatch();
	const commonState = useSelector((state: RootState) => state.common);

	const onHandleSignInDialog = useCallback(() => dispatch(handleSignInDialog()), [dispatch]);
	const onHandleSignUpDialog = useCallback(() => dispatch(handleSignUpDialog()), [dispatch]);
	const onHandlePasswordFinderDialog = useCallback(() => dispatch(handlePasswordFinderDialog()), [dispatch]);

	const onCloseNotificationModal = useCallback(
		() =>
			dispatch(
				handleNotificationModal({
					...commonState.notification,
					open: false
				})
			),
		[dispatch, commonState.notification]
	);

	return {
		...commonState,
		onHandleSignInDialog,
		onHandleSignUpDialog,
		onHandlePasswordFinderDialog,
		onCloseNotificationModal
	};
}
