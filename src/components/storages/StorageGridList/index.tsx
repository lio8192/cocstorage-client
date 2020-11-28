import React, { memo } from 'react';
import Link from 'next/link';
import {
	createStyles, makeStyles, Theme, useTheme
} from '@material-ui/core/styles';
import moment from 'moment';

// Material UI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grow from '@material-ui/core/Grow';
import Card from '@material-ui/core/Card';

// Material UI Icons
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';

// Components
import DataEmptyBox from 'components/common/DataEmptyBox';

// Custom Hooks
import useStorageGridList from 'hooks/storages/useStorageGridList';
import useMediaQuery from '@material-ui/core/useMediaQuery';

moment.locale('ko');

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
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

function StorageGridList() {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const { pending, storages } = useStorageGridList();
	return (
		<Box className={classes.root}>
			<Box>
				{pending && (
					<Grow in>
						<Box pt={20} pb={20} textAlign={'center'}>
							<CircularProgress size={50} />
						</Box>
					</Grow>
				)}
				{!pending && !isMobile && (
					<Grid container spacing={1}>
						{storages.map((item) => (
							<Grow key={`storage-${item.id}`} in>
								<Grid item xs={6} sm={4} md={3}>
									<Link href={'/storages/[path]'} as={`/storages/${item.path}`}>
										<Card className={classes.card} elevation={0}>
											<CardActionArea>
												<CardContent className={classes.cardContentHead} />
												<CardContent>
													<Avatar className={classes.avatar} src={item.avatarUrl || ''} alt={'Storage Avatar Img'}>
														<InsertPhotoIcon />
													</Avatar>
													<Box mt={1}>
														<Typography className={classes.typography}>{item.name}</Typography>
													</Box>
												</CardContent>
											</CardActionArea>
										</Card>
									</Link>
								</Grid>
							</Grow>
						))}
					</Grid>
				)}
				{!pending && isMobile && (
					<List disablePadding>
						{storages.map((item) => (
							<Grow key={`storage-${item.id}`} in>
								<Box>
									<Link href={'/storages/[path]'} as={`/storages/${item.path}`}>
										<ListItem className={classes.listItem} button>
											<Avatar src={item.avatarUrl || ''} alt={'Storage Avatar Img'}>
												<InsertPhotoIcon />
											</Avatar>
											<Box ml={1}>{item.name}</Box>
										</ListItem>
									</Link>
								</Box>
							</Grow>
						))}
					</List>
				)}
				{!pending && storages.length === 0 && <DataEmptyBox message={'첫 저장소 등록의 주인공이 되어 보세요!'} />}
			</Box>
		</Box>
	);
}

export default memo(StorageGridList);
