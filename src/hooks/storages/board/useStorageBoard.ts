import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import { fetchStorageBoards, handleFetchParams, handleFetchSearchParams } from 'modules/storages/board';
import { RootState } from 'modules';

export default function useStorageBoard() {
	const dispatch = useDispatch();
	const storageBoardState = useSelector((state: RootState) => state.storageBoard);

	const [open, setOpen] = useState<boolean>(false);
	const [searchValue, setSearchValue] = useState<string>('');

	const onFetchStorageBoards = useCallback(() => {
		if (storageBoardState.storage.id !== 0) {
			dispatch(
				fetchStorageBoards({
					...storageBoardState.fetchParams,
					search: {
						...storageBoardState.fetchSearchParams
					},
					storageId: storageBoardState.storage.id
				})
			);
		}
	}, [dispatch, storageBoardState.storage.id, storageBoardState.fetchParams, storageBoardState.fetchSearchParams]);

	const onHandlePagination = useCallback(
		(event: React.ChangeEvent<unknown>, value: number) => {
			dispatch(
				handleFetchParams({
					...storageBoardState.fetchParams,
					page: value
				})
			);
		},
		[dispatch, storageBoardState.fetchParams]
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

	const onChangeStorageBoardSearchTextField = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const value: string = event.currentTarget.value || '';

		setSearchValue(value);
	}, []);

	const onKeyUpStorageBoardsSearchTextField = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Enter') {
				dispatch(
					handleFetchSearchParams({
						...storageBoardState.fetchSearchParams,
						value: searchValue || null
					})
				);
			}
		},
		[dispatch, storageBoardState.fetchSearchParams, searchValue]
	);

	const onChangeOrderBy = useCallback(
		(event: React.ChangeEvent<{}>, newValue: string) => {
			setSearchValue('');
			dispatch(
				handleFetchParams({
					...storageBoardState.fetchParams,
					orderBy: newValue,
					per: 10,
					page: 1
				})
			);
			dispatch(
				handleFetchSearchParams({
					type: '',
					value: null
				})
			);
		},
		[dispatch, storageBoardState.fetchParams]
	);

	useEffect(() => {
		if (storageBoardState.fetchSearchParams.value) {
			setSearchValue(storageBoardState.fetchSearchParams.value);
		}
	}, [storageBoardState.fetchSearchParams.value]);

	return {
		...storageBoardState,
		open,
		searchValue,
		setOpen,
		onFetchStorageBoards,
		onHandlePagination,
		onClickSearchType,
		onKeyUpStorageBoardsSearchTextField,
		onChangeOrderBy,
		onChangeStorageBoardSearchTextField
	};
}
