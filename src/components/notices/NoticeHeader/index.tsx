import React, { memo } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Material UI
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

// Material UI Icons
import NearMeIcon from '@material-ui/icons/NearMe';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			margin: theme.spacing(2, 2, 0),
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
			padding: theme.spacing(3, 0)
		},
		icon: {
			verticalAlign: 'middle',
			color: 'white'
		}
	})
);

function NoticeHeader() {
	const classes = useStyles();
	return (
		<Box className={classes.root}>
			<Container className={classes.container}>
				<Box className={classes.box}>
					<Box display={'flex'} alignItems={'center'}>
						<Box>
							<NearMeIcon className={classes.icon} fontSize={'large'} />
						</Box>
						<Box ml={0.5}>
							<Typography className={classes.typography} variant={'h5'} noWrap>
								{'새로운 소식'}
							</Typography>
						</Box>
					</Box>
					<Box>
						<Typography className={classes.descriptionTypography} variant={'caption'}>
							{'개념글 저장소의 새로운 소식을 확인해보세요!'}
						</Typography>
					</Box>
				</Box>
			</Container>
		</Box>
	);
}

export default memo(NoticeHeader);
