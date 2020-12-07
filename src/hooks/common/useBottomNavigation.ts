import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import { handleSignInDialog } from 'modules/common';
import { clearBoardsRelatedState } from 'modules/board';
import { RootState } from 'modules';

export default function useBottomNavigation() {
	const dispatch = useDispatch();
	const router = useRouter();
	const commonState = useSelector((state: RootState) => state.common);
	const { route } = router;

	const isHome = useMemo(() => route === '/', [route]);
	const isBoard = useMemo(() => route === '/board', [route]);
	const isBoardList = useMemo(() => route === '/board/[id]', [route]);
	const isBoardDetail = useMemo(() => route === '/board/[id]/[detail]', [route]);
	const isNewNotices = useMemo(() => route === '/notices', [route]);
	const isNoticeWrite = useMemo(() => route === '/notices/write', [route]);
	const isNoticeEdit = useMemo(() => route === '/notices/edit/[id]', [route]);
	const isNoticeDetail = useMemo(() => route === '/notices/[id]', [route]);
	const isMyPage = useMemo(() => route === '/mypage', [route]);

	const isCollectStorage = useMemo(() => isBoard || isBoardList || isBoardDetail, [
		isBoard,
		isBoardList,
		isBoardDetail
	]);
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
		if (isCollectStorage) {
			return 'collect-storage';
		}
		if (isNotices) {
			return 'notice';
		}
		if (isMyPage) {
			return 'mypage';
		}
		return 'storage';
	}, [isHome, isCollectStorage, isNotices, isMyPage]);

	const onChangeBottomNavigation = useCallback(
		(event: React.ChangeEvent<{}>, value) => {
			dispatch(clearBoardsRelatedState());
			if (value === 'mypage') {
				if (commonState.user.isAuthenticated) {
					router.push('/mypage', '/mypage').then();
				} else {
					dispatch(handleSignInDialog());
				}
			} else if (value === 'storage') {
				router.push('/storages', '/storages').then();
			} else if (value === 'collect-storage') {
				router.push('/board', '/board').then();
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
