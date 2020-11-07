import React, { useEffect } from 'react';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { makeStyles, createStyles } from '@material-ui/core/styles';

// Material UI
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';

// Components
import NoticeHeader from 'components/notices/NoticeHeader';
import WriteForm from 'components/notices/write/WriteForm';

// Custom Hooks
import useNoticeWrite from 'hooks/notices/write/useNoticeWrite';

const useStyles = makeStyles(() =>
	createStyles({
		linearProgress: {
			position: 'fixed',
			width: '100%',
			top: 0,
			height: 5,
			zIndex: 10000
		}
	})
);

function NoticeWrite() {
	const classes = useStyles();
	const router = useRouter();
	const {
		manage: { pending },
		isAuthenticated,
		role,
		onPostNoticeDraft
	} = useNoticeWrite();

	useEffect(() => {
		if (isAuthenticated && role === 'admin') {
			onPostNoticeDraft();
		} else {
			router.push('/notices', '/notices').then();
		}
	}, [router, isAuthenticated, role, onPostNoticeDraft]);

	return (
		<>
			<Head>
				<meta charSet={'utf-8'} />
				<meta httpEquiv={'content-language'} content={'ko'} />
				<meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'} />
				<meta name={'author'} content={'개념글 저장소'} />
				<meta name={'title'} content={'새로운 소식 : 개념글 저장소'} />
				<meta name={'description'} content={'개념글 저장소의 새로운 소식을 확인해보세요!'} />
				<meta property={'og:title'} content={'새로운 소식 : 개념글 저장소'} />
				<meta property={'og:description'} content={'개념글 저장소의 새로운 소식을 확인해보세요!'} />
				<meta property={'og:type'} content={'website'} />
				<meta property={'og:image'} content={'https://static.cocstorage.com/images/icon.png'} />
				<meta property={'og:url'} content={'https://www.cocstorage.com/notices'} />
				<meta property={'og:site_name'} content={'새로운 소식 : 개념글 저장소'} />
				<meta property={'og:locale'} content={'ko_KR'} />
				<meta property={'twitter:title'} content={'새로운 소식 : 개념글 저장소'} />
				<meta property={'twitter:description'} content={'개념글 저장소의 새로운 소식을 확인해보세요!'} />
				<meta property={'twitter:image'} content={'https://static.cocstorage.com/images/icon.png'} />
				<meta property={'twitter:url'} content={'https://www.cocstorage.com/notices'} />
				<meta property={'twitter:card'} content={'summary'} />
				<meta name={'apple-mobile-web-app-title'} content={'새로운 소식 : 개념글 저장소'} />
				<title>{'새로운 소식 : 개념글 저장소'}</title>
				<link rel={'canonical'} href={'https://www.cocstorage.com/notices'} />
				<link rel={'shortcut icon'} href={'https://static.cocstorage.com/images/favicon.ico'} />
				<link rel={'apple-touch-icon'} href={'https://static.cocstorage.com/images/icon.png'} />
				<link rel={'manifest'} href={'/manifest.json'} />
			</Head>
			<Fade in={pending}>
				<LinearProgress className={classes.linearProgress} color={'primary'} />
			</Fade>
			<NoticeHeader />
			<WriteForm />
		</>
	);
}

NoticeWrite.getInitialProps = async ({ req, res }: NextPageContext) => {
	const isServerSide = req && true;

	if (isServerSide && res) {
		res.writeHead(301, { Location: '/notices' });
		res.end();
	}

	return {};
};

export default NoticeWrite;
