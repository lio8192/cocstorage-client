import React from 'react';

// Components
import StorageHeader from 'components/storages/StorageHeader';
import StorageGridList from 'components/storages/StorageGridList';
import StorageManageDialog from 'components/storages/StorageManageDialog';

function Storages() {
	return (
		<>
			<StorageHeader />
			<StorageGridList />
			<StorageManageDialog />
		</>
	);
}

export default Storages;
