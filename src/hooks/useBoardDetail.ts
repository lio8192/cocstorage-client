import React, {
	useEffect, useState, useCallback, useMemo
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

// Modules
import {
	postBoardDetailRecommend,
	clearBoardDetailRecommendState,
	fetchBoardDetailComments
} from '../modules/boardDetail';
import { RootState } from '../modules';

export default function useBoardDetail() {
	const dispatch = useDispatch();
	const router = useRouter();
	const { count } = useSelector((state: RootState) => state.board);
	const boardDetailState = useSelector((state: RootState) => state.boardDetail);
	const [thumbsSnackBarOpen, setThumbsSnackBarOpen] = useState<boolean>(false);
	const [errorThumbsSnackBarOpen, setErrorThumbsSnackBarOpen] = useState<boolean>(false);
	const [disabledRecommend, setDisabledRecommend] = useState<boolean>(false);
	const [row, setRow] = useState<number>(20);

	const { id: categoryId, detail } = useMemo(() => router.query, [router.query]);

	const onHandleBoardDetailRecommend = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			const thumbsType: string = event.currentTarget.getAttribute('data-thumbs-type') || '';

			dispatch(
				postBoardDetailRecommend({
					id: Number(detail),
					categoryId,
					recommendType: thumbsType
				})
			);

			setDisabledRecommend(true);
		},
		[dispatch, categoryId, detail]
	);

	const onHandleCloseSnackBar = useCallback(() => {
		setThumbsSnackBarOpen(false);
		setErrorThumbsSnackBarOpen(false);
	}, []);

	const onHandleExitedSnackBar = useCallback(() => {
		setDisabledRecommend(false);
	}, []);

	const onClearGoogleAdSenseLimit = useCallback(() => {
		if (count >= 20) {
			router.reload();
		}
	}, [router, count]);

	const onHandleCommentRow = useCallback(() => {
		setRow(row + 20);
	}, [row]);

	const onHandleNotificationModal = useCallback(() => router.push(`/board/${categoryId}`), [router, categoryId]);

	useEffect(() => {
		if (!boardDetailState.recommend.pending && boardDetailState.recommend.data && !boardDetailState.recommend.error) {
			setThumbsSnackBarOpen(true);
		} else if (!boardDetailState.recommend.pending && boardDetailState.recommend.error) {
			setErrorThumbsSnackBarOpen(true);
		}
	}, [boardDetailState.recommend]);

	useEffect(
		() => () => {
			dispatch(clearBoardDetailRecommendState());
		},
		[dispatch]
	);

	useEffect(() => {
		if (!boardDetailState.board.pending && boardDetailState.board.data.data_no) {
			dispatch(
				fetchBoardDetailComments({
					id: boardDetailState.board.data.id || 0,
					boardDataNo: boardDetailState.board.data.data_no,
					categoryId: router.query.id,
					row
				})
			);
		}
	}, [
		dispatch,
		router.query,
		boardDetailState.board.pending,
		boardDetailState.board.data.id,
		boardDetailState.board.data.data_no,
		row
	]);

	return {
		...boardDetailState,
		count,
		thumbsSnackBarOpen,
		errorThumbsSnackBarOpen,
		disabledRecommend,
		row,
		onClearGoogleAdSenseLimit,
		onHandleBoardDetailRecommend,
		onHandleCloseSnackBar,
		onHandleExitedSnackBar,
		onHandleCommentRow,
		onHandleNotificationModal
	};
}
