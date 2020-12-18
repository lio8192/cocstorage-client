import React, {
	useEffect, useState, useCallback, useMemo
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// Modules
import { handleBoardsSearchState, handlePagination, handlePending } from 'modules/board';
import { RootState } from 'modules';

export default function useBoard() {
	const router = useRouter();
	const dispatch = useDispatch();
	const boardState = useSelector((state: RootState) => state.board);

	const [adSenseCount, setAdSenseCount] = useState<number>(0);

	const { id: categoryId } = useMemo(() => router.query, [router.query]);

	const onHandlePagination = useCallback(
		(event: React.ChangeEvent<unknown>, value: number) => {
			setAdSenseCount(adSenseCount + 1);

			if (!boardState.pending) {
				const query = {
					id: categoryId,
					page: value,
					...boardState.searchState
				};

				if (!boardState.searchState.value) {
					delete query.value;
					delete query.type;
					delete query.handle;
				}

				router
					.push({
						pathname: '/board/[id]',
						query
					})
					.then();
			}
		},
		[router, categoryId, boardState.searchState, boardState.pending, adSenseCount]
	);

	const onHandleSearchTypeMenuSelect = useCallback(
		(event: React.MouseEvent<HTMLLIElement>) => {
			const type: string = event.currentTarget.getAttribute('data-value') || '';

			dispatch(
				handleBoardsSearchState({
					...boardState.searchState,
					type
				})
			);
		},
		[dispatch, boardState.searchState]
	);

	const onHandleSearchValueInput = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = String(event.target.value);

			dispatch(
				handleBoardsSearchState({
					...boardState.searchState,
					value
				})
			);
		},
		[dispatch, boardState.searchState]
	);

	const onHandleSearchValueInputKey = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Enter') {
				setAdSenseCount(adSenseCount + 1);

				const query = {
					id: categoryId,
					page: 1,
					...boardState.searchState
				};

				if (!boardState.searchState.value) {
					delete query.value;
					delete query.type;
					delete query.handle;
				}

				router
					.push({
						pathname: '/board/[id]',
						query
					})
					.then();
			}
		},
		[router, categoryId, boardState.searchState, adSenseCount]
	);

	useEffect(() => {
		router.events.on('routeChangeStart', () => {
			dispatch(handlePending(true));
		});
	}, [dispatch, router]);

	useEffect(() => {
		router.events.on('routeChangeComplete', () => {
			dispatch(handlePagination(boardState.pagination));
			dispatch(handleBoardsSearchState(boardState.searchState));
		});
	}, [dispatch, router, boardState.pagination, boardState.searchState]);

	return {
		categoryId,
		...boardState,
		adSenseCount,
		onHandleSearchTypeMenuSelect,
		onHandleSearchValueInput,
		onHandleSearchValueInputKey,
		onHandlePagination
	};
}
