import { ActionType } from 'typesafe-actions';
import {
	hydrate, postStorage, postStorageSucceeded, postStorageFailed, handleStorageManageDialog
} from './actions';

const actions = {
	hydrate,
	handleStorageManageDialog,
	postStorage,
	postStorageSucceeded,
	postStorageFailed
};

export type StoragesActions = ActionType<typeof actions>;

export type PostStoragePayload = {
	name: string;
	description: string;
	path: string;
	avatar: FileList | null;
};

export type StoragesState = {
	manage: {
		open: boolean;
		pending: boolean;
	};
};
