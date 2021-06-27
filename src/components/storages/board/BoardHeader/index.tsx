import React, { useState, useCallback, memo } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import moment from 'moment';

// Material UI
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';

// Material UI Icons
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import TodayIcon from '@material-ui/icons/Today';

// Material UI Labs
import Skeleton from '@material-ui/lab/Skeleton';

// Custom Hooks
import useBoardHeader from 'hooks/storages/board/useBoardHeader';
import NotificationModal from 'components/common/NotificationModal';

moment.locale('ko');

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			height: 150,
			margin: theme.spacing(2),
			borderRadius: 4,
			background:
				theme.palette.type === 'light'
					? `linear-gradient(to right, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`
					: theme.palette.background.paper,
			[theme.breakpoints.down('md')]: {
				height: 'auto',
				margin: 0,
				borderRadius: 'inherit',
				background:
					theme.palette.type === 'light'
						? `linear-gradient(to right, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`
						: theme.palette.background.default
			}
		},
		container: {
			display: 'flex',
			height: '100%',
			flexDirection: 'column',
			justifyContent: 'flex-end'
		},
		typography: {
			color: 'white',
			fontWeight: 700,
			[theme.breakpoints.down('md')]: {
				fontSize: 20
			}
		},
		descriptionTypography: {
			color: 'white'
		},
		box: {
			display: 'flex',
			alignItems: 'center',
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(3, 0)
			}
		},
		avatarBox: {
			marginBottom: theme.spacing(-2),
			[theme.breakpoints.down('md')]: {
				marginBottom: theme.spacing(0)
			}
		},
		avatar: {
			width: theme.spacing(10),
			height: theme.spacing(10),
			backgroundColor: theme.palette.background.default,
			[theme.breakpoints.down('md')]: {
				width: theme.spacing(6),
				height: theme.spacing(6)
			},
			[theme.breakpoints.down('xs')]: {
				width: theme.spacing(6),
				height: theme.spacing(6)
			},
			'& svg': {
				color: theme.palette.grey.A100
			}
		},
		nameBox: {
			width: '100%',
			marginLeft: theme.spacing(1),
			[theme.breakpoints.down('md')]: {
				marginBottom: theme.spacing(0)
			}
		},
		icon: {
			marginRight: theme.spacing(0.5),
			verticalAlign: 'middle',
			color: 'white'
		},
		mIcon: {
			verticalAlign: 'middle'
		},
		iconButton: {
			verticalAlign: '-5px'
		}
	})
);

function BoardHeader() {
	const classes = useStyles();
	const {
		storage: {
			name,
			user: { nickname, avatarUrl: useAvatarUrl },
			description,
			avatarUrl,
			pending,
			createdAt
		}
	} = useBoardHeader();

	const [open, setOpen] = useState<boolean>(false);

	const onHandleNotificationModal = useCallback(() => setOpen(!open), [open]);

	return (
		<Box className={classes.root}>
			<Container className={classes.container}>
				<Box className={classes.box}>
					<Box className={classes.avatarBox}>
						<Avatar className={classes.avatar} src={avatarUrl || ''} alt={'Storage Board Avatar Img'}>
							<InsertPhotoIcon />
						</Avatar>
					</Box>
					<Box className={classes.nameBox}>
						<Box>
							<Typography className={classes.typography} variant={'h5'}>
								{pending || !name ? (
									<Skeleton width={`${Math.round(Math.random() * 20) + 10}%`} />
								) : (
									<>
										{`${name} 저장소`}
										<Hidden mdUp={!pending}>
											<IconButton className={classes.iconButton} size={'small'} onClick={onHandleNotificationModal}>
												<InfoIcon />
											</IconButton>
										</Hidden>
									</>
								)}
							</Typography>
						</Box>
						<Grid container spacing={0} alignItems={'center'}>
							<Grid item xs={12} md={6}>
								<Typography className={classes.descriptionTypography} variant={'caption'}>
									{pending || !description ? (
										<Skeleton width={`${Math.round(Math.random() * 30) + 15}%`} />
									) : (
										description
									)}
								</Typography>
							</Grid>
							{nickname && createdAt && (
								<Hidden smDown={!pending}>
									<Grid item xs={12} md={6}>
										<Box textAlign={'right'}>
											<SettingsApplicationsIcon className={classes.icon} />
											<Typography className={classes.descriptionTypography} variant={'caption'}>
												{nickname}
											</Typography>
											<Box component={'span'} ml={1} />
											<TodayIcon className={classes.icon} />
											<Typography className={classes.descriptionTypography} variant={'caption'}>
												{moment(createdAt).format('YYYY. MM. DD HH:mm:ss')}
											</Typography>
										</Box>
									</Grid>
								</Hidden>
							)}
						</Grid>
					</Box>
				</Box>
			</Container>
			<NotificationModal
				open={open}
				severity={'info'}
				title={'저장소 정보'}
				content={(
					<>
						<Box fontFamily={'NanumSquareRoundEB'} mb={1}>
							<SettingsIcon className={classes.mIcon} /> {'관리자'}
						</Box>
						<Box display={'flex'} alignItems={'center'}>
							<Box mr={1}>
								<Avatar src={useAvatarUrl || ''} alt={'User Avatar Img'}>
									{nickname.substr(0)}
								</Avatar>
							</Box>
							<Box>{nickname}</Box>
						</Box>
						<Box fontFamily={'NanumSquareRoundEB'} mt={2} mb={1}>
							<TodayIcon className={classes.mIcon} /> {'등록일시'}
						</Box>
						<Box>{moment(createdAt).format('YYYY. MM. DD HH:mm:ss')}</Box>
					</>
				)}
				route={''}
				fullWidth
				onCloseNotificationModal={onHandleNotificationModal}
			/>
		</Box>
	);
}

export default memo(BoardHeader);
