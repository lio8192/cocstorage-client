import React, { useState, useCallback, memo } from 'react';
import Link from 'next/link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import moment from 'moment';

// Material UI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';

// Material UI Icons
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import InfoIcon from '@material-ui/icons/Info';
import ArchiveIcon from '@material-ui/icons/Archive';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import FaceIcon from '@material-ui/icons/Face';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import SportsIcon from '@material-ui/icons/Sports';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import SchoolIcon from '@material-ui/icons/School';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AddBoxIcon from '@material-ui/icons/AddBox';

// Components
import DataEmptyBox from 'components/common/DataEmptyBox';

// Custom Hooks
import useStorageGridList from 'hooks/storages/useStorageGridList';

moment.locale('ko');

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		box: {
			marginBottom: theme.spacing(1),
			padding: theme.spacing(2),
			border: `1px solid ${theme.palette.grey['50']}`,
			borderRadius: 4,
			background:
				theme.palette.type === 'light'
					? 'linear-gradient(rgb(244, 245, 247) 100%, rgb(255, 255, 255) 35%, rgb(255, 255, 255) 100%)'
					: theme.palette.background.default
		},
		emptyBox: {
			border: `1px solid ${theme.palette.grey['50']}`,
			borderRadius: 4
		},
		grid: {
			[theme.breakpoints.down('md')]: {
				marginBottom: 0
			}
		},
		typography: {
			color: theme.palette.action.active,
			fontFamily: 'NanumSquareRoundEB'
		},
		card: {
			border: `1px solid ${theme.palette.grey['50']}`,
			[theme.breakpoints.down('md')]: {
				textAlign: 'center'
			}
		},
		cardContentHead: {
			padding: theme.spacing(3),
			background:
				theme.palette.type === 'light'
					? 'linear-gradient(rgb(244, 245, 247) 100%, rgb(255, 255, 255) 35%, rgb(255, 255, 255) 100%)'
					: theme.palette.grey['50'],
			[theme.breakpoints.down('md')]: {
				padding: 0
			}
		},
		anchor: {
			color: 'inherit',
			textDecoration: 'none'
		},
		avatar: {
			width: theme.spacing(7),
			height: theme.spacing(7),
			marginTop: theme.spacing(-5),
			backgroundColor: theme.palette.background.default,
			[theme.breakpoints.down('md')]: {
				margin: 'auto'
			},
			[theme.breakpoints.down('sm')]: {
				width: theme.spacing(5),
				height: theme.spacing(5)
			},
			'& svg': {
				color: theme.palette.grey.A100
			}
		},
		cardContentTypography: {
			fontFamily: 'NanumSquareRoundEB',
			[theme.breakpoints.down('md')]: {
				fontSize: 16
			},
			[theme.breakpoints.down('sm')]: {
				fontSize: 14
			},
			[theme.breakpoints.down('xs')]: {
				fontSize: 12
			}
		},
		icon: {
			verticalAlign: 'middle'
		},
		button: {
			fontWeight: 700,
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
		},
		listItem: {
			padding: theme.spacing(1, 3),
			[theme.breakpoints.down('xs')]: {
				padding: theme.spacing(1, 2)
			}
		},
		chip: {
			color: 'white',
			fontFamily: 'NanumSquareRoundEB',
			borderRadius: 4,
			cursor: 'pointer'
		},
		badge: {
			'& .MuiBadge-anchorOriginTopRightRectangle': {
				top: theme.spacing(-5)
			},
			[theme.breakpoints.down('md')]: {
				'& .MuiBadge-anchorOriginTopRightRectangle': {
					top: 0
				}
			}
		},
		infoIcon: {
			color: theme.palette.warning.main,
			verticalAlign: 'middle'
		},
		iconBox: {
			marginRight: theme.spacing(1),
			'& svg': {
				verticalAlign: 'middle'
			}
		}
	})
);

const categories = [
	{
		id: 1,
		name: '??? ???????????? ????????? ??????',
		icon: <ArchiveIcon color={'action'} />
	},
	{
		id: 3,
		name: '??????',
		icon: <SportsEsportsIcon color={'action'} />
	},
	{
		id: 4,
		name: '??????',
		icon: <FaceIcon color={'action'} />
	},
	{
		id: 5,
		name: '??????',
		icon: <EmojiEmotionsIcon color={'action'} />
	},
	{
		id: 6,
		name: '?????????',
		icon: <SportsIcon color={'action'} />
	},
	{
		id: 7,
		name: '??????',
		icon: <EmojiPeopleIcon color={'action'} />
	},
	{
		id: 8,
		name: '??????/?????????',
		icon: <AccountBalanceIcon color={'action'} />
	},
	{
		id: 9,
		name: '??????',
		icon: <SchoolIcon color={'action'} />
	},
	{
		id: 10,
		name: '??????',
		icon: <ImportContactsIcon color={'action'} />
	},
	{
		id: 2,
		name: '??????',
		icon: <LibraryBooksIcon color={'action'} />
	}
];

