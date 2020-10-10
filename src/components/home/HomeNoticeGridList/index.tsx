import React, { memo } from 'react';
import {
	createStyles, makeStyles, Theme, useTheme
} from '@material-ui/core/styles';

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
import Card from '@material-ui/core/Card';
import Grow from '@material-ui/core/Grow';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Material UI Icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import PersonIcon from '@material-ui/icons/Person';
import NearMeIcon from '@material-ui/icons/NearMe';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

// Images
import UpdateImg from 'images/update.png';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(0)
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
				padding: theme.spacing(1, 3, 0)
			},
			[theme.breakpoints.down('xs')]: {
				padding: theme.spacing(1, 2, 0)
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
		box: {
			marginTop: theme.spacing(2),
			[theme.breakpoints.down('md')]: {
				marginTop: 0,
				paddingTop: theme.spacing(1)
			}
		},
		avatar: {
			marginRight: theme.spacing(1)
		},
		grid: {
			backgroundColor: 'white'
		},
		gridItem: {
			width: '100%'
		},
		card: {
			border: '1px solid #EAEAEA'
		},
		media: {
			height: 200
		},
		chip: {
			color: 'white'
		},
		infoBox: {
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
		list: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			height: '100%',
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(0, 1)
			},
			[theme.breakpoints.down('xs')]: {
				padding: theme.spacing(0)
			}
		},
		listBox: {
			maxWidth: '100%',
			height: '100%',
			border: '1px solid #EAEAEA',
			[theme.breakpoints.down('md')]: {
				border: 'none'
			}
		},
		listItemBox: {
			display: 'flex',
			alignItems: 'center',
			maxWidth: '100%'
		},
		subjectBox: {
			display: 'flex',
			alignItems: 'center',
			maxWidth: '92%',
			marginLeft: theme.spacing(1),
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
		}
	})
);

