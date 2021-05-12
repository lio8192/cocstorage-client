import React, { memo } from 'react';
import Link from 'next/link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import moment from 'moment';

// Material UI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grow from '@material-ui/core/Grow';
import Card from '@material-ui/core/Card';

// Material UI Icons
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';

// Components
import DataEmptyBox from 'components/common/DataEmptyBox';

// Custom Hooks
import useStorageGridList from 'hooks/storages/useStorageGridList';

moment.locale('ko');

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		card: {
			border: '1px solid #EAEAEA',
			[theme.breakpoints.down('md')]: {
				border: 'none',
				textAlign: 'center'
			}
		},
		cardContentHead: {
			padding: theme.spacing(3),
			background: 'linear-gradient(rgb(244, 245, 247) 100%, rgb(255, 255, 255) 35%, rgb(255, 255, 255) 100%)',
			[theme.breakpoints.down('md')]: {
				padding: 0
			}
		},
		avatar: {
			width: theme.spacing(7),
			height: theme.spacing(7),
			marginTop: theme.spacing(-5),
			[theme.breakpoints.down('md')]: {
				margin: 'auto'
			},
			[theme.breakpoints.down('sm')]: {
				width: theme.spacing(5),
				height: theme.spacing(5)
			}
		},
		typography: {
			fontFamily: 'NanumSquareRoundEB',
			[theme.breakpoints.down('md')]: {
				fontSize: 16
			},
			[theme.breakpoints.down('sm')]: {
				fontSize: 14
			},
			[theme.breakpoints.down('xs')]: {
				fontSize: 12
			}
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
		},
		chip: {
			color: 'white',
			fontFamily: 'NanumSquareRoundEB',
			borderRadius: 5
		},
		badge: {
			'& .MuiBadge-anchorOriginTopRightRectangle': {
				top: theme.spacing(-5)
			},
			[theme.breakpoints.down('md')]: {
				'& .MuiBadge-anchorOriginTopRightRectangle': {
					top: 0
				}
			}
		}
	})
);

function StorageGridList() {
	const classes = useStyles();
	const { pending, storages } = useStorageGridList();
	return (
		<Box>
			<Box>
				{pending && (
					<Grow in>
						<Box pt={20} pb={20} textAlign={'center'}>
							<CircularProgress size={50} />
						</Box>
					</Grow>
				)}
				{!pending && (
					<Grid container spacing={1}>
						{storages.map((item) => (
							<Grow key={`storage-${item.id}`} in>
								<Grid item xs={4} sm={2}>
									<Link href={'/storages/[path]'} as={`/storages/${item.path}`}>
										<Card className={classes.card} elevation={0}>
											<CardActionArea>
												<CardContent className={classes.cardContentHead} />
												<CardContent>
													<Badge
														className={classes.badge}
														badgeContent={
															<Chip className={classes.chip} label={'N'} color={'primary'} size={'small'} />
														}
														invisible={moment(new Date(), 'YYYYMMDDHH:mm:ss').diff(item.createdAt, 'days') > 7}
													>
														<Avatar className={classes.avatar} src={item.avatarUrl || ''} alt={'Storage Avatar Img'}>
															<InsertPhotoIcon />
														</Avatar>
													</Badge>
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
				{!pending && storages.length === 0 && <DataEmptyBox message={'첫 저장소 등록의 주인공이 되어 보세요!'} />}
			</Box>
		</Box>
	);
}

export default memo(StorageGridList);
