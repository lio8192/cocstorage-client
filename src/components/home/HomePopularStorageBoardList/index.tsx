import React, { memo } from 'react';
import Link from 'next/link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import moment from 'moment';
import clsx from 'clsx';

// Material UI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

// Material UI Icons
import StarIcon from '@material-ui/icons/Star';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

// Material UI Labs
import Skeleton from '@material-ui/lab/Skeleton';

// Components
import DataEmptyBox from 'components/common/DataEmptyBox';

// Custom Hooks
import useHomePopularStorageBoardList from 'hooks/home/useHomePopularStorageBoardList';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			height: '100%',
			[theme.breakpoints.down('md')]: {
				marginTop: theme.spacing(1)
			}
		},
		box: {
			margin: theme.spacing(0, 0, 1.5),
			[theme.breakpoints.down('md')]: {
				margin: theme.spacing(0, 3, 1.5)
			},
			[theme.breakpoints.down('xs')]: {
				margin: theme.spacing(0, 2, 1.5)
			}
		},
		typography: {
			fontWeight: 700,
			cursor: 'default'
		},
		chip: {
			color: 'white',
			fontFamily: 'NanumSquareRoundEB',
			borderRadius: 4,
			cursor: 'pointer'
		},
		commentBox: {
			marginLeft: theme.spacing(1),
			color: theme.palette.grey.A200
		},
		anchor: {
			color: 'inherit',
			textDecoration: 'none',
			'&:visited .storage-board-subject': {
				color: theme.palette.grey.A200
			}
		},
		list: {
			minHeight: 400,
			border: `1px solid ${theme.palette.grey['50']}`,
			borderRadius: 4,
			backgroundColor: theme.palette.background.paper,
			[theme.breakpoints.down('md')]: {
				borderLeft: 'none',
				borderRight: 'none',
				borderRadius: 'inherit'
			}
		},
		listEmpty: {
			height: '100%'
		},
		listItem: {
			flexWrap: 'wrap',
			maxHeight: 68,
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(1, 3)
			},
			[theme.breakpoints.down('xs')]: {
				padding: theme.spacing(1, 2)
			}
		},
		icon: {
			fontSize: 14,
			color: 'white'
		},
		avatarGroup: {
			minWidth: 0,
			margin: 'auto'
		},
		avatar: {
			width: theme.spacing(3.5),
			height: theme.spacing(3.5)
		},
		avatarStar: {
			width: theme.spacing(3.5),
			height: theme.spacing(3.5),
			backgroundColor: '#FFE400'
		},
		listItemBox: {
			flexShrink: 0,
			marginRight: theme.spacing(1)
		},
		infoBox: {
			marginTop: theme.spacing(0.5),
			'& > span::after': {
				content: '""',
				display: 'inline-block',
				width: 3,
				height: 3,
				margin: theme.spacing(0, 0.5),
				border: `1px solid ${theme.palette.grey.A200}`,
				borderRadius: 4,
				backgroundColor: theme.palette.grey.A200,
				verticalAlign: 'middle'
			},
			'& span:last-child::after': {
				display: 'none'
			}
		},
		infoBoxIcon: {
			verticalAlign: 'middle'
		},
		skeleton: {
			display: 'inline-block'
		},
		divider: {
			width: 40,
			height: 7,
			backgroundColor: theme.palette.primary.main
		}
	})
);

function HomePopularStorageBoardList() {
	const classes = useStyles();
	const {
		popularStorageBoards: { data, pending }
	} = useHomePopularStorageBoardList();

	return (
		<Box className={classes.root}>
			<Box className={classes.box}>
				<Divider className={classes.divider} />
				<Box mt={0.5} />
				<Typography className={classes.typography} variant={'h6'}>
					{'실시간 인기 개념글'}
				</Typography>
			</Box>
			<List
				className={clsx(classes.list, {
					[classes.listEmpty]: !pending && data.length === 0
				})}
				disablePadding
			>
				{pending
					&& [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
						<ListItem key={`home-dummy-popular-storage-board-${item}`} className={classes.listItem}>
							<Box display={'flex'} alignItems={'center'} minWidth={0} width={'100%'}>
								<Box className={classes.listItemBox}>
									<Skeleton variant={'circle'} width={30} height={30} />
								</Box>
								<Skeleton width={`${Math.round(Math.random() * 100) + 50}%`} height={24} />
								<Box className={classes.commentBox} component={'span'}>
									<Skeleton width={20} height={24} />
								</Box>
								<Box className={classes.commentBox} component={'span'}>
									<Skeleton width={30} height={24} />
								</Box>
							</Box>
							<Box mt={0.5}>
								<Box component={'span'}>
									<Skeleton className={classes.skeleton} width={20} height={15} />
								</Box>
								<Box component={'span'} ml={1}>
									<Skeleton className={classes.skeleton} width={20} height={15} />
								</Box>
							</Box>
						</ListItem>
					))}
				{!pending
					&& data.map((item) => (
						<Link
							key={`home-popular-storage-board-${item.id}`}
							href={'/storages/[path]/[id]'}
							as={`/storages/${item.storage.path}/${item.id}`}
						>
							<a className={classes.anchor}>
								<ListItem className={classes.listItem} button>
									<Box display={'flex'} alignItems={'center'} minWidth={0} width={'100%'}>
										<Box className={classes.listItemBox}>
											<Avatar className={classes.avatarStar}>
												<StarIcon className={classes.icon} />
											</Avatar>
										</Box>
										<Typography variant={'body2'} noWrap>
											{item.subject}
										</Typography>
										<Box className={classes.commentBox} component={'span'}>
											{`[${item.commentTotalCount}]`}
										</Box>
										{moment(new Date(), 'YYYYMMDDHH:mm:ss').diff(item.createdAt, 'days') === 0 && (
											<Box ml={1}>
												<Chip className={classes.chip} label={'N'} color={'primary'} size={'small'} />
											</Box>
										)}
									</Box>
									<Box className={classes.infoBox}>
										<Typography variant={'caption'}>{item.storage.name}</Typography>
										<Typography variant={'caption'} color={'textSecondary'} noWrap>
											{moment(item.createdAt, 'YYYYMMDDHH:mm:ss').fromNow()}
										</Typography>
										<Box component={'span'}>
											<Box component={'span'}>
												<ThumbUpAltIcon className={classes.infoBoxIcon} color={'action'} fontSize={'small'} />
											</Box>
											<Box component={'span'} ml={0.5}>
												<Typography variant={'caption'}>{item.thumbUp}</Typography>
											</Box>
										</Box>
									</Box>
								</ListItem>
							</a>
						</Link>
					))}
				{!pending && data.length === 0 && (
					<DataEmptyBox
						message={'아직 실시간 인기 개념글이 존재하지 않아요.'}
						paddingTop={0}
						paddingBottom={0}
						maxHeight={400}
					/>
				)}
			</List>
		</Box>
	);
}

export default memo(HomePopularStorageBoardList);
