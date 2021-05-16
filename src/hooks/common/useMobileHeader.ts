import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// Modules
import { handleSignInDialog, deleteSignOut, handlePaletteType } from 'modules/common';
import { RootState } from 'modules';

export default function useMobileHeader() {
	const dispatch = useDispatch();
	const router = useRouter();
	const {
		route,
		query: { id }
	} = router;
	const { user, paletteType } = useSelector((state: RootState) => state.common);
	const { storage } = useSelector((state: RootState) => state.storageBoard);
	const { pending } = useSelector((state: RootState) => state.storageBoardDetail);

	const isNoticeWrite = useMemo(() => route === '/notices/write', [route]);
	const isNoticeEdit = useMemo(() => route === '/notices/edit/[id]', [route]);
	const isNoticeDetail = useMemo(() => route === '/notices/[id]', [route]);
	const isNotices = useMemo(
		() => isNoticeWrite || isNoticeDetail || isNoticeEdit,
		[isNoticeWrite, isNoticeDetail, isNoticeEdit]
	);

	const isStorageBoardWrite = useMemo(() => route === '/storages/[path]/write', [route]);
	const isStorageBoardEdit = useMemo(() => route === '/storages/[path]/edit/[id]', [route]);
	const isStorageBoardDetail = useMemo(() => route === '/storages/[path]/[id]', [route]);
	const isNewStorage = useMemo(
		() => isStorageBoardWrite || isStorageBoardDetail || isStorageBoardEdit,
		[isStorageBoardWrite, isStorageBoardDetail, isStorageBoardEdit]
	);

	const onHandleSignInDialog = useCallback(() => dispatch(handleSignInDialog()), [dispatch]);
	const onDeleteSignOut = useCallback(() => dispatch(deleteSignOut()), [dispatch]);

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

	const onHandlePaletteType = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			const type = event.currentTarget.getAttribute('data-palette-type') || 'light';

			window.localStorage.setItem('coc-palette-type', type);

			dispatch(handlePaletteType(type));
		},
		[dispatch]
	);

	return {
		paletteType,
		id,
		user,
		storage,
		pending,
		isNewStorage,
		isNotices,
		onHandleSignInDialog,
		onDeleteSignOut,
		onHandleStorageChip,
		onHandleNoticeChip,
		onHandleLogo,
		onHandlePaletteType
	};
}
