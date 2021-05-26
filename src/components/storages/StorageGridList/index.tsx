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
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grow from '@material-ui/core/Grow';
import Card from '@material-ui/core/Card';

// Material UI Icons
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import ArchiveIcon from '@material-ui/icons/Archive';
import InfoIcon from '@material-ui/icons/Info';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

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
			[theme.breakpoints.down('md')]: {
				margin: 'auto'
			},
			[theme.breakpoints.down('sm')]: {
				width: theme.spacing(5),
				height: theme.spacing(5)
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
		}
	})
);

function StorageGridList() {
	const classes = useStyles();
	const {
		pending,
		storages,
		fetchParams: { name }
	} = useStorageGridList();

	const [open, setOpen] = useState<boolean>(false);

	const handleTooltip = useCallback(() => setOpen(!open), [open]);

	return (
		<>
			{pending && (
				<Grow in>
					<Box pt={20} pb={20} textAlign={'center'}>
						<CircularProgress size={50} />
					</Box>
				</Grow>
			)}
			{!pending && (
				<>
					<Box className={classes.box}>
						<Box component={'span'} mr={1}>
							<ArchiveIcon className={classes.icon} color={'action'} />
						</Box>
						<Typography className={classes.typography} variant={'body1'} component={'span'}>
							{'수집'}
						</Typography>
						<Box component={'span'} ml={0.5}>
							<ClickAwayListener onClickAway={handleTooltip}>
								<>
									<Tooltip
										title={
											'수집 카테고리에 소속되어 있는 아래의 저장소 내에 포함된 모든 게시글 및 댓글/답글들은 개념글 저장소의 유저가 작성하는 것이 아닌, 다수의 커뮤니티 사이트 내의 인기 게시글들이며 출처를 포함하고 있습니다. 누군가에게 문제가 될 수 있는 게시글은 모니터링 중인 관리자가 발견하거나 신고를 받게되면 곧 바로 삭제 처리됩니다.'
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
					</Box>
					{!name && storages.filter((item) => item.storageCategoryId === 1).length === 0 && (
						<Box className={classes.emptyBox}>
							<DataEmptyBox message={'등록된 저장소가 존재하지 않아요.'} borderRadius={4} />
						</Box>
					)}
					{name && storages.filter((item) => item.storageCategoryId === 1).length === 0 && (
						<Box className={classes.emptyBox}>
							<DataEmptyBox message={`"${name}" 에 대한 검색 결과가 존재하지 않아요.`} borderRadius={4} />
						</Box>
					)}
					<Grid className={classes.grid} container spacing={1}>
						{storages
							.filter((item) => item.storageCategoryId === 1)
							.map((item) => (
								<Grow key={`storage-${item.id}`} in>
									<Grid item xs={4} sm={2}>
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
								</Grow>
							))}
					</Grid>
					<Box mt={1} />
					<Box className={classes.box}>
						<Box component={'span'} mr={1}>
							<LibraryBooksIcon className={classes.icon} color={'action'} />
						</Box>
						<Typography className={classes.typography} variant={'body1'} component={'span'}>
							{'일반'}
						</Typography>
					</Box>
					{!name && storages.filter((item) => item.storageCategoryId === 2).length === 0 && (
						<Box className={classes.emptyBox}>
							<DataEmptyBox message={'첫 저장소 등록의 주인공이 되어 보세요!'} borderRadius={4} />
						</Box>
					)}
					{name && storages.filter((item) => item.storageCategoryId === 2).length === 0 && (
						<Box className={classes.emptyBox}>
							<DataEmptyBox message={`"${name}" 에 대한 검색 결과가 존재하지 않아요.`} borderRadius={4} />
						</Box>
					)}
					<Grid className={classes.grid} container spacing={0}>
						{storages
							.filter((item) => item.storageCategoryId === 2)
							.map((item) => (
								<Grow key={`storage-${item.id}`} in>
									<Grid item xs={4} sm={2}>
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
								</Grow>
							))}
					</Grid>
				</>
			)}
		</>
	);
}

export default memo(StorageGridList);
