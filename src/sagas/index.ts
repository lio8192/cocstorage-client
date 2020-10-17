import { all } from 'redux-saga/effects';

// Sagas
import common from './common';
import home from './home';
import board from './board';
import boardDetail from './boardDetail';
import storages from './storages';

export default function* rootSaga() {
	yield all([common(), home(), board(), boardDetail(), storages()]);
}
