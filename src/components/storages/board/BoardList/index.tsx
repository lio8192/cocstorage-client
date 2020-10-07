import React, { memo } from 'react';
import {
	createStyles, makeStyles, Theme, useTheme
} from '@material-ui/core/styles';

// Material UI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Material UI Icons
import ImageIcon from '@material-ui/icons/Image';
import VideocamIcon from '@material-ui/icons/Videocam';
import PersonIcon from '@material-ui/icons/Person';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import VisibilityIcon from '@material-ui/icons/Visibility';

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
			maxWidth: '100%'
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
		avatarNew: {
			width: theme.spacing(3.5),
			height: theme.spacing(3.5),
			backgroundColor: '#F15F5F'
		},
		avatarUser: {
			width: theme.spacing(4),
			height: theme.spacing(4)
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
		}
	})
);

function StorageBoardList() {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<List className={classes.root} component={'div'}>
			{Array.from({ length: 20 }, (value, index) => index).map((item, index) => (
				<>
					{isMobile && index === 0 && <Divider />}
					<ListItem key={`storage-board-${item}`} className={classes.listItem} button>
						<Box className={classes.listItemBox}>
							<Box display={'flex'} alignItems={'center'}>
								<ListItemIcon>
									<AvatarGroup className={classes.avatarGroup} max={3} spacing={'small'}>
										<Avatar className={classes.avatarNew} variant={'rounded'}>
											{'N'}
										</Avatar>
										<Avatar className={classes.avatar} variant={'rounded'}>
											<VideocamIcon />
										</Avatar>
										<Avatar className={classes.avatar} variant={'rounded'}>
											<ImageIcon />
										</Avatar>
									</AvatarGroup>
								</ListItemIcon>
								<Typography noWrap variant={'subtitle2'}>
									{'안녕하세요 게시글 작성 테스트입니다. 저장소 선점 축하드려요.'}
								</Typography>
								<Box className={classes.commentCountBox}>{'[1]'}</Box>
							</Box>
							<Box display={'flex'} alignItems={'center'} mt={1}>
								<Avatar className={classes.avatarUser}>
									<PersonIcon />
								</Avatar>
								<Box className={classes.writerInfoBox} ml={1}>
									<Typography variant={'caption'}>{'NickName'}</Typography>
									<Typography variant={'caption'}>{'1분 전'}</Typography>
									<Box component={'span'}>
										<Box component={'span'}>
											<ThumbUpAltIcon className={classes.icon} color={'action'} fontSize={'small'} />
										</Box>
										<Box component={'span'} ml={0.5}>
											<Typography variant={'caption'}>{'10'}</Typography>
										</Box>
									</Box>
									<Box component={'span'}>
										<Box component={'span'}>
											<VisibilityIcon className={classes.icon} color={'action'} fontSize={'small'} />
										</Box>
										<Box component={'span'} ml={0.5}>
											<Typography variant={'caption'}>{'1,000'}</Typography>
										</Box>
									</Box>
								</Box>
							</Box>
						</Box>
					</ListItem>
					{isMobile && index < 19 && <Divider />}
				</>
			))}
		</List>
	);
}

export default memo(StorageBoardList);
