import React, { useEffect, useRef } from 'react';
import { NextPageContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import {
	createStyles, makeStyles, Theme, useTheme
} from '@material-ui/core/styles';

// Material UI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Pagination from '@material-ui/lab/Pagination';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';

// Material UI Icons
import CreateIcon from '@material-ui/icons/Create';
import SearchIcon from '@material-ui/icons/Search';

// Components
import BoardHeader from 'components/storages/board/BoardHeader';
import BoardList from 'components/storages/board/BoardList';

// Modules
import { fetchStorageDetail } from 'modules/storages/board';

// Custom Hooks
import useStorageBoard from 'hooks/storages/board/useStorageBoard';

// Snippets
import { getSearchTypeLabelByType } from 'snippets/storageBoard';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			[theme.breakpoints.down('md')]: {
				marginBottom: 1
			}
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
		container: {
			backgroundColor: 'white',
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(0)
			}
		},
		buttonBox: {
			textAlign: 'right',
			padding: theme.spacing(2, 0, 0),
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(2, 2, 0)
			}
		},
		button: {
			color: 'white',
			[theme.breakpoints.down('md')]: {
				width: '100%'
			}
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
		searchBox: {
			padding: theme.spacing(0, 0, 2),
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(0, 2, 2)
			}
		},
		linearProgress: {
			position: 'fixed',
			width: '100%',
			top: 0,
			height: 5,
			zIndex: 10000
		},
		popper: {
			zIndex: 10
		}
	})
);

