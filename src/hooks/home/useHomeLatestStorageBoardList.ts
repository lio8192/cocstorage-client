import { useSelector } from 'react-redux';

// Modules
import { RootState } from 'modules';

export default function useHomLatestStorageBoardList() {
	const homeState = useSelector((state: RootState) => state.home);

	return {
		...homeState
	};
}
