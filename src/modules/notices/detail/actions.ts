import { createAction } from 'typesafe-actions';
import { HYDRATE } from 'next-redux-wrapper';
import {
	NoticeDetail,
	NoticeDetailComment,
	Pagination,
	FetchNoticeDetailCommentsPayload,
	PostNoticeDetailCommentPayload,
	PostNonMemberNoticeDetailCommentPayload,
	NoticeDetailCommentsFetchParams,
	PostNoticeDetailReplyPayload,
	PostNonMemberNoticeDetailReplyPayload,
	DeleteNoticeDetailPayload,
	DeleteNoticeDetailCommentPayload,
	DeleteNonMemberNoticeDetailCommentPayload,
	DeleteNoticeDetailReplyPayload,
	DeleteNonMemberNoticeDetailReplyPayload
} from './types';

export const hydrate = createAction(HYDRATE)<any>();

export const FETCH_NOTICE_DETAIL = 'notices/detail/FETCH_NOTICE_DETAIL';
export const FETCH_NOTICE_DETAIL_SUCCEEDED = 'notices/detail/FETCH_NOTICE_DETAIL_SUCCEEDED';
export const FETCH_NOTICE_DETAIL_FAILED = 'notices/detail/FETCH_NOTICE_DETAIL_FAILED';

export const PUT_NOTICE_DETAIL_VIEW_COUNT = 'notices/detail/PUT_NOTICE_DETAIL_VIEW_COUNT';
export const PUT_NOTICE_DETAIL_VIEW_COUNT_SUCCEEDED = 'notices/detail/PUT_NOTICE_DETAIL_VIEW_COUNT_SUCCEEDED';
export const PUT_NOTICE_DETAIL_VIEW_COUNT_FAILED = 'notices/detail/PUT_NOTICE_DETAIL_VIEW_COUNT_FAILED';

export const FETCH_NOTICE_DETAIL_COMMENTS = 'notices/detail/FETCH_NOTICE_DETAIL_COMMENTS';
export const FETCH_NOTICE_DETAIL_COMMENTS_SUCCEEDED = 'notices/detail/FETCH_NOTICE_DETAIL_COMMENTS_SUCCEEDED';
export const FETCH_NOTICE_DETAIL_COMMENTS_FAILED = 'notices/detail/FETCH_NOTICE_DETAIL_COMMENTS_FAILED';

export const POST_NOTICE_DETAIL_COMMENT = 'notices/detail/POST_NOTICE_DETAIL_COMMENT';
export const POST_NOTICE_DETAIL_COMMENT_SUCCEEDED = 'notices/detail/POST_NOTICE_DETAIL_COMMENT_SUCCEEDED';
export const POST_NOTICE_DETAIL_COMMENT_FAILED = 'notices/detail/POST_NOTICE_DETAIL_COMMENT_FAILED';

export const POST_NON_MEMBER_NOTICE_DETAIL_COMMENT = 'notices/detail/POST_NON_MEMBER_NOTICE_DETAIL_COMMENT';
export const POST_NON_MEMBER_NOTICE_DETAIL_COMMENT_SUCCEEDED =	'notices/detail/POST_NON_MEMBER_NOTICE_DETAIL_COMMENT_SUCCEEDED';
export const POST_NON_MEMBER_NOTICE_DETAIL_COMMENT_FAILED =	'notices/detail/POST_NON_MEMBER_NOTICE_DETAIL_COMMENT_FAILED';

export const HANDLE_NOTICE_DETAIL_REPLY_WRITE_FROM = 'notices/detail/HANDLE_NOTICE_DETAIL_REPLY_WRITE_FROM';

export const HANDLE_NOTICE_DETAIL_COMMENTS_FETCH_PARAMS = 'notices/detail/HANDLE_NOTICE_DETAIL_COMMENTS_FETCH_PARAMS';

export const POST_NOTICE_DETAIL_REPLY = 'notices/detail/POST_NOTICE_DETAIL_REPLY';
export const POST_NOTICE_DETAIL_REPLY_SUCCEEDED = 'notices/detail/POST_NOTICE_DETAIL_REPLY_SUCCEEDED';
export const POST_NOTICE_DETAIL_REPLY_FAILED = 'notices/detail/POST_NOTICE_DETAIL_REPLY_FAILED';

export const POST_NON_MEMBER_NOTICE_DETAIL_REPLY = 'notices/detail/POST_NON_MEMBER_NOTICE_DETAIL_REPLY';
export const POST_NON_MEMBER_NOTICE_DETAIL_REPLY_SUCCEEDED =	'notices/detail/POST_NON_MEMBER_NOTICE_DETAIL_REPLY_SUCCEEDED';
export const POST_NON_MEMBER_NOTICE_DETAIL_REPLY_FAILED = 'notices/detail/POST_NON_MEMBER_NOTICE_DETAIL_REPLY_FAILED';

