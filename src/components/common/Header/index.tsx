import React, {
	useEffect, useState, useRef, memo
} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

// Material UI
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
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
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import NearMeIcon from '@material-ui/icons/NearMe';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';

// Custom Hooks
import useHeader from 'hooks/common/useHeader';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			boxShadow: '0 1px 4px 0 rgba(0,0,0,.05)'
		},
		chip: {
			marginLeft: theme.spacing(1),
			color: 'white',
			fontFamily: 'NanumSquareRoundEB'
		},
		categoryChip: {
			color: theme.palette.type === 'light' ? 'rgba(0, 0, 0, .5)' : '',
			backgroundColor: theme.palette.grey['50']
		},
		activeCategoryChip: {
			color: 'white',
			fontFamily: 'NanumSquareRoundEB',
			backgroundColor: theme.palette.primary.main
		},
		anchor: {
			color: 'inherit',
			textDecoration: 'none'
		},
		paper: {
			border: 'none',
			borderBottom: `1px solid ${theme.palette.grey['50']}`
		},
		logoBox: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between'
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
			fontFamily: 'NanumSquareRoundEB'
		},
		icon: {
			fontSize: 14,
			color: 'white'
		},
		popper: {
			left: '-30px !important',
			zIndex: 10
		},
		avatar: {
			width: theme.spacing(4),
			height: theme.spacing(4)
		},
		chipAvatar: {
			backgroundColor: `${theme.palette.background.default} !important`
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

function Header() {
	const classes = useStyles();
	const router = useRouter();
	const {
		paletteType,
		user: { nickname, avatarUrl, isAuthenticated },
		storage,
		activatedTab,
		openNavigationChip,
		isNewStorage,
		isNotices,
		onHandleStorageChip,
		onHandleNoticeChip,
		onHandleSignInDialog,
		onDeleteSignOut,
		onHandlePaletteType
	} = useHeader();

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

	useEffect(() => {
		if (isAuthenticated) {
			setOpen(false);
		}
	}, [isAuthenticated]);

	return (
		<>
			{!openNavigationChip ? (
				<AppBar className={classes.appBar} position={'static'} color={'inherit'}>
					<Toolbar disableGutters={false}>
						<Container>
							<Box className={classes.logoBox}>
								<Box>
									<Box component={'span'}>
										<Link href={'/'} as={'/'}>
											<a>
												<img
													className={classes.logo}
													src={
														paletteType === 'light'
															? 'https://static.cocstorage.com/images/logo_text.png'
															: 'https://static.cocstorage.com/images/logo_text_white.png'
													}
													alt={'Logo Img'}
												/>
											</a>
										</Link>
									</Box>
									<Box component={'span'} ml={1}>
										<Link href={'/storages'} as={'/storages'}>
											<a className={classes.anchor}>
												<Chip
													className={clsx(classes.categoryChip, {
														[classes.activeCategoryChip]: activatedTab.indexOf('/storages') !== -1
													})}
													label={'커뮤니티 저장소'}
													clickable
													color={activatedTab.indexOf('/storages') !== -1 ? 'primary' : 'default'}
												/>
											</a>
										</Link>
									</Box>
									<Box component={'span'} ml={1}>
										<Link href={'/notices'} as={'/notices'}>
											<a className={classes.anchor}>
												<Chip
													className={clsx(classes.categoryChip, {
														[classes.activeCategoryChip]: activatedTab.indexOf('/notices') !== -1
													})}
													label={'새로운 소식'}
													clickable
													color={activatedTab.indexOf('/notices') !== -1 ? 'primary' : 'default'}
												/>
											</a>
										</Link>
									</Box>
								</Box>
								<Box>
									<NoSsr>
										{isAuthenticated ? (
											<>
												<Button
													onClick={onHandlePaletteType}
													data-palette-type={paletteType === 'light' ? 'dark' : 'light'}
													startIcon={
														paletteType === 'light' ? (
															<Brightness4Icon color={'action'} />
														) : (
															<Brightness7Icon color={'action'} />
														)
													}
												>
													{paletteType === 'light' ? '다크 모드' : '라이트 모드'}
												</Button>
												<Button ref={anchorRef} onClick={handleToggle}>
													<Box display={'flex'} alignItems={'center'}>
														<Box display={'flex'} alignItems={'center'} mr={1}>
															<Typography className={classes.typography} variant={'body1'}>
																{nickname}
															</Typography>
														</Box>
														<Box>
															<Avatar className={classes.avatar} src={avatarUrl}>
																{nickname.charAt(0)}
															</Avatar>
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
											</>
										) : (
											<>
												<Button
													onClick={onHandlePaletteType}
													data-palette-type={paletteType === 'light' ? 'dark' : 'light'}
													startIcon={
														paletteType === 'light' ? (
															<Brightness4Icon color={'action'} />
														) : (
															<Brightness7Icon color={'action'} />
														)
													}
												>
													{paletteType === 'light' ? '다크 모드' : '라이트 모드'}
												</Button>
												<Button onClick={onHandleSignInDialog} startIcon={<ExitToAppIcon color={'action'} />}>
													{'로그인'}
												</Button>
											</>
										)}
									</NoSsr>
								</Box>
							</Box>
						</Container>
					</Toolbar>
				</AppBar>
			) : (
				<>
					<HideOnScroll>
						<AppBar className={classes.appBar} color={'inherit'}>
							<Toolbar disableGutters={false}>
								<Container>
									<Box className={classes.logoBox}>
										<Box>
											<Box component={'span'}>
												<Link href={'/'} as={'/'}>
													<a>
														<img
															className={classes.logo}
															src={
																paletteType === 'light'
																	? 'https://static.cocstorage.com/images/logo_text.png'
																	: 'https://static.cocstorage.com/images/logo_text_white.png'
															}
															alt={'Logo Img'}
														/>
													</a>
												</Link>
											</Box>
											{isNewStorage && (
												<Chip
													className={classes.chip}
													label={storage.name}
													avatar={(
														<Avatar className={classes.chipAvatar} src={storage.avatarUrl || ''}>
															<InsertPhotoIcon className={classes.icon} />
														</Avatar>
													)}
													onClick={onHandleStorageChip}
													color={'primary'}
												/>
											)}
											{!isNewStorage && isNotices && (
												<Chip
													className={classes.chip}
													label={'새로운 소식'}
													icon={<NearMeIcon />}
													onClick={onHandleNoticeChip}
													color={'primary'}
												/>
											)}
										</Box>
										<Box>
											<NoSsr>
												{isAuthenticated ? (
													<>
														<Button
															onClick={onHandlePaletteType}
															data-palette-type={paletteType === 'light' ? 'dark' : 'light'}
															startIcon={
																paletteType === 'light' ? (
																	<Brightness4Icon color={'action'} />
																) : (
																	<Brightness7Icon color={'action'} />
																)
															}
														>
															{paletteType === 'light' ? '다크 모드' : '라이트 모드'}
														</Button>
														<Button ref={anchorRef} onClick={handleToggle}>
															<Box display={'flex'} alignItems={'center'}>
																<Box display={'flex'} alignItems={'center'} mr={1}>
																	<Typography className={classes.typography} variant={'body1'}>
																		{nickname}
																	</Typography>
																</Box>
																<Box>
																	<Avatar className={classes.avatar} src={avatarUrl}>
																		{nickname.charAt(0)}
																	</Avatar>
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
													</>
												) : (
													<>
														<Button
															onClick={onHandlePaletteType}
															data-palette-type={paletteType === 'light' ? 'dark' : 'light'}
															startIcon={
																paletteType === 'light' ? (
																	<Brightness4Icon color={'action'} />
																) : (
																	<Brightness7Icon color={'action'} />
																)
															}
														>
															{paletteType === 'light' ? '다크 모드' : '라이트 모드'}
														</Button>
														<Button onClick={onHandleSignInDialog} startIcon={<ExitToAppIcon color={'action'} />}>
															{'로그인'}
														</Button>
													</>
												)}
											</NoSsr>
										</Box>
									</Box>
								</Container>
							</Toolbar>
						</AppBar>
					</HideOnScroll>
					<Toolbar />
				</>
			)}
		</>
	);
}

export default memo(Header);
