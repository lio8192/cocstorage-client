import React from 'react';
import Head from 'next/head';
import {
	createStyles, makeStyles, Theme, useTheme
} from '@material-ui/core/styles';

// Material UI
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Components
import BoardHeader from 'components/board/BoardHeader';
import CollectStorageGridList from 'components/storages/CollectStorageGridList';
import GoogleAdSense from 'components/common/GoogleAdSense';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			backgroundColor: 'white'
		},
		boardContainer: {
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(2),
			[theme.breakpoints.down('md')]: {
				marginTop: 0,
				marginBottom: 0,
				padding: 0
			}
		},
		box: {
			padding: theme.spacing(2, 0, 0)
		},
		card: {
			border: '1px solid #EAEAEA'
		},
		cardContentHead: {
			padding: theme.spacing(3),
			background: 'linear-gradient(rgb(244, 245, 247) 100%, rgb(255, 255, 255) 35%, rgb(255, 255, 255) 100%)'
		},
		avatar: {
			width: theme.spacing(7),
			height: theme.spacing(7),
			marginTop: theme.spacing(-5)
		},
		typography: {
			fontWeight: 700
		},
		orderTypography: {
			fontFamily: 'NanumSquareRoundEB'
		},
		icon: {
			vertialAlign: 'middle',
			color: 'white'
		},
		button: {
			color: 'white'
		},
		pagination: {
			padding: theme.spacing(2),
			'& > ul': {
				justifyContent: 'center',
				'& *': {
					color: 'rgba(0, 0, 0, 0.5)'
				},
				'& .Mui-selected': {
					color: 'white'
				}
			}
		},
		dummyPagination: {
			paddingTop: theme.spacing(2)
		},
		tabs: {
			backgroundColor: 'white',
			'& *': {
				fontFamily: 'NanumSquareRoundEB'
			},
			'& .MuiTabs-indicator': {
				height: 5
			}
		},
		adBox: {
			border: '1px solid #EAEAEA',
			borderRadius: 4,
			backgroundColor: theme.palette.grey['50'],
			[theme.breakpoints.down('md')]: {
				border: 'none'
			}
		}
	})
);

function Board() {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<>
			<Head>
				<meta charSet={'utf-8'} />
				<meta name={'viewport'} content={'minimum-scale=1, initial-scale=1, width=device-width'} />
				<meta httpEquiv={'content-language'} content={'ko'} />
				<meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'} />
				<meta name={'author'} content={'개념글 저장소'} />
				<meta name={'title'} content={'수집 저장소 : 개념글 저장소'} />
				<meta name={'description'} content={'다양한 주제의 인기 게시글들을 한 눈에 확인해보세요!'} />
				<meta property={'og:title'} content={'수집 저장소 : 개념글 저장소'} />
				<meta property={'og:description'} content={'다양한 주제의 인기 게시글들을 한 눈에 확인해보세요!'} />
				<meta property={'og:type'} content={'website'} />
				<meta property={'og:image'} content={'https://static.cocstorage.com/images/icon.png'} />
				<meta property={'og:url'} content={'https://www.cocstorage.com/board'} />
				<meta property={'og:site_name'} content={'수집 저장소 : 개념글 저장소'} />
				<meta property={'og:locale'} content={'ko_KR'} />
				<meta property={'twitter:title'} content={'수집 저장소 : 개념글 저장소'} />
				<meta property={'twitter:description'} content={'다양한 주제의 인기 게시글들을 한 눈에 확인해보세요!'} />
				<meta property={'twitter:image'} content={'https://static.cocstorage.com/images/icon.png'} />
				<meta property={'twitter:url'} content={'https://www.cocstorage.com/board'} />
				<meta property={'twitter:card'} content={'summary'} />
				<meta name={'apple-mobile-web-app-title'} content={'수집 저장소 : 개념글 저장소'} />
				<meta name={'theme-color'} content={theme.palette.primary.main} />
				<title>{'수집 저장소 : 개념글 저장소'}</title>
				<link rel={'canonical'} href={'https://www.cocstorage.com/board'} />
				<link rel={'shortcut icon'} href={'https://static.cocstorage.com/images/favicon.ico'} />
				<link rel={'apple-touch-icon'} href={'https://static.cocstorage.com/images/icon.png'} />
				<link rel={'manifest'} href={'/manifest.json'} />
				<script async src={'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'} />
			</Head>
			<BoardHeader />
			<Container className={classes.boardContainer}>
				<Box>
					<CollectStorageGridList />
					<Box mt={isMobile ? 0 : 2}>
						<Box className={classes.adBox}>
							<GoogleAdSense
								html={
									'<ins class="adsbygoogle"\n'
									+ 'style="display:block"\n'
									+ 'data-ad-client="ca-pub-5809905264951057"\n'
									+ 'data-ad-slot="2500107460"\n'
									+ 'data-ad-format="auto"\n'
									+ 'data-full-width-responsive="true"></ins>\n'
								}
							/>
						</Box>
					</Box>
				</Box>
			</Container>
		</>
	);
}

export default Board;
