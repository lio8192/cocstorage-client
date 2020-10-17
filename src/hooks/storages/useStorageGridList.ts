// import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
// import { FetchStoragesPayload, handleStorageManageDialog } from 'modules/storages';
import { RootState } from 'modules';

export default function useStorageGridList() {
	// const dispatch = useDispatch();
	const storagesState = useSelector((state: RootState) => state.storages);

	return {
		...storagesState
	};
}
