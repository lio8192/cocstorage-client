import React, {
	useEffect, useState, useRef, memo
} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// Material UI
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
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

// Custom Hooks
import useMobileHeader from 'hooks/common/useMobileHeader';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			border: 'none',
			borderBottom: `1px solid ${theme.palette.grey['50']}`,
			backgroundColor: theme.palette.background.paper
		},
		toolbar: {
			padding: theme.spacing(0.5, 3),
			[theme.breakpoints.down('xs')]: {
				padding: theme.spacing(0.5, 2)
			}
		},
		chip: {
			marginLeft: theme.spacing(1),
			color: 'white',
			fontFamily: 'NanumSquareRoundEB'
		},
		appBarLogoBox: {
			flexGrow: 1
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
			fontWeight: 700
		},
		icon: {
			verticalAlign: 'middle'
		},
		circularProgress: {
			marginLeft: theme.spacing(1),
			verticalAlign: 'middle'
		},
		avatar: {
			width: theme.spacing(3),
			height: theme.spacing(3)
		},
		popper: {
			left: '-20px !important',
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
		onHandleStorageChip,
		onHandleNoticeChip,
		onHandlePaletteType
	} = useMobileHeader();

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
								<Box component={'span'} onClick={onHandleLogo}>
									<img
										className={classes.appBarLogo}
										src={
											paletteType === 'light'
												? 'https://static.cocstorage.com/images/logo_text.png'
												: 'https://static.cocstorage.com/images/logo_text_white.png'
										}
										alt={'Logo Img'}
									/>
								</Box>
								{isNewStorage
									&& (pending ? (
										<CircularProgress className={classes.circularProgress} color={'primary'} size={20} />
									) : (
										<Chip
											className={classes.chip}
											label={storage.name}
											avatar={(
												<Avatar src={storage.avatarUrl || ''}>
													<InsertPhotoIcon className={classes.icon} />
												</Avatar>
											)}
											onClick={onHandleStorageChip}
											color={'primary'}
											size={'small'}
										/>
									))}
								{isNotices && (
									<Chip
										className={classes.chip}
										label={'새로운 소식'}
										icon={<NearMeIcon />}
										onClick={onHandleNoticeChip}
										color={'primary'}
										size={'small'}
									/>
								)}
							</Box>
						</Box>
						{!isAuthenticated ? (
							<>
								<IconButton
									data-palette-type={paletteType === 'light' ? 'dark' : 'light'}
									onClick={onHandlePaletteType}
								>
									{paletteType === 'light' ? (
										<Brightness4Icon color={'action'} />
									) : (
										<Brightness7Icon color={'action'} />
									)}
								</IconButton>
								<IconButton onClick={onHandleSignInDialog}>
									<ExitToAppIcon color={'action'} />
								</IconButton>
							</>
						) : (
							<>
								<IconButton
									data-palette-type={paletteType === 'light' ? 'dark' : 'light'}
									onClick={onHandlePaletteType}
								>
									{paletteType === 'light' ? (
										<Brightness4Icon color={'action'} />
									) : (
										<Brightness7Icon color={'action'} />
									)}
								</IconButton>
								<IconButton ref={anchorRef} onClick={handleToggle}>
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
							</>
						)}
					</Toolbar>
				</AppBar>
			</HideOnScroll>
			<Toolbar className={classes.toolbar} />
		</>
	);
}

export default memo(MobileHeader);
