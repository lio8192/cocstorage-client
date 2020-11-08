import React, { memo } from 'react';
import Link from 'next/link';
import {
	createStyles, makeStyles, Theme, useTheme
} from '@material-ui/core/styles';
import moment from 'moment';

// Material UI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grow from '@material-ui/core/Grow';

// Material UI Icons
import ImageIcon from '@material-ui/icons/Image';
import VideocamIcon from '@material-ui/icons/Videocam';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import VisibilityIcon from '@material-ui/icons/Visibility';
import NotesIcon from '@material-ui/icons/Notes';
import StarIcon from '@material-ui/icons/Star';

// Material UI Labs
import Skeleton from '@material-ui/lab/Skeleton';

// Custom Hooks
import useBoardList from 'hooks/storages/board/useBoardList';

// Components
import DataEmptyBox from 'components/common/DataEmptyBox';

moment.locale('ko');

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			maxWidth: '100%',
			padding: theme.spacing(0)
		},
		listItem: {
			maxWidth: '100%'
		},
		listItemBox: {
			width: '100%'
		},
		icon: {
			verticalAlign: 'middle'
		},
		avatarGroup: {
			minWidth: 0,
			margin: 'auto'
		},
		avatar: {
			width: theme.spacing(3.5),
			height: theme.spacing(3.5),
			backgroundColor: theme.palette.primary.main
		},
		avatarNote: {
			width: theme.spacing(3.5),
			height: theme.spacing(3.5),
			backgroundColor: theme.palette.action.active
		},
		avatarUser: {
			width: theme.spacing(4),
			height: theme.spacing(4)
		},
		avatarStar: {
			width: theme.spacing(3.5),
			height: theme.spacing(3.5),
			backgroundColor: theme.palette.primary.main
		},
		commentCountBox: {
			marginLeft: theme.spacing(0.5),
			color: theme.palette.grey.A200
		},
		writerInfoBox: {
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
		chip: {
			color: 'white'
		},
		typography: {
			color: theme.palette.grey.A700
		}
	})
);

function BoardList() {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const {
		pending,
		storage: { path },
		boards
	} = useBoardList();

	return (
		<List className={classes.root} component={'div'}>
			{pending
				&& Array.from({ length: 10 }, (value, index) => index).map((item, index) => (
					<Grow key={`storage-board-dummy-${item}`} in>
						<Box>
							{isMobile && index === 0 && <Divider />}
							<ListItem>
								<Box width={'100%'}>
									<Box display={'flex'} alignItems={'center'} flex={1}>
										<ListItemIcon>
											<AvatarGroup className={classes.avatarGroup} max={3} spacing={'small'}>
												<Skeleton variant={'rect'} width={30} height={30} />
												<Skeleton variant={'rect'} width={30} height={30} />
											</AvatarGroup>
										</ListItemIcon>
										<Box width={`${Math.round(Math.random() * 100) + 50}%`}>
											<Skeleton width={'100%'} />
										</Box>
										<Box ml={1}>
											<Skeleton width={30} />
										</Box>
									</Box>
									<Box display={'flex'} alignItems={'center'} mt={1}>
										<Skeleton variant={'circle'} width={35} height={35} />
										<Box display={'flex'} ml={1}>
											<Box>
												<Skeleton width={50} />
											</Box>
											<Box ml={1}>
												<Skeleton width={30} />
											</Box>
											<Box ml={1}>
												<Skeleton width={30} />
											</Box>
											<Box ml={1}>
												<Skeleton width={30} />
											</Box>
										</Box>
									</Box>
								</Box>
							</ListItem>
							{isMobile && index < 9 && <Divider />}
						</Box>
					</Grow>
				))}
			{!pending
				&& boards.map((item, index) => (
					<Grow key={`storage-board-${item.id}`} in>
						<Box>
							{isMobile && index === 0 && <Divider />}
							<ListItem key={`storage-boards-${item.id}`} className={classes.listItem} button>
								<Link href={'/storages/[path]/[id]'} as={`/storages/${path}/${item.id}`}>
									<Box className={classes.listItemBox}>
										<Box display={'flex'} alignItems={'center'}>
											<ListItemIcon>
												<AvatarGroup className={classes.avatarGroup} max={3} spacing={'small'}>
													{item.isPopular && (
														<Avatar className={classes.avatarStar} variant={'rounded'}>
															<StarIcon />
														</Avatar>
													)}
													{item.hasImage ? (
														<Avatar className={classes.avatar} variant={'rounded'}>
															<ImageIcon />
														</Avatar>
													) : (
														<Avatar className={classes.avatarNote} variant={'rounded'}>
															<NotesIcon />
														</Avatar>
													)}
													{item.hasVideo ? (
														<Avatar className={classes.avatar} variant={'rounded'}>
															<VideocamIcon />
														</Avatar>
													) : (
														<Avatar className={classes.avatarNote} variant={'rounded'}>
															<NotesIcon />
														</Avatar>
													)}
												</AvatarGroup>
											</ListItemIcon>
											<Typography noWrap variant={'subtitle2'}>
												{item.subject}
											</Typography>
											<Box className={classes.commentCountBox}>{`[${item.commentTotalCount}]`}</Box>
											{moment(item.createdAt, 'YYYYMMDDHH:mm:ss').diff(item.createdAt, 'days') === 0 && (
												<Box ml={1}>
													<Chip className={classes.chip} label={'NEW'} color={'primary'} size={'small'} />
												</Box>
											)}
										</Box>
										<Box display={'flex'} alignItems={'center'} mt={1}>
											<Avatar className={classes.avatarUser} src={item.isMember ? item.user.avatarUrl || '' : ''} />
											<Box className={classes.writerInfoBox} ml={1}>
												<Typography className={classes.typography} variant={'caption'}>
													{item.isMember ? item.user.nickname : item.nickname}
												</Typography>
												<Typography variant={'caption'}>
													{moment(item.createdAt, 'YYYYMMDDHH:mm:ss').fromNow()}
												</Typography>
												<Box component={'span'}>
													<Box component={'span'}>
														<ThumbUpAltIcon className={classes.icon} color={'action'} fontSize={'small'} />
													</Box>
													<Box component={'span'} ml={0.5}>
														<Typography variant={'caption'}>{item.thumbUp}</Typography>
													</Box>
												</Box>
												<Box component={'span'}>
													<Box component={'span'}>
														<VisibilityIcon className={classes.icon} color={'action'} fontSize={'small'} />
													</Box>
													<Box component={'span'} ml={0.5}>
														<Typography variant={'caption'}>{item.viewCount}</Typography>
													</Box>
												</Box>
											</Box>
										</Box>
									</Box>
								</Link>
							</ListItem>
							{isMobile && index < 19 && <Divider />}
						</Box>
					</Grow>
				))}
			{!pending && boards.length === 0 && <DataEmptyBox message={'개념글이 존재하지 않아요.'} />}
		</List>
	);
}

export default memo(BoardList);
