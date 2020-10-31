import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// Modules
import { fetchNoticeEditDetail } from 'modules/notices';
import { RootState } from 'modules';

export default function useNoticeEdit() {
	const dispatch = useDispatch();
	const router = useRouter();
	const {
		user: { isAuthenticated, role }
	} = useSelector((state: RootState) => state.common);
	const noticesState = useSelector((state: RootState) => state.notices);

	const onFetchNoticeEditDetail = useCallback(() => dispatch(fetchNoticeEditDetail(Number(router.query.id || 0))), [
		dispatch,
		router
	]);

	return {
		...noticesState,
		isAuthenticated,
		role,
		onFetchNoticeEditDetail
	};
}
