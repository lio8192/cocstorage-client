import { createReducer } from 'typesafe-actions';
import { HYDRATE } from 'next-redux-wrapper';
import { NoticeDetailState, NoticeDetailActions } from './types';
import {
	FETCH_NOTICE_DETAIL,
	FETCH_NOTICE_DETAIL_SUCCEEDED,
	FETCH_NOTICE_DETAIL_FAILED,
	PUT_NOTICE_DETAIL_VIEW_COUNT_SUCCEEDED,
	FETCH_NOTICE_DETAIL_COMMENTS,
	FETCH_NOTICE_DETAIL_COMMENTS_SUCCEEDED,
	FETCH_NOTICE_DETAIL_COMMENTS_FAILED,
	POST_NOTICE_DETAIL_COMMENT,
	POST_NOTICE_DETAIL_COMMENT_SUCCEEDED,
	POST_NOTICE_DETAIL_COMMENT_FAILED,
	POST_NON_MEMBER_NOTICE_DETAIL_COMMENT,
	POST_NON_MEMBER_NOTICE_DETAIL_COMMENT_SUCCEEDED,
	POST_NON_MEMBER_NOTICE_DETAIL_COMMENT_FAILED,
	HANDLE_NOTICE_DETAIL_REPLY_WRITE_FROM,
	HANDLE_NOTICE_DETAIL_COMMENTS_FETCH_PARAMS,
	POST_NOTICE_DETAIL_REPLY,
	POST_NOTICE_DETAIL_REPLY_SUCCEEDED,
	POST_NOTICE_DETAIL_REPLY_FAILED,
	POST_NON_MEMBER_NOTICE_DETAIL_REPLY,
	POST_NON_MEMBER_NOTICE_DETAIL_REPLY_SUCCEEDED,
	POST_NON_MEMBER_NOTICE_DETAIL_REPLY_FAILED,
	HANDLE_NOTICE_DETAIL_DELETE_AUTH_DIALOG,
	DELETE_NOTICE_DETAIL,
	DELETE_NOTICE_DETAIL_SUCCEEDED,
	DELETE_NOTICE_DETAIL_FAILED,
	DELETE_NOTICE_DETAIL_COMMENT,
	DELETE_NOTICE_DETAIL_COMMENT_SUCCEEDED,
	DELETE_NOTICE_DETAIL_COMMENT_FAILED,
	DELETE_NON_MEMBER_NOTICE_DETAIL_COMMENT,
	DELETE_NON_MEMBER_NOTICE_DETAIL_COMMENT_SUCCEEDED,
	DELETE_NON_MEMBER_NOTICE_DETAIL_COMMENT_FAILED,
	DELETE_NOTICE_DETAIL_REPLY,
	DELETE_NOTICE_DETAIL_REPLY_SUCCEEDED,
	DELETE_NOTICE_DETAIL_REPLY_FAILED,
	DELETE_NON_MEMBER_NOTICE_DETAIL_REPLY,
	DELETE_NON_MEMBER_NOTICE_DETAIL_REPLY_SUCCEEDED,
	DELETE_NON_MEMBER_NOTICE_DETAIL_REPLY_FAILED
} from './actions';

const initialState: NoticeDetailState = {
	detail: {
		id: 0,
		user: {
			id: 0,
			nickname: '',
			role: '',
			avatarUrl: null
		},
		subject: '',
		content: '',
		description: '',
		viewCount: 0,
		isDraft: false,
		isActive: false,
		createdAt: '',
		updatedAt: '',
		thumbnailUrl: '',
		commentTotalCount: 0,
		commentLatestPage: 0
	},
	comments: {
		data: [],
		pagination: {
			totalPages: 0,
			currentPage: 1,
			prevPage: null,
			nextPage: null,
			perPage: 10,
			isLastPage: true
		},
		fetchParams: {
			noticeId: 0,
			per: 10,
			page: 1,
			orderBy: 'old'
		},
		pending: false,
		manage: {
			id: 0,
			pending: false
		}
	},
	replies: {
		manage: {
			id: 0,
			pending: false
		}
	},
	manage: {
		deleteAuth: {
			open: false,
			dataId: 0,
			subTitle: '',
			type: ''
		},
		pending: false
	},
	pending: false
};

