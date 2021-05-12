import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// Modules
import { handleSignInDialog, deleteSignOut, handleDrawer } from 'modules/common';
import { RootState } from 'modules';

export default function useMobileHeader() {
	const dispatch = useDispatch();
	const router = useRouter();
	const {
		route,
		query: { id }
	} = router;
	const { user } = useSelector((state: RootState) => state.common);
	const { storage } = useSelector((state: RootState) => state.storageBoard);
	const { pending } = useSelector((state: RootState) => state.storageBoardDetail);

	const isBoardDetail = useMemo(() => route === '/board/[id]/[detail]', [route]);

	const isNoticeWrite = useMemo(() => route === '/notices/write', [route]);
	const isNoticeEdit = useMemo(() => route === '/notices/edit/[id]', [route]);
	const isNoticeDetail = useMemo(() => route === '/notices/[id]', [route]);
	const isNotices = useMemo(() => isNoticeWrite || isNoticeDetail || isNoticeEdit, [
		isNoticeWrite,
		isNoticeDetail,
		isNoticeEdit
	]);

	const isStorageBoardWrite = useMemo(() => route === '/storages/[path]/write', [route]);
	const isStorageBoardEdit = useMemo(() => route === '/storages/[path]/edit/[id]', [route]);
	const isStorageBoardDetail = useMemo(() => route === '/storages/[path]/[id]', [route]);
	const isNewStorage = useMemo(() => isStorageBoardWrite || isStorageBoardDetail || isStorageBoardEdit, [
		isStorageBoardWrite,
		isStorageBoardDetail,
		isStorageBoardEdit
	]);

	const onHandleSignInDialog = useCallback(() => dispatch(handleSignInDialog()), [dispatch]);
	const onDeleteSignOut = useCallback(() => dispatch(deleteSignOut()), [dispatch]);

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
		router
			.push(
				{
					pathname: '/'
				},
				'/'
			)
			.then();
	}, [router]);

	const onHandleDrawerMenu = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			const categoryId: string = event.currentTarget.getAttribute('data-category-id') || '';

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

			dispatch(handleDrawer());
		},
		[dispatch, router]
	);

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

	return {
		id,
		user,
		storage,
		pending,
		isBoardDetail,
		isNewStorage,
		isNotices,
		onHandleSignInDialog,
		onDeleteSignOut,
		onHandleStorageChip,
		onHandleChip,
		onHandleNoticeChip,
		onHandleLogo,
		onHandleDrawerMenu
	};
}
