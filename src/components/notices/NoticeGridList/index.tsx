import React, { useState, memo, useEffect } from 'react';
import Link from 'next/link';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import moment from 'moment';

// Material UI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Hidden from '@material-ui/core/Hidden';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Grow from '@material-ui/core/Grow';
import CircularProgress from '@material-ui/core/CircularProgress';

// Material UI Icons
import MessageIcon from '@material-ui/icons/Message';

// Components
import DataEmptyBox from 'components/common/DataEmptyBox';

// Custom Hooks
import useNoticeGridList from 'hooks/notices/useNoticeGridList';

// @types
import { Notice } from 'modules/notices';

moment.locale('ko');

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		card: {
			display: 'flex',
			width: '100%',
			height: '100%'
		},
		details: {
			display: 'flex',
			flex: 1
		},
		anchor: {
			color: 'inherit',
			textDecoration: 'none'
		},
		content: {
			flex: '1 0 auto'
		},
		mediaCover: {
			minWidth: 230
		},
		controls: {
			display: 'flex',
			alignItems: 'center',
			paddingLeft: theme.spacing(1),
			paddingBottom: theme.spacing(1)
		},
		grid: {
			backgroundColor: theme.palette.background.default,
			'& > .MuiGrid-item:first-child': {
				borderTop: `1px solid ${theme.palette.grey['50']}`,
				[theme.breakpoints.down('md')]: {
					borderTop: 'none'
				}
			}
		},
		gridItemFirst: {
			borderTop: `1px solid ${theme.palette.grey['50']}`,
			[theme.breakpoints.down('md')]: {
				borderTop: 'none'
			}
		},
		gridItemContainer: {
			height: '100%',
			[theme.breakpoints.down('md')]: {
				'& .MuiPaper-root': {
					backgroundColor: theme.palette.background.default
				}
			}
		},
		gridCard: {
			height: '100%',
			border: `1px solid ${theme.palette.grey['50']}`,
			borderTop: 'none',
			borderLeft: 'none',
			[theme.breakpoints.down('md')]: {
				border: 'none'
			}
		},
		gridCardActionArea: {
			border: `1px solid ${theme.palette.grey['50']}`,
			borderTop: 'none',
			[theme.breakpoints.down('md')]: {
				border: 'none'
			}
		},
		cardActionArea: {
			height: '100%'
		},
		cardContent: {
			display: 'flex',
			alignItems: 'center',
			flexWrap: 'wrap',
			width: '100%',
			minWidth: 0
		},
		cardContentForList: {
			display: 'flex',
			alignItems: 'center',
			flexWrap: 'wrap',
			width: '100%',
			minWidth: 0,
			padding: theme.spacing(3, 2)
		},
		media: {
			height: '55%',
			[theme.breakpoints.down('md')]: {
				height: 300
			},
			[theme.breakpoints.down('xs')]: {
				height: 150
			}
		},
		chip: {
			color: 'white',
			fontFamily: 'NanumSquareRoundEB',
			borderRadius: 4,
			cursor: 'pointer'
		},
		infoBox: {
			display: 'flex',
			alignItems: 'center',
			'& span::after': {
				content: '""',
				display: 'inline-block',
				margin: theme.spacing(0.5),
				width: 3,
				height: 3,
				border: `1px solid ${theme.palette.grey.A200}`,
				borderRadius: '50%',
				backgroundColor: theme.palette.grey.A200,
				verticalAlign: 'middle'
			},
			'& span:last-child::after': {
				display: 'none'
			}
		},
		icon: {
			verticalAlign: 'middle'
		},
		typography: {
			maxWidth: '100%',
			minHeight: 24,
			fontWeight: 700
		},
		typographyWithBadge: {
			maxWidth: 'calc(100% - 34px)'
		},
		nicknameTypography: {
			fontWeight: 700
		},
		descriptionTypographyBox: {
			minHeight: 40,
			flexBasis: '100%',
			margin: theme.spacing(1, 0)
		},
		descriptionTypography: {
			display: 'box',
			boxOrient: 'vertical',
			lineClamp: 2,
			textOverflow: 'ellipsis',
			overflow: 'hidden'
		},
		avatar: {
			marginRight: theme.spacing(1)
		},
		progressBox: {
			padding: theme.spacing(20, 0),
			textAlign: 'center',
			backgroundColor: theme.palette.type === 'light' ? 'inherit' : theme.palette.background.default
		}
	})
);

