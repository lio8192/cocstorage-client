import { ActionType } from 'typesafe-actions';
import { handlePageScope } from './actions';

const actions = { handlePageScope };

export type CommonActions = ActionType<typeof actions>;

export type CommonState = {
	pageScope: string;
};
