import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import { fetchStorages, handleFetchParams, handleStorageManageDialog } from 'modules/storages';
import { handlePageScope, handleSignInDialog } from 'modules/common';
import { RootState } from 'modules';

export default function useStorages() {
	const dispatch = useDispatch();
	const {
		user: { isAuthenticated },
		pageScope
	} = useSelector((state: RootState) => state.common);
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

	const onHandleSignInDialog = useCallback(() => dispatch(handleSignInDialog()), [dispatch]);

	const onHandlePageScope = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			const value: string = String(event.currentTarget.getAttribute('data-page-scope')) || 'storage';
			dispatch(handlePageScope(value));
		},
		[dispatch]
	);

	const onHandleTabsPageScope = useCallback(
		(event: React.ChangeEvent<{}>, newValue: string) => {
			dispatch(handlePageScope(newValue));
		},
		[dispatch]
	);

	return {
		...storagesState,
		isAuthenticated,
		pageScope,
		onFetchStorages,
		onKeyUpStorageSearchTextField,
		onHandlePagination,
		onHandleStorageManageDialogOpen,
		onHandleSignInDialog,
		onHandlePageScope,
		onHandleTabsPageScope
	};
}
