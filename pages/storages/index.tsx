import React, { useEffect } from 'react';
import Head from 'next/head';
import {
	createStyles, makeStyles, Theme, useTheme
} from '@material-ui/core/styles';

// Material UI
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import Pagination from '@material-ui/lab/Pagination';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Material UI Icons
import AddBoxIcon from '@material-ui/icons/AddBox';
import SearchIcon from '@material-ui/icons/Search';

// Components
import StorageHeader from 'components/storages/StorageHeader';
import StorageGridList from 'components/storages/StorageGridList';
import StorageManageDialog from 'components/storages/StorageManageDialog';
import GoogleAdSense from 'components/common/GoogleAdSense';

// Custom Hooks
import useStorages from 'hooks/storages/useStorages';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			backgroundColor: 'white'
		},
		storageContainer: {
			backgroundColor: 'white',
			paddingTop: theme.spacing(2)
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
			color: 'white',
			fontFamily: 'NanumSquareRoundEB'
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
				border: 'none',
				borderRadius: 'inherit'
			}
		}
	})
);

function Storages() {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const isXsMobile = useMediaQuery(theme.breakpoints.down('xs'));
	const {
		pending,
		pagination: { totalPages, currentPage },
		fetchParams: { name },
		isAuthenticated,
		onFetchStorages,
		onKeyUpStorageSearchTextField,
		onHandlePagination,
		onHandleStorageManageDialogOpen,
		onHandleSignInDialog
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
				<meta name={'title'} content={'커뮤니티 저장소 : 개념글 저장소'} />
				<meta name={'description'} content={'다양한 주제의 저장소를 이용해보거나 자신만의 저장소를 운영해보세요!'} />
				<meta property={'og:title'} content={'저장소 : 개념글 저장소'} />
				<meta
					property={'og:description'}
					content={'다양한 주제의 저장소를 이용해보거나 자신만의 저장소를 운영해보세요!'}
				/>
				<meta property={'og:type'} content={'website'} />
				<meta property={'og:image'} content={'https://static.cocstorage.com/images/icon.png'} />
				<meta property={'og:url'} content={'https://www.cocstorage.com/storages'} />
				<meta property={'og:site_name'} content={'커뮤니티 저장소 : 개념글 저장소'} />
				<meta property={'og:locale'} content={'ko_KR'} />
				<meta property={'twitter:title'} content={'커뮤니티 저장소 : 개념글 저장소'} />
				<meta
					property={'twitter:description'}
					content={'다양한 주제의 저장소를 이용해보거나 자신만의 저장소를 운영해보세요!'}
				/>
				<meta property={'twitter:image'} content={'https://static.cocstorage.com/images/icon.png'} />
				<meta property={'twitter:url'} content={'https://www.cocstorage.com/storages'} />
				<meta property={'twitter:card'} content={'summary'} />
				<meta name={'apple-mobile-web-app-title'} content={'커뮤니티 저장소 : 개념글 저장소'} />
				<meta name={'theme-color'} content={theme.palette.primary.main} />
				<title>{'커뮤니티 저장소 : 개념글 저장소'}</title>
				<link rel={'canonical'} href={'https://www.cocstorage.com/storages'} />
				<link rel={'shortcut icon'} href={'https://static.cocstorage.com/images/favicon.ico'} />
				<link rel={'apple-touch-icon'} href={'https://static.cocstorage.com/images/icon.png'} />
				<link rel={'manifest'} href={'/manifest.json'} />
				<script async src={'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'} />
			</Head>
			<StorageHeader />
			<Container className={classes.storageContainer}>
				<StorageGridList />
			</Container>
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
					page={currentPage}
					count={totalPages}
					color={'primary'}
					shape={'rounded'}
					onChange={onHandlePagination}
					size={isXsMobile ? 'small' : 'medium'}
					siblingCount={isXsMobile ? 1 : 2}
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
						placeholder={'저장소명 입력 후 엔터를 눌러주세요.'}
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
			<StorageManageDialog />
		</>
	);
}

export default Storages;
