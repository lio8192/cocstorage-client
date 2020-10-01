import { createAction } from 'typesafe-actions';
import { HYDRATE } from 'next-redux-wrapper';
import { HomeState } from './types';

export const hydrate = createAction(HYDRATE)<any>();

export const FETCH_MAIN_CONTENTS = 'home/FETCH_MAIN_CONTENTS';
export const FETCH_MAIN_CONTENTS_SUCCEEDED = 'home/FETCH_MAIN_CONTENTS_SUCCEEDED';
export const FETCH_MAIN_CONTENTS_FAILED = 'home/FETCH_MAIN_CONTENTS_FAILED';

export const fetchMainContents = createAction(FETCH_MAIN_CONTENTS)();
export const fetchMainContentsSucceeded = createAction(FETCH_MAIN_CONTENTS_SUCCEEDED)<HomeState>();
export const fetchMainContentsFailed = createAction(FETCH_MAIN_CONTENTS_FAILED)<string>();
