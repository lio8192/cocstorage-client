import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import { deleteNoticeDetail } from 'modules/notices/detail';
import { RootState } from 'modules';

export default function useDetailContent() {
	const dispatch = useDispatch();
	const {
		user: { id, isAuthenticated }
	} = useSelector((state: RootState) => state.common);
	const noticeDetailState = useSelector((state: RootState) => state.noticeDetail);

	const onDeleteNoticeDetail = useCallback(
		() =>
			dispatch(
				deleteNoticeDetail({
					id: noticeDetailState.detail.id
				})
			),
		[dispatch, noticeDetailState.detail.id]
	);

	return {
		...noticeDetailState,
		id,
		isAuthenticated,
		onDeleteNoticeDetail
	};
}
