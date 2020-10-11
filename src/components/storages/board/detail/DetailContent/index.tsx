import React, { memo } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Material UI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Skeleton from '@material-ui/lab/Skeleton';
import Grow from '@material-ui/core/Grow';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

// Material UI Icons
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MessageIcon from '@material-ui/icons/Message';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ThumbUpAltSharpIcon from '@material-ui/icons/ThumbUpAltSharp';
import ThumbDownAltSharpIcon from '@material-ui/icons/ThumbDownAltSharp';

// Components
import GoogleAdSense from 'components/common/GoogleAdSense';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			backgroundColor: 'white',
			[theme.breakpoints.down('md')]: {
				padding: 0
			}
		},
		subjectBox: {
			marginTop: theme.spacing(2),
			padding: theme.spacing(2, 0, 1, 0),
			color: theme.palette.grey.A700,
			[theme.breakpoints.down('md')]: {
				margin: 0,
				padding: theme.spacing(2, 3, 0, 3)
			},
			[theme.breakpoints.down('xs')]: {
				padding: theme.spacing(2, 2, 0, 2)
			}
		},
		subjectBoxTypography: {
			[theme.breakpoints.down('md')]: {
				fontSize: '1.2rem'
			}
		},
		writerInfoBox: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			marginBottom: theme.spacing(2),
			padding: theme.spacing(1, 0),
			color: theme.palette.grey.A200,
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(1, 3, 0, 3)
			},
			[theme.breakpoints.down('xs')]: {
				padding: theme.spacing(1, 2, 0, 2)
			}
		},
		writerAvatar: {
			[theme.breakpoints.down('md')]: {
				width: theme.spacing(4),
				height: theme.spacing(4)
			}
		},
		otherInfoBox: {
			display: 'flex',
			alignItems: 'center',
			padding: theme.spacing(2, 0),
			border: '1px solid',
			borderColor: theme.palette.grey['50'],
			borderLeft: 'none',
			borderRight: 'none',
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(2, 2)
			},
			[theme.breakpoints.down('xs')]: {
				padding: theme.spacing(2, 1)
			}
		},
		otherInfoSkeletonBox: {
			display: 'flex',
			alignItems: 'center',
			padding: theme.spacing(2, 0),
			border: '1px solid',
			borderColor: theme.palette.grey['50'],
			borderLeft: 'none',
			borderRight: 'none',
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(2, 3)
			}
		},
		adBox: {
			'& ins': {
				margin: theme.spacing(1, 0),
				marginLeft: '0 !important',
				textAlign: 'center'
			}
		},
		contentBox: {
			padding: theme.spacing(2, 0),
			'& img': {
				maxWidth: '100%'
			},
			'& video': {
				maxWidth: '100%'
			},
			'& iframe': {
				maxWidth: '100%'
			},
			'& embed': {
				maxWidth: '100%'
			},
			'& .writing_view_box > div': {
				width: 'auto !important'
			},
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(2, 3)
			},
			[theme.breakpoints.down('xs')]: {
				padding: theme.spacing(2, 2)
			}
		},
		recommendButtonGroup: {
			marginTop: theme.spacing(1),
			'& > button': {
				padding: theme.spacing(2),
				borderRadius: '0',
				borderColor: theme.palette.grey['50'],
				color: theme.palette.grey.A200
			}
		},
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			color: '#fff'
		}
	})
);

function SlideTransition(props: TransitionProps) {
	return <Slide {...props} direction={'up'} />;
}

