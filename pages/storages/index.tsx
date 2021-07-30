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
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Material UI Icons
import AddBoxIcon from '@material-ui/icons/AddBox';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';

// Components
import StorageHeader from 'components/storages/StorageHeader';
import StorageGridList from 'components/storages/StorageGridList';
import StorageManageDialog from 'components/storages/StorageManageDialog';

// Custom Hooks
import useStorages from 'hooks/storages/useStorages';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		box: {
			marginTop: theme.spacing(2),
			[theme.breakpoints.down('md')]: {
				marginTop: 0,
				paddingTop: theme.spacing(2)
			}
		},
		container: {
			marginBottom: theme.spacing(2)
		},
		card: {
			border: `1px solid ${theme.palette.grey['50']}`
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
			verticalAlign: 'middle',
			color: 'white'
		},
		button: {
			color: 'white',
			fontFamily: 'NanumSquareRoundEB'
		},
		searchBox: {
			display: 'none',
			margin: theme.spacing(2, 0),
			borderRadius: 4,
			overflow: 'hidden',
			[theme.breakpoints.down('md')]: {
				margin: 0,
				padding: theme.spacing(2, 0)
			}
		},
		fab: {
			position: 'fixed',
			bottom: 75,
			right: 15
		}
	})
);

function Storages() {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const {
		pending,
		fetchParams: { name },
		isAuthenticated,
		onFetchStorages,
		onKeyUpStorageSearchTextField,
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
				<meta name={'title'} content={'커뮤니티 : 개념글 저장소'} />
				<meta name={'description'} content={'원하는 게시판을 만들어 운영해보세요!'} />
				<meta property={'og:title'} content={'저장소 : 개념글 저장소'} />
				<meta property={'og:description'} content={'원하는 게시판을 만들어 운영해보세요!'} />
				<meta property={'og:type'} content={'website'} />
				<meta property={'og:image'} content={'https://static.cocstorage.com/images/icon.png'} />
				<meta property={'og:url'} content={'https://www.cocstorage.com/storages'} />
				<meta property={'og:site_name'} content={'커뮤니티 : 개념글 저장소'} />
				<meta property={'og:locale'} content={'ko_KR'} />
				<meta property={'twitter:title'} content={'커뮤니티 : 개념글 저장소'} />
				<meta property={'twitter:description'} content={'원하는 게시판을 만들어 운영해보세요!'} />
				<meta property={'twitter:image'} content={'https://static.cocstorage.com/images/icon.png'} />
				<meta property={'twitter:url'} content={'https://www.cocstorage.com/storages'} />
				<meta property={'twitter:card'} content={'summary'} />
				<meta name={'apple-mobile-web-app-title'} content={'커뮤니티 : 개념글 저장소'} />
				<meta name={'theme-color'} content={theme.palette.primary.main} />
				<title>{'커뮤니티 : 개념글 저장소'}</title>
				<link rel={'canonical'} href={'https://www.cocstorage.com/storages'} />
				<link rel={'shortcut icon'} href={'https://static.cocstorage.com/images/favicon.ico'} />
				<link rel={'apple-touch-icon'} href={'https://static.cocstorage.com/images/icon.png'} />
				<link rel={'manifest'} href={'/manifest.json'} />
				<script async src={'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'} />
			</Head>
			<Hidden mdDown>
				<StorageHeader />
			</Hidden>
			<Box className={classes.box}>
				<Container className={classes.container}>
					<StorageGridList />
				</Container>
				<Container>
					<Hidden mdDown>
						<Box mb={2} textAlign={'right'}>
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
								{'새 게시판 등록'}
							</Button>
						</Box>
					</Hidden>
					<Box className={classes.searchBox}>
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
							placeholder={'게시판명 입력 후 엔터를 눌러주세요.'}
							onKeyUp={onKeyUpStorageSearchTextField}
							defaultValue={name || ''}
							disabled={pending}
						/>
					</Box>
				</Container>
			</Box>
			<StorageManageDialog />
			<Zoom in={isMobile}>
				<Fab
					className={classes.fab}
					color={'primary'}
					onClick={isAuthenticated ? onHandleStorageManageDialogOpen : onHandleSignInDialog}
					disabled={pending}
				>
					<AddIcon className={classes.icon} />
				</Fab>
			</Zoom>
		</>
	);
}

export default Storages;
