import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import {
	fetchFirstNotices, fetchNotices, handleFetchParams, clearNotices
} from 'modules/notices';
import { RootState } from 'modules';

export default function useNotices() {
	const dispatch = useDispatch();
	const {
		user: { isAuthenticated, role }
	} = useSelector((state: RootState) => state.common);
	const noticesState = useSelector((state: RootState) => state.notices);

	const onFetchNotices = useCallback(
		() => dispatch(fetchNotices(noticesState.fetchParams)),
		[dispatch, noticesState.fetchParams]
	);

	const onFetchFirstNotices = useCallback(
		() =>
			dispatch(
				fetchFirstNotices({
					per: 8,
					page: 1,
					orderBy: 'latest'
				})
			),
		[dispatch]
	);

	const onClickFetchNoticesMoreButton = useCallback(() => {
		window.localStorage.removeItem('lastNoticePage');
		dispatch(
			handleFetchParams({
				...noticesState.fetchParams,
				page: noticesState.fetchParams.page + 1
			})
		);
	}, [dispatch, noticesState.fetchParams]);

	const onClearNotices = useCallback(() => dispatch(clearNotices()), [dispatch]);

	return {
		...noticesState,
		isAuthenticated,
		role,
		onFetchFirstNotices,
		onFetchNotices,
		onClickFetchNoticesMoreButton,
		onClearNotices
	};
}