const noticeDetail = createReducer<NoticeDetailState, NoticeDetailActions>(initialState, {
	[HYDRATE]: (state, { payload }) => ({
		...state,
		...payload.noticeDetail
	}),
	[FETCH_NOTICE_DETAIL]: (state) => ({
		...state,
		detail: {
			id: 0,
			user: {
				id: 0,
				nickname: '',
				role: '',
				avatarUrl: null
			},
			subject: '',
			content: '',
			description: '',
			viewCount: 0,
			isDraft: false,
			isActive: false,
			createdAt: '',
			updatedAt: '',
			thumbnailUrl: '',
			commentTotalCount: 0,
			commentLatestPage: 0
		},
		comments: {
			data: [],
			pagination: {
				totalPages: 0,
				currentPage: 1,
				prevPage: null,
				nextPage: null,
				perPage: 20,
				isLastPage: true
			},
			fetchParams: {
				noticeId: 0,
				per: 10,
				page: 1,
				orderBy: 'latest'
			},
			pending: true,
			manage: {
				id: 0,
				pending: false
			}
		},
		replies: {
			manage: {
				id: 0,
				pending: false
			}
		},
		manage: {
			deleteAuth: {
				open: false,
				dataId: 0,
				subTitle: '',
				type: ''
			},
			pending: false
		},
		pending: true
	}),
	[FETCH_NOTICE_DETAIL_SUCCEEDED]: (state, { payload: data }) => ({
		...state,
		detail: data,
		pending: false
	}),
	[FETCH_NOTICE_DETAIL_FAILED]: (state) => ({
		...state,
		pending: false
	}),
	[PUT_NOTICE_DETAIL_VIEW_COUNT_SUCCEEDED]: (state, { payload: data }) => ({
		...state,
		detail: {
			...state.detail,
			viewCount: data
		}
	}),
	[FETCH_NOTICE_DETAIL_COMMENTS]: (state) => ({
		...state,
		comments: {
			...state.comments,
			data: [],
			pagination: {
				totalPages: 0,
				currentPage: 1,
				prevPage: null,
				nextPage: null,
				perPage: 20,
				isLastPage: true
			},
			pending: true
		}
	}),
	[FETCH_NOTICE_DETAIL_COMMENTS_SUCCEEDED]: (state, { payload: { data, pagination } }) => ({
		...state,
		comments: {
			...state.comments,
			data: data.map((item) => ({
				...item,
				selected: false
			})),
			pagination,
			pending: false
		}
	}),
	[FETCH_NOTICE_DETAIL_COMMENTS_FAILED]: (state) => ({
		...state,
		comments: {
			...state.comments,
			pending: false
		}
	}),
	[POST_NOTICE_DETAIL_COMMENT]: (state) => ({
		...state,
		comments: {
			...state.comments,
			manage: {
				...state.comments.manage,
				pending: true
			}
		}
	}),
	[POST_NOTICE_DETAIL_COMMENT_SUCCEEDED]: (state) => ({
		...state,
		comments: {
			...state.comments,
			manage: {
				...state.comments.manage,
				pending: false
			}
		}
	}),
	[POST_NOTICE_DETAIL_COMMENT_FAILED]: (state) => ({
		...state,
		comments: {
			...state.comments,
			manage: {
				...state.comments.manage,
				pending: false
			}
		}
	}),
	[POST_NON_MEMBER_NOTICE_DETAIL_COMMENT]: (state) => ({
		...state,
		comments: {
			...state.comments,
			manage: {
				...state.comments.manage,
				pending: true
			}
		}
	}),
	[POST_NON_MEMBER_NOTICE_DETAIL_COMMENT_SUCCEEDED]: (state) => ({
		...state,
		comments: {
			...state.comments,
			manage: {
				...state.comments.manage,
				pending: false
			}
		}
	}),
	[POST_NON_MEMBER_NOTICE_DETAIL_COMMENT_FAILED]: (state) => ({
		...state,
		comments: {
			...state.comments,
			manage: {
				...state.comments.manage,
				pending: false
			}
		}
	}),
	[HANDLE_NOTICE_DETAIL_REPLY_WRITE_FROM]: (state, { payload: value }) => ({
		...state,
		comments: {
			...state.comments,
			data: state.comments.data.map((item) => ({
				...item,
				selected: !item.selected && item.id === value
			})),
			manage: {
				...state.comments.manage,
				id: value
			}
		}
	}),
	[HANDLE_NOTICE_DETAIL_COMMENTS_FETCH_PARAMS]: (state, { payload: data }) => ({
		...state,
		comments: {
			...state.comments,
			fetchParams: data
		}
	}),
	[POST_NOTICE_DETAIL_REPLY]: (state) => ({
		...state,
		replies: {
			manage: {
				...state.replies.manage,
				pending: true
			}
		}
	}),
	[POST_NOTICE_DETAIL_REPLY_SUCCEEDED]: (state) => ({
		...state,
		replies: {
			manage: {
				...state.replies.manage,
				pending: false
			}
		}
	}),
	[POST_NOTICE_DETAIL_REPLY_FAILED]: (state) => ({
		...state,
		replies: {
			manage: {
				...state.replies.manage,
				pending: false
			}
		}
	}),
	[POST_NON_MEMBER_NOTICE_DETAIL_REPLY]: (state) => ({
		...state,
		replies: {
			manage: {
				...state.replies.manage,
				pending: true
			}
		}
	}),
	[POST_NON_MEMBER_NOTICE_DETAIL_REPLY_SUCCEEDED]: (state) => ({
		...state,
		replies: {
			manage: {
				...state.replies.manage,
				pending: false
			}
		}
	}),
	[POST_NON_MEMBER_NOTICE_DETAIL_REPLY_FAILED]: (state) => ({
		...state,
		replies: {
			manage: {
				...state.replies.manage,
				pending: false
			}
		}
	}),
	[HANDLE_NOTICE_DETAIL_DELETE_AUTH_DIALOG]: (state, { payload }) => ({
		...state,
		manage: {
			...state.manage,
			deleteAuth: {
				...state.manage.deleteAuth,
				open: !state.manage.deleteAuth.open,
				...payload
			}
		}
	}),
	[DELETE_NOTICE_DETAIL]: (state) => ({
		...state,
		pending: true
	}),
	[DELETE_NOTICE_DETAIL_SUCCEEDED]: (state) => ({
		...state,
		pending: false
	}),
	[DELETE_NOTICE_DETAIL_FAILED]: (state) => ({
		...state,
		pending: false
	}),
	[DELETE_NOTICE_DETAIL_COMMENT]: (state) => ({
		...state,
		pending: true
	}),
	[DELETE_NOTICE_DETAIL_COMMENT_SUCCEEDED]: (state) => ({
		...state,
		pending: false
	}),
	[DELETE_NOTICE_DETAIL_COMMENT_FAILED]: (state) => ({
		...state,
		pending: true
	}),
	[DELETE_NON_MEMBER_NOTICE_DETAIL_COMMENT]: (state) => ({
		...state,
		manage: {
			...state.manage,
			pending: true
		}
	}),
	[DELETE_NON_MEMBER_NOTICE_DETAIL_COMMENT_SUCCEEDED]: (state) => ({
		...state,
		manage: {
			...state.manage,
			deleteAuth: {
				open: false,
				dataId: 0,
				subTitle: '',
				type: ''
			},
			pending: false
		}
	}),
	[DELETE_NON_MEMBER_NOTICE_DETAIL_COMMENT_FAILED]: (state) => ({
		...state,
		manage: {
			...state.manage,
			pending: false
		}
	}),
	[DELETE_NOTICE_DETAIL_REPLY]: (state) => ({
		...state,
		pending: true
	}),
	[DELETE_NOTICE_DETAIL_REPLY_SUCCEEDED]: (state) => ({
		...state,
		pending: false
	}),
	[DELETE_NOTICE_DETAIL_REPLY_FAILED]: (state) => ({
		...state,
		pending: false
	}),
	[DELETE_NON_MEMBER_NOTICE_DETAIL_REPLY]: (state) => ({
		...state,
		manage: {
			...state.manage,
			pending: true
		}
	}),
	[DELETE_NON_MEMBER_NOTICE_DETAIL_REPLY_SUCCEEDED]: (state) => ({
		...state,
		manage: {
			...state.manage,
			deleteAuth: {
				open: false,
				dataId: 0,
				subTitle: '',
				type: ''
			},
			pending: false
		}
	}),
	[DELETE_NON_MEMBER_NOTICE_DETAIL_REPLY_FAILED]: (state) => ({
		...state,
		manage: {
			...state.manage,
			pending: false
		}
	})
});

export default noticeDetail;
