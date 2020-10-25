import { combineReducers } from 'redux';

// Reducers
import common from './common';
import home from './home';
import board from './board';
import boardDetail from './boardDetail';
import storages from './storages';
import storageBoard from './storages/board';
import storageBoardDetail from './storages/board/detail';

const rootReducer = combineReducers({
	common,
	home,
	board,
	boardDetail,
	storages,
	storageBoard,
	storageBoardDetail
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
