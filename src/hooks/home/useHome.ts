import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import { fetchMainContents } from 'modules/home';
import { RootState } from 'modules';

export default function useHome() {
	const dispatch = useDispatch();
	const homeState = useSelector((state: RootState) => state.home);

	const onFetchMainContents = useCallback(() => dispatch(fetchMainContents()), [dispatch]);

	return {
		...homeState,
		onFetchMainContents
	};
}
