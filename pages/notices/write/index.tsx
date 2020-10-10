import React from 'react';

// Components
import WriteForm from 'components/notices/write/WriteForm';
import NoticeHeader from 'components/notices/NoticeHeader';

function NoticeWrite() {
	return (
		<>
			<NoticeHeader />
			<WriteForm />
		</>
	);
}

export default NoticeWrite;
