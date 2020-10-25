import { createAction } from 'typesafe-actions';
import { HYDRATE } from 'next-redux-wrapper';
import {
	StorageBoardDetail,
	StorageBoardDetailComment,
	Pagination,
	StorageBoardDetailCommentsFetchParams,
	PutStorageBoardDetailRecommendPayload,
	FetchStorageBoardDetailCommentsPayload,
	PostStorageBoardDetailCommentPayload,
	PostNonMemberStorageBoardDetailCommentPayload,
	PostStorageBoardDetailReplyPayload,
	PostNonMemberStorageBoardDetailReplyPayload,
	DeleteStorageBoardDetailPayload,
	DeleteNonMemberStorageBoardDetailPayload,
	DeleteStorageBoardDetailCommentPayload,
	DeleteNonMemberStorageBoardDetailCommentPayload,
	DeleteStorageBoardDetailReplyPayload,
	DeleteNonMemberStorageBoardDetailReplyPayload
} from './types';

export const hydrate = createAction(HYDRATE)<any>();

export const FETCH_STORAGE_DETAIL_AND_STORAGE_BOARD_DETAIL =	'storages/board/detail/FETCH_STORAGE_DETAIL_AND_STORAGE_BOARD_DETAIL';
export const FETCH_STORAGE_DETAIL_AND_STORAGE_BOARD_DETAIL_SUCCEEDED =	'storages/board/detail/FETCH_STORAGE_DETAIL_AND_STORAGE_BOARD_DETAIL_SUCCEEDED';
export const FETCH_STORAGE_DETAIL_AND_STORAGE_BOARD_DETAIL_FAILED =	'storages/board/detail/FETCH_STORAGE_DETAIL_AND_STORAGE_BOARD_DETAIL_FAILED';

export const FETCH_STORAGE_BOARD_DETAIL = 'storages/board/detail/FETCH_STORAGE_BOARD_DETAIL';
export const FETCH_STORAGE_BOARD_DETAIL_SUCCEEDED = 'storages/board/detail/FETCH_STORAGE_BOARD_DETAIL_SUCCEEDED';
export const FETCH_STORAGE_BOARD_DETAIL_FAILED = 'storages/board/detail/FETCH_STORAGE_BOARD_DETAIL_FAILED';

export const PUT_STORAGE_BOARD_DETAIL_VIEW_COUNT = 'storages/board/detail/PUT_STORAGE_BOARD_DETAIL_VIEW_COUNT';
export const PUT_STORAGE_BOARD_DETAIL_VIEW_COUNT_SUCCEEDED =	'storages/board/detail/PUT_STORAGE_BOARD_DETAIL_VIEW_COUNT_SUCCEEDED';
export const PUT_STORAGE_BOARD_DETAIL_VIEW_COUNT_FAILED =	'storages/board/detail/PUT_STORAGE_BOARD_DETAIL_VIEW_COUNT_FAILED';

export const PUT_STORAGE_BOARD_DETAIL_RECOMMEND = 'storages/board/PUT_STORAGE_BOARD_DETAIL_RECOMMEND';
export const PUT_STORAGE_BOARD_DETAIL_RECOMMEND_SUCCEEDED =	'storages/board/PUT_STORAGE_BOARD_DETAIL_RECOMMEND_SUCCEEDED';
export const PUT_STORAGE_BOARD_DETAIL_RECOMMEND_FAILED = 'storages/board/PUT_STORAGE_BOARD_DETAIL_RECOMMEND_FAILED';

export const PUT_NON_MEMBER_STORAGE_BOARD_DETAIL_RECOMMEND =	'storages/board/PUT_NON_MEMBER_STORAGE_BOARD_DETAIL_RECOMMEND';
export const PUT_NON_MEMBER_STORAGE_BOARD_DETAIL_RECOMMEND_SUCCEEDED =	'storages/board/PUT_NON_MEMBER_STORAGE_BOARD_DETAIL_RECOMMEND_SUCCEEDED';
export const PUT_NON_MEMBER_STORAGE_BOARD_DETAIL_RECOMMEND_FAILED =	'storages/board/PUT_NON_MEMBER_STORAGE_BOARD_DETAIL_RECOMMEND_FAILED';

