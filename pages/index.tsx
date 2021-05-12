import React from 'react';
import Head from 'next/head';
import {
	createStyles, makeStyles, Theme, useTheme
} from '@material-ui/core/styles';

// Material UI
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

// Modules
import {
	fetchNotices, fetchStorages, fetchLatestStorageBoards, fetchPopularStorageBoards
} from 'modules/home';
import { END } from 'redux-saga';
import wrapper from 'modules/store';

// Components
import HomeNoticeGridList from 'components/home/HomeNoticeGridList';
import HomeStorageGridList from 'components/home/HomeStorageGridList';
import HomeLatestStorageBoardList from 'components/home/HomeLatestStorageBoardList';
import HomePopularStorageBoardList from 'components/home/HomePopularStorageBoardList';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			overflow: 'hidden',
			[theme.breakpoints.down('md')]: {
				padding: 0
			}
		},
		containerBox: {
			marginTop: theme.spacing(2),
			[theme.breakpoints.down('md')]: {
				margin: 0
			}
		},
		box: {
			marginBottom: theme.spacing(2),
			[theme.breakpoints.down('md')]: {
				marginBottom: 0
			}
		}
	})
);

function Index() {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<>
			<Head>
				<meta charSet={'utf-8'} />
				<meta name={'viewport'} content={'minimum-scale=1, initial-scale=1, width=device-width'} />
				<meta httpEquiv={'content-language'} content={'ko'} />
				<meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'} />
				<meta name={'author'} content={'개념글 저장소'} />
				<meta name={'title'} content={'개념글 저장소'} />
				<meta name={'description'} content={'내가 만들어 운영하는 커뮤니티 저장소'} />
				<meta property={'og:title'} content={'개념글 저장소'} />
				<meta property={'og:description'} content={'내가 만들어 운영하는 커뮤니티 저장소'} />
				<meta property={'og:type'} content={'website'} />
				<meta property={'og:image'} content={'https://static.cocstorage.com/images/icon.png'} />
				<meta property={'og:url'} content={'https://www.cocstorage.com'} />
				<meta property={'og:site_name'} content={'개념글 저장소'} />
				<meta property={'og:locale'} content={'ko_KR'} />
				<meta property={'twitter:title'} content={'개념글 저장소'} />
				<meta property={'twitter:description'} content={'내가 만들어 운영하는 커뮤니티 저장소'} />
				<meta property={'twitter:image'} content={'https://static.cocstorage.com/images/icon.png'} />
				<meta property={'twitter:url'} content={'https://wwww.cocstorage.com'} />
				<meta property={'twitter:card'} content={'summary'} />
				<meta name={'apple-mobile-web-app-title'} content={'개념글 저장소'} />
				<meta name={'theme-color'} content={theme.palette.primary.main} />
				<title>{'개념글 저장소'}</title>
				<link rel={'shortcut icon'} href={'https://static.cocstorage.com/images/favicon.ico'} />
				<link rel={'apple-touch-icon'} href={'https://static.cocstorage.com/images/icon.png'} />
				<link rel={'canonical'} href={'https://www.cocstorage.com'} />
				<link rel={'manifest'} href={'/manifest.json'} />
			</Head>
			<Container className={classes.container}>
				<Box className={classes.containerBox}>
					<Grid container spacing={1}>
						<Grid item xs={12} lg={6}>
							<HomeLatestStorageBoardList />
						</Grid>
						<Grid item xs={12} lg={6}>
							<HomePopularStorageBoardList />
						</Grid>
					</Grid>
				</Box>
			</Container>
			<HomeStorageGridList />
			<HomeNoticeGridList />
			<Box className={classes.box} />
		</>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
	store.dispatch(fetchNotices());
	store.dispatch(fetchStorages());
	store.dispatch(fetchLatestStorageBoards());
	store.dispatch(fetchPopularStorageBoards());

	store.dispatch(END);
	await (store as any).sagaTask.toPromise();

	return {
		props: {}
	};
});

export default Index;
