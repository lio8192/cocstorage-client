import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import { handleSignInDialog, deleteSignOut } from 'modules/common';
import { RootState } from 'modules';

export default function useMobileHeader() {
	const dispatch = useDispatch();
	const { pageScope, user } = useSelector((state: RootState) => state.common);

	const onHandleSignInDialog = useCallback(() => dispatch(handleSignInDialog()), [dispatch]);
	const onDeleteSignOut = useCallback(() => dispatch(deleteSignOut()), [dispatch]);

	return {
		pageScope,
		user,
		onHandleSignInDialog,
		onDeleteSignOut
	};
}
