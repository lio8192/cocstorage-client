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
			'& > .MuiGrid-item:first-child': {
				borderTop: '1px solid #EAEAEA'
			}
		},
		gridItemFirst: {
			borderTop: '1px solid #EAEAEA'
		},
		gridContainer: {
			'& > .MuiGrid-item:first-child': {
				borderTop: '1px solid'
			}
		},
		gridItemContainer: {
			height: '100%'
		},
		gridCard: {
			height: '100%',
			border: '1px solid #EAEAEA',
			borderTop: 'none',
			borderLeft: 'none',
			[theme.breakpoints.down('md')]: {
				border: 'none'
			}
		},
		gridCardActionArea: {
			border: '1px solid #EAEAEA',
			borderTop: 'none',
			[theme.breakpoints.down('md')]: {
				border: 'none'
			}
		},
		cardActionArea: {
			height: '100%'
		},
		cardContent: {
			width: '100%'
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
			color: 'white'
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
			fontWeight: 700
		},
		nicknameTypography: {
			fontWeight: 700
		},
		descriptionTypography: {
			display: 'box',
			boxOrient: 'vertical',
			lineClamp: 1,
			textOverflow: 'ellipsis',
			overflow: 'hidden'
		},
		avatar: {
			marginRight: theme.spacing(1)
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
					<Box pt={20} pb={20} textAlign={'center'}>
						<CircularProgress size={50} />
					</Box>
				</Grow>
			)}
			<Grid className={classes.grid} container>
				{transferNotices.map((item, index) => {
					if ((index + 1) % 2 === 0) {
						return (
							<Grid
								// eslint-disable-next-line react/no-array-index-key
								key={`notice-section-2-${item.length}-${index}`}
								className={clsx({
									[classes.gridItemFirst]: index === 1
								})}
								item
								xs={12}
								lg={6}
							>
								<Grow in>
									<Grid className={classes.gridItemContainer} container>
										{item.map((notice) => (
											<Grid key={`notice-section-2-common-${notice.id}`} item xs={12} lg={6}>
												<Link href={'/notices/[id]'} as={`/notices/${notice.id}`}>
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
																<Box display={'flex'} alignItems={'center'}>
																	<Box maxWidth={'80%'}>
																		<Typography className={classes.typography} noWrap variant={'body1'}>
																			{notice.subject}
																		</Typography>
																	</Box>
																	{moment(new Date(), 'YYYYMMDDHH:mm:ss').diff(notice.createdAt, 'days')
																		=== 0 && (
																		<Box ml={1}>
																			<Chip className={classes.chip} label={'NEW'} color={'primary'} size={'small'} />
																		</Box>
																	)}
																</Box>
																<Box mt={1} mb={1}>
																	<Typography
																		className={classes.descriptionTypography}
																		variant={'body2'}
																		color={'textSecondary'}
																	>
																		{notice.description}
																	</Typography>
																</Box>
																<Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={0.5}>
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
												</Link>
											</Grid>
										))}
									</Grid>
								</Grow>
							</Grid>
						);
					}
					return (
						// eslint-disable-next-line react/no-array-index-key
						<Grid key={`notice-section-1-${item.length}-${index}`} item xs={12} lg={6}>
							<Hidden xsDown>
								<Grid container>
									{item.map((notice) => (
										<Grid key={`notice-section-1-pc-${notice.id}`} item xs={12}>
											<Link href={'/notices/[id]'} as={`/notices/${notice.id}`}>
												<Grow in>
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
																<CardContent className={classes.cardContent}>
																	<Box display={'flex'} alignItems={'center'}>
																		<Typography className={classes.typography} variant={'body1'}>
																			{notice.subject}
																		</Typography>
																		{moment(new Date(), 'YYYYMMDDHH:mm:ss').diff(notice.createdAt, 'days')
																			=== 0 && (
																			<Box ml={1}>
																				<Chip className={classes.chip} label={'NEW'} color={'primary'} size={'small'} />
																			</Box>
																		)}
																	</Box>
																	<Box mt={1} mb={1}>
																		<Typography
																			className={classes.descriptionTypography}
																			variant={'body2'}
																			color={'textSecondary'}
																		>
																			{notice.description}
																		</Typography>
																	</Box>
																	<Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={0.5}>
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
												</Grow>
											</Link>
										</Grid>
									))}
								</Grid>
							</Hidden>
							<Hidden smUp>
								<Grid className={classes.gridItemContainer} container>
									{item.map((notice) => (
										<Grid key={`notice-section-1-mobile-${notice.id}`} item xs={12} lg={6}>
											<Link href={'/notices/[id]'} as={`/notices/${notice.id}`}>
												<Grow in>
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
																<Box display={'flex'} alignItems={'center'}>
																	<Box maxWidth={'80%'}>
																		<Typography className={classes.typography} noWrap variant={'body1'}>
																			{notice.subject}
																		</Typography>
																	</Box>
																	{moment(new Date(), 'YYYYMMDDHH:mm:ss').diff(notice.createdAt, 'days')
																		=== 0 && (
																		<Box ml={1}>
																			<Chip className={classes.chip} label={'NEW'} color={'primary'} size={'small'} />
																		</Box>
																	)}
																</Box>
																<Box mt={1} mb={1}>
																	<Typography
																		className={classes.descriptionTypography}
																		variant={'body2'}
																		color={'textSecondary'}
																	>
																		{notice.description}
																	</Typography>
																</Box>
																<Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={0.5}>
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
												</Grow>
											</Link>
										</Grid>
									))}
								</Grid>
							</Hidden>
						</Grid>
					);
				})}
			</Grid>
			{!pending && transferNotices.length === 0 && <DataEmptyBox message={'새로운 소식이 존재하지 않습니다.'} />}
		</>
	);
}

export default memo(NoticeGridList);
