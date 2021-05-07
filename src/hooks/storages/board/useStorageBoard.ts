import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// Modules
import { handleFetchSearchParams } from 'modules/storages/board';
import { RootState } from 'modules';

export default function useStorageBoard() {
	const dispatch = useDispatch();
	const storageBoardState = useSelector((state: RootState) => state.storageBoard);
	const router = useRouter();

	const [open, setOpen] = useState<boolean>(false);
	const [orderType, setOrderType] = useState<string>('latest');
	const [searchType, setSearchType] = useState<string>('all');
	const [searchValue, setSearchValue] = useState<string>('');

	const onHandlePagination = useCallback(
		(event: React.ChangeEvent<unknown>, value: number) => {
			router
				.push({
					pathname: `/storages/${router.query.path}`,
					query: {
						page: value
					}
				})
				.then();
		},
		[router]
	);

	const onClickSearchType = useCallback(
		(event: React.MouseEvent<HTMLLIElement>) => {
			dispatch(
				handleFetchSearchParams({
					...storageBoardState.fetchSearchParams,
					type: event.currentTarget.getAttribute('data-search-type') || 'all'
				})
			);
			setSearchType(event.currentTarget.getAttribute('data-search-type') || 'all');
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
				router
					.push({
						pathname: `/storages/${router.query.path}`,
						query: {
							page: 1,
							type: storageBoardState.fetchSearchParams.type,
							value: searchValue
						}
					})
					.then();
			}
		},
		[router, storageBoardState.fetchSearchParams, searchValue]
	);

	const onChangeOrderBy = useCallback(
		(event: React.ChangeEvent<{}>, newValue: string) => {
			router
				.push({
					pathname: `/storages/${router.query.path}`,
					query: {
						orderBy: newValue,
						page: 1,
						type: searchType,
						value: searchValue
					}
				})
				.then(() => setOrderType(newValue));
		},
		[router, searchType, searchValue]
	);

	useEffect(() => {
		setOrderType(String(router.query.orderBy || 'latest'));
		if (router.query.value) {
			setSearchType(String(router.query.type || 'all'));
			setSearchValue(String(router.query.value || ''));
		}
	}, [router]);

	return {
		...storageBoardState,
		open,
		orderType,
		searchType,
		searchValue,
		setOpen,
		onHandlePagination,
		onClickSearchType,
		onKeyUpStorageBoardsSearchTextField,
		onChangeOrderBy,
		onChangeStorageBoardSearchTextField
	};
}
