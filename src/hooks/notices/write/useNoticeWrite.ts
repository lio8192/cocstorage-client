import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import { postNoticeDraft } from 'modules/notices';
import { RootState } from 'modules';

export default function useNoticeWrite() {
	const dispatch = useDispatch();
	const {
		user: { isAuthenticated, role }
	} = useSelector((state: RootState) => state.common);
	const noticesState = useSelector((state: RootState) => state.notices);

	const onPostNoticeDraft = useCallback(() => dispatch(postNoticeDraft()), [dispatch]);

	return {
		...noticesState,
		isAuthenticated,
		role,
		onPostNoticeDraft
	};
}
