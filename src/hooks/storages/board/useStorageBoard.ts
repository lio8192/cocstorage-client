import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// Modules
import { RootState } from 'modules';

export default function useStorageBoard() {
	const storageBoardState = useSelector((state: RootState) => state.storageBoard);
	const router = useRouter();

	const [open, setOpen] = useState<boolean>(false);
	const [orderType, setOrderType] = useState<string>('latest');
	const [searchType, setSearchType] = useState<string>('all');
	const [searchValue, setSearchValue] = useState<string>('');

	const onHandlePagination = useCallback(
		(event: React.ChangeEvent<unknown>, value: number) => {
			const query = {
				orderBy: orderType,
				page: value,
				type: searchType,
				value: searchValue
			};

			if (!searchValue) {
				delete query.type;
				delete query.value;
			}

			router
				.push({
					pathname: `/storages/${router.query.path}`,
					query
				})
				.then();
		},
		[router, orderType, searchType, searchValue]
	);

	const onClickSearchType = useCallback((event: React.MouseEvent<HTMLLIElement>) => {
		setSearchType(event.currentTarget.getAttribute('data-search-type') || 'all');
		setOpen(false);
	}, []);

	const onChangeStorageBoardSearchTextField = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const value: string = event.currentTarget.value || '';

		setSearchValue(value);
	}, []);

	const onClickStorageBoardsSearchButton = useCallback(() => {
		router
			.push({
				pathname: `/storages/${router.query.path}`,
				query: {
					page: 1,
					orderBy: orderType,
					type: searchType,
					value: searchValue
				}
			})
			.then();
	}, [router, orderType, searchValue, searchType]);

	const onChangeOrderBy = useCallback(
		(event: React.ChangeEvent<{}>, newValue: string) => {
			const query = {
				orderBy: newValue,
				page: 1
			};

			router
				.push({
					pathname: `/storages/${router.query.path}`,
					query
				})
				.then();
		},
		[router]
	);

	useEffect(() => {
		setOrderType(String(router.query.orderBy || 'latest'));
		if (router.query.value) {
			setSearchType(String(router.query.type || 'all'));
			setSearchValue(String(router.query.value || ''));
		} else {
			setSearchType('all');
			setSearchValue('');
		}
	}, [router]);

	return {
		...storageBoardState,
		query: router.query,
		open,
		orderType,
		searchType,
		searchValue,
		setOpen,
		onHandlePagination,
		onClickSearchType,
		onClickStorageBoardsSearchButton,
		onChangeOrderBy,
		onChangeStorageBoardSearchTextField
	};
}
