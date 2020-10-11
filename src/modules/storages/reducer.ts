import { createReducer } from 'typesafe-actions';
import { CommonActions, CommonState } from 'modules/common/types';

import { HANDLE_PAGE_SCOPE } from './actions';

const initialState: CommonState = {
	pageScope: 'storage'
};

const storages = createReducer<CommonState, CommonActions>(initialState, {
	[HANDLE_PAGE_SCOPE]: (state, { payload: value }) => ({
		...state,
		pageScope: value
	})
});

export default storages;
