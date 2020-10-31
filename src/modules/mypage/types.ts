import { ActionType } from 'typesafe-actions';
import {
	hydrate
} from './actions';

const actions = {
	hydrate
};

export type MyPageActions = ActionType<typeof actions>;

export type MyPageState = {};
