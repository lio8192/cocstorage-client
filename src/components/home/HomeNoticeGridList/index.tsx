import React, { useMemo, memo } from 'react';
import Link from 'next/link';
import {
	createStyles, makeStyles, Theme, useTheme
} from '@material-ui/core/styles';
import moment from 'moment';

// Material UI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Material UI Icons
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

// Material UI Labs
import Skeleton from '@material-ui/lab/Skeleton';

// Custom Hooks
import useHomeStorageGridList from 'hooks/home/useHomeStorageGridList';

// Components
import DataEmptyBox from 'components/common/DataEmptyBox';

moment.locale('ko');

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginTop: theme.spacing(2),
			[theme.breakpoints.down('md')]: {
				padding: 0
			}
		},
		anchor: {
			color: 'inherit',
			textDecoration: 'none'
		},
		box: {
			[theme.breakpoints.down('md')]: {
				margin: theme.spacing(0, 3, 1.5)
			},
			[theme.breakpoints.down('xs')]: {
				margin: theme.spacing(0, 2, 1.5)
			}
		},
		titleBox: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			margin: theme.spacing(0.5, 0, 1.5)
		},
		title: {
			width: '100%',
			fontWeight: 700,
			cursor: 'default'
		},
		avatar: {
			marginRight: theme.spacing(1),
			[theme.breakpoints.down('md')]: {
				width: theme.spacing(4),
				height: theme.spacing(4)
			}
		},
		avatarBig: {
			width: theme.spacing(5.19),
			height: theme.spacing(5.19),
			marginRight: theme.spacing(1),
			[theme.breakpoints.down('md')]: {
				width: theme.spacing(4),
				height: theme.spacing(4)
			}
		},
		gridItem: {
			width: '100%'
		},
		card: {
			height: '100%',
			border: `1px solid ${theme.palette.grey['50']}`,
			borderRadius: 4
		},
		media: {
			height: 200
		},
		chip: {
			color: 'white',
			fontFamily: 'NanumSquareRoundEB',
			borderRadius: 4,
			cursor: 'pointer'
		},
		largeChip: {
			color: 'white',
			fontSize: 18,
			fontFamily: 'NanumSquareRoundEB',
			borderRadius: 4,
			cursor: 'pointer',
			'& span': {
				paddingTop: theme.spacing(0.5)
			}
		},
		infoBox: {
			display: 'flex',
			alignItems: 'center',
			marginTop: theme.spacing(0.5),
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
			'& span:first-child::after': {
				display: 'none'
			},
			'& span:last-child::after': {
				display: 'none'
			}
		},
		icon: {
			verticalAlign: 'middle'
		},
		button: {
			padding: theme.spacing(0.5, 1)
		},
		listAnchor: {
			width: '100%',
			color: 'inherit',
			textDecoration: 'none'
		},
		list: {
			height: '100%',
			backgroundColor: theme.palette.background.paper,
			[theme.breakpoints.down('md')]: {
				borderTop: `1px solid ${theme.palette.grey['50']}`
			},
			[theme.breakpoints.down('xs')]: {
				padding: theme.spacing(0)
			}
		},
		listBox: {
			maxWidth: '100%',
			height: '100%',
			border: `1px solid ${theme.palette.grey['50']}`,
			backgroundColor: theme.palette.background.paper,
			borderRadius: 4,
			overflow: 'hidden',
			[theme.breakpoints.down('md')]: {
				border: 'none',
				borderRadius: 'inherit'
			}
		},
		listItem: {
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(1, 3)
			},
			[theme.breakpoints.down('xs')]: {
				padding: theme.spacing(1, 2)
			}
		},
		listItemBox: {
			display: 'flex',
			alignItems: 'center',
			maxWidth: '100%',
			height: 24.5
		},
		subjectBox: {
			display: 'flex',
			alignItems: 'center',
			maxWidth: '92%',
			[theme.breakpoints.down('xs')]: {
				maxWidth: '85%'
			}
		},
		listInfoBox: {
			display: 'flex',
			alignItems: 'center',
			marginTop: theme.spacing(0.5),
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
			'& span:first-child::after': {
				display: 'none'
			},
			'& span:last-child::after': {
				display: 'none'
			}
		},
		typography: {
			fontSize: 14
		},
		descriptionTypography: {
			textOverflow: 'ellipsis',
			overflow: 'hidden',
			display: '-webkit-box',
			boxOrient: 'vertical',
			lineClamp: 2
		},
		nicknameTypography: {
			fontWeight: 700
		},
		divider: {
			width: 40,
			height: 7,
			backgroundColor: theme.palette.primary.main
		}
	})
);