export const FETCH_STORAGE_BOARD_DETAIL_COMMENTS = 'storages/board/detail/FETCH_STORAGE_BOARD_DETAIL_COMMENTS';
export const FETCH_STORAGE_BOARD_DETAIL_COMMENTS_SUCCEEDED =	'storages/board/detail/FETCH_STORAGE_BOARD_DETAIL_COMMENTS_SUCCEEDED';
export const FETCH_STORAGE_BOARD_DETAIL_COMMENTS_FAILED =	'storages/board/detail/FETCH_STORAGE_BOARD_DETAIL_COMMENTS_FAILED';

export const POST_STORAGE_BOARD_DETAIL_COMMENT = 'storages/board/detail/POST_STORAGE_BOARD_DETAIL_COMMENT';
export const POST_STORAGE_BOARD_DETAIL_COMMENT_SUCCEEDED =	'storages/board/detail/POST_STORAGE_BOARD_DETAIL_COMMENT_SUCCEEDED';
export const POST_STORAGE_BOARD_DETAIL_COMMENT_FAILED =	'storages/board/detail/POST_STORAGE_BOARD_DETAIL_COMMENT_FAILED';

export const POST_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT =	'storages/board/detail/POST_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT';
export const POST_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT_SUCCEEDED =	'storages/board/detail/POST_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT_SUCCEEDED';
export const POST_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT_FAILED =	'storages/board/detail/POST_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT_FAILED';

export const CLOSE_STORAGE_BOARD_DETAIL_RECOMMEND_SNACKBAR =	'storages/board/detail/CLOSE_STORAGE_BOARD_DETAIL_RECOMMEND_SNACKBAR';
export const CLOSE_STORAGE_BOARD_DETAIL_RECOMMEND_ERROR_SNACKBAR =	'storages/board/detail/CLOSE_STORAGE_BOARD_DETAIL_RECOMMEND_ERROR_SNACKBAR';

export const HANDLE_STORAGE_BOARD_DETAIL_REPLY_WRITE_FROM =	'storages/board/detail/HANDLE_STORAGE_BOARD_DETAIL_REPLY_WRITE_FROM';

export const HANDLE_STORAGE_BOARD_DETAIL_COMMENTS_FETCH_PARAMS =	'storages/board/detail/HANDLE_STORAGE_BOARD_DETAIL_COMMENTS_FETCH_PARAMS';

export const POST_STORAGE_BOARD_DETAIL_REPLY = 'storages/board/detail/POST_STORAGE_BOARD_DETAIL_REPLY';
export const POST_STORAGE_BOARD_DETAIL_REPLY_SUCCEEDED =	'storages/board/detail/POST_STORAGE_BOARD_DETAIL_REPLY_SUCCEEDED';
export const POST_STORAGE_BOARD_DETAIL_REPLY_FAILED = 'storages/board/detail/POST_STORAGE_BOARD_DETAIL_REPLY_FAILED';

export const POST_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY =	'storages/board/detail/POST_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY';
export const POST_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY_SUCCEEDED =	'storages/board/detail/POST_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY_SUCCEEDED';
export const POST_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY_FAILED =	'storages/board/detail/POST_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY_FAILED';

export const HANDLE_STORAGE_BOARD_DETAIL_DELETE_AUTH_DIALOG =	'storages/board/detail/HANDLE_STORAGE_BOARD_DETAIL_DELETE_AUTH_DIALOG';

export const FETCH_STORAGE_BOARD_EDIT_DETAIL = 'storages/board/detail/FETCH_STORAGE_BOARD_EDIT_DETAIL';
export const FETCH_STORAGE_BOARD_EDIT_DETAIL_SUCCEEDED =	'storages/board/detail/FETCH_STORAGE_BOARD_EDIT_DETAIL_SUCCEEDED';
export const FETCH_STORAGE_BOARD_EDIT_DETAIL_FAILED = 'storages/board/detail/FETCH_STORAGE_BOARD_EDIT_DETAIL_FAILED';

