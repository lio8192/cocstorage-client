import { ActionType } from 'typesafe-actions';
import {
	hydrate,
	fetchBoards,
	fetchBoardsSucceeded,
	fetchBoardsFailed,
	handleBoardsSearchState,
	handleBoardClickCountState,
	clearBoardsRelatedState,
	handlePagination
} from './actions';
import { Board } from '../boardDetail';

const actions = {
	hydrate,
	fetchBoards,
	fetchBoardsSucceeded,
	fetchBoardsFailed,
	handleBoardsSearchState,
	handleBoardClickCountState,
	clearBoardsRelatedState,
	handlePagination
};

export type BoardAction = ActionType<typeof actions>;

export type FetchBoardPayload = {
	categoryId: string | string[];
	searchState?: SearchState;
	page: number;
};

export type SearchState = {
	handle: boolean;
	type: string;
	value: string;
};

export type Category = {
	id: string | null;
	name: string | null;
	register_date: string | null;
	update_date: string | null;
};

export type Pagination = {
	allCount: number;
	endPage: number;
	page: number;
	pageBlock: number;
	pageCount: number;
	row: number;
	startPage: number;
};

export type BoardState = {
	boardList: Board[];
	category: Category;
	searchState: SearchState;
	pagination: Pagination;
	count: number;
	error: boolean;
	errorMessage: string | null;
};
