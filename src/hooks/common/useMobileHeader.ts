import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// Modules
import { handleSignInDialog, deleteSignOut } from 'modules/common';
import { clearBoardsRelatedState } from 'modules/board';
import { RootState } from 'modules';

export default function useMobileHeader() {
	const dispatch = useDispatch();
	const router = useRouter();
	const {
		route,
		query: { id }
	} = router;
	const { pageScope, user } = useSelector((state: RootState) => state.common);
	const { storage } = useSelector((state: RootState) => state.storageBoard);

	const [menuListState, setMenuListState] = useState<boolean>(false);

	const isBoardDetail = useMemo(() => route === '/board/[id]/[detail]', [route]);
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

	const onHandleMenuList = useCallback(() => setMenuListState(!menuListState), [menuListState]);

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

		router.push({
			pathname: '/'
		});
	}, [dispatch, router]);

	const onHandleDrawer = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			const categoryId: string = event.currentTarget.getAttribute('data-category-id') || '';
			dispatch(clearBoardsRelatedState());

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

			setMenuListState(!menuListState);
		},
		[dispatch, router, menuListState]
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

	return {
		pageScope,
		id,
		user,
		storage,
		menuListState,
		isBoardDetail,
		isNewStorage,
		onHandleSignInDialog,
		onDeleteSignOut,
		onHandleMenuList,
		onHandleStorageChip,
		onHandleChip,
		onHandleLogo,
		onHandleDrawer
	};
}