export const FETCH_NON_MEMBER_STORAGE_BOARD_EDIT_DETAIL =	'storages/board/detail/FETCH_NON_MEMBER_STORAGE_BOARD_EDIT_DETAIL';
export const FETCH_NON_MEMBER_STORAGE_BOARD_EDIT_DETAIL_SUCCEEDED =	'storages/board/detail/FETCH_NON_MEMBER_STORAGE_BOARD_EDIT_DETAIL_SUCCEEDED';
export const FETCH_NON_MEMBER_STORAGE_BOARD_EDIT_DETAIL_FAILED =	'storages/board/detail/FETCH_NON_MEMBER_STORAGE_BOARD_EDIT_DETAIL_FAILED';

export const DELETE_STORAGE_BOARD_DETAIL = 'storages/board/detail/DELETE_STORAGE_BOARD_DETAIL';
export const DELETE_STORAGE_BOARD_DETAIL_SUCCEEDED = 'storages/board/detail/DELETE_STORAGE_BOARD_DETAIL_SUCCEEDED';
export const DELETE_STORAGE_BOARD_DETAIL_FAILED = 'storages/board/detail/DELETE_STORAGE_BOARD_DETAIL_FAILED';

export const DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL = 'storages/board/detail/DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL';
export const DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_SUCCEEDED =	'storages/board/detail/DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_SUCCEEDED';
export const DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_FAILED =	'storages/board/detail/DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_FAILED';

export const DELETE_STORAGE_BOARD_DETAIL_COMMENT = 'storages/board/detail/DELETE_STORAGE_BOARD_DETAIL_COMMENT';
export const DELETE_STORAGE_BOARD_DETAIL_COMMENT_SUCCEEDED =	'storages/board/detail/DELETE_STORAGE_BOARD_DETAIL_COMMENT_SUCCEEDED';
export const DELETE_STORAGE_BOARD_DETAIL_COMMENT_FAILED =	'storages/board/detail/DELETE_STORAGE_BOARD_DETAIL_COMMENT_FAILED';

export const DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT =	'storages/board/detail/DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT';
export const DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT_SUCCEEDED =	'storages/board/detail/DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT_SUCCEEDED';
export const DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT_FAILED =	'storages/board/detail/DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT_FAILED';

export const DELETE_STORAGE_BOARD_DETAIL_REPLY = 'storages/board/detail/DELETE_STORAGE_BOARD_DETAIL_REPLY';
export const DELETE_STORAGE_BOARD_DETAIL_REPLY_SUCCEEDED =	'storages/board/detail/DELETE_STORAGE_BOARD_DETAIL_REPLY_SUCCEEDED';
export const DELETE_STORAGE_BOARD_DETAIL_REPLY_FAILED =	'storages/board/detail/DELETE_STORAGE_BOARD_DETAIL_REPLY_FAILED';

export const DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY =	'storages/board/detail/DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY';
export const DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY_SUCCEEDED =	'storages/board/detail/DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY_SUCCEEDED';
export const DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY_FAILED =	'storages/board/detail/DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY_FAILED';

export const fetchStorageDetailAndStorageBoardDetail = createAction(FETCH_STORAGE_DETAIL_AND_STORAGE_BOARD_DETAIL)<{
	storageId: number | string;
	id: number;
}>();
export const fetchStorageDetailAndStorageBoardDetailSucceeded = createAction(
	FETCH_STORAGE_DETAIL_AND_STORAGE_BOARD_DETAIL_SUCCEEDED
)<StorageBoardDetail>();
export const fetchStorageDetailAndStorageBoardDetailFailed = createAction(
	FETCH_STORAGE_DETAIL_AND_STORAGE_BOARD_DETAIL_FAILED
)();

