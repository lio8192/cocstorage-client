import { combineReducers } from 'redux';

// Reducers
import common from './common';
import home from './home';
import storages from './storages';
import storageBoard from './storages/board';
import storageBoardDetail from './storages/board/detail';
import notices from './notices';
import noticeDetail from './notices/detail';
import mypage from './mypage';

const rootReducer = combineReducers({
	common,
	home,
	storages,
	storageBoard,
	storageBoardDetail,
	notices,
	noticeDetail,
	mypage
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
