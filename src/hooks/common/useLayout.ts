import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import { handleNotificationModal } from 'modules/common';
import { RootState } from 'modules';

export default function useLayout() {
	const dispatch = useDispatch();
	const commonState = useSelector((state: RootState) => state.common);

	const onCloseNotificationModal = useCallback(
		() =>
			dispatch(
				handleNotificationModal({
					...commonState.notification,
					open: false
				})
			),
		[dispatch, commonState.notification]
	);

	return {
		...commonState,
		onCloseNotificationModal
	};
}
