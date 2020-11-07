import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import { RootState } from 'modules';
import { handlePageScope, handleDrawer, handleSignInDialog } from 'modules/common';

export default function useBottomNavigation() {
	const dispatch = useDispatch();
	const router = useRouter();
	const commonState = useSelector((state: RootState) => state.common);

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
			if (value === 'storage-mypage') {
				if (commonState.user.isAuthenticated) {
					router.push('/mypage', '/mypage').then();
				} else {
					dispatch(handleSignInDialog());
				}
			} else {
				dispatch(handleDrawer());
			}
			dispatch(handlePageScope(value));
		},
		[dispatch, router, commonState.user.isAuthenticated]
	);

	return {
		...commonState,
		onChangeBottomNavigation,
		onHandlePageScope
	};
}
