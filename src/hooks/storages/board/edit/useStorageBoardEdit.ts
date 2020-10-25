import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

// Modules
import { fetchStorageBoardEditDetail, clearNonMemberStorageBoardEditAuthenticated } from 'modules/storages/board';
import { RootState } from 'modules';

export default function useStorageBoardEdit() {
	const dispatch = useDispatch();
	const {
		user: { isAuthenticated }
	} = useSelector((state: RootState) => state.common);
	const storageBoardState = useSelector((state: RootState) => state.storageBoard);
	const { detail } = useSelector((state: RootState) => state.storageBoardDetail);

	const onFetchStorageBoardEditDetail = useCallback(
		() =>
			dispatch(
				fetchStorageBoardEditDetail({
					storageId: storageBoardState.storage.id,
					id: Number(Router.query.id)
				})
			),
		[dispatch, storageBoardState.storage.id]
	);

	const onClearNonMemberStorageBoardAuthenticated = useCallback(
		() => dispatch(clearNonMemberStorageBoardEditAuthenticated()),
		[dispatch]
	);

	return {
		...storageBoardState,
		detail,
		isAuthenticated,
		onFetchStorageBoardEditDetail,
		onClearNonMemberStorageBoardAuthenticated
	};
}
