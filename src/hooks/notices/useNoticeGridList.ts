import { useSelector } from 'react-redux';

// Modules
import { RootState } from 'modules';

export default function useNoticeGridList() {
	const noticesState = useSelector((state: RootState) => state.notices);

	return {
		...noticesState
	};
}
