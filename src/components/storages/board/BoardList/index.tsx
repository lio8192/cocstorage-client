import React, { memo } from 'react';
import Link from 'next/link';
import {
	createStyles, makeStyles, Theme, useTheme
} from '@material-ui/core/styles';
import moment from 'moment';
import clsx from 'clsx';

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
import GoogleAdSense from 'components/common/GoogleAdSense';

moment.locale('ko');

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			maxWidth: '100%',
			padding: theme.spacing(0),
			border: `1px solid ${theme.palette.grey['50']}`,
			borderRadius: 4,
			backgroundColor: theme.palette.background.paper,
			overflow: 'hidden',
			[theme.breakpoints.down('md')]: {
				marginTop: 0,
				border: 'none',
				borderRadius: 'inherit'
			}
		},
		box: {
			'& a': {
				color: 'inherit',
				textDecoration: 'none'
			},
			'& a:visited .storage-board-subject': {
				color: theme.palette.grey.A200
			}
		},
		listItem: {
			maxWidth: '100%'
		},
		listItemBox: {
			width: '100%'
		},
		listItemAd: {
			width: '100%',
			paddingTop: theme.spacing(1.6),
			textAlign: 'center',
			backgroundColor: theme.palette.type === 'light' ? '#E5EDF8' : theme.palette.background.default
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
			height: theme.spacing(4),
			fontSize: 14
		},
		avatarStar: {
			width: theme.spacing(3.5),
			height: theme.spacing(3.5),
			backgroundColor: '#FFE400'
		},
		commentCountBox: {
			marginLeft: theme.spacing(0.5),
			color: theme.palette.grey.A200
		},
		writerInfoBox: {
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
		chip: {
			color: 'white',
			fontFamily: 'NanumSquareRoundEB',
			borderRadius: 4,
			cursor: 'pointer'
		},
		typography: {
			color: theme.palette.type === 'light' ? theme.palette.grey.A700 : ''
		},
		adminSpecificTypography: {
			fontFamily: 'NanumSquareRoundEB'
		},
		divider: {
			backgroundColor: theme.palette.grey['50']
		}
	})
);

type BoardListPros = {
	params?: { [key: string]: string } | string;
	adOpen?: boolean;
	searchValue: string;
};

function BoardList({ params, adOpen = true, searchValue }: BoardListPros) {
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
				&& Array.from({ length: 20 }, (number, index) => index).map((item, index) => (
					<Box key={`storage-board-dummy-${item}`}>
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
						{isMobile && index === 19 && <Divider className={classes.divider} />}
					</Box>
				))}
			{!pending
				&& boards.map((item, index) => (
					<Box key={`storage-board-${item.id}`} className={classes.box}>
						<Link href={`/storages/[path]/[id]${params}`} as={`/storages/${path}/${item.id}${params}`}>
							<a>
								<ListItem key={`storage-boards-${item.id}`} className={classes.listItem} button>
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
											<Typography className={'storage-board-subject'} noWrap variant={'subtitle2'}>
												{item.subject}
											</Typography>
											<Box className={classes.commentCountBox}>{`[${item.commentTotalCount}]`}</Box>
											{moment(new Date(), 'YYYYMMDDHH:mm:ss').diff(item.createdAt, 'days') === 0 && (
												<Box ml={1}>
													<Chip className={classes.chip} label={'N'} color={'primary'} size={'small'} />
												</Box>
											)}
										</Box>
										<Box display={'flex'} alignItems={'center'} mt={1}>
											<Avatar
												className={classes.avatarUser}
												src={item.isMember && item.user ? item.user.avatarUrl || '' : ''}
											>
												{item.user ? item.user.nickname.charAt(0) : item.nickname?.charAt(0)}
											</Avatar>
											<Box className={classes.writerInfoBox} ml={1}>
												<Typography
													className={clsx(classes.typography, {
														[classes.adminSpecificTypography]: item.isMember && item.user?.role === 'admin'
													})}
													variant={'caption'}
												>
													{item.isMember && item.user ? item.user.nickname : item.nickname}
												</Typography>
												{item.isMember && item.user?.role === 'admin' && (
													<Box component={'span'}>
														<Chip variant={'outlined'} label={'운영자'} color={'primary'} size={'small'} />
													</Box>
												)}
												<Typography variant={'caption'}>
													{moment(item.createdAt, 'YYYYMMDDHH:mm:ss').fromNow()}
												</Typography>
												<Box component={'span'}>
													<Box component={'span'}>
														<ThumbUpAltIcon className={classes.icon} color={'action'} fontSize={'small'} />
													</Box>
													<Box component={'span'} ml={0.5}>
														<Typography variant={'caption'}>{item.thumbUp.toLocaleString()}</Typography>
													</Box>
												</Box>
												<Box component={'span'}>
													<Box component={'span'}>
														<VisibilityIcon className={classes.icon} color={'action'} fontSize={'small'} />
													</Box>
													<Box component={'span'} ml={0.5}>
														<Typography variant={'caption'}>{item.viewCount.toLocaleString()}</Typography>
													</Box>
												</Box>
											</Box>
										</Box>
									</Box>
								</ListItem>
							</a>
						</Link>
						{isMobile && index + 1 === boards.length && <Divider className={classes.divider} />}
						{adOpen && isMobile && index + 1 === 5 && (
							<>
								<ListItem className={classes.listItemAd}>
									<GoogleAdSense
										html={
											'<ins class="adsbygoogle"'
											+ 'style="display:inline-block;width:320px;height:100px"'
											+ 'data-ad-client="ca-pub-5809905264951057"'
											+ 'data-ad-slot="2449792225"></ins>'
										}
										color={'default'}
									/>
								</ListItem>
							</>
						)}
					</Box>
				))}
			{!pending && !searchValue && boards.length === 0 && <DataEmptyBox message={'아직 게시글이 존재하지 않아요.'} />}
			{!pending && searchValue && boards.length === 0 && (
				<DataEmptyBox message={`"${searchValue}" 에 대한 검색 결과가 존재하지 않아요.`} />
			)}
		</List>
	);
}

export default memo(BoardList);
