import React, {
	useEffect, useState, useRef, memo
} from 'react';
import { useRouter } from 'next/router';
import {
	makeStyles, createStyles, Theme, useTheme
} from '@material-ui/core/styles';
import clsx from 'clsx';

// Material UI
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import NoSsr from '@material-ui/core/NoSsr';

// Material UI Icons
import CastIcon from '@material-ui/icons/Cast';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import SchoolIcon from '@material-ui/icons/School';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import SportsBaseballIcon from '@material-ui/icons/SportsBaseball';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import NearMeIcon from '@material-ui/icons/NearMe';

// Custom Hooks
import useHeader from 'hooks/common/useHeader';

// Snippets
import { getCategoryNameByCategoryId } from 'snippets/board';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			boxShadow: 'none',
			borderBottom: `1px solid ${theme.palette.grey['50']}`
		},
		toolbar: {
			height: 84
		},
		userToolbar: {
			height: 100
		},
		chip: {
			marginLeft: theme.spacing(1),
			color: 'white'
		},
		paper: {
			border: 'none',
			borderBottom: `1px solid ${theme.palette.grey['50']}`
		},
		logoBox: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			padding: theme.spacing(3, 0)
		},
		logo: {
			maxWidth: 140,
			verticalAlign: 'middle',
			cursor: 'pointer'
		},
		tabsIndicator: {
			height: 5
		},
		tab: {
			minWidth: 72
		},
		indicator: {
			'& *': {
				fontFamily: 'NanumSquareRoundEB'
			},
			'& .MuiTabs-indicator': {
				height: 5
			}
		},
		typography: {
			fontWeight: 700
		},
		icon: {
			fontSize: 14,
			color: 'white'
		},
		popper: {
			left: '-27.3px !important',
			zIndex: 10
		}
	})
);

type ScrollProps = {
	window?: () => Window;
	children: React.ReactElement;
};

function HideOnScroll(props: ScrollProps) {
	const { children, window } = props;
	const trigger = useScrollTrigger({ target: window ? window() : undefined });

	return (
		<Slide appear={false} direction={'down'} in={!trigger}>
			{children}
		</Slide>
	);
}

function getCategoryIconByCategoryId(categoryId: string | string[]) {
	let categoryIcon: JSX.Element | null = null;

	switch (categoryId) {
	case 'daily_popular':
		categoryIcon = <WhatshotIcon />;
		break;
	case 'ib_new1':
		categoryIcon = <CastIcon />;
		break;
	case 'stream':
		categoryIcon = <PlayArrowIcon />;
		break;
	case 'football_new6':
		categoryIcon = <SportsSoccerIcon />;
		break;
	case 'issuezoom':
		categoryIcon = <CalendarTodayIcon />;
		break;
	case 'exam_new':
		categoryIcon = <SchoolIcon />;
		break;
	case 'extra':
		categoryIcon = <FitnessCenterIcon />;
		break;
	case 'baseball_new9':
		categoryIcon = <SportsBaseballIcon />;
		break;
	default:
		categoryIcon = <CastIcon />;
		break;
	}

	return categoryIcon;
}

