import React, {
	useState, useCallback, useRef, memo
} from 'react';
import Link from 'next/link';
import {
	createStyles, fade, makeStyles, Theme, useTheme
} from '@material-ui/core/styles';
import moment from 'moment';

// Material UI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grow from '@material-ui/core/Grow';
import MuiPagination from '@material-ui/lab/Pagination';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Material UI Icons
import ImageIcon from '@material-ui/icons/Image';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SearchIcon from '@material-ui/icons/Search';

// Components
import GoogleAdSense from 'components/common/GoogleAdSense';

// Modules
import { Pagination, SearchState } from 'modules/board';
import { Board } from 'modules/boardDetail';

// Snippets
import { getSearchTypeLabelByType } from 'snippets/board';
import DataEmptyBox from 'components/common/DataEmptyBox';

moment.locale('ko');

type BoardListProps = {
	categoryId: string | string[];
	boardList: Array<Board>;
	pagination: Pagination;
	searchState: SearchState;
	onHandleSearchTypeMenuSelect: (event: React.MouseEvent<HTMLLIElement>) => void;
	onHandleSearchValueInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onHandleSearchValueInputKey: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	onHandlePagination: (event: React.ChangeEvent<unknown>, value: number) => void;
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& a': {
				textDecoration: 'none',
				color: 'inherit'
			},
			'& a:hover': {
				textDecoration: 'none',
				color: 'inherit'
			},
			'& a:visited': {
				color: theme.palette.grey.A200,
				'& *': {
					color: theme.palette.grey.A200
				}
			}
		},
		typography: {
			display: 'flex',
			alignItems: 'center',
			color: 'white',
			fontWeight: 700
		},
		icon: {
			verticalAlign: 'middle'
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
		grid: {
			alignItems: 'center',
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(0, 3),
				borderBottom: `1px solid ${theme.palette.grey['50']}`
			},
			[theme.breakpoints.down('xs')]: {
				padding: theme.spacing(0, 2)
			}
		},
		gridSkeleton: {
			alignItems: 'center',
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(0, 3)
			},
			[theme.breakpoints.down('xs')]: {
				padding: theme.spacing(0, 2)
			}
		},
		gridAd: {
			width: '100%',
			paddingTop: theme.spacing(0.7),
			textAlign: 'center',
			borderBottom: `1px solid ${theme.palette.grey['50']}`,
			backgroundColor: '#fafafa',
			'& ins': {
				marginLeft: '0 !important'
			}
		},
		gridItem: {
			padding: theme.spacing(3, 0, 0, 0)
		},
		gridItemWriterInfo: {
			textAlign: 'center',
			color: theme.palette.grey.A200
		},
		gridItemWriterInfoBox: {
			display: 'flex',
			alignItems: 'center',
			padding: theme.spacing(1, 0, 0, 0),
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(0, 0, 0.5, 0)
			}
		},
		gridItemWriterInfoBoxSkeleton: {
			display: 'flex',
			paddingBottom: theme.spacing(0.5),
			[theme.breakpoints.down('md')]: {
				'& > div:first-child': {
					marginLeft: 0
				}
			},
			[theme.breakpoints.down('sm')]: {
				marginTop: theme.spacing(-1)
			}
		},
		gridBox: {
			display: 'flex',
			justifyContent: 'center'
		},
		commentCountBox: {
			color: theme.palette.grey.A200
		},
		nickname: {
			minWidth: 80,
			maxWidth: 80,
			[theme.breakpoints.down('sm')]: {
				minWidth: 'auto',
				marginRight: theme.spacing(2)
			}
		},
		registerDate: {
			minWidth: 100,
			maxWidth: 100,
			[theme.breakpoints.down('sm')]: {
				minWidth: 'auto',
				marginRight: theme.spacing(2)
			}
		},
		thumbs: {
			minWidth: 80,
			maxWidth: 80,
			[theme.breakpoints.down('sm')]: {
				minWidth: 'auto',
				marginRight: theme.spacing(2)
			}
		},
		view: {
			minWidth: 80,
			maxWidth: 80,
			[theme.breakpoints.down('sm')]: {
				minWidth: 'auto',
				marginRight: theme.spacing(2)
			}
		},
		search: {
			position: 'relative',
			borderRadius: theme.shape.borderRadius,
			backgroundColor: fade(theme.palette.primary.main, 0.7),
			'&:hover': {
				backgroundColor: fade(theme.palette.primary.main, 1)
			},
			marginLeft: theme.spacing(1),
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				width: 'auto'
			},
			color: 'white'
		},
		searchIcon: {
			padding: theme.spacing(0, 2),
			height: '100%',
			position: 'absolute',
			pointerEvents: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			color: 'white'
		},
		searchButton: {
			backgroundColor: fade(theme.palette.primary.main, 0.7),
			color: 'white',
			'&:hover': {
				backgroundColor: fade(theme.palette.primary.main, 1)
			},
			[theme.breakpoints.down('md')]: {
				borderRadius: 'inherit',
				backgroundColor: theme.palette.primary.main
			}
		},
		searchSkeletonBox: {
			display: 'flex',
			alignItems: 'center',
			padding: theme.spacing(0, 3),
			[theme.breakpoints.down('xs')]: {
				padding: theme.spacing(0, 2)
			}
		},
		inputRoot: {
			width: '100%',
			color: 'inherit'
		},
		inputInput: {
			padding: theme.spacing(1, 1, 1, 0),
			paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
			transition: theme.transitions.create('width'),
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				width: '20ch',
				'&:focus': {
					width: '28ch'
				}
			}
		},
		dialogContainer: {
			display: 'flex',
			minWidth: 120
		},
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120
		},
		textField: {
			flex: 1,
			'& .MuiInput-underline': {
				'& svg': {
					transition: 'color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
					color: theme.palette.grey.A100
				}
			},
			'& .MuiInput-underline:hover': {
				'& svg': {
					color: theme.palette.primary.main
				}
			},
			'& .MuiInput-underline.Mui-focused': {
				'& svg': {
					color: theme.palette.primary.main
				}
			},
			'& .MuiInput-underline:before': {
				borderBottomColor: theme.palette.grey['50']
			}
		},
		input: {
			padding: theme.spacing(1)
		},
		popper: {
			zIndex: 10
		}
	})
);