function DetailContent() {
	const classes = useStyles();
	return (
		<>
			<Grow in>
				<Box className={classes.root}>
					<Box className={classes.subjectBox}>
						<Typography component={'h5'} variant={'h5'}>
							<Skeleton animation={'wave'} height={50} />
						</Typography>
					</Box>
					<Box
						className={classes.writerInfoBox}
						display={'flex'}
						alignItems={'center'}
						justifyContent={'space-between'}
						mb={2}
						pt={1}
						pb={1}
					>
						<Box display={'flex'} alignItems={'center'}>
							<Box>
								<Skeleton variant={'circle'} animation={'wave'} width={35} height={35} />
							</Box>
							<Box ml={1}>
								<Skeleton animation={'wave'} width={50} />
							</Box>
						</Box>
						<Box>
							<Skeleton animation={'wave'} width={100} />
						</Box>
					</Box>
					<Box className={classes.otherInfoSkeletonBox}>
						<Grid container alignItems={'center'}>
							<Grid item xs={10}>
								<Box display={'flex'} alignItems={'center'}>
									<Box>
										<Skeleton variant={'circle'} animation={'wave'} width={20} height={20} />
									</Box>
									<Box ml={1} mr={1}>
										<Skeleton animation={'wave'} width={35} />
									</Box>
									<Box>
										<Skeleton variant={'circle'} animation={'wave'} width={20} height={20} />
									</Box>
									<Box ml={1} mr={1}>
										<Skeleton animation={'wave'} width={35} />
									</Box>
									<Box>
										<Skeleton variant={'circle'} animation={'wave'} width={20} height={20} />
									</Box>
									<Box ml={1} mr={1}>
										<Skeleton animation={'wave'} width={35} />
									</Box>
									<Box>
										<Skeleton variant={'circle'} animation={'wave'} width={20} height={20} />
									</Box>
									<Box ml={1}>
										<Skeleton animation={'wave'} width={35} />
									</Box>
								</Box>
							</Grid>
							<Grid item xs={2}>
								<Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
									<Skeleton animation={'wave'} width={30} />
								</Box>
							</Grid>
						</Grid>
					</Box>
					<Box className={classes.contentBox}>
						<Skeleton animation={'wave'} />
						<Skeleton animation={'wave'} />
						<Skeleton animation={'wave'} />
						<Box mt={1}>
							<Skeleton variant={'rect'} animation={'wave'} height={250} />
						</Box>
						<Box textAlign={'center'}>
							<Box>
								<Box maxWidth={150} m={'auto'} mt={2}>
									<Skeleton variant={'rect'} animation={'wave'} width={170} height={58} />
								</Box>
							</Box>
						</Box>
						<Box mt={2}>
							<Skeleton variant={'rect'} animation={'wave'} height={250} />
						</Box>
					</Box>
				</Box>
			</Grow>
			<Grow in>
				<Box className={classes.root}>
					<Box className={classes.subjectBox}>
						<Typography className={classes.subjectBoxTypography} variant={'h5'}>
							{'제목입니다.'}
						</Typography>
					</Box>
					<Box className={classes.writerInfoBox}>
						<Grid container alignItems={'center'}>
							<Grid item xs={12} sm={6}>
								<Box display={'flex'} alignItems={'center'}>
									<Avatar className={classes.writerAvatar}>
										<PersonIcon />
									</Avatar>
									<Box ml={1}>{'닉네임 (110.8)'}</Box>
								</Box>
							</Grid>
							<Grid item xs={12} sm={6} alignItems={'flex-end'}>
								<Box textAlign={'right'}>
									<Box>{'2020 10. 01. 15:12'}</Box>
								</Box>
							</Grid>
						</Grid>
					</Box>
					<Box className={classes.otherInfoBox}>
						<Box flex={1} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
							<Box flex={1}>
								<Button startIcon={<MessageIcon />} disabled>
									{'0'}
								</Button>
								<Button startIcon={<VisibilityIcon />} disabled>
									{'0'}
								</Button>
								<Button startIcon={<ThumbUpAltSharpIcon />} disabled>
									{'0'}
								</Button>
								<Button startIcon={<ThumbDownAltSharpIcon />} disabled>
									{'0'}
								</Button>
							</Box>
							<Box>
								<IconButton>
									<MoreVertIcon />
								</IconButton>
							</Box>
						</Box>
					</Box>
					<Box className={classes.adBox}>
						<GoogleAdSense
							html={
								'<ins class="adsbygoogle"'
								+ 'style="display:block"'
								+ 'data-ad-client="ca-pub-5809905264951057"'
								+ 'data-ad-slot="3990104603"'
								+ 'data-ad-format="auto"'
								+ 'data-full-width-responsive="true"></ins>'
							}
						/>
					</Box>
					<Box className={classes.contentBox}>
						<Box>{'내용입니다.'}</Box>
						<Box textAlign={'center'}>
							<Box>
								<ButtonGroup className={classes.recommendButtonGroup}>
									<Button
										endIcon={<ThumbUpAltSharpIcon />}
										data-thumbs-type={'up'}
										onClick={() => console.log('onClick')}
										disabled
									>
										{'0'}
									</Button>
									<Button
										startIcon={<ThumbDownAltSharpIcon />}
										data-thumbs-type={'down'}
										onClick={() => console.log('onClick')}
										disabled
									>
										{'0'}
									</Button>
								</ButtonGroup>
							</Box>
						</Box>
					</Box>
				</Box>
			</Grow>
			<Snackbar
				open={false}
				onClose={() => console.log('snackbar')}
				onExited={() => console.log('snackbar')}
				TransitionComponent={SlideTransition}
				autoHideDuration={1500}
			>
				<Alert icon={<ThumbsUpDownIcon fontSize={'inherit'} />} severity={'info'}>
					{'추천을 누르셨습니다.'}
				</Alert>
			</Snackbar>
			<Snackbar
				open={false}
				onClose={() => console.log('snackbar')}
				onExited={() => console.log('snackbar')}
				TransitionComponent={SlideTransition}
				autoHideDuration={1500}
			>
				<Alert severity={'error'}>{'알 수 없는 오류입니다.'}</Alert>
			</Snackbar>
			<Backdrop className={classes.backdrop} open={false}>
				<CircularProgress color={'inherit'} />
			</Backdrop>
		</>
	);
}

export default memo(DetailContent);
