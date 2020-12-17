import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import {
	fetchNotices,
	fetchStorages,
	fetchLatestStorageBoards,
	fetchPopularStorageBoards,
	fetchMainContents
} from 'modules/home';
import { RootState } from 'modules';

export default function useHome() {
	const dispatch = useDispatch();
	const homeState = useSelector((state: RootState) => state.home);

	const onFetchPackage = useCallback(() => {
		dispatch(fetchLatestStorageBoards());
		dispatch(fetchPopularStorageBoards());
		dispatch(fetchNotices());
		dispatch(fetchStorages());
	}, [dispatch]);
	const onFetchMainContents = useCallback(() => dispatch(fetchMainContents()), [dispatch]);

	return {
		...homeState,
		onFetchPackage,
		onFetchMainContents
	};
}
