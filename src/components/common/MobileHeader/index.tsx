import React, {
	useEffect, useState, useCallback, useRef, memo
} from 'react';
import Link from 'next/link';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import moment from 'moment';

// Material UI
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';

// Material UI Icons
import NearMeIcon from '@material-ui/icons/NearMe';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import SettingsIcon from '@material-ui/icons/Settings';
import TodayIcon from '@material-ui/icons/Today';
import InfoIcon from '@material-ui/icons/Info';
import DescriptionIcon from '@material-ui/icons/Description';

// Material UI Labs
import Skeleton from '@material-ui/lab/Skeleton';

// Component
import NotificationModal from 'components/common/NotificationModal';

// Custom Hooks
import useMobileHeader from 'hooks/common/useMobileHeader';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			border: 'none',
			borderBottom: `1px solid ${theme.palette.grey['50']}`,
			backgroundColor: theme.palette.background.paper,
			'& a': {
				textDecoration: 'none',
				color: 'inherit'
			}
		},
		toolbar: {
			justifyContent: 'space-between',
			padding: theme.spacing(0.5, 3),
			[theme.breakpoints.down('xs')]: {
				padding: theme.spacing(0.5, 2)
			}
		},
		appBarLogoBox: {
			marginRight: theme.spacing(1.5),
			overflow: 'hidden',
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis'
		},
		appBarLogo: {
			maxWidth: 120,
			verticalAlign: 'middle'
		},
		list: {
			width: 250,
			height: '100%',
			backgroundColor: 'inherit',
			color: 'inherit'
		},
		listItemIcon: {
			color: 'inherit'
		},
		divider: {
			backgroundColor: theme.palette.grey['50']
		},
		typography: {
			fontFamily: 'NanumSquareRoundEB'
		},
		icon: {
			verticalAlign: 'middle'
		},
		avatar: {
			width: theme.spacing(3),
			height: theme.spacing(3),
			[theme.breakpoints.down('md')]: {
				fontSize: 14
			}
		},
		popper: {
			left: '-20px !important',
			zIndex: 10
		},
		chipAvatar: {
			backgroundColor: `${theme.palette.background.default} !important`
		},
		logoBox: {
			display: 'flex',
			alignItems: 'center',
			cursor: 'pointer'
		},
		logoAvatar: {
			width: theme.spacing(4),
			height: theme.spacing(4),
			backgroundColor: theme.palette.primary.main,
			color: theme.palette.common.white
		},
		logoTypographyBox: {
			marginLeft: theme.spacing(1),
			overflow: 'hidden',
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis'
		},
		logoTypography: {
			fontFamily: 'NanumSquareRoundEB',
			lineHeight: '23px',
			color: theme.palette.type === 'light' ? theme.palette.grey.A700 : ''
		},
		iconButtonBox: {
			whiteSpace: 'nowrap',
			'& > button:first-child': {
				marginRight: theme.spacing(1)
			}
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

function getLogoUrl(paletteType: string) {
	let logoUrl = 'https://static.cocstorage.com/images/logo_text.png';

	if (paletteType === 'dark') {
		logoUrl = 'https://static.cocstorage.com/images/logo_text_white.png';
	}

	return logoUrl;
}

function MobileHeader() {
	const classes = useStyles();
	const {
		paletteType,
		user: { nickname, avatarUrl, isAuthenticated },
		storage,
		pending,
		isNewStorage,
		isNotices,
		onHandleSignInDialog,
		onDeleteSignOut,
		onHandleLogo,
		onHandlePaletteType
	} = useMobileHeader();

	const [open, setOpen] = useState<boolean>(false);
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	const anchorRef = useRef<HTMLButtonElement>(null);

	const onHandleNotificationModal = useCallback(() => setModalOpen(!modalOpen), [modalOpen]);

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
			<HideOnScroll>
				<AppBar className={classes.root} position={'fixed'} variant={'outlined'}>
					<Toolbar className={classes.toolbar}>
						<Box className={classes.appBarLogoBox}>
							<Box>
								{!isNewStorage && !isNotices && (
									<Box component={'span'} onClick={onHandleLogo}>
										<img className={classes.appBarLogo} src={getLogoUrl(paletteType)} alt={'Logo Img'} />
									</Box>
								)}
								{isNewStorage
									&& (pending ? (
										<Box display={'flex'} alignItems={'center'} mr={1.5}>
											<Box>
												<Skeleton variant={'circle'} width={32} height={32} />
											</Box>
											<Box ml={1}>
												<Skeleton variant={'rect'} width={80} height={23} />
											</Box>
										</Box>
									) : (
										<Box className={classes.logoBox}>
											<Box>
												<Link href={'/storages/[path]'} as={`/storages/${storage.path}`}>
													<a>
														<Avatar className={classes.logoAvatar} src={storage.avatarUrl || ''}>
															<InsertPhotoIcon />
														</Avatar>
													</a>
												</Link>
											</Box>
											<Box className={classes.logoTypographyBox}>
												<Link href={'/storages/[path]'} as={`/storages/${storage.path}`}>
													<a>
														<Typography className={classes.logoTypography} variant={'h6'} noWrap>
															{storage.name}
														</Typography>
													</a>
												</Link>
											</Box>
											<IconButton size={'small'} onClick={onHandleNotificationModal}>
												<InfoIcon />
											</IconButton>
										</Box>
									))}
								{isNotices && (
									<Link href={'/notices'} as={'/notices'}>
										<a>
											<Box className={classes.logoBox}>
												<Box>
													<Avatar className={classes.logoAvatar}>
														<NearMeIcon />
													</Avatar>
												</Box>
												<Box className={classes.logoTypographyBox}>
													<Typography className={classes.logoTypography} variant={'h6'} noWrap>
														{'새로운 소식'}
													</Typography>
												</Box>
											</Box>
										</a>
									</Link>
								)}
							</Box>
						</Box>
						{!isAuthenticated ? (
							<Box className={classes.iconButtonBox}>
								<IconButton
									size={'small'}
									data-palette-type={paletteType === 'light' ? 'dark' : 'light'}
									onClick={onHandlePaletteType}
								>
									{paletteType === 'light' ? (
										<Brightness4Icon color={'action'} />
									) : (
										<Brightness7Icon color={'action'} />
									)}
								</IconButton>
								<IconButton size={'small'} onClick={onHandleSignInDialog}>
									<ExitToAppIcon color={'action'} />
								</IconButton>
							</Box>
						) : (
							<Box className={classes.iconButtonBox}>
								<IconButton
									size={'small'}
									data-palette-type={paletteType === 'light' ? 'dark' : 'light'}
									onClick={onHandlePaletteType}
								>
									{paletteType === 'light' ? (
										<Brightness4Icon color={'action'} />
									) : (
										<Brightness7Icon color={'action'} />
									)}
								</IconButton>
								<IconButton size={'small'} ref={anchorRef} onClick={handleToggle}>
									<Avatar className={classes.avatar} src={avatarUrl}>
										{nickname.charAt(0)}
									</Avatar>
								</IconButton>
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
						)}
					</Toolbar>
				</AppBar>
			</HideOnScroll>
			<Toolbar className={classes.toolbar} />
			<NotificationModal
				open={modalOpen}
				severity={'info'}
				title={'저장소 정보'}
				content={(
					<>
						<Box fontFamily={'NanumSquareRoundEB'} mb={1}>
							<DescriptionIcon className={classes.icon} /> {'설명'}
						</Box>
						<Typography variant={'body1'}>{storage.description}</Typography>
						<Box fontFamily={'NanumSquareRoundEB'} mt={3} mb={1}>
							<SettingsIcon className={classes.icon} /> {'관리자'}
						</Box>
						<Box display={'flex'} alignItems={'center'}>
							<Box mr={1}>
								<Avatar className={classes.avatar} src={storage.user?.avatarUrl || ''} alt={'User Avatar Img'}>
									{storage.user?.nickname.substr(0)}
								</Avatar>
							</Box>
							<Box>{storage.user?.nickname}</Box>
						</Box>
						<Box fontFamily={'NanumSquareRoundEB'} mt={3} mb={1}>
							<TodayIcon className={classes.icon} /> {'등록일시'}
						</Box>
						<Typography variant={'body1'}>{moment(storage.createdAt).format('YYYY. MM. DD HH:mm:ss')}</Typography>
					</>
				)}
				route={''}
				fullWidth
				onCloseNotificationModal={onHandleNotificationModal}
			/>
		</>
	);
}

export default memo(MobileHeader);
