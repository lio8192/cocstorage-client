import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import { fetchStorageBoards, handleFetchParams, handleFetchSearchParams } from 'modules/storages/board';
import { RootState } from 'modules';

export default function useStorageBoard() {
	const dispatch = useDispatch();
	const storageBoardState = useSelector((state: RootState) => state.storageBoard);

	const [open, setOpen] = useState(false);

	const onFetchStorageBoards = useCallback(() => {
		dispatch(
			handleFetchParams({
				storageId: storageBoardState.storage.id,
				orderBy: 'latest',
				per: 5,
				page: 1
			})
		);
		dispatch(
			fetchStorageBoards({
				storageId: storageBoardState.storage.id,
				search: {
					type: 'all',
					value: null
				},
				orderBy: 'latest',
				per: 5,
				page: 1
			})
		);
	}, [dispatch, storageBoardState.storage.id]);

	const onHandlePagination = useCallback(
		(event: React.ChangeEvent<unknown>, value: number) => {
			dispatch(
				handleFetchParams({
					...storageBoardState.fetchParams,
					page: value
				})
			);
			dispatch(
				fetchStorageBoards({
					...storageBoardState.fetchParams,
					search: {
						...storageBoardState.fetchSearchParams
					},
					page: value
				})
			);
		},
		[dispatch, storageBoardState.fetchParams, storageBoardState.fetchSearchParams]
	);

	const onClickSearchType = useCallback(
		(event: React.MouseEvent<HTMLLIElement>) => {
			dispatch(
				handleFetchSearchParams({
					...storageBoardState.fetchSearchParams,
					type: event.currentTarget.getAttribute('data-search-type') || 'all'
				})
			);
			setOpen(false);
		},
		[dispatch, storageBoardState.fetchSearchParams]
	);

	const onKeyUpStorageBoardsSearchTextField = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Enter') {
				dispatch(
					handleFetchSearchParams({
						...storageBoardState.fetchSearchParams,
						// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
						// @ts-ignore
						value: event.target.value || null
					})
				);
				dispatch(
					fetchStorageBoards({
						...storageBoardState.fetchParams,
						search: {
							...storageBoardState.fetchSearchParams,
							// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
							// @ts-ignore
							value: event.target.value || null
						}
					})
				);
			}
		},
		[dispatch, storageBoardState.fetchParams, storageBoardState.fetchSearchParams]
	);

	return {
		...storageBoardState,
		open,
		setOpen,
		onFetchStorageBoards,
		onHandlePagination,
		onClickSearchType,
		onKeyUpStorageBoardsSearchTextField
	};
}
