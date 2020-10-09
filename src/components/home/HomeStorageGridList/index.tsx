import React, { memo } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Material UI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TodayIcon from '@material-ui/icons/Today';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import Card from '@material-ui/core/Card';

// Material UI Icons
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(0, 0, 0.5)
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
	return (
		<Container className={classes.root}>
			<Box className={classes.box}>
				<Box className={classes.titleBox}>
					<Typography className={classes.title} variant={'h6'} component={'h6'}>
						{'새로운 저장소'}
					</Typography>
					<Box className={classes.navigate}>
						<Button endIcon={<NavigateNextIcon color={'action'} />}>{'더 보기'}</Button>
					</Box>
				</Box>
				<Grid className={classes.grid} container spacing={1}>
					{[1, 2, 3, 4].map((item, index) => (
						<Grow in timeout={(index + 1) * 200}>
							<Grid key={`index-${item}`} item xs={12} sm={6} md={6} lg={3}>
								<Card className={classes.card} elevation={0} square>
									<CardActionArea>
										<CardContent className={classes.cardContentHead} />
										<CardContent>
											<Avatar
												className={classes.avatar}
												src={'https://image.chosun.com/sitedata/image/201908/23/2019082301404_0.png'}
												alt={'Storage Avatar Img'}
											/>
											<Box mt={1}>
												<Typography className={classes.typography}>{'라이언 저장소'}</Typography>
											</Box>
											<Box display={'flex'} alignItems={'center'} mt={1} justifyContent={'flex-end'}>
												<Box>
													<TodayIcon className={classes.icon} color={'action'} />
												</Box>
												<Box ml={0.5}>
													<Typography variant={'caption'}>{'30분 전'}</Typography>
												</Box>
											</Box>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
						</Grow>
					))}
				</Grid>
			</Box>
		</Container>
	);
}

export default memo(HomeStorageGridList);
