import React, { memo } from 'react';
import Link from 'next/link';
import {
	createStyles, makeStyles, Theme, useTheme
} from '@material-ui/core/styles';

// Material UI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Grow from '@material-ui/core/Grow';
import Card from '@material-ui/core/Card';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Material UI Icons
import WhatshotIcon from '@material-ui/icons/Whatshot';
import CastIcon from '@material-ui/icons/Cast';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import SchoolIcon from '@material-ui/icons/School';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import SportsBaseballIcon from '@material-ui/icons/SportsBaseball';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			padding: 0,
			backgroundColor: 'white'
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
		}
	})
);

function getCategoryIconByCategoryId(categoryId: string | string[]) {
	let categoryIcon: JSX.Element | null = null;

	switch (categoryId) {
	case 'ib_new1':
		categoryIcon = <CastIcon />;
		break;
	case 'stream':
		categoryIcon = <PlayArrowIcon />;
		break;
	case 'issuezoom':
		categoryIcon = <CalendarTodayIcon />;
		break;
	case 'exam_new':
		categoryIcon = <SchoolIcon />;
		break;
	case 'extra':
		categoryIcon = <FitnessCenterIcon />;
		break;
	case 'baseball_new9':
		categoryIcon = <SportsBaseballIcon />;
		break;
	default:
		categoryIcon = <WhatshotIcon />;
		break;
	}

	return categoryIcon;
}

function getCollectStorageNameByCategoryId(categoryId: string) {
	let categoryIcon: string;

	switch (categoryId) {
	case 'ib_new1':
		categoryIcon = '인터넷방송';
		break;
	case 'stream':
		categoryIcon = '스트리머';
		break;
	case 'issuezoom':
		categoryIcon = '이슈';
		break;
	case 'exam_new':
		categoryIcon = '수능';
		break;
	case 'extra':
		categoryIcon = '헬스';
		break;
	case 'baseball_new9':
		categoryIcon = '국내야구';
		break;
	default:
		categoryIcon = '일간 개념글';
		break;
	}

	return categoryIcon;
}

function CollectStorageGridList() {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	return (
		<Box className={classes.root}>
			<Box>
				{!isMobile ? (
					<Grid container spacing={1}>
						{['daily_popular', 'ib_new1', 'stream', 'issuezoom', 'exam_new', 'extra', 'baseball_new9'].map((item) => (
							<Grow key={`collect-storage-${item}`} in>
								<Grid item xs={12} sm={4} md={3}>
									<Link href={'/board/[id]'} as={`/board/${item}`}>
										<Card className={classes.card} elevation={0}>
											<CardActionArea>
												<CardContent className={classes.cardContentHead} />
												<CardContent>
													<Avatar className={classes.avatar}>{getCategoryIconByCategoryId(item)}</Avatar>
													<Box mt={1}>
														<Typography className={classes.typography}>
															{getCollectStorageNameByCategoryId(item)}
														</Typography>
													</Box>
												</CardContent>
											</CardActionArea>
										</Card>
									</Link>
								</Grid>
							</Grow>
						))}
					</Grid>
				) : (
					<List disablePadding>
						{['daily_popular', 'ib_new1', 'stream', 'issuezoom', 'exam_new', 'extra', 'baseball_new9'].map((item) => (
							<Grow key={`collect-storage-${item}`} in>
								<Box>
									<Link href={'/board/[id]'} as={`/board/${item}`}>
										<ListItem className={classes.listItem} button>
											<Avatar>{getCategoryIconByCategoryId(item)}</Avatar>
											<Box ml={1}>{getCollectStorageNameByCategoryId(item)}</Box>
										</ListItem>
									</Link>
								</Box>
							</Grow>
						))}
					</List>
				)}
			</Box>
		</Box>
	);
}

export default memo(CollectStorageGridList);
