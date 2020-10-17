import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

// Modules
import { handleStorageManageDialog } from 'modules/storages';

export default function useStorages() {
	const dispatch = useDispatch();

	const onHandleStorageManageDialogOpen = useCallback(() => dispatch(handleStorageManageDialog()), [dispatch]);

	return {
		onHandleStorageManageDialogOpen
	};
}