function HomeNoticeGridList() {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const {
		notices: { data, pending }
	} = useHomeStorageGridList();

	const skeletonArray = useMemo<Array<number>>(() => (isMobile ? [1, 2, 3, 4, 5] : [1, 2, 3, 4]), [isMobile]);

	return (
		<Container className={classes.root}>
			<Box className={classes.box}>
				<Divider className={classes.divider} />
				<Box className={classes.titleBox}>
					<Box flex={1}>
						<Typography className={classes.title} variant={'h6'}>
							{'새로운 소식'}
						</Typography>
					</Box>
					<Link href={'/notices'} as={'/notices'}>
						<a className={classes.anchor}>
							<Button className={classes.button} endIcon={<NavigateNextIcon color={'action'} />}>
								{'더 보기'}
							</Button>
						</a>
					</Link>
				</Box>
			</Box>
			{pending && (
				<Grid container spacing={isMobile ? 0 : 1}>
					<Hidden mdDown>
						<Grid item lg={6}>
							<Card className={classes.card} square elevation={0}>
								<Box className={classes.media} />
								<CardContent>
									<Box display={'flex'} alignItems={'center'}>
										<Box maxWidth={'90%'}>
											<Typography noWrap variant={'h5'}>
												<Skeleton width={200} />
											</Typography>
										</Box>
									</Box>
									<Box mt={1}>
										<Typography variant={'body2'} color={'textSecondary'}>
											<Skeleton width={'100%'} />
										</Typography>
									</Box>
									<Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={0.5}>
										<Box className={classes.infoBox}>
											<Box mr={1}>
												<Skeleton variant={'circle'} width={40} height={40} />
											</Box>
											<Typography variant={'caption'} color={'textSecondary'}>
												<Skeleton width={40} />
											</Typography>
										</Box>
									</Box>
								</CardContent>
							</Card>
						</Grid>
					</Hidden>
					<Grid className={classes.gridItem} item md={12} lg={6}>
						<Box className={classes.listBox}>
							<List className={classes.list} disablePadding>
								{skeletonArray.map((item) => (
									<ListItem key={`dummy-notice-${item}`} className={classes.listItem}>
										<Box width={'100%'}>
											<Box className={classes.listItemBox}>
												<Box className={classes.subjectBox}>
													<Typography variant={'body2'} noWrap>
														<Skeleton width={250} />
													</Typography>
												</Box>
											</Box>
											<Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
												<Box className={classes.infoBox}>
													<Box mr={1}>
														<Skeleton variant={'circle'} width={43} height={43} />
													</Box>
													<Typography variant={'caption'} color={'textSecondary'}>
														<Skeleton width={40} />
													</Typography>
												</Box>
											</Box>
										</Box>
									</ListItem>
								))}
							</List>
						</Box>
					</Grid>
				</Grid>
			)}
			{!pending && (
				<Grid container spacing={isMobile ? 0 : 1}>
					{data.map((item, index) => {
						if (index === 0) {
							return (
								<Hidden key={`home-notice-main-${item.id}`} mdDown>
									<Grid item lg={6}>
										<Link href={'/notices/[id]'} as={`/notices/${item.id}`}>
											<a className={classes.listAnchor}>
												<Card className={classes.card} square elevation={0}>
													<CardActionArea>
														<CardMedia
															className={classes.media}
															image={item.thumbnailUrl || ''}
															title={'Contemplative Reptile'}
														/>
														<CardContent>
															<Box display={'flex'} alignItems={'center'}>
																<Box maxWidth={'90%'}>
																	<Typography noWrap variant={'h5'}>
																		{item.subject}
																	</Typography>
																</Box>
																{moment(new Date(), 'YYYYMMDDHH:mm:ss').diff(item.createdAt, 'days') === 0 && (
																	<Box ml={1}>
																		<Chip className={classes.largeChip} label={'N'} color={'primary'} size={'medium'} />
																	</Box>
																)}
															</Box>
															<Box mt={1}>
																<Typography
																	className={classes.descriptionTypography}
																	variant={'body2'}
																	color={'textSecondary'}
																>
																	{item.description}
																</Typography>
															</Box>
															<Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={0.5}>
																<Box className={classes.infoBox}>
																	<Avatar className={classes.avatar} src={item.user.avatarUrl || ''} />
																	<Typography className={classes.nicknameTypography} variant={'caption'}>
																		{item.user.nickname}
																	</Typography>
																	<Typography variant={'caption'} color={'textSecondary'}>
																		{moment(item.createdAt, 'YYYYMMDDHH:mm:ss').fromNow()}
																	</Typography>
																</Box>
															</Box>
														</CardContent>
													</CardActionArea>
												</Card>
											</a>
										</Link>
									</Grid>
								</Hidden>
							);
						}
						return null;
					})}
					<Grid className={classes.gridItem} item md={12} lg={6}>
						<Box className={classes.listBox}>
							<List className={classes.list} disablePadding>
								{data.map((item, index) => {
									if (index === 0) {
										return (
											<Hidden key={`home-notice-m-${item.id}`} lgUp>
												<ListItem className={classes.listItem} button>
													<Link href={'/notices/[id]'} as={`/notices/${item.id}`}>
														<a className={classes.listAnchor}>
															<Box width={'100%'}>
																<Box className={classes.listItemBox}>
																	<Box className={classes.subjectBox}>
																		<Typography className={classes.typography} variant={'body2'} noWrap>
																			{item.subject}
																		</Typography>
																		{moment(new Date(), 'YYYYMMDDHH:mm:ss').diff(item.createdAt, 'days') === 0 && (
																			<Box ml={1}>
																				<Chip
																					className={classes.chip}
																					label={'N'}
																					color={'primary'}
																					size={isMobile ? 'small' : 'medium'}
																				/>
																			</Box>
																		)}
																	</Box>
																</Box>
																<Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={0.5}>
																	<Box className={classes.listInfoBox}>
																		<Avatar className={classes.avatar} src={item.user.avatarUrl || ''} />
																		<Typography className={classes.nicknameTypography} variant={'caption'}>
																			{item.user.nickname}
																		</Typography>
																		<Typography variant={'caption'} color={'textSecondary'}>
																			{moment(item.createdAt, 'YYYYMMDDHH:mm:ss').fromNow()}
																		</Typography>
																	</Box>
																</Box>
															</Box>
														</a>
													</Link>
												</ListItem>
											</Hidden>
										);
									}
									return (
										<ListItem key={`home-notice-${item.id}`} className={classes.listItem} button>
											<Link href={'/notices/[id]'} as={`/notices/${item.id}`}>
												<a className={classes.listAnchor}>
													<Box width={'100%'}>
														<Box className={classes.listItemBox}>
															<Box className={classes.subjectBox}>
																<Typography className={classes.typography} variant={'body2'} noWrap>
																	{item.subject}
																</Typography>
																{moment(new Date(), 'YYYYMMDDHH:mm:ss').diff(item.createdAt, 'days') === 0 && (
																	<Box ml={1}>
																		<Chip className={classes.chip} label={'N'} color={'primary'} size={'small'} />
																	</Box>
																)}
															</Box>
														</Box>
														<Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={0.5}>
															<Box className={classes.listInfoBox}>
																<Avatar className={classes.avatarBig} src={item.user.avatarUrl || ''} />
																<Typography className={classes.nicknameTypography} variant={'caption'}>
																	{item.user.nickname}
																</Typography>
																<Typography variant={'caption'} color={'textSecondary'}>
																	{moment(item.createdAt, 'YYYYMMDDHH:mm:ss').fromNow()}
																</Typography>
															</Box>
														</Box>
													</Box>
												</a>
											</Link>
										</ListItem>
									);
								})}
								{data.length === 1 && (
									<DataEmptyBox message={'아직 새로운 소식이 존재하지 않아요.'} paddingTop={10} paddingBottom={10} />
								)}
							</List>
						</Box>
					</Grid>
				</Grid>
			)}
			{!pending && data.length === 0 && (
				<DataEmptyBox message={'아직 새로운 소식이 존재하지 않아요.'} paddingTop={10} paddingBottom={10} />
			)}
		</Container>
	);
}

export default memo(HomeNoticeGridList);
