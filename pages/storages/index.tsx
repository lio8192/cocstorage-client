import React, { useEffect } from 'react';
import Head from 'next/head';
import {
	createStyles, makeStyles, Theme, useTheme
} from '@material-ui/core/styles';
import clsx from 'clsx';

// Material UI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import Pagination from '@material-ui/lab/Pagination';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Material UI Icons
import AddBoxIcon from '@material-ui/icons/AddBox';
import SearchIcon from '@material-ui/icons/Search';
import ForumIcon from '@material-ui/icons/Forum';
import InboxIcon from '@material-ui/icons/Inbox';

// Components
import StorageHeader from 'components/storages/StorageHeader';
import StorageGridList from 'components/storages/StorageGridList';
import StorageManageDialog from 'components/storages/StorageManageDialog';
import CollectStorageGridList from 'components/storages/CollectStorageGridList';

// Custom Hooks
import useStorages from 'hooks/storages/useStorages';
import GoogleAdSense from 'components/common/GoogleAdSense';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			backgroundColor: 'white'
		},
		storageContainer: {
			[theme.breakpoints.down('md')]: {
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
			backgroundColor: theme.palette.grey['50']
		}
	})
);

function Storages() {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const {
		pending,
		pagination: { totalPages },
		fetchParams: { page, name },
		isAuthenticated,
		pageScope,
		onFetchStorages,
		onKeyUpStorageSearchTextField,
		onHandlePagination,
		onHandleStorageManageDialogOpen,
		onHandleSignInDialog,
		onHandlePageScope,
		onHandleTabsPageScope
	} = useStorages();

	useEffect(() => {
		onFetchStorages();
	}, [onFetchStorages]);

	return (
		<>
			<Head>
				<meta charSet={'utf-8'} />
				<meta name={'viewport'} content={'minimum-scale=1, initial-scale=1, width=device-width'} />
				<meta httpEquiv={'content-language'} content={'ko'} />
				<meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'} />
				<meta name={'author'} content={'개념글 저장소'} />
				<meta name={'title'} content={'저장소 : 개념글 저장소'} />
				<meta name={'description'} content={'다양한 주제의 저장소를 이용해보거나 자신만의 저장소를 운영해보세요!'} />
				<meta property={'og:title'} content={'저장소 : 개념글 저장소'} />
				<meta
					property={'og:description'}
					content={'다양한 주제의 저장소를 이용해보거나 자신만의 저장소를 운영해보세요!'}
				/>
				<meta property={'og:type'} content={'website'} />
				<meta property={'og:image'} content={'https://static.cocstorage.com/images/icon.png'} />
				<meta property={'og:url'} content={'https://www.cocstorage.com/storages'} />
				<meta property={'og:site_name'} content={'저장소 : 개념글 저장소'} />
				<meta property={'og:locale'} content={'ko_KR'} />
				<meta property={'twitter:title'} content={'저장소 : 개념글 저장소'} />
				<meta
					property={'twitter:description'}
					content={'다양한 주제의 저장소를 이용해보거나 자신만의 저장소를 운영해보세요!'}
				/>
				<meta property={'twitter:image'} content={'https://static.cocstorage.com/images/icon.png'} />
				<meta property={'twitter:url'} content={'https://www.cocstorage.com/storages'} />
				<meta property={'twitter:card'} content={'summary'} />
				<meta name={'apple-mobile-web-app-title'} content={'저장소 : 개념글 저장소'} />
				<meta name={'theme-color'} content={theme.palette.primary.main} />
				<title>{'저장소 : 개념글 저장소'}</title>
				<link rel={'canonical'} href={'https://www.cocstorage.com/storages'} />
				<link rel={'shortcut icon'} href={'https://static.cocstorage.com/images/favicon.ico'} />
				<link rel={'apple-touch-icon'} href={'https://static.cocstorage.com/images/icon.png'} />
				<link rel={'manifest'} href={'/manifest.json'} />
				<script async src={'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'} />
			</Head>
			<StorageHeader />
			<Container className={classes.storageContainer}>
				<Hidden mdDown>
					<Box pt={2} pb={2}>
						<Grid container spacing={1}>
							<Grid item xs={6} lg={3}>
								<Button
									className={clsx({
										[classes.button]: pageScope === 'storage'
									})}
									fullWidth
									variant={'contained'}
									color={pageScope === 'storage' ? 'primary' : 'default'}
									size={'large'}
									startIcon={(
										<ForumIcon
											className={clsx({
												[classes.icon]: pageScope === 'storage'
											})}
										/>
									)}
									data-page-scope={'storage'}
									onClick={onHandlePageScope}
								>
									{'커뮤니티 저장소'}
								</Button>
							</Grid>
							<Grid item xs={6} lg={3}>
								<Button
									className={clsx({
										[classes.button]: pageScope === 'collect-storage'
									})}
									fullWidth
									variant={'contained'}
									color={pageScope === 'collect-storage' ? 'primary' : 'default'}
									size={'large'}
									startIcon={(
										<InboxIcon
											className={clsx({
												[classes.icon]: pageScope === 'collect-storage'
											})}
										/>
									)}
									data-page-scope={'collect-storage'}
									onClick={onHandlePageScope}
								>
									{'수집 저장소'}
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Hidden>
				<Hidden lgUp>
					<>
						<Tabs
							className={classes.tabs}
							value={pageScope}
							indicatorColor={'primary'}
							textColor={'primary'}
							onChange={onHandleTabsPageScope}
						>
							<Tab label={'커뮤니티 저장소'} value={'storage'} disabled={pending} />
							<Tab label={'수집 저장소'} value={'collect-storage'} disabled={pending} />
						</Tabs>
						<Divider />
					</>
				</Hidden>
			</Container>
			<Container className={classes.storageContainer}>
				{pageScope === 'storage' ? (
					<>
						<StorageGridList />
						<Hidden lgUp>
							<Divider />
						</Hidden>
					</>
				) : (
					<Box mb={2}>
						<CollectStorageGridList />
						<Hidden lgUp>
							<Divider />
						</Hidden>
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
				)}
			</Container>
			{pageScope === 'storage' && (
				<>
					<Container className={classes.container}>
						<Box pt={2} textAlign={'right'}>
							<Button
								fullWidth={isMobile}
								className={classes.button}
								variant={'contained'}
								color={'primary'}
								startIcon={<AddBoxIcon />}
								size={'large'}
								onClick={isAuthenticated ? onHandleStorageManageDialogOpen : onHandleSignInDialog}
								disabled={pending}
							>
								{'새 저장소 등록'}
							</Button>
						</Box>
						<Pagination
							className={classes.pagination}
							page={page}
							count={totalPages}
							color={'primary'}
							shape={'rounded'}
							onChange={onHandlePagination}
							size={isMobile ? 'small' : 'medium'}
							siblingCount={isMobile ? 0 : 2}
							disabled={pending}
						/>
						<Box pb={2}>
							<TextField
								fullWidth
								type={'search'}
								variant={'outlined'}
								InputProps={{
									startAdornment: (
										<InputAdornment position={'start'}>
											<SearchIcon color={'action'} />
										</InputAdornment>
									)
								}}
								placeholder={'저장소명으로 검색'}
								onKeyUp={onKeyUpStorageSearchTextField}
								defaultValue={name || ''}
								disabled={pending}
							/>
						</Box>
						<Hidden mdDown>
							<Box mb={2}>
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
						</Hidden>
					</Container>
					<Hidden lgUp>
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
					</Hidden>
				</>
			)}
			<StorageManageDialog />
		</>
	);
}

export default Storages;
