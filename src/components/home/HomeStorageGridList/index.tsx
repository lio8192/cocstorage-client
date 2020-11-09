import React, { useCallback, memo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import moment from 'moment';

// Material UI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import Card from '@material-ui/core/Card';

// Material UI Icons
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ScheduleIcon from '@material-ui/icons/Schedule';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';

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
			[theme.breakpoints.down('md')]: {
				padding: 0
			}
		},
		box: {
			marginTop: theme.spacing(2),
			[theme.breakpoints.down('md')]: {
				marginTop: 0,
				paddingTop: theme.spacing(1)
			}
		},
		titleBox: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			backgroundColor: 'white'
		},
		title: {
			paddingBottom: theme.spacing(1),
			fontWeight: 700,
			color: '#3d3d3d',
			cursor: 'default',
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(1, 3)
			},
			[theme.breakpoints.down('xs')]: {
				padding: theme.spacing(1, 2)
			}
		},
		navigate: {
			paddingBottom: theme.spacing(1),
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(1, 3)
			},
			[theme.breakpoints.down('xs')]: {
				padding: theme.spacing(1, 2)
			}
		},
		grid: {
			backgroundColor: 'white',
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(0, 3, 1)
			},
			[theme.breakpoints.down('xs')]: {
				padding: theme.spacing(0, 2, 1)
			}
		},
		card: {
			border: '1px solid #EAEAEA'
		},
		cardContentHead: {
			padding: theme.spacing(3),
			background: 'linear-gradient(rgb(244, 245, 247) 100%, rgb(255, 255, 255) 35%, rgb(255, 255, 255) 100%)'
		},
		avatar: {
			width: theme.spacing(7),
			height: theme.spacing(7),
			marginTop: theme.spacing(-5)
		},
		avatarSkeleton: {
			width: theme.spacing(7),
			height: theme.spacing(7),
			marginTop: theme.spacing(-5)
		},
		typography: {
			fontWeight: 700
		},
		orderTypography: {
			fontFamily: 'NanumSquareRoundEB'
		},
		icon: {
			verticalAlign: 'middle'
		},
		button: {
			color: 'white'
		}
	})
);

function HomeStorageGridList() {
	const classes = useStyles();
	const router = useRouter();
	const {
		storages: { data, pending }
	} = useHomeStorageGridList();

	const handleNavigateButtonRoute = useCallback(() => router.push('/storages', '/storages').then(), [router]);

	return (
		<Container className={classes.root}>
			<Box className={classes.box}>
				<Box className={classes.titleBox}>
					<Typography className={classes.title} variant={'h6'} component={'h6'}>
						{'새로운 저장소'}
					</Typography>
					<Box className={classes.navigate}>
						<Button endIcon={<NavigateNextIcon color={'action'} />} onClick={handleNavigateButtonRoute}>
							{'더 보기'}
						</Button>
					</Box>
				</Box>
				{pending && (
					<Box className={classes.grid}>
						<Grid container spacing={1}>
							{[1, 2, 3, 4].map((item, index) => (
								<Grow key={`dummy-home-storage-${item}`} in timeout={(index + 1) * 200}>
									<Grid item xs={12} sm={6} md={6} lg={3}>
										<Card className={classes.card} elevation={0} square>
											<CardContent className={classes.cardContentHead} />
											<CardContent>
												<Skeleton className={classes.avatarSkeleton} variant={'circle'} width={50} height={50} />
												<Box mt={1}>
													<Typography className={classes.typography}>
														<Skeleton width={200} />
													</Typography>
												</Box>
												<Box display={'flex'} alignItems={'center'} mt={1} justifyContent={'flex-end'}>
													<Box>
														<Skeleton variant={'circle'} width={20} height={20} />
													</Box>
													<Box ml={0.5}>
														<Typography variant={'caption'}>
															<Skeleton width={100} />
														</Typography>
													</Box>
												</Box>
											</CardContent>
										</Card>
									</Grid>
								</Grow>
							))}
						</Grid>
					</Box>
				)}
				{!pending && (
					<Box className={classes.grid}>
						<Grid container spacing={1}>
							{data.map((item, index) => (
								<Grow key={`home-storage-${item.id}`} in timeout={(index + 1) * 200}>
									<Grid item xs={12} sm={6} md={6} lg={3}>
										<Link href={'/storages/[path]'} as={`/storages/${item.path}`}>
											<Card className={classes.card} elevation={0} square>
												<CardActionArea>
													<CardContent className={classes.cardContentHead} />
													<CardContent>
														<Avatar className={classes.avatar} src={item.avatarUrl || ''} alt={'Storage Avatar Img'}>
															<InsertPhotoIcon />
														</Avatar>
														<Box mt={1}>
															<Typography className={classes.typography}>{item.name}</Typography>
														</Box>
														<Box display={'flex'} alignItems={'center'} mt={1} justifyContent={'flex-end'}>
															<Box>
																<ScheduleIcon className={classes.icon} color={'action'} />
															</Box>
															<Box ml={0.5}>
																<Typography variant={'caption'}>
																	{moment(item.createdAt, 'YYYYMMDDHH:mm:ss').fromNow()}
																</Typography>
															</Box>
														</Box>
													</CardContent>
												</CardActionArea>
											</Card>
										</Link>
									</Grid>
								</Grow>
							))}
						</Grid>
					</Box>
				)}
				{!pending && data.length === 0 && (
					<DataEmptyBox message={'첫 저장소 등록의 주인공이 되어 보세요!'} paddingTop={10} paddingBottom={10} />
				)}
			</Box>
		</Container>
	);
}

export default memo(HomeStorageGridList);
