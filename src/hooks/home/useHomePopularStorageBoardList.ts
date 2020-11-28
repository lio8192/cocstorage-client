import { useSelector } from 'react-redux';

// Modules
import { RootState } from 'modules';

export default function useHomPopularStorageBoardList() {
	const homeState = useSelector((state: RootState) => state.home);

	return {
		...homeState
	};
}
