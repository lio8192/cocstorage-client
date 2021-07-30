import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import { handleStorageManageDialog } from 'modules/storages';
import { handleSignInDialog } from 'modules/common';
import { RootState } from 'modules';

export default function useStorageHeader() {
	const dispatch = useDispatch();
	const {
		user: { isAuthenticated }
	} = useSelector((state: RootState) => state.common);

	const onHandleStorageManageDialogOpen = useCallback(() => dispatch(handleStorageManageDialog()), [dispatch]);

	const onHandleSignInDialog = useCallback(() => dispatch(handleSignInDialog()), [dispatch]);

	return {
		isAuthenticated,
		onHandleStorageManageDialogOpen,
		onHandleSignInDialog
	};
}
