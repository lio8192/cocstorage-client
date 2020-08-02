import React, { useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// Modules
import { fetchBoards, handleBoardsSearchState, SearchState } from '../modules/board';
import { RootState } from '../modules';

export default function useBoard() {
	const router = useRouter();
	const dispatch = useDispatch();
	const boardState = useSelector((state: RootState) => state.board);

	const [adSenseCount, setAdSenseCount] = useState<number>(0);
	const [dummyBoardArray] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

	const { id: categoryId } = useMemo(() => router.query, [router.query]);

	const onHandlePagination = useCallback(
		(event: React.ChangeEvent<unknown>, value: number) => {
			setAdSenseCount(adSenseCount + 1);

			if (!boardState.pending) {
				dispatch(fetchBoards({ categoryId, page: value, searchState: boardState.searchState }));
			}
		},
		[dispatch, categoryId, boardState.searchState, boardState.pending, adSenseCount]
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
				const nextSearchState: SearchState = {
					...boardState.searchState,
					handle: true
				};

				if (!boardState.pending) {
					dispatch(handleBoardsSearchState(nextSearchState));
					dispatch(fetchBoards({ categoryId, page: 1, searchState: nextSearchState }));
				}
			}
		},
		[dispatch, categoryId, boardState.searchState, boardState.pending]
	);

	return {
		categoryId,
		...boardState,
		dummyBoardArray,
		adSenseCount,
		onHandleSearchTypeMenuSelect,
		onHandleSearchValueInput,
		onHandleSearchValueInputKey,
		onHandlePagination
	};
}
