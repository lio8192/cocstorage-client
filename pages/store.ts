import {
	applyMiddleware,
	createStore,
	Middleware,
	Store
} from 'redux';
import createSagaMiddleware, { Task } from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createWrapper, MakeStore } from 'next-redux-wrapper';

// Modules
import rootReducer, { RootState } from 'modules';

// Redux-Saga
import rootSaga from 'sagas';

export interface SagaStore extends Store {
	sagaTask?: Task;
}

const bindMiddleware = (middleware: [Middleware]) => {
	if (process.env.NODE_ENV !== 'production') {
		return composeWithDevTools(applyMiddleware(...middleware));
	}
	return applyMiddleware(...middleware);
};

const makeStore: MakeStore<RootState> = () => {
	const sagaMiddleware = createSagaMiddleware();

	const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));

	(store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

	return store;
};

export default createWrapper<RootState>(makeStore);
