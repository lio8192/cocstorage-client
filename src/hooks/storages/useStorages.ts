import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import { fetchStorages, FetchStoragesPayload, handleStorageManageDialog } from 'modules/storages';
import { RootState } from 'modules';

export default function useStorages() {
	const dispatch = useDispatch();
	const storagesState = useSelector((state: RootState) => state.storages);

	const [fetchParams, setFetchParams] = useState<FetchStoragesPayload>({
		per: 20,
		page: 1,
		name: null,
		orderBy: 'latest'
	});

	const onFetchStorages = useCallback(() => dispatch(fetchStorages(fetchParams)), [dispatch, fetchParams]);

	const onKeyUpStorageSearchTextField = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Enter') {
				setFetchParams({
					...fetchParams,
					// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
					// @ts-ignore
					name: event.target.value || null
				});
			}
		},
		[fetchParams]
	);

	const onHandlePagination = useCallback(
		(event: React.ChangeEvent<unknown>, value: number) => {
			setFetchParams({
				...fetchParams,
				page: value
			});
		},
		[fetchParams]
	);

	const onHandleStorageManageDialogOpen = useCallback(() => dispatch(handleStorageManageDialog()), [dispatch]);

	return {
		...storagesState,
		fetchParams,
		onFetchStorages,
		onKeyUpStorageSearchTextField,
		onHandlePagination,
		onHandleStorageManageDialogOpen
	};
}
