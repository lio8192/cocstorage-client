import React, { memo } from 'react';
import Link from 'next/link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import moment from 'moment';

// Material UI
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grow from '@material-ui/core/Grow';
import Card from '@material-ui/core/Card';

// Material UI Icons
import ScheduleIcon from '@material-ui/icons/Schedule';
import CheckIcon from '@material-ui/icons/Check';

// Components
import DataEmptyBox from 'components/common/DataEmptyBox';

// Custom Hooks
import useStorageGridList from 'hooks/storages/useStorageGridList';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			padding: theme.spacing(0, 0, 0)
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
		}
	})
);

function StorageGridList() {
	const classes = useStyles();
	const { pending, storages } = useStorageGridList();
	return (
		<Box className={classes.root}>
			{!pending && (
				<Box mt={1}>
					<Button color={'primary'} size={'large'} startIcon={<CheckIcon />}>
						<Typography className={classes.orderTypography} variant={'body1'}>
							{'최신순'}
						</Typography>
					</Button>
				</Box>
			)}
			<Box mt={1}>
				{!pending && (
					<Grid container spacing={2}>
						{storages.map((item) => (
							<Grow key={`storage-${item.id}`} in>
								<Grid item xs={12} sm={4} md={3}>
									<Link href={'/storages/[path]'} as={`/storages/${item.path}`}>
										<Card className={classes.card} elevation={0}>
											<CardActionArea>
												<CardContent className={classes.cardContentHead} />
												<CardContent>
													<Avatar className={classes.avatar} src={item.avatarUrl || ''} alt={'Storage Avatar Img'} />
													<Box mt={1}>
														<Typography className={classes.typography}>{item.name}</Typography>
													</Box>
													<Box display={'flex'} alignItems={'center'} mt={1} justifyContent={'flex-end'}>
														<Box>
															<ScheduleIcon className={classes.icon} color={'action'} />
														</Box>
														<Box ml={0.5}>
															<Typography variant={'caption'}>
																{moment(item.createdAt).format('YYYY. MM. DD')}
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
				)}
				{pending && (
					<Grow in>
						<Box mt={1} pt={20} pb={20} textAlign={'center'}>
							<CircularProgress size={50} />
						</Box>
					</Grow>
				)}
				{!pending && storages.length === 0 && <DataEmptyBox message={'첫 저장소 등록의 주인공이 되어 보세요!'} />}
			</Box>
		</Box>
	);
}

export default memo(StorageGridList);
