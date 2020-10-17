import React, {
	useEffect, useState, useCallback, useMemo
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useSnackbar, VariantType } from 'notistack';

// Modules
import { handlePageScope, handleSignInDialog, deleteSignOut } from 'modules/common';
import { clearBoardsRelatedState } from 'modules/board';
import { RootState } from 'modules';

export default function useHeader() {
	const dispatch = useDispatch();
	const { pageScope, user } = useSelector((state: RootState) => state.common);
	const { pending } = useSelector((state: RootState) => state.board);
	const router = useRouter();
	const { enqueueSnackbar } = useSnackbar();
	const {
		route,
		asPath,
		query: { id }
	} = router;

	const [isMounted, setIsMounted] = useState<boolean>(false);

	const activatedTab = useMemo(() => asPath, [asPath]);
	const isBoardDetail = useMemo(() => route === '/board/[id]/[detail]', [route]);
	const isPolicy = useMemo(() => route === '/policy' || route === '/privacy', [route]);
	const isNotice = useMemo(() => route === '/notice', [route]);
	const isMyPage = useMemo(() => route === '/mypage', [route]);
	const isStorageBoard = useMemo(() => route === '/storage/[path]', [route]);
	const isStorageBoardWrite = useMemo(() => route === '/storage/[path]/write', [route]);
	const isStorageBoardDetail = useMemo(() => route === '/storage/[path]/[id]', [route]);
	const isNoticeWrite = useMemo(() => route === '/notices/write', [route]);
	const isNoticeDetail = useMemo(() => route === '/notices/[id]', [route]);
	const isUserAuthenticationUUID = useMemo(() => route === '/users/authentication/[uuid]', [route]);
	const isTabsHidden = useMemo(
		() =>
			(isBoardDetail
				|| isPolicy
				|| isNotice
				|| isMyPage
				|| isStorageBoard
				|| isStorageBoardWrite
				|| isStorageBoardDetail
				|| isNoticeWrite
				|| isNoticeDetail
				|| isUserAuthenticationUUID)
			&& isMounted,
		[
			isBoardDetail,
			isPolicy,
			isNotice,
			isMyPage,
			isStorageBoard,
			isStorageBoardWrite,
			isStorageBoardDetail,
			isNoticeWrite,
			isNoticeDetail,
			isUserAuthenticationUUID,
			isMounted
		]
	);
	const openNavigationChip = useMemo(
		() => isBoardDetail || isStorageBoardWrite || isStorageBoardDetail || isNoticeWrite || isNoticeDetail,
		[isBoardDetail, isStorageBoardWrite, isStorageBoardDetail, isNoticeWrite, isNoticeDetail]
	);

	const onHandlePageScope = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			const value: string = String(event.currentTarget.getAttribute('data-page-scope')) || 'storage';

			router.push('/').then(() => dispatch(handlePageScope(value)));
		},
		[dispatch, router]
	);

	const onHandlePreviousTabChange = useCallback(
		(event: React.ChangeEvent<{}>, newValue: string) => {
			if (!pending) {
				const isIndexRoute: boolean = newValue === '/' && true;
				dispatch(clearBoardsRelatedState());

				if (isIndexRoute) {
					router
						.push({
							pathname: '/'
						})
						.then();
				} else {
					const boardId: string = newValue.split('/')[2];

					router
						.push(
							{
								pathname: '/board/[id]',
								query: {
									id: boardId
								}
							},
							newValue
						)
						.then();
				}
			} else {
				const variant: VariantType = 'warning';
				enqueueSnackbar('잠시 후 다시 시도해주세요.', { variant });
			}
		},
		[dispatch, router, pending, enqueueSnackbar]
	);

	const onHandleTabChange = useCallback(
		(event: React.ChangeEvent<{}>, newValue: string) => {
			if (!pending) {
				const isIndexRoute: boolean = newValue === '/' && true;
				dispatch(clearBoardsRelatedState());

				if (isIndexRoute) {
					router
						.push({
							pathname: '/'
						})
						.then();
				} else {
					router
						.push(
							{
								pathname: newValue
							},
							newValue
						)
						.then();
				}
			} else {
				const variant: VariantType = 'warning';
				enqueueSnackbar('잠시 후 다시 시도해주세요.', { variant });
			}
		},
		[dispatch, router, pending, enqueueSnackbar]
	);

	const onHandleChip = useCallback(() => {
		const categoryId = typeof id === 'string' ? id : '';

		router
			.push(
				{
					pathname: '/board/[id]',
					query: {
						id: categoryId
					}
				},
				`/board/${categoryId}`
			)
			.then();
	}, [router, id]);

	const onHandleLogo = useCallback(() => {
		dispatch(clearBoardsRelatedState());

		router
			.push({
				pathname: '/'
			})
			.then();
	}, [dispatch, router]);

	const onHandleSignInDialog = useCallback(() => dispatch(handleSignInDialog()), [dispatch]);

	const onDeleteSignOut = useCallback(() => dispatch(deleteSignOut()), [dispatch]);

	useEffect(() => {
		if (asPath.indexOf('board') !== -1) {
			dispatch(handlePageScope('previous-storage'));
		} else {
			dispatch(handlePageScope('storage'));
		}
	}, [dispatch, asPath]);

	useEffect(() => setIsMounted(true), []);

	return {
		id,
		pageScope,
		user,
		activatedTab,
		openNavigationChip,
		isTabsHidden,
		onHandlePageScope,
		onHandleTabChange,
		onHandlePreviousTabChange,
		onHandleLogo,
		onHandleChip,
		onHandleSignInDialog,
		onDeleteSignOut
	};
}
