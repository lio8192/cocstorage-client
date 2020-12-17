import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';

// Material UI
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';

// Components
import NoticeHeader from 'components/notices/NoticeHeader';
import EditForm from 'components/notices/edit/EditForm';

// Modules
import wrapper from 'modules/store';

// Custom Hooks
import useNoticeEdit from 'hooks/notices/edit/useNoticeEdit';

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

function NoticeEdit() {
	const classes = useStyles();
	const router = useRouter();
	const theme = useTheme();
	const {
		isAuthenticated,
		role,
		manage: { pending },
		onFetchNoticeEditDetail
	} = useNoticeEdit();

	useEffect(() => {
		if (isAuthenticated && role === 'admin') {
			onFetchNoticeEditDetail();
		} else {
			router.push('/notices', '/notices').then();
		}
	}, [router, isAuthenticated, role, onFetchNoticeEditDetail]);

	return (
		<>
			<Head>
				<meta charSet={'utf-8'} />
				<meta name={'viewport'} content={'minimum-scale=1, initial-scale=1, width=device-width'} />
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
				<meta name={'theme-color'} content={theme.palette.primary.main} />
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
			<EditForm />
		</>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ req, res }) => {
	const isServerSide = req && true;

	if (isServerSide && res) {
		res.writeHead(301, { Location: '/notices' });
		res.end();
	}

	return {
		props: {}
	};
});

export default NoticeEdit;
