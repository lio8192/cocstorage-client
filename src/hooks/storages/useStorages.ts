import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import { fetchStorages, handleFetchParams, handleStorageManageDialog } from 'modules/storages';
import { RootState } from 'modules';

export default function useStorages() {
	const dispatch = useDispatch();
	const storagesState = useSelector((state: RootState) => state.storages);

	const onFetchStorages = useCallback(() => dispatch(fetchStorages(storagesState.fetchParams)), [
		dispatch,
		storagesState.fetchParams
	]);

	const onKeyUpStorageSearchTextField = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Enter') {
				dispatch(
					handleFetchParams({
						...storagesState.fetchParams,
						// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
						// @ts-ignore
						name: event.target.value || null,
						page: 1
					})
				);
			}
		},
		[dispatch, storagesState.fetchParams]
	);

	const onHandlePagination = useCallback(
		(event: React.ChangeEvent<unknown>, value: number) => {
			dispatch(
				handleFetchParams({
					...storagesState.fetchParams,
					page: value
				})
			);
		},
		[dispatch, storagesState.fetchParams]
	);

	const onHandleStorageManageDialogOpen = useCallback(() => dispatch(handleStorageManageDialog()), [dispatch]);

	return {
		...storagesState,
		onFetchStorages,
		onKeyUpStorageSearchTextField,
		onHandlePagination,
		onHandleStorageManageDialogOpen
	};
}
