import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import { handleSignInDialog } from 'modules/common';
import { RootState } from 'modules';

export default function useBottomNavigation() {
	const dispatch = useDispatch();
	const router = useRouter();
	const commonState = useSelector((state: RootState) => state.common);
	const { route } = router;

	const isHome = useMemo(() => route === '/', [route]);
	const isStorages = useMemo(() => route === '/storages', [route]);
	const isStorageBoards = useMemo(() => route === '/storages/[path]', [route]);
	const isStorageBoardDetail = useMemo(() => route === '/storages/[path]/[id]', [route]);
	const isStorageBoardWrite = useMemo(() => route === '/storages/[path]/write', [route]);
	const isStorageBoardEdit = useMemo(() => route === '/storages/[path]/edit/[id]', [route]);
	const isNewNotices = useMemo(() => route === '/notices', [route]);
	const isNoticeWrite = useMemo(() => route === '/notices/write', [route]);
	const isNoticeEdit = useMemo(() => route === '/notices/edit/[id]', [route]);
	const isNoticeDetail = useMemo(() => route === '/notices/[id]', [route]);
	const isMyPage = useMemo(() => route === '/mypage', [route]);

	const isNewStorages = useMemo(
		() => isStorages || isStorageBoards || isStorageBoardDetail || isStorageBoardWrite || isStorageBoardEdit,
		[isStorages, isStorageBoards, isStorageBoardDetail, isStorageBoardWrite, isStorageBoardEdit]
	);
	const isNotices = useMemo(
		() => isNewNotices || isNoticeWrite || isNoticeDetail || isNoticeEdit,
		[isNewNotices, isNoticeWrite, isNoticeDetail, isNoticeEdit]
	);

	const bottomNavigationTabValue = useMemo(() => {
		if (isHome) {
			return 'home';
		}
		if (isNewStorages) {
			return 'storage';
		}
		if (isNotices) {
			return 'notice';
		}
		if (isMyPage) {
			return 'mypage';
		}
		return '';
	}, [isHome, isNewStorages, isNotices, isMyPage]);

	const onChangeBottomNavigation = useCallback(
		(event: React.ChangeEvent<{}>, value) => {
			if (value === 'mypage') {
				if (commonState.user.isAuthenticated) {
					router.push('/mypage', '/mypage').then();
				} else {
					dispatch(handleSignInDialog());
				}
			} else if (value === 'storage') {
				router.push('/storages', '/storages').then();
			} else if (value === 'notice') {
				router.push('/notices', '/notices').then();
			} else if (value === 'home') {
				router.push('/', '/').then();
			}
		},
		[dispatch, router, commonState.user.isAuthenticated]
	);

	return {
		...commonState,
		bottomNavigationTabValue,
		onChangeBottomNavigation
	};
}
