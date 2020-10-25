import { useSelector } from 'react-redux';

// Modules
import { RootState } from 'modules';

export default function useStorageGridList() {
	const storagesState = useSelector((state: RootState) => state.storages);

	return {
		...storagesState
	};
}
