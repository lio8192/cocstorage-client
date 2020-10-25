export function getSearchTypeLabelByType(type: string) {
	let searchTypeName: string | null = null;

	switch (type) {
	case 'all':
		searchTypeName = '전체';
		break;
	case 'subject':
		searchTypeName = '제목';
		break;
	case 'content':
		searchTypeName = '내용';
		break;
	case 'nickname':
		searchTypeName = '닉네임';
		break;
	default:
		searchTypeName = '전체';
		break;
	}

	return searchTypeName;
}

export default getSearchTypeLabelByType;
