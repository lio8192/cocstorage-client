import { combineReducers } from 'redux';

// Reducers
import common from './common';
import home from './home';
import board from './board';
import boardDetail from './boardDetail';
import storages from './storages';

const rootReducer = combineReducers({
	common,
	home,
	board,
	boardDetail,
	storages
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
