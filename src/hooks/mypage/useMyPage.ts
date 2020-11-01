import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import { changeMyPageTab, clearPrivacy } from 'modules/mypage';
import { RootState } from 'modules';

export default function useMyPage() {
	const dispatch = useDispatch();
	const { user } = useSelector((state: RootState) => state.common);
	const myPageState = useSelector((state: RootState) => state.mypage);

	const onChangeMyPageTab = useCallback(
		(event: React.ChangeEvent<{}>, newValue: number) => dispatch(changeMyPageTab(newValue)),
		[dispatch]
	);

	const onClearPrivacy = useCallback(() => dispatch(clearPrivacy()), [dispatch]);

	return {
		...myPageState,
		user,
		onChangeMyPageTab,
		onClearPrivacy
	};
}
