import React, { memo } from 'react';
import Link from 'next/link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Material UI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';
import Skeleton from '@material-ui/lab/Skeleton';
import Grow from '@material-ui/core/Grow';

// Material UI Icons
import DataEmptyBox from 'components/common/DataEmptyBox';

// Custom Hooks
import useHomePopularStorageBoardList from 'hooks/home/useHomePopularStorageBoardList';
import Avatar from '@material-ui/core/Avatar';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			border: `1px solid ${theme.palette.grey['50']}`,
			backgroundColor: 'white',
			[theme.breakpoints.down('md')]: {
				padding: 0,
				border: 'none'
			}
		},
		typography: {
			fontWeight: 700,
			color: '#3d3d3d',
			cursor: 'default'
		},
		chip: {
			color: 'white'
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
			maxHeight: 400
		},
		listItem: {
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
				<Box flex={1}>
					<Typography className={classes.typography} variant={'h6'}>
						{'실시간 인기 개념글'}
					</Typography>
				</Box>
			</Box>
			<Divider />
			<List className={classes.list} disablePadding>
				{pending
					&& [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
						<Grow key={`home-dummy-popular-storage-board-${item}`} in>
							<ListItem className={classes.listItem}>
								<Box display={'flex'} alignItems={'center'} width={'100%'}>
									<Box mr={1}>
										<Skeleton width={30} height={24} />
									</Box>
									<Box flex={1} display={'flex'} alignItems={'center'} maxWidth={'calc(100% - 59.5px)'}>
										<Skeleton width={`${Math.round(Math.random() * 100) + 50}%`} height={24} />
										<Box className={classes.commentBox} component={'span'}>
											<Skeleton width={20} height={24} />
										</Box>
									</Box>
								</Box>
							</ListItem>
						</Grow>
					))}
				{!pending
					&& data.map((item) => (
						<Grow key={`home-popular-storage-board-${item.id}`} in>
							<Box>
								<Link href={'/storages/[path]/[id]'} as={`/storages/${item.storage.path}/${item.id}`}>
									<ListItem className={classes.listItem} button>
										<Box display={'flex'} alignItems={'center'} width={'100%'}>
											<Box mr={1}>
												<Chip
													className={classes.chip}
													color={'primary'}
													label={item.storage.name}
													size={'small'}
													avatar={(
														<Avatar src={item.storage.avatarUrl || ''}>
															<InsertPhotoIcon className={classes.icon} />
														</Avatar>
													)}
												/>
											</Box>
											<Box flex={1} display={'flex'} alignItems={'center'} maxWidth={'calc(100% - 59.5px)'}>
												<Typography variant={'body2'} noWrap>
													{item.subject}
												</Typography>
												<Box className={classes.commentBox} component={'span'}>
													{`[${item.commentTotalCount}]`}
												</Box>
											</Box>
										</Box>
									</ListItem>
								</Link>
							</Box>
						</Grow>
					))}
				{!pending && data.length === 0 && (
					<DataEmptyBox message={'인기 개념글이 존재하지 않아요.'} paddingTop={0} paddingBottom={0} maxHeight={400} />
				)}
			</List>
		</Box>
	);
}

export default memo(HomePopularStorageBoardList);