function StorageBoard() {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const {
		pending,
		storage,
		pagination,
		fetchParams: { page, orderBy },
		fetchSearchParams: { type },
		open,
		searchValue,
		setOpen,
		onFetchStorageBoards,
		onHandlePagination,
		onClickSearchType,
		onKeyUpStorageBoardsSearchTextField,
		onChangeOrderBy,
		onChangeStorageBoardSearchTextField
	} = useStorageBoard();

	const anchorRef = React.useRef<HTMLButtonElement>(null);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event: React.MouseEvent<EventTarget>) => {
		if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
			return;
		}

		setOpen(false);
	};

	function handleListKeyDown(event: React.KeyboardEvent) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = useRef(open);
	useEffect(() => {
		if (prevOpen.current && !open) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			anchorRef.current!.focus();
		}

		prevOpen.current = open;
	}, [open]);

	useEffect(() => {
		onFetchStorageBoards();
	}, [onFetchStorageBoards]);

	return (
		<>
			<Head>
				<meta charSet={'utf-8'} />
				<meta httpEquiv={'content-language'} content={'ko'} />
				<meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'} />
				<meta name={'author'} content={storage.user ? storage.user.nickname : '개념글 저장소'} />
				<meta name={'title'} content={storage.name ? `${storage.name} 저장소 : 개념글 저장소` : '개념글 저장소'} />
				<meta name={'description'} content={storage.description} />
				<meta
					property={'og:title'}
					content={storage.name ? `${storage.name} 저장소 : 개념글 저장소` : '개념글 저장소'}
				/>
				<meta property={'og:description'} content={storage.description} />
				<meta property={'og:type'} content={'website'} />
				<meta property={'og:image'} content={storage.avatarUrl || 'https://static.cocstorage.com/images/icon.png'} />
				<meta
					property={'og:url'}
					content={
						storage.path ? `https://www.cocstorage.com/storages/${storage.path}` : 'https://www.cocstorage.com/storages'
					}
				/>
				<meta
					property={'og:site_name'}
					content={storage.name ? `${storage.name} 저장소 : 개념글 저장소` : '개념글 저장소'}
				/>
				<meta property={'og:locale'} content={'ko_KR'} />
				<meta
					property={'twitter:title'}
					content={storage.name ? `${storage.name} 저장소 : 개념글 저장소` : '개념글 저장소'}
				/>
				<meta property={'twitter:description'} content={storage.description} />
				<meta
					property={'twitter:image'}
					content={storage.avatarUrl || 'https://static.cocstorage.com/images/icon.png'}
				/>
				<meta
					property={'twitter:url'}
					content={
						storage.path ? `https://www.cocstorage.com/storages/${storage.path}` : 'https://www.cocstorage.com/storages'
					}
				/>
				<meta property={'twitter:card'} content={'summary'} />
				<meta
					name={'apple-mobile-web-app-title'}
					content={storage.name ? `${storage.name} 저장소 : 개념글 저장소` : '개념글 저장소'}
				/>
				<meta name={'theme-color'} content={theme.palette.primary.main} />
				<title>{storage.name ? `${storage.name} 저장소 : 개념글 저장소` : '개념글 저장소'}</title>
				<link
					rel={'canonical'}
					href={
						storage.path ? `https://www.cocstorage.com/storages/${storage.path}` : 'https://www.cocstorage.com/storages'
					}
				/>
				<link rel={'shortcut icon'} href={storage.avatarUrl || 'https://static.cocstorage.com/images/favicon.ico'} />
				<link rel={'apple-touch-icon'} href={storage.avatarUrl || 'https://static.cocstorage.com/images/icon.png'} />
				<link rel={'manifest'} href={'/manifest.json'} />
				<script async src={'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'} />
			</Head>
			<Fade in={pending}>
				<LinearProgress className={classes.linearProgress} color={'primary'} />
			</Fade>
			<BoardHeader />
			<Grid className={classes.root} container>
				<Grid item xs={12}>
					<Container className={classes.container}>
						<Tabs
							className={classes.tabs}
							value={orderBy}
							indicatorColor={'primary'}
							textColor={'primary'}
							onChange={onChangeOrderBy}
						>
							<Tab label={'최신 개념글'} value={'latest'} disabled={pending} />
							<Tab label={'인기 개념글'} value={'popular'} disabled={pending} />
						</Tabs>
					</Container>
					<Container className={classes.container}>
						<BoardList />
						<Box className={classes.buttonBox}>
							<Link href={'/storages/[path]/write'} as={`/storages/${storage.path}/write`}>
								<Button
									className={classes.button}
									variant={'contained'}
									color={'primary'}
									size={'large'}
									startIcon={<CreateIcon />}
									disabled={pending}
								>
									{'새 개념글 등록'}
								</Button>
							</Link>
						</Box>
						{pagination.totalPages > 0 ? (
							<Pagination
								className={classes.pagination}
								page={page}
								count={pagination.totalPages || 0}
								color={'primary'}
								shape={'rounded'}
								onChange={onHandlePagination}
								size={isMobile ? 'small' : 'medium'}
								siblingCount={isMobile ? 0 : 2}
								disabled={pending}
							/>
						) : (
							<Box className={classes.pagination} />
						)}
						<Box className={classes.searchBox}>
							<TextField
								fullWidth
								variant={'outlined'}
								placeholder={'검색할 단어를 입력해주세요.'}
								InputProps={{
									startAdornment: (
										<InputAdornment position={'start'}>
											<SearchIcon color={'action'} />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position={'end'}>
											<Button ref={anchorRef} variant={'outlined'} onClick={handleToggle}>
												{getSearchTypeLabelByType(type)}
											</Button>
											<Popper
												className={classes.popper}
												open={open}
												anchorEl={anchorRef.current}
												role={undefined}
												transition
												disablePortal
											>
												{({ TransitionProps, placement }) => (
													<Grow
														{...TransitionProps}
														style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
													>
														<Paper>
															<ClickAwayListener onClickAway={handleClose}>
																<MenuList autoFocusItem={open} onKeyDown={handleListKeyDown}>
																	<MenuItem data-search-type={'all'} onClick={onClickSearchType}>
																		{'전체'}
																	</MenuItem>
																	<MenuItem data-search-type={'nickname'} onClick={onClickSearchType}>
																		{'닉네임'}
																	</MenuItem>
																	<MenuItem data-search-type={'subject'} onClick={onClickSearchType}>
																		{'제목'}
																	</MenuItem>
																	<MenuItem data-search-type={'content'} onClick={onClickSearchType}>
																		{'내용'}
																	</MenuItem>
																</MenuList>
															</ClickAwayListener>
														</Paper>
													</Grow>
												)}
											</Popper>
										</InputAdornment>
									)
								}}
								onKeyUp={onKeyUpStorageBoardsSearchTextField}
								onChange={onChangeStorageBoardSearchTextField}
								value={searchValue}
								disabled={pending}
							/>
						</Box>
					</Container>
				</Grid>
			</Grid>
		</>
	);
}

StorageBoard.getInitialProps = async ({ store, query }: NextPageContext) => {
	const {
		storageBoard: { storage }
	} = store.getState();

	if (storage.path !== String(query.path)) {
		store.dispatch(fetchStorageDetail(String(query.path)));
	}

	return {};
};

export default StorageBoard;