function getRegisterDate(date: string | null) {
	const isToday: boolean = moment().diff(date, 'days') === 0;
	let formattedDate: string | null = null;

	if (isToday) {
		formattedDate = moment(date).format('HH:mm');
	} else {
		formattedDate = moment(date).format('YYYY-MM-DD');
	}

	return formattedDate;
}

function BoardList({
	categoryId,
	boardList,
	pagination,
	searchState,
	onHandleSearchTypeMenuSelect,
	onHandleSearchValueInput,
	onHandleSearchValueInputKey,
	onHandlePagination
}: BoardListProps) {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const anchorRef = useRef<HTMLButtonElement>(null);
	const [open, setOpen] = useState<boolean>(false);

	const handleSearchMenu = useCallback(() => {
		setOpen(!open);
	}, [open]);

	const handleCloseSearchMenu = useCallback(() => {
		setOpen(false);
	}, []);

	const handleSearchTypeMenuSelect = useCallback(
		(event: React.MouseEvent<HTMLLIElement>) => {
			setOpen(false);
			onHandleSearchTypeMenuSelect(event);
		},
		[onHandleSearchTypeMenuSelect]
	);

	return (
		<Box className={classes.root}>
			{boardList.length !== 0 && (
				<>
					{boardList.map((item: Board, index) => {
						if (index === 5 && isMobile) {
							return (
								<Box key={`board-${item.id}`}>
									<Link href={'/board/[id]/[detail]'} as={`/board/${categoryId}/${item.id}`}>
										<a>
											<Grid className={classes.grid} container alignItems={'center'}>
												<Grid item xs={12} md={7}>
													<Box display={'flex'} alignItems={'center'} p={1} pl={0}>
														<Typography noWrap variant={'subtitle2'}>
															{item.subject}
														</Typography>
														<Typography variant={'subtitle2'}>
															{item.image && (
																<Box pl={0.5}>
																	<ImageIcon className={classes.icon} fontSize={'small'} color={'primary'} />
																</Box>
															)}
														</Typography>
														<Typography variant={'subtitle2'}>
															<Box className={classes.commentCountBox} pl={0.5}>
																{`[${Number(item.commentCount).toLocaleString()}]`}
															</Box>
														</Typography>
													</Box>
												</Grid>
												<Grid className={classes.gridItemWriterInfo} item xs={12} md={5}>
													<Box className={classes.gridItemWriterInfoBox}>
														<Box className={classes.nickname}>
															<Typography noWrap variant={'subtitle2'}>
																{item.nickname}
															</Typography>
														</Box>
														<Box className={classes.registerDate}>{getRegisterDate(item.register_date)}</Box>
														<Box className={classes.thumbs}>
															<ThumbUpAltIcon className={classes.icon} fontSize={'small'} />{' '}
															{Number(item.up).toLocaleString()}
														</Box>
														<Box className={classes.view}>
															<VisibilityIcon className={classes.icon} fontSize={'small'} />{' '}
															{Number(item.view).toLocaleString()}
														</Box>
													</Box>
												</Grid>
											</Grid>
										</a>
									</Link>
									<Grid key={`board-ad-${item.id}`} className={classes.gridAd} container justify={'center'}>
										<GoogleAdSense
											html={
												'<ins class="adsbygoogle"'
												+ 'style="display:inline-block;width:320px;height:100px"'
												+ 'data-ad-client="ca-pub-5809905264951057"'
												+ 'data-ad-slot="2449792225"></ins>'
											}
										/>
									</Grid>
								</Box>
							);
						}
						return (
							<Link key={`board-${item.id}`} href={'/board/[id]/[detail]'} as={`/board/${categoryId}/${item.id}`}>
								<a>
									<Grid className={classes.grid} container>
										<Grid item xs={12} md={7}>
											<Box display={'flex'} alignItems={'center'} p={1} pl={0}>
												<Typography noWrap variant={'subtitle2'}>
													{item.subject}
												</Typography>
												<Typography variant={'subtitle2'}>
													{item.image && (
														<Box pl={0.5}>
															<ImageIcon className={classes.icon} fontSize={'small'} color={'primary'} />
														</Box>
													)}
												</Typography>
												<Typography variant={'subtitle2'}>
													<Box className={classes.commentCountBox} pl={0.5}>
														{`[${Number(item.commentCount).toLocaleString()}]`}
													</Box>
												</Typography>
											</Box>
										</Grid>
										<Grid className={classes.gridItemWriterInfo} item xs={12} md={5}>
											<Box className={classes.gridItemWriterInfoBox}>
												<Box className={classes.nickname}>
													<Typography noWrap variant={'subtitle2'}>
														{item.nickname}
													</Typography>
												</Box>
												<Box className={classes.registerDate}>{getRegisterDate(item.register_date)}</Box>
												<Box className={classes.thumbs}>
													<ThumbUpAltIcon className={classes.icon} fontSize={'small'} />{' '}
													{Number(item.up).toLocaleString()}
												</Box>
												<Box className={classes.view}>
													<VisibilityIcon className={classes.icon} fontSize={'small'} />{' '}
													{Number(item.view).toLocaleString()}
												</Box>
											</Box>
										</Grid>
									</Grid>
								</a>
							</Link>
						);
					})}
					<Hidden implementation={'css'} lgUp>
						<Grid container>
							<TextField
								className={classes.textField}
								InputProps={{
									startAdornment: (
										<InputAdornment position={'start'}>
											<SearchIcon />
										</InputAdornment>
									),
									className: classes.input
								}}
								onChange={onHandleSearchValueInput}
								onKeyUp={onHandleSearchValueInputKey}
								value={searchState.value}
								placeholder={'검색할 단어를 입력해주세요.'}
							/>
							<Button ref={anchorRef} className={classes.searchButton} color={'inherit'} onClick={handleSearchMenu}>
								{getSearchTypeLabelByType(searchState.type)}
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
										style={{
											transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
										}}
									>
										<Paper>
											<ClickAwayListener onClickAway={handleCloseSearchMenu}>
												<MenuList>
													<MenuItem data-value={'all'} onClick={handleSearchTypeMenuSelect}>
														{'전체'}
													</MenuItem>
													<MenuItem data-value={'subject'} onClick={handleSearchTypeMenuSelect}>
														{'제목'}
													</MenuItem>
													<MenuItem data-value={'nickname'} onClick={handleSearchTypeMenuSelect}>
														{'닉네임'}
													</MenuItem>
													<MenuItem data-value={'content'} onClick={handleSearchTypeMenuSelect}>
														{'내용'}
													</MenuItem>
												</MenuList>
											</ClickAwayListener>
										</Paper>
									</Grow>
								)}
							</Popper>
						</Grid>
					</Hidden>
					<MuiPagination
						className={classes.pagination}
						page={pagination.page}
						count={pagination.pageCount}
						color={'primary'}
						shape={'rounded'}
						onChange={onHandlePagination}
						size={isMobile ? 'small' : 'medium'}
						siblingCount={isMobile ? 0 : 2}
					/>
				</>
			)}
			{boardList.length === 0 && <DataEmptyBox message={'개념글이 존재하지 않아요.'} />}
		</Box>
	);
}

export default memo(BoardList);
