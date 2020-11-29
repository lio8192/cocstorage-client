import React, { useEffect } from 'react';
import { NextPageContext } from 'next';
import Head from 'next/head';
import {
	createStyles, makeStyles, Theme, useTheme
} from '@material-ui/core/styles';

// Material UI
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

// Modules
import {
	fetchNotices, fetchStorages, fetchLatestStorageBoards, fetchPopularStorageBoards
} from 'modules/home';

// Components
import HomeNoticeGridList from 'components/home/HomeNoticeGridList';
import HomeStorageGridList from 'components/home/HomeStorageGridList';
import HomeBoardCardListSwiper from 'components/home/HomeBoardCardListSwiper';
import HomeBoardCardList from 'components/home/HomeBoardCardList';
import HomeLatestStorageBoardList from 'components/home/HomeLatestStorageBoardList';
import HomePopularStorageBoardList from 'components/home/HomePopularStorageBoardList';

// Custom Hooks
import useHome from 'hooks/home/useHome';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			[theme.breakpoints.down('md')]: {
				padding: 0
			}
		},
		containerBox: {
			marginTop: theme.spacing(2),
			[theme.breakpoints.down('md')]: {
				margin: 0
			}
		}
	})
);

function Index() {
	const classes = useStyles();
	const theme = useTheme();
	const {
		previousState: { boardList, dailyPopularList, pending },
		onFetchMainContents
	} = useHome();

	useEffect(() => {
		onFetchMainContents();
	}, [onFetchMainContents]);

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
			<Hidden implementation={'css'} smDown>
				<HomeBoardCardListSwiper boardList={dailyPopularList} pending={pending} />
			</Hidden>
			<Hidden implementation={'css'} mdUp>
				<HomeBoardCardList title={'수집 저장소 일간 개념글'} boardList={dailyPopularList} pending={pending} />
			</Hidden>
			<HomeBoardCardList title={'수집 저장소 새로운 개념글'} boardList={boardList} pending={pending} />
		</>
	);
}

Index.getInitialProps = async ({ store }: NextPageContext) => {
	const {
		home: {
			notices: { pending: noticesPending },
			storages: { pending: storagesPending },
			latestStorageBoards: { pending: latestStorageBoardsPending },
			popularStorageBoards: { pending: popularStorageBoardsPending }
		}
	} = store.getState();

	if (!noticesPending) {
		store.dispatch(fetchNotices());
	}

	if (!storagesPending) {
		store.dispatch(fetchStorages());
	}

	if (!latestStorageBoardsPending) {
		store.dispatch(fetchLatestStorageBoards());
	}

	if (!popularStorageBoardsPending) {
		store.dispatch(fetchPopularStorageBoards());
	}

	return {
		store
	};
};

export default Index;
