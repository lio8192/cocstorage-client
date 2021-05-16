import React, { memo } from 'react';
import Link from 'next/link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import moment from 'moment';

// Material UI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';

// Material UI Icons
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';

// Material UI Labs
import Skeleton from '@material-ui/lab/Skeleton';

// Components
import DataEmptyBox from 'components/common/DataEmptyBox';

// Custom Hooks
import useHomeLatestStorageBoardList from 'hooks/home/useHomeLatestStorageBoardList';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			height: '100%',
			border: `1px solid ${theme.palette.grey['50']}`,
			backgroundColor: theme.palette.background.default,
			[theme.breakpoints.down('md')]: {
				padding: 0,
				border: 'none'
			}
		},
		typography: {
			fontWeight: 700,
			cursor: 'default'
		},
		chip: {
			color: 'white',
			fontFamily: 'NanumSquareRoundEB',
			borderRadius: 5
		},
		commentBox: {
			marginLeft: theme.spacing(1),
			color: theme.palette.grey.A200
		},
		box: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			padding: theme.spacing(1, 2),
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(1, 3)
			},
			[theme.breakpoints.down('xs')]: {
				padding: theme.spacing(1, 2)
			}
		},
		list: {
			minHeight: 400,
			height: '100%'
		},
		listItem: {
			flexWrap: 'wrap',
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
		listItemBox: {
			flexShrink: 0,
			marginRight: theme.spacing(1)
		},
		avatar: {
			width: theme.spacing(3.5),
			height: theme.spacing(3.5)
		},
		infoBox: {
			overflow: 'hidden',
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis',
			marginTop: theme.spacing(0.5),
			'& > span:first-child': {
				fontWeight: 700
			},
			'& > span::after': {
				content: '""',
				display: 'inline-block',
				width: 3,
				height: 3,
				margin: theme.spacing(0, 0.5),
				border: `1px solid ${theme.palette.grey.A200}`,
				borderRadius: 5,
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
			backgroundColor: theme.palette.grey['50']
		}
	})
);

function HomeLatestStorageBoardList() {
	const classes = useStyles();
	const {
		latestStorageBoards: { data, pending }
	} = useHomeLatestStorageBoardList();

	return (
		<Box className={classes.root}>
			<Box className={classes.box}>
				<Box flex={1}>
					<Typography className={classes.typography} variant={'h6'}>
						{'최신 개념글'}
					</Typography>
				</Box>
			</Box>
			<Hidden implementation={'css'} mdDown>
				<Divider className={classes.divider} />
			</Hidden>
			<List className={classes.list} disablePadding>
				{pending
					&& [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
						<ListItem key={`home-dummy-latest-storage-board-${item}`} className={classes.listItem}>
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
							key={`home-latest-storage-board-${item.id}`}
							href={'/storages/[path]/[id]'}
							as={`/storages/${item.storage.path}/${item.id}`}
						>
							<ListItem className={classes.listItem} button>
								<Box display={'flex'} alignItems={'center'} minWidth={0} width={'100%'}>
									<Box className={classes.listItemBox}>
										<Avatar className={classes.avatar} src={item.storage.avatarUrl || ''}>
											<InsertPhotoIcon className={classes.icon} />
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
								</Box>
							</ListItem>
						</Link>
					))}
				{!pending && data.length === 0 && (
					<DataEmptyBox
						message={'아직 최신 개념글이 존재하지 않아요.'}
						paddingTop={0}
						paddingBottom={0}
						maxHeight={400}
					/>
				)}
			</List>
		</Box>
	);
}

export default memo(HomeLatestStorageBoardList);
