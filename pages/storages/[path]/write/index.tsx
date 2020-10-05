import React from 'react';

// Components
import StorageBoardHeader from 'components/storages/board/StorageBoardHeader';
import StorageBoardWriteForm from 'components/storages/board/write/StorageBoardWriteForm';

function StorageBoardWrite() {
	return (
		<>
			<StorageBoardHeader />
			<StorageBoardWriteForm />
		</>
	);
}

export default StorageBoardWrite;
