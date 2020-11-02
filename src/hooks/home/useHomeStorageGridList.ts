import { useSelector } from 'react-redux';

// Modules
import { RootState } from 'modules';

export default function useHomeStorageGridList() {
	const homeState = useSelector((state: RootState) => state.home);

	return {
		...homeState
	};
}
