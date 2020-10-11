import { createAction } from 'typesafe-actions';

export const HANDLE_PAGE_SCOPE = 'common/HANDLE_PAGE_SCOPE';

export const handlePageScope = createAction(HANDLE_PAGE_SCOPE)<string>();
