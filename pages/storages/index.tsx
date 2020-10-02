import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Components
import StorageHeader from 'components/storages/StorageHeader';
import StorageList from 'components/storages/StorageList';
import StorageManageDialog from 'components/storages/StorageManageDialog';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

function Storages() {
	return (
		<>
			<StorageHeader />
			<StorageList />
			<StorageManageDialog />
		</>
	);
}

export default Storages;
