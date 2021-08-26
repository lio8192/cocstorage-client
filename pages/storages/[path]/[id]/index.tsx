import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import {
	createStyles, makeStyles, Theme, useTheme
} from '@material-ui/core/styles';
import { NextPageContext } from 'next';

// Material UI
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import Pagination from '@material-ui/lab/Pagination';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// eslint-disable-next-line import/no-unresolved
import { TransitionProps } from '@material-ui/core/transitions';

// Material UI Icons
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import SearchIcon from '@material-ui/icons/Search';

// Material UI Labs
import Skeleton from '@material-ui/lab/Skeleton';

// Modules
import { fetchStorageDetailAndStorageBoardDetail } from 'modules/storages/board/detail';
import { END } from 'redux-saga';
import wrapper from 'modules/store';

// Components
import DetailContent from 'components/storages/board/detail/DetailContent';
import DetailCommentList from 'components/storages/board/detail/DetailCommentList';
import DetailCommentWriteForm from 'components/storages/board/detail/DetailCommentWriteForm';
import PasswordAuthDialog from 'components/common/PasswordAuthDialog';
import GoogleAdSense from 'components/common/GoogleAdSense';
import BoardList from 'components/storages/board/BoardList';

// Custom Hooks
import useStorageBoardDetail from 'hooks/storages/board/detail/useStorageBoardDetail';
import useStorageBoard from 'hooks/storages/board/useStorageBoard';

// Snippets
import { getParams } from 'snippets/common';
import { getSearchTypeLabelByType } from 'snippets/storageBoard';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			[theme.breakpoints.down('md')]: {
				padding: 0
			}
		},
		grid: {
			borderRight: '1px solid rgba(0, 0, 0, 0.23)',
			[theme.breakpoints.down('md')]: {
				borderColor: theme.palette.grey['50']
			}
		},
		pagination: {
			padding: theme.spacing(2),
			'& > ul': {
				justifyContent: 'center',
				'& *': {
					color: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.5)' : ''
				},
				'& .Mui-selected': {
					color: 'white'
				}
			}
		},
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			color: '#fff'
		},
		snackbar: {
			[theme.breakpoints.down('md')]: {
				bottom: theme.spacing(8)
			}
		},
		adBox: {
			border: `1px solid ${theme.palette.grey['50']}`,
			borderRadius: 4,
			overflow: 'hidden',
			[theme.breakpoints.down('md')]: {
				border: 'none',
				borderTop: `1px solid ${theme.palette.grey['50']}`,
				borderRadius: 'inherit'
			}
		},
		boardListBox: {
			margin: theme.spacing(2, 0),
			[theme.breakpoints.down('md')]: {
				margin: 0
			}
		},
		tabs: {
			'& *': {
				fontFamily: 'NanumSquareRoundEB'
			},
			'& .MuiTabs-indicator': {
				height: 5
			},
			[theme.breakpoints.down('md')]: {
				backgroundColor: theme.palette.background.paper
			}
		},
		searchBox: {
			margin: theme.spacing(0, 0, 2),
			[theme.breakpoints.down('md')]: {
				margin: theme.spacing(0, 2, 2)
			}
		},
		searchBoxInputBase: {
			padding: 0
		},
		popper: {
			zIndex: 10
		}
	})
);

function SlideTransition(props: TransitionProps) {
	return <Slide {...props} direction={'up'} />;
}

