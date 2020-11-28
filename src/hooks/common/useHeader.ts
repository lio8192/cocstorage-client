import React, { useEffect, useCallback, useMemo } from 'react';
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
	const { storage } = useSelector((state: RootState) => state.storageBoard);
	const router = useRouter();
	const { enqueueSnackbar } = useSnackbar();
	const {
		route,
		asPath,
		query: { id }
	} = router;

	const activatedTab = useMemo(() => asPath, [asPath]);
	const isHome = useMemo(() => route === '/', [route]);
	const isBoard = useMemo(() => route === '/board/[id]', [route]);
	const isBoardDetail = useMemo(() => route === '/board/[id]/[detail]', [route]);
	const isNewStorages = useMemo(() => route === '/storages', [route]);
	const isStorageBoard = useMemo(() => route === '/storages/[path]', [route]);
	const isStorageBoardWrite = useMemo(() => route === '/storages/[path]/write', [route]);
	const isStorageBoardEdit = useMemo(() => route === '/storages/[path]/edit/[id]', [route]);
	const isStorageBoardDetail = useMemo(() => route === '/storages/[path]/[id]', [route]);
	const isNewNotices = useMemo(() => route === '/notices', [route]);
	const isNoticeWrite = useMemo(() => route === '/notices/write', [route]);
	const isNoticeEdit = useMemo(() => route === '/notices/edit/[id]', [route]);
	const isNoticeDetail = useMemo(() => route === '/notices/[id]', [route]);
	const isNotices = useMemo(() => isNoticeWrite || isNoticeDetail || isNoticeEdit, [
		isNoticeWrite,
		isNoticeDetail,
		isNoticeEdit
	]);
	const openTab = useMemo(() => isHome || isNewStorages || isNewNotices || isBoard, [
		isHome,
		isNewStorages,
		isNewNotices,
		isBoard
	]);
	const openNavigationChip = useMemo(
		() =>
			isBoardDetail
			|| isStorageBoardWrite
			|| isStorageBoardDetail
			|| isStorageBoardEdit
			|| isNoticeWrite
			|| isNoticeEdit
			|| isNoticeDetail,
		[
			isBoardDetail,
			isStorageBoardWrite,
			isStorageBoardDetail,
			isStorageBoardEdit,
			isNoticeWrite,
			isNoticeDetail,
			isNoticeEdit
		]
	);

	const isNewStorage = useMemo(
		() => isStorageBoardWrite || isStorageBoard || isStorageBoardDetail || isStorageBoardEdit,
		[isStorageBoardWrite, isStorageBoard, isStorageBoardDetail, isStorageBoardEdit]
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

	const onHandleStorageChip = useCallback(() => {
		router
			.push(
				{
					pathname: '/storages/[path]'
				},
				`/storages/${storage.path}`
			)
			.then();
	}, [router, storage.path]);

	const onHandleNoticeChip = useCallback(() => {
		router
			.push(
				{
					pathname: '/notices'
				},
				'/notices'
			)
			.then();
	}, [router]);

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

	return {
		id,
		pageScope,
		user,
		storage,
		activatedTab,
		openNavigationChip,
		openTab,
		isNewStorage,
		isNotices,
		onHandleTabChange,
		onHandleLogo,
		onHandleChip,
		onHandleStorageChip,
		onHandleNoticeChip,
		onHandleSignInDialog,
		onDeleteSignOut
	};
}
