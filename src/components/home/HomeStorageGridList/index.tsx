import React, { useCallback, memo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
	createStyles, makeStyles, Theme, useTheme
} from '@material-ui/core/styles';
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Material UI Icons
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';

// Material UI Labs
import Skeleton from '@material-ui/lab/Skeleton';

// Custom Hooks
import useHomeStorageGridList from 'hooks/home/useHomeStorageGridList';

// Components
import DataEmptyBox from 'components/common/DataEmptyBox';
import Chip from '@material-ui/core/Chip';

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
			width: '100%',
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
		},
		list: {
			backgroundColor: 'white'
		},
		listItem: {
			padding: theme.spacing(1, 3),
			[theme.breakpoints.down('xs')]: {
				padding: theme.spacing(1, 2)
			}
		},
		typographyInnerBox: {
			overflow: 'hidden',
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis'
		},
		chipBox: {
			verticalAlign: 1
		},
		chip: {
			color: 'white',
			fontFamily: 'NanumSquareRoundEB',
			borderRadius: 5
		}
	})
);

function HomeStorageGridList() {
	const classes = useStyles();
	const router = useRouter();
	const {
		storages: { data, pending }
	} = useHomeStorageGridList();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const handleNavigateButtonRoute = useCallback(() => router.push('/storages', '/storages').then(), [router]);

	return (
		<Container className={classes.root}>
			<Box className={classes.box}>
				<Box className={classes.titleBox}>
					<Box flex={1}>
						<Typography className={classes.title} variant={'h6'} component={'h6'}>
							{'새로운 저장소'}
						</Typography>
					</Box>
					<Box className={classes.navigate}>
						<Button endIcon={<NavigateNextIcon color={'action'} />} onClick={handleNavigateButtonRoute}>
							{'더 보기'}
						</Button>
					</Box>
				</Box>
				{pending && !isMobile && (
					<Box className={classes.grid}>
						<Grid container spacing={1}>
							{[1, 2, 3, 4, 5, 6].map((item) => (
								<Grid key={`dummy-home-storage-${item}`} item xs={12} sm={6} md={6} lg={2}>
									<Card className={classes.card} elevation={0} square>
										<CardContent className={classes.cardContentHead} />
										<CardContent>
											<Skeleton className={classes.avatarSkeleton} variant={'circle'} width={50} height={50} />
											<Box mt={1}>
												<Box display={'flex'} alignItems={'center'} minWidth={0} width={'100%'}>
													<Skeleton width={100} />
													<Box className={classes.chipBox} component={'span'} ml={0.5}>
														<Skeleton width={20} />
													</Box>
												</Box>
											</Box>
										</CardContent>
									</Card>
								</Grid>
							))}
						</Grid>
					</Box>
				)}
				{pending && isMobile && (
					<List className={classes.list} disablePadding>
						{[1, 2, 3, 4, 5, 6].map((item) => (
							<ListItem key={`dummy-home-storage-${item}`} className={classes.listItem} button>
								<Box display={'flex'} alignItems={'center'} minWidth={0} width={'100%'}>
									<Skeleton variant={'circle'} width={40} height={40} />
									<Box minWidth={0} width={'100%'} ml={1}>
										<Box display={'flex'} alignItems={'center'} minWidth={0} width={'100%'}>
											<Box className={classes.typographyInnerBox} component={'span'}>
												<Skeleton width={100} />
											</Box>
											<Box className={classes.chipBox} component={'span'} ml={0.5}>
												<Skeleton width={20} />
											</Box>
										</Box>
										<Box className={classes.typographyInnerBox}>
											<Typography variant={'caption'} color={'textSecondary'} noWrap>
												<Skeleton width={70} />
											</Typography>
										</Box>
									</Box>
								</Box>
							</ListItem>
						))}
					</List>
				)}
				{!pending && !isMobile && (
					<Box className={classes.grid}>
						<Grid container spacing={1}>
							{data.map((item) => (
								<Grid key={`home-storage-${item.id}`} item xs={12} sm={6} md={6} lg={2}>
									<Link href={'/storages/[path]'} as={`/storages/${item.path}`}>
										<Card className={classes.card} elevation={0} square>
											<CardActionArea>
												<CardContent className={classes.cardContentHead} />
												<CardContent>
													<Avatar className={classes.avatar} src={item.avatarUrl || ''} alt={'Storage Avatar Img'}>
														<InsertPhotoIcon />
													</Avatar>
													<Box mt={1}>
														<Box display={'flex'} alignItems={'center'} minWidth={0} width={'100%'}>
															<Typography component={'span'} className={classes.typography} noWrap>
																{item.name}
															</Typography>
															{moment(new Date(), 'YYYYMMDDHH:mm:ss').diff(item.createdAt, 'days') <= 7 && (
																<Box className={classes.chipBox} component={'span'} ml={0.5}>
																	<Chip className={classes.chip} label={'N'} color={'primary'} size={'small'} />
																</Box>
															)}
														</Box>
													</Box>
												</CardContent>
											</CardActionArea>
										</Card>
									</Link>
								</Grid>
							))}
						</Grid>
					</Box>
				)}
				{!pending && isMobile && (
					<List className={classes.list} disablePadding>
						{data.map((item) => (
							<Link key={`home-storage-${item.id}`} href={'/storages/[path]'} as={`/storages/${item.path}`}>
								<ListItem className={classes.listItem} button>
									<Box display={'flex'} alignItems={'center'} minWidth={0} width={'100%'}>
										<Avatar src={item.avatarUrl || ''} alt={'Storage Avatar Img'}>
											<InsertPhotoIcon />
										</Avatar>
										<Box minWidth={0} width={'100%'} ml={1}>
											<Box display={'flex'} alignItems={'center'} minWidth={0} width={'100%'} height={24}>
												<Box className={classes.typographyInnerBox} component={'span'}>
													{item.name}
												</Box>
												{moment(new Date(), 'YYYYMMDDHH:mm:ss').diff(item.createdAt, 'days') <= 7 && (
													<Box className={classes.chipBox} component={'span'} ml={0.5}>
														<Chip className={classes.chip} label={'N'} color={'primary'} size={'small'} />
													</Box>
												)}
											</Box>
											<Box className={classes.typographyInnerBox}>
												<Typography variant={'caption'} color={'textSecondary'} noWrap>
													{item.description}
												</Typography>
											</Box>
										</Box>
									</Box>
								</ListItem>
							</Link>
						))}
					</List>
				)}
				{!pending && data.length === 0 && (
					<DataEmptyBox message={'첫 저장소 등록의 주인공이 되어 보세요!'} paddingTop={10} paddingBottom={10} />
				)}
			</Box>
		</Container>
	);
}

export default memo(HomeStorageGridList);
