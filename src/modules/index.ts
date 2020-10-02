import { combineReducers } from 'redux';

// Reducers
import common from './common';
import home from './home';
import board from './board';
import boardDetail from './boardDetail';

const rootReducer = combineReducers({
	common,
	home,
	board,
	boardDetail
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
