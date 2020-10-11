import { useState, useCallback } from 'react';

export default function useStorages() {
	const [open, setOpen] = useState<boolean>(false);

	const onHandleStorageManageDialogOpen = useCallback(() => setOpen(!open), [open]);

	return {
		open,
		onHandleStorageManageDialogOpen
	};
}
