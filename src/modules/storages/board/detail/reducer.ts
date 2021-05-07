import { createReducer } from 'typesafe-actions';
import { HYDRATE } from 'next-redux-wrapper';
import {
	FETCH_STORAGE_DETAIL_AND_STORAGE_BOARD_DETAIL,
	FETCH_STORAGE_DETAIL_AND_STORAGE_BOARD_DETAIL_SUCCEEDED,
	FETCH_STORAGE_DETAIL_AND_STORAGE_BOARD_DETAIL_FAILED,
	FETCH_STORAGE_BOARD_DETAIL,
	FETCH_STORAGE_BOARD_DETAIL_SUCCEEDED,
	FETCH_STORAGE_BOARD_DETAIL_FAILED,
	PUT_STORAGE_BOARD_DETAIL_VIEW_COUNT_SUCCEEDED,
	PUT_STORAGE_BOARD_DETAIL_RECOMMEND,
	PUT_STORAGE_BOARD_DETAIL_RECOMMEND_SUCCEEDED,
	PUT_STORAGE_BOARD_DETAIL_RECOMMEND_FAILED,
	PUT_NON_MEMBER_STORAGE_BOARD_DETAIL_RECOMMEND,
	PUT_NON_MEMBER_STORAGE_BOARD_DETAIL_RECOMMEND_SUCCEEDED,
	PUT_NON_MEMBER_STORAGE_BOARD_DETAIL_RECOMMEND_FAILED,
	CLOSE_STORAGE_BOARD_DETAIL_RECOMMEND_SNACKBAR,
	CLOSE_STORAGE_BOARD_DETAIL_RECOMMEND_ERROR_SNACKBAR,
	FETCH_STORAGE_BOARD_DETAIL_COMMENTS,
	FETCH_STORAGE_BOARD_DETAIL_COMMENTS_SUCCEEDED,
	FETCH_STORAGE_BOARD_DETAIL_COMMENTS_FAILED,
	POST_STORAGE_BOARD_DETAIL_COMMENT,
	POST_STORAGE_BOARD_DETAIL_COMMENT_SUCCEEDED,
	POST_STORAGE_BOARD_DETAIL_COMMENT_FAILED,
	POST_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT,
	POST_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT_SUCCEEDED,
	POST_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT_FAILED,
	HANDLE_STORAGE_BOARD_DETAIL_REPLY_WRITE_FROM,
	HANDLE_STORAGE_BOARD_DETAIL_COMMENTS_FETCH_PARAMS,
	POST_STORAGE_BOARD_DETAIL_REPLY,
	POST_STORAGE_BOARD_DETAIL_REPLY_SUCCEEDED,
	POST_STORAGE_BOARD_DETAIL_REPLY_FAILED,
	POST_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY,
	POST_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY_SUCCEEDED,
	POST_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY_FAILED,
	HANDLE_STORAGE_BOARD_DETAIL_DELETE_AUTH_DIALOG,
	DELETE_STORAGE_BOARD_DETAIL,
	DELETE_STORAGE_BOARD_DETAIL_SUCCEEDED,
	DELETE_STORAGE_BOARD_DETAIL_FAILED,
	DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL,
	DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_SUCCEEDED,
	DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_FAILED,
	DELETE_STORAGE_BOARD_DETAIL_COMMENT,
	DELETE_STORAGE_BOARD_DETAIL_COMMENT_SUCCEEDED,
	DELETE_STORAGE_BOARD_DETAIL_COMMENT_FAILED,
	DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT,
	DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT_SUCCEEDED,
	DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT_FAILED,
	DELETE_STORAGE_BOARD_DETAIL_REPLY,
	DELETE_STORAGE_BOARD_DETAIL_REPLY_SUCCEEDED,
	DELETE_STORAGE_BOARD_DETAIL_REPLY_FAILED,
	DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY,
	DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY_SUCCEEDED,
	DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY_FAILED
} from './actions';
import { StorageBoardDetailActions, StorageBoardDetailState } from './types';

