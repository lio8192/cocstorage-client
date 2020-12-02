import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import { RootState } from 'modules';
import { handlePageScope, handleDrawer, handleSignInDialog } from 'modules/common';

export default function useBottomNavigation() {
	const dispatch = useDispatch();
	const router = useRouter();
	const commonState = useSelector((state: RootState) => state.common);
	const { route } = router;

	const isHome = useMemo(() => route === '/', [route]);
	const isBoard = useMemo(() => route === '/board/[id]', [route]);
	const isBoardDetail = useMemo(() => route === '/board/[id]/[detail]', [route]);
	const isNewNotices = useMemo(() => route === '/notices', [route]);
	const isNoticeWrite = useMemo(() => route === '/notices/write', [route]);
	const isNoticeEdit = useMemo(() => route === '/notices/edit/[id]', [route]);
	const isNoticeDetail = useMemo(() => route === '/notices/[id]', [route]);
	const isMyPage = useMemo(() => route === '/mypage', [route]);

	const isPreviousStorage = useMemo(() => isBoard || isBoardDetail, [isBoard, isBoardDetail]);
	const isNotices = useMemo(() => isNewNotices || isNoticeWrite || isNoticeDetail || isNoticeEdit, [
		isNewNotices,
		isNoticeWrite,
		isNoticeDetail,
		isNoticeEdit
	]);

	const bottomNavigationTabValue = useMemo(() => {
		if (isHome) {
			return 'home';
		}
		if (isPreviousStorage) {
			return 'storage';
		}
		if (isNotices) {
			return 'notice';
		}
		if (isMyPage) {
			return 'mypage';
		}
		return 'storage';
	}, [isHome, isPreviousStorage, isNotices, isMyPage]);

	const onHandlePageScope = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			const value: string = String(event.currentTarget.getAttribute('data-page-scope')) || 'storage';
			dispatch(handlePageScope(value));
			dispatch(handleDrawer());
		},
		[dispatch]
	);

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
				dispatch(handlePageScope(value));
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
		onChangeBottomNavigation,
		onHandlePageScope
	};
}
