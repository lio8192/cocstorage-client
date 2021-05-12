import { all } from 'redux-saga/effects';

// Sagas
import common from './common';
import home from './home';
import storages from './storages';
import storageBoard from './storages/board';
import storageBoardDetail from './storages/board/detail';
import notices from './notices';
import noticeDetail from './notices/detail';
import mypage from './mypage';

export default function* rootSaga() {
	yield all([common(), home(), storages(), storageBoard(), storageBoardDetail(), notices(), noticeDetail(), mypage()]);
}