function HomeNoticeGridList() {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	return (
		<Container className={classes.root}>
			<Box className={classes.box}>
				<Box className={classes.titleBox}>
					<Typography className={classes.title} variant={'h6'} component={'h6'}>
						{'새로운 소식'}
					</Typography>
					<Box className={classes.navigate}>
						<Button endIcon={<NavigateNextIcon color={'action'} />}>{'더 보기'}</Button>
					</Box>
				</Box>
				<Grid className={classes.grid} container spacing={isMobile ? 0 : 1}>
					<Hidden mdDown>
						<Grow in>
							<Grid item lg={6}>
								<Card className={classes.card} square elevation={0}>
									<CardActionArea>
										<CardMedia className={classes.media} image={UpdateImg} title={'Contemplative Reptile'} />
										<CardContent>
											<Box display={'flex'} alignItems={'center'}>
												<Box maxWidth={'90%'}>
													<Typography noWrap variant={'h5'}>
														{'2020년 10월 10일 업데이트 안내'}
													</Typography>
												</Box>
												<Box ml={1}>
													<Chip className={classes.chip} label={'NEW'} color={'primary'} />
												</Box>
											</Box>
											<Box mt={1}>
												<Typography variant={'body2'} color={'textSecondary'}>
													{'개념글 저장소 1주년을 맞이하여 대규모 업데이트가 진행되었습니다.'}
												</Typography>
											</Box>
											<Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={0.5}>
												<Box className={classes.infoBox}>
													<Typography variant={'caption'} color={'textSecondary'}>
														{'관리자'}
													</Typography>
													<Typography variant={'caption'} color={'textSecondary'}>
														{'1시간 전'}
													</Typography>
												</Box>
												<Box display={'flex'} alignItems={'center'}>
													<Box>
														<VisibilityIcon className={classes.icon} color={'action'} />
													</Box>
													<Box ml={0.5}>
														<Typography variant={'caption'} color={'textSecondary'}>
															{'1,000'}
														</Typography>
													</Box>
												</Box>
											</Box>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
						</Grow>
					</Hidden>
					<Grow in>
						<Grid className={classes.gridItem} item md={12} lg={6}>
							<Box className={classes.listBox}>
								<List className={classes.list} disablePadding>
									<ListItem button>
										<Box width={'100%'}>
											<Box className={classes.listItemBox}>
												<Box>
													<NearMeIcon className={classes.icon} color={'action'} fontSize={'large'} />
												</Box>
												<Box className={classes.subjectBox}>
													<Typography variant={'body2'} noWrap>
														{
															'새로운 소식 제목입니다. 새로운 소식 제목입니다. 새로운 소식 제목입니다. 새로운 소식 제목입니다. 새로운 소식 제목입니다.'
														}
													</Typography>
													<Box ml={1}>
														<Chip className={classes.chip} label={'NEW'} color={'primary'} size={'small'} />
													</Box>
												</Box>
											</Box>
											<Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={0.5}>
												<Box className={classes.listInfoBox}>
													<Avatar className={classes.avatar}>
														<PersonIcon />
													</Avatar>
													<Typography variant={'caption'} color={'textSecondary'}>
														{'관리자'}
													</Typography>
													<Typography variant={'caption'} color={'textSecondary'}>
														{'1시간 전'}
													</Typography>
												</Box>
												<Box display={'flex'} alignItems={'center'}>
													<Box>
														<VisibilityIcon className={classes.icon} color={'action'} />
													</Box>
													<Box ml={0.5}>
														<Typography variant={'caption'} color={'textSecondary'}>
															{'1,000'}
														</Typography>
													</Box>
												</Box>
											</Box>
										</Box>
									</ListItem>
									<ListItem button>
										<Box width={'100%'}>
											<Box className={classes.listItemBox}>
												<Box>
													<NearMeIcon className={classes.icon} color={'action'} fontSize={'large'} />
												</Box>
												<Box className={classes.subjectBox}>
													<Typography variant={'body2'} noWrap>
														{
															'새로운 소식 제목입니다. 새로운 소식 제목입니다. 새로운 소식 제목입니다. 새로운 소식 제목입니다. 새로운 소식 제목입니다.'
														}
													</Typography>
													<Box ml={1}>
														<Chip className={classes.chip} label={'NEW'} color={'primary'} size={'small'} />
													</Box>
												</Box>
											</Box>
											<Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={0.5}>
												<Box className={classes.listInfoBox}>
													<Avatar className={classes.avatar}>
														<PersonIcon />
													</Avatar>
													<Typography variant={'caption'} color={'textSecondary'}>
														{'관리자'}
													</Typography>
													<Typography variant={'caption'} color={'textSecondary'}>
														{'1시간 전'}
													</Typography>
												</Box>
												<Box display={'flex'} alignItems={'center'}>
													<Box>
														<VisibilityIcon className={classes.icon} color={'action'} />
													</Box>
													<Box ml={0.5}>
														<Typography variant={'caption'} color={'textSecondary'}>
															{'1,000'}
														</Typography>
													</Box>
												</Box>
											</Box>
										</Box>
									</ListItem>
									<ListItem button>
										<Box width={'100%'}>
											<Box className={classes.listItemBox}>
												<Box>
													<NearMeIcon className={classes.icon} color={'action'} fontSize={'large'} />
												</Box>
												<Box className={classes.subjectBox}>
													<Typography variant={'body2'} noWrap>
														{
															'새로운 소식 제목입니다. 새로운 소식 제목입니다. 새로운 소식 제목입니다. 새로운 소식 제목입니다. 새로운 소식 제목입니다.'
														}
													</Typography>
													<Box ml={1}>
														<Chip className={classes.chip} label={'NEW'} color={'primary'} size={'small'} />
													</Box>
												</Box>
											</Box>
											<Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={0.5}>
												<Box className={classes.listInfoBox}>
													<Avatar className={classes.avatar}>
														<PersonIcon />
													</Avatar>
													<Typography variant={'caption'} color={'textSecondary'}>
														{'관리자'}
													</Typography>
													<Typography variant={'caption'} color={'textSecondary'}>
														{'1시간 전'}
													</Typography>
												</Box>
												<Box display={'flex'} alignItems={'center'}>
													<Box>
														<VisibilityIcon className={classes.icon} color={'action'} />
													</Box>
													<Box ml={0.5}>
														<Typography variant={'caption'} color={'textSecondary'}>
															{'1,000'}
														</Typography>
													</Box>
												</Box>
											</Box>
										</Box>
									</ListItem>
								</List>
							</Box>
						</Grid>
					</Grow>
				</Grid>
			</Box>
		</Container>
	);
}

export default memo(HomeNoticeGridList);
