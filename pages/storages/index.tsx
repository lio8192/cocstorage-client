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

// Custom Hooks
import useStorages from 'hooks/storages/useStorages';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			backgroundColor: 'white'
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
			verticalAlign: 'middle'
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
		}
	})
);

function Storages() {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const {
		pending,
		pagination: { totalPages },
		fetchParams: { page, name },
		onFetchStorages,
		onKeyUpStorageSearchTextField,
		onHandlePagination,
		onHandleStorageManageDialogOpen
	} = useStorages();

	useEffect(() => {
		onFetchStorages();
	}, [onFetchStorages]);

	return (
		<>
			<Head>
				<meta charSet={'utf-8'} />
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
				<meta property={'og:image'} content={'/logo.png'} />
				<meta property={'og:url'} content={'https://www.cocstorage.com/storages'} />
				<meta property={'og:site_name'} content={'저장소 : 개념글 저장소'} />
				<meta property={'og:locale'} content={'ko_KR'} />
				<meta property={'twitter:title'} content={'저장소 : 개념글 저장소'} />
				<meta
					property={'twitter:description'}
					content={'다양한 주제의 저장소를 이용해보거나 자신만의 저장소를 운영해보세요!'}
				/>
				<meta property={'twitter:image'} content={'https://www.cocstorage.com/logo.png'} />
				<meta property={'twitter:url'} content={'https://www.cocstorage.com/storages'} />
				<meta property={'twitter:card'} content={'summary'} />
				<meta name={'apple-mobile-web-app-title'} content={'저장소 : 개념글 저장소'} />
				<title>{'저장소 : 개념글 저장소'}</title>
				<link rel={'canonical'} href={'https://www.cocstorage.com/storages'} />
				<link rel={'shortcut icon'} href={'/favicon.ico'} />
				<link rel={'apple-touch-icon'} href={'/logo_prev.png'} />
				<link rel={'manifest'} href={'/manifest.json'} />
				<script async src={'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'} />
			</Head>
			<StorageHeader />
			<Container className={classes.container}>
				{!pending && (
					<Box pt={2}>
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
							defaultValue={name}
						/>
					</Box>
				)}
				<StorageGridList />
				<Box mt={2} textAlign={'right'}>
					<Button
						fullWidth={isMobile}
						className={classes.button}
						variant={'contained'}
						color={'primary'}
						startIcon={<AddBoxIcon />}
						size={'large'}
						onClick={onHandleStorageManageDialogOpen}
					>
						{'새 저장소 등록'}
					</Button>
				</Box>
				{!pending && totalPages > 0 ? (
					<Pagination
						className={classes.pagination}
						page={page}
						count={totalPages}
						color={'primary'}
						shape={'rounded'}
						onChange={onHandlePagination}
						size={isMobile ? 'small' : 'medium'}
						siblingCount={isMobile ? 0 : 2}
					/>
				) : (
					<Box className={classes.pagination} />
				)}
			</Container>
			<StorageManageDialog />
		</>
	);
}

export default Storages;
