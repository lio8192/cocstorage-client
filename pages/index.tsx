import React from 'react';
import { NextPageContext } from 'next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Head from 'next/head';

// Material UI Components
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';

// Modules
import { fetchMainContents } from '../src/modules/home';

// Components
import DailyPopularBoardSwiper from '../src/components/index/DailyPopularBoardSwiper';
import DailyPopularBoardCardList from '../src/components/index/DailyPopularBoardCardList';
import LatestBoardCardList from '../src/components/index/LatestBoardCardList';
import NoticeCard from '../src/components/common/NoticeCard';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		noticeContainer: {
			[theme.breakpoints.down('md')]: {
				padding: 0
			}
		},
		noticeCardBox: {
			marginTop: theme.spacing(2),
			[theme.breakpoints.down('md')]: {
				marginTop: 0,
				paddingTop: theme.spacing(1)
			}
		}
	})
);

function Index() {
	const classes = useStyles();

	return (
		<>
			<Head>
				<meta charSet={'utf-8'} />
				<meta httpEquiv={'content-language'} content={'ko'} />
				<meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'} />
				<meta name={'author'} content={'개념글 저장소'} />
				<meta name={'title'} content={'개념글 저장소'} />
				<meta name={'description'} content={'인기와 유머를 겸비한 게시글들을 한 눈에 확인해보세요!'} />
				<meta property={'og:title'} content={'개념글 저장소'} />
				<meta property={'og:description'} content={'인기와 유머를 겸비한 게시글들을 한 눈에 확인해보세요!'} />
				<meta property={'og:type'} content={'website'} />
				<meta property={'og:image'} content={'/logo_prev.png'} />
				<meta property={'og:url'} content={'https://www.cocstorage.com'} />
				<meta property={'og:site_name'} content={'개념글 저장소'} />
				<meta property={'og:locale'} content={'ko_KR'} />
				<meta property={'twitter:title'} content={'개념글 저장소'} />
				<meta property={'twitter:description'} content={'인기와 유머를 겸비한 게시글들을 한 눈에 확인해보세요!'} />
				<meta property={'twitter:image'} content={'/logo_prev.png'} />
				<meta property={'twitter:url'} content={'https://wwww.cocstorage.com'} />
				<meta property={'twitter:card'} content={'summary'} />
				<meta name={'apple-mobile-web-app-title'} content={'개념글 저장소'} />
				<title>{'개념글 저장소'}</title>
				<link rel={'shortcut icon'} href={'/favicon.ico'} />
				<link rel={'apple-touch-icon'} href={'/logo_prev.png'} />
				<link rel={'canonical'} href={'https://www.cocstorage.com'} />
				<link rel={'manifest'} href={'/manifest.json'} />
			</Head>
			<Container className={classes.noticeContainer}>
				<Box className={classes.noticeCardBox}>
					<NoticeCard />
				</Box>
			</Container>
			<Hidden implementation={'css'} smDown>
				<DailyPopularBoardSwiper />
			</Hidden>
			<Hidden implementation={'css'} mdUp>
				<DailyPopularBoardCardList />
			</Hidden>
			<LatestBoardCardList />
		</>
	);
}

Index.getInitialProps = async ({ store }: NextPageContext) => {
	store.dispatch(fetchMainContents());

	return {
		store
	};
};

export default Index;