export const fetchStorageBoardDetail = createAction(FETCH_STORAGE_BOARD_DETAIL)<{ storageId: number; id: number }>();
export const fetchStorageBoardDetailSucceeded = createAction(FETCH_STORAGE_BOARD_DETAIL_SUCCEEDED)<
	StorageBoardDetail
>();
export const fetchStorageBoardDetailFailed = createAction(FETCH_STORAGE_BOARD_DETAIL_FAILED)();

export const putStorageBoardDetailViewCount = createAction(PUT_STORAGE_BOARD_DETAIL_VIEW_COUNT)<{
	storageId: number;
	id: number;
}>();
export const putStorageBoardDetailViewCountSucceeded = createAction(PUT_STORAGE_BOARD_DETAIL_VIEW_COUNT_SUCCEEDED)();
export const putStorageBoardDetailViewCountFailed = createAction(PUT_STORAGE_BOARD_DETAIL_VIEW_COUNT_FAILED)();

export const putStorageBoardDetailRecommend = createAction(PUT_STORAGE_BOARD_DETAIL_RECOMMEND)<
	PutStorageBoardDetailRecommendPayload
>();
export const putStorageBoardDetailRecommendSucceeded = createAction(PUT_STORAGE_BOARD_DETAIL_RECOMMEND_SUCCEEDED)<{
	message: string;
	thumbUp: number;
	thumbDown: number;
}>();
export const putStorageBoardDetailRecommendFailed = createAction(PUT_STORAGE_BOARD_DETAIL_RECOMMEND_FAILED)<string>();

export const putNonMemberStorageBoardDetailRecommend = createAction(PUT_NON_MEMBER_STORAGE_BOARD_DETAIL_RECOMMEND)<
	PutStorageBoardDetailRecommendPayload
>();
export const putNonMemberStorageBoardDetailRecommendSucceeded = createAction(
	PUT_NON_MEMBER_STORAGE_BOARD_DETAIL_RECOMMEND_SUCCEEDED
)<{
	message: string;
	thumbUp: number;
	thumbDown: number;
}>();
export const putNonMemberStorageBoardDetailRecommendFailed = createAction(
	PUT_NON_MEMBER_STORAGE_BOARD_DETAIL_RECOMMEND_FAILED
)<string>();

export const closeStorageBoardDetailRecommendSnackbar = createAction(CLOSE_STORAGE_BOARD_DETAIL_RECOMMEND_SNACKBAR)();
export const closeStorageBoardDetailRecommendErrorSnackbar = createAction(
	CLOSE_STORAGE_BOARD_DETAIL_RECOMMEND_ERROR_SNACKBAR
)();

export const fetchStorageBoardDetailComments = createAction(FETCH_STORAGE_BOARD_DETAIL_COMMENTS)<
	FetchStorageBoardDetailCommentsPayload
>();
export const fetchStorageBoardDetailCommentsSucceeded = createAction(FETCH_STORAGE_BOARD_DETAIL_COMMENTS_SUCCEEDED)<{
	data: StorageBoardDetailComment[];
	pagination: Pagination;
}>();
export const fetchStorageBoardDetailCommentsFailed = createAction(FETCH_STORAGE_BOARD_DETAIL_COMMENTS_FAILED)();

export const postStorageBoardDetailComment = createAction(POST_STORAGE_BOARD_DETAIL_COMMENT)<
	PostStorageBoardDetailCommentPayload
>();
export const postStorageBoardDetailCommentSucceeded = createAction(POST_STORAGE_BOARD_DETAIL_COMMENT_SUCCEEDED)<
	number
>();
export const postStorageBoardDetailCommentFailed = createAction(POST_STORAGE_BOARD_DETAIL_COMMENT_FAILED)();

export const postNonMemberStorageBoardDetailComment = createAction(POST_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT)<
	PostNonMemberStorageBoardDetailCommentPayload
>();
export const postNonMemberStorageBoardDetailCommentSucceeded = createAction(
	POST_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT_SUCCEEDED
)<number>();
export const postNonMemberStorageBoardDetailCommentFailed = createAction(
	POST_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT_FAILED
)();

