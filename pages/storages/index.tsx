import React from 'react';

// Components
import StorageHeader from 'components/storages/StorageHeader';
import StorageList from 'components/storages/StorageList';
import StorageManageDialog from 'components/storages/StorageManageDialog';

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
