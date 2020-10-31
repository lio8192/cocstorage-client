import { createReducer } from 'typesafe-actions';
import { HYDRATE } from 'next-redux-wrapper';
import { MyPageState, MyPageActions } from './types';

const initialState: MyPageState = {
};

const mypage = createReducer<MyPageState, MyPageActions>(initialState, {
	[HYDRATE]: (state, { payload }) => ({
		...state,
		...payload.home
	})
});

export default mypage;
