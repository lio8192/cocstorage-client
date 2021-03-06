import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
	createStyles, makeStyles, Theme, useTheme
} from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

// Material UI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';

// Components
import MyPageHeader from 'components/mypage/MyPageHeader';
import MyPageMenu from 'components/mypage/MyPageMenu';
import MyInfoForm from 'components/mypage/MyInfoForm';
import MyWithdrawalForm from 'components/mypage/MyWithdrawalForm';

// Custom Hooks
import useMyPage from 'hooks/mypage/useMyPage';

interface TabPanelProps {
	children: React.ReactNode;
	index: any;
	value: any;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginTop: theme.spacing(3),
			[theme.breakpoints.down('md')]: {
				marginTop: theme.spacing(0)
			}
		},
		tabs: {
			backgroundColor: theme.palette.background.paper,
			'& *': {
				fontFamily: 'NanumSquareRoundEB'
			},
			'& .MuiTabs-indicator': {
				height: 5
			}
		},
		grid: {
			backgroundColor: 'white'
		},
		linearProgress: {
			position: 'fixed',
			width: '100%',
			top: 0,
			height: 5,
			zIndex: 10000
		}
	})
);

function TabPanel(props: TabPanelProps) {
	const {
		children, value, index, ...other
	} = props;

	return (
		<Box role={'tabpanel'} hidden={value !== index} {...other}>
			{value === index && children}
		</Box>
	);
}

function MyPage() {
	const classes = useStyles();
	const router = useRouter();
	const theme = useTheme();
	const {
		pending,
		activatedTab,
		user: { isAuthenticated },
		onChangeMyPageTab,
		onClearPrivacy
	} = useMyPage();
	const { enqueueSnackbar } = useSnackbar();

	const isMounted = useRef(false);

	useEffect(() => {
		isMounted.current = true;
	}, []);

	useEffect(() => {
		if (isMounted.current && !isAuthenticated) {
			router.push('/', '/').then(() => {
				enqueueSnackbar('???????????? ?????? ???????????????.', { variant: 'warning' });
			});
		}
	}, [router, enqueueSnackbar, isAuthenticated, isMounted]);

	useEffect(
		() => () => {
			onClearPrivacy();
		},
		[onClearPrivacy]
	);

	return (
		<>
			<Head>
				<meta charSet={'utf-8'} />
				<meta name={'viewport'} content={'minimum-scale=1, initial-scale=1, width=device-width'} />
				<meta httpEquiv={'content-language'} content={'ko'} />
				<meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'} />
				<meta name={'author'} content={'????????? ?????????'} />
				<meta name={'title'} content={'??????????????? : ????????? ?????????'} />
				<meta name={'description'} content={'?????? ????????? ?????? ?????? ????????? ??? ?????? ???????????????.'} />
				<meta property={'og:title'} content={'??????????????? : ????????? ?????????'} />
				<meta property={'og:description'} content={'?????? ????????? ?????? ?????? ????????? ??? ?????? ???????????????.'} />
				<meta property={'og:type'} content={'website'} />
				<meta property={'og:image'} content={'https://static.cocstorage.com/images/icon.png'} />
				<meta property={'og:url'} content={'https://www.cocstorage.com/mypage'} />
				<meta property={'og:site_name'} content={'??????????????? : ????????? ?????????'} />
				<meta property={'og:locale'} content={'ko_KR'} />
				<meta property={'twitter:title'} content={'??????????????? : ????????? ?????????'} />
				<meta property={'twitter:description'} content={'?????? ????????? ?????? ?????? ????????? ??? ?????? ???????????????.'} />
				<meta property={'twitter:image'} content={'https://static.cocstorage.com/images/icon.png'} />
				<meta property={'twitter:url'} content={'https://www.cocstorage.com/notices'} />
				<meta property={'twitter:card'} content={'summary'} />
				<meta name={'apple-mobile-web-app-title'} content={'??????????????? : ????????? ?????????'} />
				<meta name={'theme-color'} content={theme.palette.primary.main} />
				<title>{'??????????????? : ????????? ?????????'}</title>
				<link rel={'canonical'} href={'https://www.cocstorage.com/mypage'} />
				<link rel={'shortcut icon'} href={'https://static.cocstorage.com/images/favicon.ico'} />
				<link rel={'apple-touch-icon'} href={'https://static.cocstorage.com/images/icon.png'} />
				<link rel={'manifest'} href={'/manifest.json'} />
			</Head>
			<Fade in={pending}>
				<LinearProgress className={classes.linearProgress} color={'primary'} />
			</Fade>
			<Hidden lgUp>
				<Tabs
					className={classes.tabs}
					value={activatedTab}
					indicatorColor={'primary'}
					textColor={'primary'}
					onChange={onChangeMyPageTab}
				>
					<Tab label={'?????? ??????'} />
					<Tab label={'?????? ??????'} />
				</Tabs>
			</Hidden>
			<MyPageHeader />
			<Container className={classes.root}>
				<Grid container spacing={3}>
					<Grid item xs={12} lg={3}>
						<MyPageMenu />
					</Grid>
					<Grid item xs={12} lg={9}>
						<TabPanel index={0} value={activatedTab}>
							<MyInfoForm />
						</TabPanel>
						<TabPanel index={1} value={activatedTab}>
							<MyWithdrawalForm />
						</TabPanel>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default MyPage;