export const handleStorageBoardDetailReplyWriteForm = createAction(HANDLE_STORAGE_BOARD_DETAIL_REPLY_WRITE_FROM)<
	number
>();

export const handleStorageBoardDetailCommentsFetchParams = createAction(
	HANDLE_STORAGE_BOARD_DETAIL_COMMENTS_FETCH_PARAMS
)<StorageBoardDetailCommentsFetchParams>();

export const postStorageBoardDetailReply = createAction(POST_STORAGE_BOARD_DETAIL_REPLY)<
	PostStorageBoardDetailReplyPayload
>();
export const postStorageBoardDetailReplySucceeded = createAction(POST_STORAGE_BOARD_DETAIL_REPLY_SUCCEEDED)();
export const postStorageBoardDetailReplyFailed = createAction(POST_STORAGE_BOARD_DETAIL_REPLY_FAILED)();

export const postNonMemberStorageBoardDetailReply = createAction(POST_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY)<
	PostNonMemberStorageBoardDetailReplyPayload
>();
export const postNonMemberStorageBoardDetailReplySucceeded = createAction(
	POST_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY_SUCCEEDED
)();
export const postNonMemberStorageBoardDetailReplyFailed = createAction(
	POST_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY_FAILED
)();

export const handleStorageBoardDetailDeleteAuthDialog = createAction(HANDLE_STORAGE_BOARD_DETAIL_DELETE_AUTH_DIALOG)<{
	dataId: number;
	subTitle: string;
	type: string;
}>();

export const deleteStorageBoardDetail = createAction(DELETE_STORAGE_BOARD_DETAIL)<DeleteStorageBoardDetailPayload>();
export const deleteStorageBoardDetailSucceeded = createAction(DELETE_STORAGE_BOARD_DETAIL_SUCCEEDED)();
export const deleteStorageBoardDetailFailed = createAction(DELETE_STORAGE_BOARD_DETAIL_FAILED)();

export const deleteNonMemberStorageBoardDetail = createAction(DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL)<
	DeleteNonMemberStorageBoardDetailPayload
>();
export const deleteNonMemberStorageBoardDetailSucceeded = createAction(
	DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_SUCCEEDED
)();
export const deleteNonMemberStorageBoardDetailFailed = createAction(DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_FAILED)();

export const deleteStorageBoardDetailComment = createAction(DELETE_STORAGE_BOARD_DETAIL_COMMENT)<
	DeleteStorageBoardDetailCommentPayload
>();
export const deleteStorageBoardDetailCommentSucceeded = createAction(DELETE_STORAGE_BOARD_DETAIL_COMMENT_SUCCEEDED)();
export const deleteStorageBoardDetailCommentFailed = createAction(DELETE_STORAGE_BOARD_DETAIL_COMMENT_FAILED)();

export const deleteNonMemberStorageBoardDetailComment = createAction(DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT)<
	DeleteNonMemberStorageBoardDetailCommentPayload
>();
export const deleteNonMemberStorageBoardDetailCommentSucceeded = createAction(
	DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT_SUCCEEDED
)();
export const deleteNonMemberStorageBoardDetailCommentFailed = createAction(
	DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT_FAILED
)();

export const deleteStorageBoardDetailReply = createAction(DELETE_STORAGE_BOARD_DETAIL_REPLY)<
	DeleteStorageBoardDetailReplyPayload
>();
export const deleteStorageBoardDetailReplySucceeded = createAction(DELETE_STORAGE_BOARD_DETAIL_REPLY_SUCCEEDED)();
export const deleteStorageBoardDetailReplyFailed = createAction(DELETE_STORAGE_BOARD_DETAIL_REPLY_FAILED)();

export const deleteNonMemberStorageBoardDetailReply = createAction(DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY)<
	DeleteNonMemberStorageBoardDetailReplyPayload
>();
export const deleteNonMemberStorageBoardDetailReplySucceeded = createAction(
	DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY_SUCCEEDED
)();
export const deleteNonMemberStorageBoardDetailReplyFailed = createAction(
	DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY_FAILED
)();