function StorageGridList() {
	const classes = useStyles();
	const {
		pending,
		storages,
		fetchParams: { name },
		isAuthenticated,
		onHandleStorageManageDialogOpen,
		onHandleSignInDialog
	} = useStorageGridList();

	const [open, setOpen] = useState<boolean>(false);

	const handleTooltip = useCallback(() => setOpen(!open), [open]);

	return (
		<>
			{pending && (
				<Box pt={20} pb={20} textAlign={'center'}>
					<CircularProgress size={50} />
				</Box>
			)}
			{!pending && (
				<>
					{categories.map((category, index) => (
						<div key={`storage-category-${category.id}`}>
							{index > 0 && <Box mt={1} />}
							<Box className={classes.box}>
								<Box className={classes.iconBox} component={'span'}>
									{category.icon}
								</Box>
								<Typography className={classes.typography} variant={'body1'} component={'span'}>
									{category.name}
								</Typography>
								{category.id === 1 && (
									<Box component={'span'} ml={0.5}>
										<ClickAwayListener onClickAway={handleTooltip}>
											<>
												<Tooltip
													title={
														'????????? ????????? ?????? ????????? ?????? ????????? ??? ??????/???????????? ????????? ???????????? ????????? ???????????? ?????? ??????, ????????? ???????????? ????????? ?????? ?????? ?????????????????? ????????? ???????????? ????????????. ??????????????? ????????? ??? ??? ?????? ???????????? ???????????? ?????? ???????????? ??????????????? ????????? ???????????? ??? ?????? ?????? ???????????????.'
													}
													PopperProps={{
														disablePortal: true
													}}
													onClose={handleTooltip}
													open={open}
													disableFocusListener
													disableHoverListener
													disableTouchListener
													arrow
												>
													<IconButton size={'small'} onClick={handleTooltip}>
														<InfoIcon className={classes.infoIcon} />
													</IconButton>
												</Tooltip>
											</>
										</ClickAwayListener>
									</Box>
								)}
							</Box>
							{!name && storages.filter((item) => item.storageCategoryId === category.id).length === 0 && (
								<Box className={classes.emptyBox}>
									<DataEmptyBox
										content={(
											<Button
												className={classes.button}
												variant={'contained'}
												color={'primary'}
												startIcon={<AddBoxIcon />}
												onClick={isAuthenticated ? onHandleStorageManageDialogOpen : onHandleSignInDialog}
											>
												{`${category.name} ???????????? ????????? ??????`}
											</Button>
										)}
										borderRadius={4}
									/>
								</Box>
							)}
							{name && storages.filter((item) => item.storageCategoryId === category.id).length === 0 && (
								<Box className={classes.emptyBox}>
									<DataEmptyBox message={`"${name}" ??? ?????? ?????? ????????? ???????????? ?????????.`} borderRadius={4} />
								</Box>
							)}
							{storages.filter((item) => item.storageCategoryId === category.id).length !== 0 && (
								<Grid className={classes.grid} container spacing={1}>
									{storages
										.filter((item) => item.storageCategoryId === category.id)
										.map((item) => (
											<Grid key={`storage-${item.id}`} item xs={4} sm={2}>
												<Link href={'/storages/[path]'} as={`/storages/${item.path}`}>
													<a className={classes.anchor}>
														<Card className={classes.card} elevation={0}>
															<CardActionArea>
																<CardContent className={classes.cardContentHead} />
																<CardContent>
																	<Badge
																		className={classes.badge}
																		badgeContent={
																			<Chip className={classes.chip} label={'N'} color={'primary'} size={'small'} />
																		}
																		invisible={moment(new Date(), 'YYYYMMDDHH:mm:ss').diff(item.createdAt, 'days') > 7}
																	>
																		<Avatar
																			className={classes.avatar}
																			src={item.avatarUrl || ''}
																			alt={'Storage Avatar Img'}
																		>
																			<InsertPhotoIcon />
																		</Avatar>
																	</Badge>
																	<Box mt={1}>
																		<Typography className={classes.cardContentTypography} noWrap>
																			{item.name}
																		</Typography>
																	</Box>
																</CardContent>
															</CardActionArea>
														</Card>
													</a>
												</Link>
											</Grid>
										))}
								</Grid>
							)}
						</div>
					))}
				</>
			)}
		</>
	);
}

export default memo(StorageGridList);