export const HANDLE_NOTICE_DETAIL_DELETE_AUTH_DIALOG = 'notices/detail/HANDLE_NOTICE_DETAIL_DELETE_AUTH_DIALOG';

export const DELETE_NOTICE_DETAIL = 'notices/detail/DELETE_NOTICE_DETAIL';
export const DELETE_NOTICE_DETAIL_SUCCEEDED = 'notices/detail/DELETE_NOTICE_DETAIL_SUCCEEDED';
export const DELETE_NOTICE_DETAIL_FAILED = 'notices/detail/DELETE_NOTICE_DETAIL_FAILED';

export const DELETE_NOTICE_DETAIL_COMMENT = 'notices/detail/DELETE_NOTICE_DETAIL_COMMENT';
export const DELETE_NOTICE_DETAIL_COMMENT_SUCCEEDED = 'notices/detail/DELETE_NOTICE_DETAIL_COMMENT_SUCCEEDED';
export const DELETE_NOTICE_DETAIL_COMMENT_FAILED = 'notices/detail/DELETE_NOTICE_DETAIL_COMMENT_FAILED';

export const DELETE_NON_MEMBER_NOTICE_DETAIL_COMMENT = 'notices/detail/DELETE_NON_MEMBER_NOTICE_DETAIL_COMMENT';
export const DELETE_NON_MEMBER_NOTICE_DETAIL_COMMENT_SUCCEEDED =	'notices/detail/DELETE_NON_MEMBER_NOTICE_DETAIL_COMMENT_SUCCEEDED';
export const DELETE_NON_MEMBER_NOTICE_DETAIL_COMMENT_FAILED =	'notices/detail/DELETE_NON_MEMBER_NOTICE_DETAIL_COMMENT_FAILED';

export const DELETE_NOTICE_DETAIL_REPLY = 'notices/detail/DELETE_NOTICE_DETAIL_REPLY';
export const DELETE_NOTICE_DETAIL_REPLY_SUCCEEDED = 'notices/detail/DELETE_NOTICE_DETAIL_REPLY_SUCCEEDED';
export const DELETE_NOTICE_DETAIL_REPLY_FAILED = 'notices/detail/DELETE_NOTICE_DETAIL_REPLY_FAILED';

export const DELETE_NON_MEMBER_NOTICE_DETAIL_REPLY = 'notices/detail/DELETE_NON_MEMBER_NOTICE_DETAIL_REPLY';
export const DELETE_NON_MEMBER_NOTICE_DETAIL_REPLY_SUCCEEDED =	'notices/detail/DELETE_NON_MEMBER_NOTICE_DETAIL_REPLY_SUCCEEDED';
export const DELETE_NON_MEMBER_NOTICE_DETAIL_REPLY_FAILED =	'notices/detail/DELETE_NON_MEMBER_NOTICE_DETAIL_REPLY_FAILED';

export const fetchNoticeDetail = createAction(FETCH_NOTICE_DETAIL)<number>();
export const fetchNoticeDetailSucceeded = createAction(FETCH_NOTICE_DETAIL_SUCCEEDED)<NoticeDetail>();
export const fetchNoticeDetailFailed = createAction(FETCH_NOTICE_DETAIL_FAILED)();

export const putNoticeDetailViewCount = createAction(PUT_NOTICE_DETAIL_VIEW_COUNT)<number>();
export const putNoticeDetailViewCountSucceeded = createAction(PUT_NOTICE_DETAIL_VIEW_COUNT_SUCCEEDED)<number>();
export const putNoticeDetailViewCountFailed = createAction(PUT_NOTICE_DETAIL_VIEW_COUNT_FAILED)();

export const fetchNoticeDetailComments = createAction(FETCH_NOTICE_DETAIL_COMMENTS)<FetchNoticeDetailCommentsPayload>();
export const fetchNoticeDetailCommentsSucceeded = createAction(FETCH_NOTICE_DETAIL_COMMENTS_SUCCEEDED)<{
	data: NoticeDetailComment[];
	pagination: Pagination;
}>();
export const fetchNoticeDetailCommentsFailed = createAction(FETCH_NOTICE_DETAIL_COMMENTS_FAILED)();

export const postNoticeDetailComment = createAction(POST_NOTICE_DETAIL_COMMENT)<PostNoticeDetailCommentPayload>();
export const postNoticeDetailCommentSucceeded = createAction(POST_NOTICE_DETAIL_COMMENT_SUCCEEDED)();
export const postNoticeDetailCommentFailed = createAction(POST_NOTICE_DETAIL_COMMENT_FAILED)();

