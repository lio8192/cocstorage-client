import React, { memo } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Material UI
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

// Material UI Icons
import ForumIcon from '@material-ui/icons/Forum';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			height: 'auto',
			background: `linear-gradient(to right, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`
		},
		container: {
			display: 'flex',
			height: '100%',
			flexDirection: 'column',
			justifyContent: 'flex-end'
		},
		typography: {
			width: '100%',
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

function StorageHeader() {
	const classes = useStyles();
	return (
		<Box className={classes.root}>
			<Container className={classes.container}>
				<Box className={classes.box}>
					<Box display={'flex'} alignItems={'center'}>
						<Box>
							<ForumIcon className={classes.icon} fontSize={'large'} />
						</Box>
						<Box flex={1} ml={0.5}>
							<Typography className={classes.typography} variant={'h5'}>
								{'커뮤니티 저장소'}
							</Typography>
						</Box>
					</Box>
					<Typography className={classes.descriptionTypography} variant={'caption'}>
						{'다양한 주제의 저장소를 이용해보거나 자신만의 저장소를 운영해보세요!'}
					</Typography>
				</Box>
			</Container>
		</Box>
	);
}

export default memo(StorageHeader);
