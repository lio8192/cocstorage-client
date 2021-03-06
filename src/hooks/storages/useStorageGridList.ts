import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import { handleStorageManageDialog } from 'modules/storages';
import { RootState } from 'modules';
import { handleSignInDialog } from 'modules/common';

export default function useStorageGridList() {
	const {
		user: { isAuthenticated }
	} = useSelector((state: RootState) => state.common);
	const storagesState = useSelector((state: RootState) => state.storages);
	const dispatch = useDispatch();

	const onHandleStorageManageDialogOpen = useCallback(() => dispatch(handleStorageManageDialog()), [dispatch]);

	const onHandleSignInDialog = useCallback(() => dispatch(handleSignInDialog()), [dispatch]);

	return {
		...storagesState,
		isAuthenticated,
		onHandleStorageManageDialogOpen,
		onHandleSignInDialog
	};
}