const initialState: StorageBoardDetailState = {
	detail: {
		id: 0,
		storage: {
			id: 0,
			storageCategoryId: 0,
			path: '',
			name: '',
			avatarUrl: null
		},
		user: null,
		nickname: null,
		subject: '',
		content: '',
		description: '',
		viewCount: 0,
		thumbUp: 0,
		thumbDown: 0,
		hasImage: false,
		hasVideo: false,
		isDraft: false,
		isActive: false,
		isMember: false,
		isPopular: false,
		createdIp: '',
		createdAt: '',
		updatedAt: '',
		thumbnailUrl: '',
		commentTotalCount: 0,
		sourceCode: ''
	},
	recommend: {
		open: false,
		message: '',
		error: {
			open: false,
			message: ''
		},
		pending: false
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
			storageId: 0,
			storageBoardId: 0,
			per: 10,
			page: 1,
			orderBy: 'latest'
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

const storageBoardDetail = createReducer<StorageBoardDetailState, StorageBoardDetailActions>(initialState, {
	[HYDRATE]: (state, { payload }) => ({
		...state,
		...payload.storageBoardDetail
	}),
	[FETCH_STORAGE_DETAIL_AND_STORAGE_BOARD_DETAIL]: (state) => ({
		...state,
		detail: {
			id: 0,
			storage: {
				id: 0,
				storageCategoryId: 0,
				path: '',
				name: '',
				avatarUrl: null
			},
			user: null,
			nickname: null,
			subject: '',
			content: '',
			description: '',
			viewCount: 0,
			thumbUp: 0,
			thumbDown: 0,
			hasImage: false,
			hasVideo: false,
			isDraft: false,
			isActive: false,
			isMember: false,
			isPopular: false,
			createdIp: '',
			createdAt: '',
			updatedAt: '',
			thumbnailUrl: '',
			commentTotalCount: 0,
			sourceCode: ''
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
				storageId: 0,
				storageBoardId: 0,
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
		pending: true
	}),
	[FETCH_STORAGE_DETAIL_AND_STORAGE_BOARD_DETAIL_SUCCEEDED]: (state, { payload: data }) => ({
		...state,
		detail: data,
		pending: false
	}),
	[FETCH_STORAGE_DETAIL_AND_STORAGE_BOARD_DETAIL_FAILED]: (state) => ({
		...state,
		pending: true
	}),
	[FETCH_STORAGE_BOARD_DETAIL]: (state) => ({
		...state,
		detail: {
			id: 0,
			storage: {
				id: 0,
				storageCategoryId: 0,
				path: '',
				name: '',
				avatarUrl: null
			},
			user: null,
			nickname: null,
			subject: '',
			content: '',
			description: '',
			viewCount: 0,
			thumbUp: 0,
			thumbDown: 0,
			hasImage: false,
			hasVideo: false,
			isDraft: false,
			isActive: false,
			isMember: false,
			isPopular: false,
			createdIp: '',
			createdAt: '',
			updatedAt: '',
			thumbnailUrl: '',
			commentTotalCount: 0,
			sourceCode: ''
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
				storageId: 0,
				storageBoardId: 0,
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
		pending: true
	}),
	[FETCH_STORAGE_BOARD_DETAIL_SUCCEEDED]: (state, { payload: data }) => ({
		...state,
		detail: data,
		pending: false
	}),
	[FETCH_STORAGE_BOARD_DETAIL_FAILED]: (state) => ({
		...state,
		pending: true
	}),
	[PUT_STORAGE_BOARD_DETAIL_VIEW_COUNT_SUCCEEDED]: (state, { payload: data }) => ({
		...state,
		detail: {
			...state.detail,
			viewCount: data
		}
	}),
	[PUT_STORAGE_BOARD_DETAIL_RECOMMEND]: (state) => ({
		...state,
		recommend: {
			...state.recommend,
			open: false,
			error: {
				...state.recommend.error,
				open: false
			},
			pending: true
		}
	}),
	[PUT_STORAGE_BOARD_DETAIL_RECOMMEND_SUCCEEDED]: (state, { payload: { message, thumbUp, thumbDown } }) => ({
		...state,
		detail: {
			...state.detail,
			thumbUp,
			thumbDown
		},
		recommend: {
			open: true,
			message,
			error: {
				open: false,
				message: ''
			},
			pending: false
		}
	}),
	[PUT_STORAGE_BOARD_DETAIL_RECOMMEND_FAILED]: (state, { payload: data }) => ({
		...state,
		recommend: {
			open: false,
			message: '',
			error: {
				open: true,
				message: data
			},
			pending: false
		}
	}),
	[PUT_NON_MEMBER_STORAGE_BOARD_DETAIL_RECOMMEND]: (state) => ({
		...state,
		recommend: {
			...state.recommend,
			open: false,
			error: {
				...state.recommend.error,
				open: false
			},
			pending: true
		}
	}),
	[PUT_NON_MEMBER_STORAGE_BOARD_DETAIL_RECOMMEND_SUCCEEDED]: (state, { payload: { message, thumbUp, thumbDown } }) => ({
		...state,
		detail: {
			...state.detail,
			thumbUp,
			thumbDown
		},
		recommend: {
			open: true,
			message,
			error: {
				open: false,
				message: ''
			},
			pending: false
		}
	}),
	[PUT_NON_MEMBER_STORAGE_BOARD_DETAIL_RECOMMEND_FAILED]: (state, { payload: data }) => ({
		...state,
		recommend: {
			open: false,
			message: '',
			error: {
				open: true,
				message: data
			},
			pending: false
		}
	}),
	[CLOSE_STORAGE_BOARD_DETAIL_RECOMMEND_SNACKBAR]: (state) => ({
		...state,
		recommend: {
			...state.recommend,
			open: false
		}
	}),
	[CLOSE_STORAGE_BOARD_DETAIL_RECOMMEND_ERROR_SNACKBAR]: (state) => ({
		...state,
		recommend: {
			...state.recommend,
			error: {
				...state.recommend.error,
				open: false
			}
		}
	}),
	[FETCH_STORAGE_BOARD_DETAIL_COMMENTS]: (state) => ({
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
	[FETCH_STORAGE_BOARD_DETAIL_COMMENTS_SUCCEEDED]: (state, { payload: { data, pagination } }) => ({
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
	[FETCH_STORAGE_BOARD_DETAIL_COMMENTS_FAILED]: (state) => ({
		...state,
		comments: {
			...state.comments,
			pending: false
		}
	}),
	[POST_STORAGE_BOARD_DETAIL_COMMENT]: (state) => ({
		...state,
		comments: {
			...state.comments,
			manage: {
				...state.comments.manage,
				pending: true
			}
		}
	}),
	[POST_STORAGE_BOARD_DETAIL_COMMENT_SUCCEEDED]: (state) => ({
		...state,
		comments: {
			...state.comments,
			manage: {
				...state.comments.manage,
				pending: false
			}
		}
	}),
	[POST_STORAGE_BOARD_DETAIL_COMMENT_FAILED]: (state) => ({
		...state,
		comments: {
			...state.comments,
			manage: {
				...state.comments.manage,
				pending: false
			}
		}
	}),
	[POST_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT]: (state) => ({
		...state,
		comments: {
			...state.comments,
			manage: {
				...state.comments.manage,
				pending: true
			}
		}
	}),
	[POST_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT_SUCCEEDED]: (state) => ({
		...state,
		comments: {
			...state.comments,
			manage: {
				...state.comments.manage,
				pending: false
			}
		}
	}),
	[POST_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT_FAILED]: (state) => ({
		...state,
		comments: {
			...state.comments,
			manage: {
				...state.comments.manage,
				pending: false
			}
		}
	}),
	[HANDLE_STORAGE_BOARD_DETAIL_REPLY_WRITE_FROM]: (state, { payload: value }) => ({
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
	[HANDLE_STORAGE_BOARD_DETAIL_COMMENTS_FETCH_PARAMS]: (state, { payload: data }) => ({
		...state,
		comments: {
			...state.comments,
			fetchParams: data
		}
	}),
	[POST_STORAGE_BOARD_DETAIL_REPLY]: (state) => ({
		...state,
		replies: {
			manage: {
				...state.replies.manage,
				pending: true
			}
		}
	}),
	[POST_STORAGE_BOARD_DETAIL_REPLY_SUCCEEDED]: (state) => ({
		...state,
		replies: {
			manage: {
				...state.replies.manage,
				pending: false
			}
		}
	}),
	[POST_STORAGE_BOARD_DETAIL_REPLY_FAILED]: (state) => ({
		...state,
		replies: {
			manage: {
				...state.replies.manage,
				pending: false
			}
		}
	}),
	[POST_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY]: (state) => ({
		...state,
		replies: {
			manage: {
				...state.replies.manage,
				pending: true
			}
		}
	}),
	[POST_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY_SUCCEEDED]: (state) => ({
		...state,
		replies: {
			manage: {
				...state.replies.manage,
				pending: false
			}
		}
	}),
	[POST_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY_FAILED]: (state) => ({
		...state,
		replies: {
			manage: {
				...state.replies.manage,
				pending: false
			}
		}
	}),
	[HANDLE_STORAGE_BOARD_DETAIL_DELETE_AUTH_DIALOG]: (state, { payload }) => ({
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
	[DELETE_STORAGE_BOARD_DETAIL]: (state) => ({
		...state,
		pending: true
	}),
	[DELETE_STORAGE_BOARD_DETAIL_SUCCEEDED]: (state) => ({
		...state,
		pending: false
	}),
	[DELETE_STORAGE_BOARD_DETAIL_FAILED]: (state) => ({
		...state,
		pending: false
	}),
	[DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL]: (state) => ({
		...state,
		manage: {
			...state.manage,
			pending: true
		}
	}),
	[DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_SUCCEEDED]: (state) => ({
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
	[DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_FAILED]: (state) => ({
		...state,
		manage: {
			...state.manage,
			pending: false
		}
	}),
	[DELETE_STORAGE_BOARD_DETAIL_COMMENT]: (state) => ({
		...state,
		pending: true
	}),
	[DELETE_STORAGE_BOARD_DETAIL_COMMENT_SUCCEEDED]: (state) => ({
		...state,
		pending: false
	}),
	[DELETE_STORAGE_BOARD_DETAIL_COMMENT_FAILED]: (state) => ({
		...state,
		pending: true
	}),
	[DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT]: (state) => ({
		...state,
		manage: {
			...state.manage,
			pending: true
		}
	}),
	[DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT_SUCCEEDED]: (state) => ({
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
	[DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_COMMENT_FAILED]: (state) => ({
		...state,
		manage: {
			...state.manage,
			pending: false
		}
	}),
	[DELETE_STORAGE_BOARD_DETAIL_REPLY]: (state) => ({
		...state,
		pending: true
	}),
	[DELETE_STORAGE_BOARD_DETAIL_REPLY_SUCCEEDED]: (state) => ({
		...state,
		pending: false
	}),
	[DELETE_STORAGE_BOARD_DETAIL_REPLY_FAILED]: (state) => ({
		...state,
		pending: false
	}),
	[DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY]: (state) => ({
		...state,
		manage: {
			...state.manage,
			pending: true
		}
	}),
	[DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY_SUCCEEDED]: (state) => ({
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
	[DELETE_NON_MEMBER_STORAGE_BOARD_DETAIL_REPLY_FAILED]: (state) => ({
		...state,
		manage: {
			...state.manage,
			pending: false
		}
	})
});

export default storageBoardDetail;