function Header() {
	const classes = useStyles();
	const router = useRouter();
	const {
		id,
		pageScope,
		user: { nickname, avatarUrl, isAuthenticated },
		storage,
		activatedTab,
		openNavigationChip,
		openTab,
		isNewStorage,
		isNotices,
		onHandleTabChange,
		onHandleLogo,
		onHandleChip,
		onHandleStorageChip,
		onHandleNoticeChip,
		onHandleSignInDialog,
		onDeleteSignOut
	} = useHeader();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLButtonElement>(null);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event: React.MouseEvent<EventTarget>) => {
		if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
			return;
		}

		setOpen(false);
	};

	const handleRouterAndClose = (event: React.MouseEvent<EventTarget>) => {
		if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
			return;
		}

		setOpen(false);
		router.push('/mypage', '/mypage').then();
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

	return (
		<>
			{!openNavigationChip ? (
				<AppBar className={classes.appBar} position={'static'} color={'inherit'}>
					<Container>
						<Box className={classes.logoBox}>
							<Box>
								<Box component={'span'} onClick={onHandleLogo}>
									<img
										className={classes.logo}
										src={'https://static.cocstorage.com/images/logo_text.png'}
										alt={'Logo Img'}
									/>
								</Box>
							</Box>
							<Box>
								<NoSsr>
									{isAuthenticated ? (
										<Box>
											<Button ref={anchorRef} onClick={handleToggle}>
												<Box display={'flex'} alignItems={'center'}>
													<Box display={'flex'} alignItems={'center'}>
														<Typography className={classes.typography} variant={'body1'}>
															{nickname}
														</Typography>
													</Box>
													<Box ml={1}>
														{avatarUrl ? <Avatar src={avatarUrl} /> : <Avatar>{nickname.charAt(0)}</Avatar>}
													</Box>
												</Box>
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
																	<MenuItem onClick={handleRouterAndClose}>
																		<ListItemIcon>
																			<PersonIcon />
																		</ListItemIcon>
																		{'마이페이지'}
																	</MenuItem>
																	<MenuItem onClick={onDeleteSignOut}>
																		<ListItemIcon>
																			<ExitToAppIcon />
																		</ListItemIcon>
																		{'로그아웃'}
																	</MenuItem>
																</MenuList>
															</ClickAwayListener>
														</Paper>
													</Grow>
												)}
											</Popper>
										</Box>
									) : (
										<Button onClick={onHandleSignInDialog}>{'로그인/회원가입'}</Button>
									)}
								</NoSsr>
							</Box>
						</Box>
					</Container>
				</AppBar>
			) : (
				<>
					<HideOnScroll>
						<AppBar className={classes.appBar} color={'inherit'}>
							<Toolbar disableGutters={false}>
								<Container>
									<Box className={classes.logoBox}>
										<Box>
											<Box component={'span'} onClick={onHandleLogo}>
												<img
													className={classes.logo}
													src={'https://static.cocstorage.com/images/logo_text.png'}
													alt={'Logo Img'}
												/>
											</Box>
											{isNewStorage && (
												<Chip
													className={classes.chip}
													color={'primary'}
													label={storage.name}
													avatar={(
														<Avatar src={storage.avatarUrl || ''}>
															<InsertPhotoIcon className={classes.icon} />
														</Avatar>
													)}
													onClick={onHandleStorageChip}
												/>
											)}
											{!isNewStorage && !isNotices && (
												<Chip
													className={classes.chip}
													color={'primary'}
													label={getCategoryNameByCategoryId(id)}
													icon={getCategoryIconByCategoryId(id)}
													onClick={onHandleChip}
												/>
											)}
											{!isNewStorage && isNotices && (
												<Chip
													className={classes.chip}
													color={'primary'}
													label={'새로운 소식'}
													icon={<NearMeIcon />}
													onClick={onHandleNoticeChip}
												/>
											)}
										</Box>
										<Box>
											<NoSsr>
												{isAuthenticated ? (
													<Box>
														<Button ref={anchorRef} onClick={handleToggle}>
															<Box display={'flex'} alignItems={'center'}>
																<Box display={'flex'} alignItems={'center'}>
																	<Typography className={classes.typography} variant={'body1'}>
																		{nickname}
																	</Typography>
																</Box>
																<Box ml={1}>
																	{avatarUrl ? <Avatar src={avatarUrl} /> : <Avatar>{nickname.charAt(0)}</Avatar>}
																</Box>
															</Box>
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
																				<MenuItem onClick={handleRouterAndClose}>
																					<ListItemIcon>
																						<PersonIcon />
																					</ListItemIcon>
																					{'마이페이지'}
																				</MenuItem>
																				<MenuItem onClick={onDeleteSignOut}>
																					<ListItemIcon>
																						<ExitToAppIcon />
																					</ListItemIcon>
																					{'로그아웃'}
																				</MenuItem>
																			</MenuList>
																		</ClickAwayListener>
																	</Paper>
																</Grow>
															)}
														</Popper>
													</Box>
												) : (
													<Button onClick={onHandleSignInDialog}>{'로그인/회원가입'}</Button>
												)}
											</NoSsr>
										</Box>
									</Box>
								</Container>
							</Toolbar>
						</AppBar>
					</HideOnScroll>
					<Toolbar
						className={clsx({
							[classes.toolbar]: !isAuthenticated,
							[classes.userToolbar]: isAuthenticated
						})}
					/>
				</>
			)}
			{!isMobile && pageScope && openTab && (
				<Box>
					<Paper className={classes.paper} variant={'outlined'} square>
						<Container>
							<Tabs
								indicatorColor={'primary'}
								textColor={'primary'}
								value={
									activatedTab === '/'
									|| activatedTab.indexOf('/storages') !== -1
									|| activatedTab.indexOf('/board') !== -1
									|| activatedTab.indexOf('/notices') !== -1
										? activatedTab
										: '/storages'
								}
								onChange={onHandleTabChange}
								className={classes.indicator}
							>
								<Tab icon={<HomeIcon />} value={'/'} />
								<Tab label={'커뮤니티 저장소'} value={'/storages'} />
								<Tab label={'수집 저장소'} value={'/board'} />
								<Tab label={'새로운 소식'} value={'/notices'} />
							</Tabs>
						</Container>
					</Paper>
				</Box>
			)}
		</>
	);
}

export default memo(Header);
