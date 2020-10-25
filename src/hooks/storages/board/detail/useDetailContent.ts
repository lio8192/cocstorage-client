import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import {
	putStorageBoardDetailRecommend,
	putNonMemberStorageBoardDetailRecommend,
	handleStorageBoardDetailDeleteAuthDialog,
	deleteStorageBoardDetail
} from 'modules/storages/board/detail';
import { RootState } from 'modules';

export default function useDetailContent() {
	const dispatch = useDispatch();
	const {
		user: { id, isAuthenticated }
	} = useSelector((state: RootState) => state.common);
	const storageBoardDetailState = useSelector((state: RootState) => state.storageBoardDetail);

	const onPutStorageBoardDetailRecommend = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			const type = Number(event.currentTarget.getAttribute('data-thumbs-type') || 0);

			dispatch(
				putStorageBoardDetailRecommend({
					storageId: storageBoardDetailState.detail.storage.id,
					id: storageBoardDetailState.detail.id,
					type
				})
			);
		},
		[dispatch, storageBoardDetailState.detail.storage.id, storageBoardDetailState.detail.id]
	);

	const onPutNonMemberStorageBoardDetailRecommend = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			const type = Number(event.currentTarget.getAttribute('data-thumbs-type') || 0);

			dispatch(
				putNonMemberStorageBoardDetailRecommend({
					storageId: storageBoardDetailState.detail.storage.id,
					id: storageBoardDetailState.detail.id,
					type
				})
			);
		},
		[dispatch, storageBoardDetailState.detail.storage.id, storageBoardDetailState.detail.id]
	);

	const onHandleDeleteAuthDialog = useCallback(
		(event: React.MouseEvent<HTMLLIElement>) => {
			const dataId = Number(event.currentTarget.getAttribute('data-id') || 0);
			const subTitle = String(event.currentTarget.getAttribute('data-sub-title') || '');
			const type = String(event.currentTarget.getAttribute('data-type') || '');

			dispatch(
				handleStorageBoardDetailDeleteAuthDialog({
					dataId,
					subTitle,
					type
				})
			);
		},
		[dispatch]
	);

	const onDeleteStorageBoardDetail = useCallback(
		() =>
			dispatch(
				deleteStorageBoardDetail({
					storageId: storageBoardDetailState.detail.storage.id,
					id: storageBoardDetailState.detail.id
				})
			),
		[dispatch, storageBoardDetailState.detail.id, storageBoardDetailState.detail.storage.id]
	);

	return {
		...storageBoardDetailState,
		id,
		isAuthenticated,
		onPutStorageBoardDetailRecommend,
		onPutNonMemberStorageBoardDetailRecommend,
		onHandleDeleteAuthDialog,
		onDeleteStorageBoardDetail
	};
}
