import React, { memo } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Material UI
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

// Material UI Icons
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';

// Material UI Labs
import Skeleton from '@material-ui/lab/Skeleton';

// Custom Hooks
import useBoardHeader from 'hooks/storages/board/useBoardHeader';

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
				borderRadius: 'inherit'
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
				fontSize: 22
			},
			[theme.breakpoints.down('xs')]: {
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
				padding: theme.spacing(2, 0)
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
			[theme.breakpoints.down('md')]: {
				width: theme.spacing(8),
				height: theme.spacing(8)
			},
			[theme.breakpoints.down('xs')]: {
				width: theme.spacing(6),
				height: theme.spacing(6)
			}
		},
		nameBox: {
			width: '100%',
			marginLeft: theme.spacing(1),
			[theme.breakpoints.down('md')]: {
				marginBottom: theme.spacing(0)
			}
		}
	})
);

function BoardHeader() {
	const classes = useStyles();
	const {
		storage: {
			name, description, avatarUrl, pending
		}
	} = useBoardHeader();
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
						<Typography className={classes.typography} variant={'h5'} noWrap>
							{pending ? <Skeleton width={`${Math.round(Math.random() * 20) + 10}%`} /> : `${name} 저장소`}
						</Typography>
						<Typography className={classes.descriptionTypography} variant={'caption'}>
							{pending ? <Skeleton width={`${Math.round(Math.random() * 30) + 15}%`} /> : description}
						</Typography>
					</Box>
				</Box>
			</Container>
		</Box>
	);
}

export default memo(BoardHeader);