export const postNonMemberNoticeDetailComment = createAction(
	POST_NON_MEMBER_NOTICE_DETAIL_COMMENT
)<PostNonMemberNoticeDetailCommentPayload>();
export const postNonMemberNoticeDetailCommentSucceeded = createAction(
	POST_NON_MEMBER_NOTICE_DETAIL_COMMENT_SUCCEEDED
)();
export const postNonMemberNoticeDetailCommentFailed = createAction(POST_NON_MEMBER_NOTICE_DETAIL_COMMENT_FAILED)();

export const handleNoticeDetailReplyWriteForm = createAction(HANDLE_NOTICE_DETAIL_REPLY_WRITE_FROM)<number>();

export const handleNoticeDetailCommentsFetchParams = createAction(
	HANDLE_NOTICE_DETAIL_COMMENTS_FETCH_PARAMS
)<NoticeDetailCommentsFetchParams>();

export const postNoticeDetailReply = createAction(POST_NOTICE_DETAIL_REPLY)<PostNoticeDetailReplyPayload>();
export const postNoticeDetailReplySucceeded = createAction(POST_NOTICE_DETAIL_REPLY_SUCCEEDED)();
export const postNoticeDetailReplyFailed = createAction(POST_NOTICE_DETAIL_REPLY_FAILED)();

export const postNonMemberNoticeDetailReply = createAction(
	POST_NON_MEMBER_NOTICE_DETAIL_REPLY
)<PostNonMemberNoticeDetailReplyPayload>();
export const postNonMemberNoticeDetailReplySucceeded = createAction(POST_NON_MEMBER_NOTICE_DETAIL_REPLY_SUCCEEDED)();
export const postNonMemberNoticeDetailReplyFailed = createAction(POST_NON_MEMBER_NOTICE_DETAIL_REPLY_FAILED)();

export const handleNoticeDetailDeleteAuthDialog = createAction(HANDLE_NOTICE_DETAIL_DELETE_AUTH_DIALOG)<{
	dataId: number;
	subTitle: string;
	type: string;
}>();

export const deleteNoticeDetail = createAction(DELETE_NOTICE_DETAIL)<DeleteNoticeDetailPayload>();
export const deleteNoticeDetailSucceeded = createAction(DELETE_NOTICE_DETAIL_SUCCEEDED)();
export const deleteNoticeDetailFailed = createAction(DELETE_NOTICE_DETAIL_FAILED)();

export const deleteNoticeDetailComment = createAction(DELETE_NOTICE_DETAIL_COMMENT)<DeleteNoticeDetailCommentPayload>();
export const deleteNoticeDetailCommentSucceeded = createAction(DELETE_NOTICE_DETAIL_COMMENT_SUCCEEDED)();
export const deleteNoticeDetailCommentFailed = createAction(DELETE_NOTICE_DETAIL_COMMENT_FAILED)();

export const deleteNonMemberNoticeDetailComment = createAction(
	DELETE_NON_MEMBER_NOTICE_DETAIL_COMMENT
)<DeleteNonMemberNoticeDetailCommentPayload>();
export const deleteNonMemberNoticeDetailCommentSucceeded = createAction(
	DELETE_NON_MEMBER_NOTICE_DETAIL_COMMENT_SUCCEEDED
)();
export const deleteNonMemberNoticeDetailCommentFailed = createAction(DELETE_NON_MEMBER_NOTICE_DETAIL_COMMENT_FAILED)();

export const deleteNoticeDetailReply = createAction(DELETE_NOTICE_DETAIL_REPLY)<DeleteNoticeDetailReplyPayload>();
export const deleteNoticeDetailReplySucceeded = createAction(DELETE_NOTICE_DETAIL_REPLY_SUCCEEDED)();
export const deleteNoticeDetailReplyFailed = createAction(DELETE_NOTICE_DETAIL_REPLY_FAILED)();

export const deleteNonMemberNoticeDetailReply = createAction(
	DELETE_NON_MEMBER_NOTICE_DETAIL_REPLY
)<DeleteNonMemberNoticeDetailReplyPayload>();
export const deleteNonMemberNoticeDetailReplySucceeded = createAction(
	DELETE_NON_MEMBER_NOTICE_DETAIL_REPLY_SUCCEEDED
)();
export const deleteNonMemberNoticeDetailReplyFailed = createAction(DELETE_NON_MEMBER_NOTICE_DETAIL_REPLY_FAILED)();
