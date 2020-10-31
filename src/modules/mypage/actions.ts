import { createAction } from 'typesafe-actions';
import { HYDRATE } from 'next-redux-wrapper';

export const hydrate = createAction(HYDRATE)<any>();

export default hydrate;