function StorageBoardDetail({ query }: NextPageContext) {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const {
		detail: {
			id: storageBoardId,
			storage: {
				id: storageId, path, name, avatarUrl
			},
			user,
			nickname,
			subject,
			description,
			isMember,
			thumbnailUrl
		},
		recommend: {
			open,
			message,
			error: { open: errorOpen, message: errorMessage },
			pending: recommendPending
		},
		comments: { pending, pagination },
		manage: {
			pending: deleteAuthPending,
			deleteAuth: { open: deleteAuthDialogOpen, subTitle }
		},
		deleteAuthDialogBody,
		showPassword,
		onPutStorageBoardDetailViewCount,
		onShowDeleteAuthDialogPassword,
		onCloseStorageBoardDetailRecommendSnackbar,
		onCloseStorageBoardDetailRecommendErrorSnackbar,
		onFetchStorageBoardDetailComments,
		onFetchStorageBoards,
		onHandleStorageBoardDetailCommentsPagination,
		onHandleDeleteAuthDialog,
		onHandleDeleteAuthDialogTextField,
		onDeleteNonMemberStorageBoardDetail
	} = useStorageBoardDetail();
	const {
		orderType,
		pagination: storageBoardPagination,
		searchType,
		searchValue,
		open: storageBoardOpen,
		setOpen,
		onChangeOrderBy,
		onHandlePagination,
		onClickSearchType,
		onClickStorageBoardsSearchButton,
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
		if (storageId !== 0 && storageBoardId !== 0) {
			onPutStorageBoardDetailViewCount();
			onFetchStorageBoardDetailComments();
			onFetchStorageBoards(query);
		}
	}, [
		storageId,
		storageBoardId,
		onPutStorageBoardDetailViewCount,
		onFetchStorageBoardDetailComments,
		onFetchStorageBoards,
		query
	]);

	return (
		<>
			<Head>
				<meta charSet={'utf-8'} />
				<meta name={'viewport'} content={'minimum-scale=1, initial-scale=1, width=device-width'} />
				<meta httpEquiv={'content-language'} content={'ko'} />
				<meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'} />
				<meta name={'author'} content={isMember ? user?.nickname : nickname || '개념글 저장소'} />
				<meta name={'title'} content={subject ? `${subject} : ${name} : 개념글 저장소` : '개념글 저장소'} />
				<meta name={'description'} content={description ? description.substr(9, 159) : ''} />
				<meta property={'og:title'} content={subject ? `${subject} : ${name} : 개념글 저장소` : '개념글 저장소'} />
				<meta property={'og:description'} content={description ? description.substr(9, 159) : ''} />
				<meta property={'og:type'} content={'website'} />
				<meta
					property={'og:image'}
					content={thumbnailUrl || avatarUrl || 'https://static.cocstorage.com/images/icon.png'}
				/>
				<meta
					property={'og:url'}
					content={
						path
							? `https://www.cocstorage.com/storages/${path}/${storageBoardId}`
							: 'https://www.cocstorage.com/storages'
					}
				/>
				<meta property={'og:site_name'} content={name ? `${name} : 개념글 저장소` : '개념글 저장소'} />
				<meta property={'og:locale'} content={'ko_KR'} />
				<meta property={'twitter:title'} content={subject ? `${subject} : ${name} : 개념글 저장소` : '개념글 저장소'} />
				<meta property={'twitter:description'} content={description ? description.substr(9, 159) : ''} />
				<meta
					property={'twitter:image'}
					content={thumbnailUrl || avatarUrl || 'https://static.cocstorage.com/images/icon.png'}
				/>
				<meta
					property={'twitter:url'}
					content={
						path
							? `https://www.cocstorage.com/storages/${path}/${storageBoardId}`
							: 'https://www.cocstorage.com/storages'
					}
				/>
				<meta property={'twitter:card'} content={'summary'} />
				<meta name={'apple-mobile-web-app-title'} content={subject ? `${subject} : ${name}` : '개념글 저장소'} />
				<meta name={'theme-color'} content={theme.palette.primary.main} />
				<title>{subject ? `${subject} : ${name} : 개념글 저장소` : '개념글 저장소'}</title>
				<link
					rel={'canonical'}
					href={
						path
							? `https://www.cocstorage.com/storages/${path}/${storageBoardId}`
							: 'https://www.cocstorage.com/storages'
					}
				/>
				<link rel={'shortcut icon'} href={avatarUrl || 'https://static.cocstorage.com/images/favicon.ico'} />
				<link rel={'apple-touch-icon'} href={avatarUrl || 'https://static.cocstorage.com/images/icon.png'} />
				<link rel={'manifest'} href={'/manifest.json'} />
				<script async src={'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'} />
			</Head>
			<Container className={classes.root}>
				<Grid container>
					<Grid item xs={12} sm={12} md={12} lg={12}>
						<DetailContent />
						<Box className={classes.adBox}>
							<GoogleAdSense
								html={
									'<ins class="adsbygoogle"'
									+ 'style="display:block"'
									+ 'data-ad-client="ca-pub-5809905264951057"'
									+ 'data-ad-slot="8033291397"'
									+ 'data-ad-format="auto"'
									+ 'data-full-width-responsive="true"></ins>'
								}
								color={'default'}
							/>
						</Box>
						<DetailCommentList />
						{pending && (
							<Box display={'flex'} justifyContent={'center'} p={2} pt={1.5}>
								<Box ml={1}>
									<Skeleton width={30} height={40} animation={'wave'} />
								</Box>
								<Box ml={1}>
									<Skeleton width={30} height={40} animation={'wave'} />
								</Box>
								<Box ml={1}>
									<Skeleton width={30} height={40} animation={'wave'} />
								</Box>
								<Box ml={1}>
									<Skeleton width={30} height={40} animation={'wave'} />
								</Box>
								<Box ml={1}>
									<Skeleton width={30} height={40} animation={'wave'} />
								</Box>
							</Box>
						)}
						{!pending && pagination.totalPages > 0 && (
							<Pagination
								className={classes.pagination}
								page={pagination.currentPage}
								count={pagination.totalPages}
								color={'primary'}
								shape={'rounded'}
								onChange={onHandleStorageBoardDetailCommentsPagination}
								size={isMobile ? 'small' : 'medium'}
								siblingCount={isMobile ? 1 : 2}
							/>
						)}
						<Hidden mdDown>{!pending && pagination.totalPages === 0 && <Box mt={2} mb={2} />}</Hidden>
						<DetailCommentWriteForm />
						<Box className={classes.adBox}>
							<GoogleAdSense
								html={
									'<ins class="adsbygoogle"'
									+ 'style="display:block"'
									+ 'data-ad-client="ca-pub-5809905264951057"'
									+ 'data-ad-slot="8033291397"'
									+ 'data-ad-format="auto"'
									+ 'data-full-width-responsive="true"></ins>'
								}
								color={'default'}
							/>
						</Box>
						<Box className={classes.boardListBox}>
							<Tabs
								className={classes.tabs}
								value={orderType}
								indicatorColor={'primary'}
								textColor={'primary'}
								onChange={onChangeOrderBy}
							>
								<Tab label={'최신 게시글'} value={'latest'} disabled={pending} />
								<Tab label={'인기 게시글'} value={'popular'} disabled={pending} />
							</Tabs>
							<BoardList params={getParams(query)} adOpen={false} searchValue={searchValue} />
							{storageBoardPagination.totalPages > 0 ? (
								<Pagination
									className={classes.pagination}
									page={storageBoardPagination.currentPage}
									count={storageBoardPagination.totalPages || 0}
									color={'primary'}
									shape={'rounded'}
									onChange={onHandlePagination}
									size={isMobile ? 'small' : 'medium'}
									siblingCount={isMobile ? 1 : 2}
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
										className: classes.searchBoxInputBase,
										startAdornment: (
											<InputAdornment position={'end'}>
												<Box component={'span'} mr={1}>
													<Button ref={anchorRef} variant={'outlined'} onClick={handleToggle}>
														{getSearchTypeLabelByType(searchType)}
													</Button>
												</Box>
												<Popper
													className={classes.popper}
													open={storageBoardOpen}
													anchorEl={anchorRef.current}
													role={undefined}
													transition
													disablePortal
												>
													{({ TransitionProps: PopperTransitionProps, placement }) => (
														<Grow
															{...PopperTransitionProps}
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
										),
										endAdornment: (
											<InputAdornment position={'start'}>
												<IconButton onClick={onClickStorageBoardsSearchButton}>
													<SearchIcon color={'action'} />
												</IconButton>
											</InputAdornment>
										)
									}}
									onChange={onChangeStorageBoardSearchTextField}
									value={searchValue}
									disabled={pending}
								/>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Container>
			<PasswordAuthDialog
				open={deleteAuthDialogOpen}
				pending={deleteAuthPending}
				subTitle={subTitle}
				passwordAuthDialogBody={deleteAuthDialogBody}
				showPassword={showPassword}
				onShowPasswordAuthDialogPassword={onShowDeleteAuthDialogPassword}
				onHandlePasswordAuthDialogTextField={onHandleDeleteAuthDialogTextField}
				onHandlePasswordAuthDialog={onHandleDeleteAuthDialog}
				onRequestPasswordAuth={onDeleteNonMemberStorageBoardDetail}
			/>
			<Snackbar
				className={classes.snackbar}
				open={open}
				onClose={onCloseStorageBoardDetailRecommendSnackbar}
				TransitionComponent={SlideTransition}
				autoHideDuration={1500}
			>
				<Alert icon={<ThumbsUpDownIcon fontSize={'inherit'} />} severity={'info'}>
					{message}
				</Alert>
			</Snackbar>
			<Snackbar
				className={classes.snackbar}
				open={errorOpen}
				onClose={onCloseStorageBoardDetailRecommendErrorSnackbar}
				TransitionComponent={SlideTransition}
				autoHideDuration={1500}
			>
				<Alert severity={'error'}>{errorMessage}</Alert>
			</Snackbar>
			<Backdrop className={classes.backdrop} open={recommendPending}>
				<CircularProgress color={'inherit'} />
			</Backdrop>
		</>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, query }) => {
	store.dispatch(fetchStorageDetailAndStorageBoardDetail({ storageId: String(query.path), id: Number(query.id) }));

	store.dispatch(END);
	await (store as any).sagaTask.toPromise();

	return {
		props: {
			query
		}
	};
});

export default StorageBoardDetail;
