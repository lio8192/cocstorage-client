import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import { postStorageBoardDraft, postNonMemberStorageBoardDraft } from 'modules/storages/board';
import { RootState } from 'modules';

export default function useStorageBoardWrite() {
	const dispatch = useDispatch();
	const {
		user: { isAuthenticated }
	} = useSelector((state: RootState) => state.common);
	const storageBoardState = useSelector((state: RootState) => state.storageBoard);

	const onPostStorageBoardDraft = useCallback(
		() => dispatch(postStorageBoardDraft(storageBoardState.storage.id)),
		[dispatch, storageBoardState.storage.id]
	);
	const onPostNonMemberStorageBoardDraft = useCallback(
		() => dispatch(postNonMemberStorageBoardDraft(storageBoardState.storage.id)),
		[dispatch, storageBoardState.storage.id]
	);

	return {
		...storageBoardState,
		isAuthenticated,
		onPostStorageBoardDraft,
		onPostNonMemberStorageBoardDraft
	};
}
