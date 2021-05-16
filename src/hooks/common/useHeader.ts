import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// Modules
import { handleSignInDialog, deleteSignOut, handlePaletteType } from 'modules/common';
import { RootState } from 'modules';

export default function useHeader() {
	const dispatch = useDispatch();
	const { paletteType, user } = useSelector((state: RootState) => state.common);
	const { storage } = useSelector((state: RootState) => state.storageBoard);
	const router = useRouter();
	const {
		route,
		pathname,
		query: { id }
	} = router;

	const activatedTab = useMemo(() => {
		if (pathname.indexOf('/storages') !== -1) {
			return '/storages';
		}
		if (pathname.indexOf('/board') !== -1) {
			return '/board';
		}
		return pathname;
	}, [pathname]);
	const isHome = useMemo(() => route === '/', [route]);
	const isNewStorages = useMemo(() => route === '/storages', [route]);
	const isStorageBoard = useMemo(() => route === '/storages/[path]', [route]);
	const isStorageBoardWrite = useMemo(() => route === '/storages/[path]/write', [route]);
	const isStorageBoardEdit = useMemo(() => route === '/storages/[path]/edit/[id]', [route]);
	const isStorageBoardDetail = useMemo(() => route === '/storages/[path]/[id]', [route]);
	const isNewNotices = useMemo(() => route === '/notices', [route]);
	const isNoticeWrite = useMemo(() => route === '/notices/write', [route]);
	const isNoticeEdit = useMemo(() => route === '/notices/edit/[id]', [route]);
	const isNoticeDetail = useMemo(() => route === '/notices/[id]', [route]);
	const isNotices = useMemo(
		() => isNoticeWrite || isNoticeDetail || isNoticeEdit,
		[isNoticeWrite, isNoticeDetail, isNoticeEdit]
	);
	const openTab = useMemo(
		() => isHome || isNewStorages || isStorageBoard || isNewNotices,
		[isHome, isNewStorages, isStorageBoard, isNewNotices]
	);
	const openNavigationChip = useMemo(
		() =>
			isStorageBoardWrite
			|| isStorageBoardDetail
			|| isStorageBoardEdit
			|| isNoticeWrite
			|| isNoticeEdit
			|| isNoticeDetail,
		[isStorageBoardWrite, isStorageBoardDetail, isStorageBoardEdit, isNoticeWrite, isNoticeDetail, isNoticeEdit]
	);

	const isNewStorage = useMemo(
		() => isStorageBoardWrite || isStorageBoard || isStorageBoardDetail || isStorageBoardEdit,
		[isStorageBoardWrite, isStorageBoard, isStorageBoardDetail, isStorageBoardEdit]
	);

	const onHandleTabChange = useCallback(
		(event: React.ChangeEvent<{}>, newValue: string) => {
			const isIndexRoute: boolean = newValue === '/' && true;

			if (isIndexRoute) {
				router
					.push(
						{
							pathname: '/'
						},
						'/'
					)
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
		},
		[router]
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

	const onHandleLogo = useCallback(() => {
		router
			.push({
				pathname: '/'
			})
			.then();
	}, [router]);

	const onHandleSignInDialog = useCallback(() => dispatch(handleSignInDialog()), [dispatch]);

	const onDeleteSignOut = useCallback(() => dispatch(deleteSignOut()), [dispatch]);

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
		activatedTab,
		openNavigationChip,
		openTab,
		isNewStorage,
		isNotices,
		onHandleTabChange,
		onHandleLogo,
		onHandleStorageChip,
		onHandleNoticeChip,
		onHandleSignInDialog,
		onDeleteSignOut,
		onHandlePaletteType
	};
}