function NoticeGridList() {
	const classes = useStyles();
	const { pending, notices } = useNoticeGridList();

	const [transferNotices, setTransferNotices] = useState<Array<Notice[]>>([]);

	useEffect(() => {
		if (notices.length !== 0) {
			const noticeArray = new Array(Math.round(notices.length / 2));
			notices.forEach((item, index) => {
				const arrayIndex = Math.round((index + 1) / 2) - 1;
				if (arrayIndex <= noticeArray.length) {
					if (noticeArray[arrayIndex] !== undefined) {
						noticeArray[arrayIndex] = [...noticeArray[arrayIndex], item];
					} else {
						noticeArray[arrayIndex] = [item];
					}
				}
			});
			setTransferNotices(noticeArray);
		}
	}, [notices]);

	return (
		<>
			{pending && transferNotices.length === 0 && (
				<Grow in>
					<Box className={classes.progressBox} pt={20} pb={20} textAlign={'center'}>
						<CircularProgress size={50} />
					</Box>
				</Grow>
			)}
			{!pending && transferNotices.length !== 0 && (
				<Grid className={classes.grid} container>
					{transferNotices.map((item, index) => {
						if ((index + 1) % 2 === 0) {
							return (
								// eslint-disable-next-line react/no-array-index-key
								<Grow key={`notice-section-2-${item.length}-${index}`} in>
									<Grid item xs={12} lg={6}>
										<Grid className={classes.gridItemContainer} container>
											{item.map((notice) => (
												<Grid
													key={`notice-section-2-common-${notice.id}`}
													className={clsx({
														[classes.gridItemFirst]: index === 1
													})}
													item
													xs={12}
													lg={6}
												>
													<Link href={'/notices/[id]'} as={`/notices/${notice.id}`}>
														<a className={classes.anchor}>
															<Card className={classes.gridCard} square elevation={0}>
																<CardActionArea component={'div'} className={classes.cardActionArea}>
																	{notice.thumbnailUrl ? (
																		<CardMedia
																			className={classes.media}
																			image={notice.thumbnailUrl}
																			title={'Contemplative Reptile'}
																		/>
																	) : (
																		<Box className={classes.media} />
																	)}
																	<CardContent className={classes.cardContent}>
																		<Typography
																			className={clsx(classes.typography, {
																				[classes.typographyWithBadge]:
																					moment(new Date(), 'YYYYMMDDHH:mm:ss').diff(notice.createdAt, 'days') === 0
																			})}
																			variant={'body1'}
																			noWrap
																		>
																			{notice.subject}
																		</Typography>
																		{moment(new Date(), 'YYYYMMDDHH:mm:ss').diff(notice.createdAt, 'days') === 0 && (
																			<Box ml={1}>
																				<Chip className={classes.chip} label={'N'} color={'primary'} size={'small'} />
																			</Box>
																		)}
																		<Box className={classes.descriptionTypographyBox}>
																			<Typography
																				className={classes.descriptionTypography}
																				variant={'body2'}
																				color={'textSecondary'}
																			>
																				{notice.description}
																			</Typography>
																		</Box>
																		<Box
																			display={'flex'}
																			alignItems={'center'}
																			justifyContent={'space-between'}
																			flex={1}
																			mt={0.5}
																		>
																			<Box className={classes.infoBox}>
																				<Avatar src={notice.user.avatarUrl || ''} className={classes.avatar} />
																				<Typography className={classes.nicknameTypography} variant={'caption'}>
																					{notice.user.nickname}
																				</Typography>
																				<Typography variant={'caption'} color={'textSecondary'}>
																					{moment(notice.createdAt, 'YYYYMMDDHH:mm:ss').fromNow()}
																				</Typography>
																			</Box>
																			<Box display={'flex'} alignItems={'center'}>
																				<Box display={'flex'} alignItems={'center'}>
																					<Box>
																						<MessageIcon className={classes.icon} color={'action'} />
																					</Box>
																					<Box ml={0.5}>
																						<Typography variant={'caption'} color={'textSecondary'}>
																							{notice.commentTotalCount.toLocaleString()}
																						</Typography>
																					</Box>
																				</Box>
																				<Box display={'flex'} alignItems={'center'} ml={1}>
																					<Box>
																						<VisibilityIcon className={classes.icon} color={'action'} />
																					</Box>
																					<Box ml={0.5}>
																						<Typography variant={'caption'} color={'textSecondary'}>
																							{notice.viewCount.toLocaleString()}
																						</Typography>
																					</Box>
																				</Box>
																			</Box>
																		</Box>
																	</CardContent>
																</CardActionArea>
															</Card>
														</a>
													</Link>
												</Grid>
											))}
										</Grid>
									</Grid>
								</Grow>
							);
						}
						return (
							<Grid
								className={classes.gridItemContainer}
								// eslint-disable-next-line react/no-array-index-key
								key={`notice-section-1-${item.length}-${index}`}
								item
								xs={12}
								lg={6}
							>
								<Hidden xsDown>
									<Grid container>
										{item.map((notice) => (
											<Grow key={`notice-section-1-pc-${notice.id}`} in>
												<Grid item xs={12}>
													<Link href={'/notices/[id]'} as={`/notices/${notice.id}`}>
														<a className={classes.anchor}>
															<Card className={classes.card} elevation={0} square>
																<CardActionArea className={classes.gridCardActionArea}>
																	<Box className={classes.details}>
																		{notice.thumbnailUrl ? (
																			<CardMedia
																				className={classes.mediaCover}
																				image={notice.thumbnailUrl}
																				title={'Contemplative Reptile'}
																			/>
																		) : (
																			<Box className={classes.media} />
																		)}
																		<CardContent className={classes.cardContentForList}>
																			<Typography
																				className={clsx(classes.typography, {
																					[classes.typographyWithBadge]:
																						moment(new Date(), 'YYYYMMDDHH:mm:ss').diff(notice.createdAt, 'days') === 0
																				})}
																				variant={'body1'}
																				noWrap
																			>
																				{notice.subject}
																			</Typography>
																			{moment(new Date(), 'YYYYMMDDHH:mm:ss').diff(notice.createdAt, 'days') === 0 && (
																				<Box component={'span'} ml={1}>
																					<Chip className={classes.chip} label={'N'} color={'primary'} size={'small'} />
																				</Box>
																			)}
																			<Box className={classes.descriptionTypographyBox}>
																				<Typography
																					className={classes.descriptionTypography}
																					variant={'body2'}
																					color={'textSecondary'}
																				>
																					{notice.description}
																				</Typography>
																			</Box>
																			<Box
																				display={'flex'}
																				alignItems={'center'}
																				justifyContent={'space-between'}
																				flex={1}
																				mt={0.5}
																			>
																				<Box className={classes.infoBox}>
																					<Avatar src={notice.user.avatarUrl || ''} className={classes.avatar} />
																					<Typography className={classes.nicknameTypography} variant={'caption'}>
																						{notice.user.nickname}
																					</Typography>
																					<Typography variant={'caption'} color={'textSecondary'}>
																						{moment(notice.createdAt, 'YYYYMMDDHH:mm:ss').fromNow()}
																					</Typography>
																				</Box>
																				<Box display={'flex'} alignItems={'center'}>
																					<Box display={'flex'} alignItems={'center'}>
																						<Box>
																							<MessageIcon className={classes.icon} color={'action'} />
																						</Box>
																						<Box ml={0.5}>
																							<Typography variant={'caption'} color={'textSecondary'}>
																								{notice.commentTotalCount.toLocaleString()}
																							</Typography>
																						</Box>
																					</Box>
																					<Box display={'flex'} alignItems={'center'} ml={1}>
																						<Box>
																							<VisibilityIcon className={classes.icon} color={'action'} />
																						</Box>
																						<Box ml={0.5}>
																							<Typography variant={'caption'} color={'textSecondary'}>
																								{notice.viewCount.toLocaleString()}
																							</Typography>
																						</Box>
																					</Box>
																				</Box>
																			</Box>
																		</CardContent>
																	</Box>
																</CardActionArea>
															</Card>
														</a>
													</Link>
												</Grid>
											</Grow>
										))}
									</Grid>
								</Hidden>
								<Hidden smUp>
									<Grid className={classes.gridItemContainer} container>
										{item.map((notice) => (
											<Grow key={`notice-section-1-mobile-${notice.id}`} in>
												<Grid item xs={12} lg={6}>
													<Link href={'/notices/[id]'} as={`/notices/${notice.id}`}>
														<a className={classes.anchor}>
															<Card className={classes.gridCard} square elevation={0}>
																<CardActionArea className={classes.cardActionArea}>
																	{notice.thumbnailUrl ? (
																		<CardMedia
																			className={classes.media}
																			image={notice.thumbnailUrl}
																			title={'Contemplative Reptile'}
																		/>
																	) : (
																		<Box className={classes.media} />
																	)}
																	<CardContent className={classes.cardContent}>
																		<Typography
																			className={clsx(classes.typography, {
																				[classes.typographyWithBadge]:
																					moment(new Date(), 'YYYYMMDDHH:mm:ss').diff(notice.createdAt, 'days') === 0
																			})}
																			variant={'body1'}
																			noWrap
																		>
																			{notice.subject}
																		</Typography>
																		{moment(new Date(), 'YYYYMMDDHH:mm:ss').diff(notice.createdAt, 'days') === 0 && (
																			<Box ml={1}>
																				<Chip className={classes.chip} label={'N'} color={'primary'} size={'small'} />
																			</Box>
																		)}
																		<Box className={classes.descriptionTypographyBox}>
																			<Typography
																				className={classes.descriptionTypography}
																				variant={'body2'}
																				color={'textSecondary'}
																			>
																				{notice.description}
																			</Typography>
																		</Box>
																		<Box
																			display={'flex'}
																			alignItems={'center'}
																			justifyContent={'space-between'}
																			flex={1}
																			mt={0.5}
																		>
																			<Box className={classes.infoBox}>
																				<Avatar src={notice.user.avatarUrl || ''} className={classes.avatar} />
																				<Typography className={classes.nicknameTypography} variant={'caption'}>
																					{notice.user.nickname}
																				</Typography>
																				<Typography variant={'caption'} color={'textSecondary'}>
																					{moment(notice.createdAt, 'YYYYMMDDHH:mm:ss').fromNow()}
																				</Typography>
																			</Box>
																			<Box display={'flex'} alignItems={'center'}>
																				<Box display={'flex'} alignItems={'center'}>
																					<Box>
																						<MessageIcon className={classes.icon} color={'action'} />
																					</Box>
																					<Box ml={0.5}>
																						<Typography variant={'caption'} color={'textSecondary'}>
																							{notice.commentTotalCount.toLocaleString()}
																						</Typography>
																					</Box>
																				</Box>
																				<Box display={'flex'} alignItems={'center'} ml={1}>
																					<Box>
																						<VisibilityIcon className={classes.icon} color={'action'} />
																					</Box>
																					<Box ml={0.5}>
																						<Typography variant={'caption'} color={'textSecondary'}>
																							{notice.viewCount.toLocaleString()}
																						</Typography>
																					</Box>
																				</Box>
																			</Box>
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
								</Hidden>
							</Grid>
						);
					})}
				</Grid>
			)}
			{!pending && transferNotices.length === 0 && <DataEmptyBox message={'새로운 소식이 존재하지 않습니다.'} />}
		</>
	);
}

export default memo(NoticeGridList);
