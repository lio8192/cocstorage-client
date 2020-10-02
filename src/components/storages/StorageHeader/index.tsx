import React, { memo } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Material UI
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			height: 200,
			background: `linear-gradient(to right, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
			[theme.breakpoints.down('md')]: {
				height: 'auto'
			}
		},
		container: {
			display: 'flex',
			height: '100%',
			flexDirection: 'column',
			justifyContent: 'flex-end'
		},
		typography: {
			color: 'white'
		},
		box: {
			padding: theme.spacing(3, 0)
		}
	})
);

function StorageHeader() {
	const classes = useStyles();
	return (
		<Box className={classes.root}>
			<Container className={classes.container}>
				<Box className={classes.box}>
					<Typography className={classes.typography} variant={'h5'}>
						{'저장소'}
					</Typography>
					<Typography className={classes.typography} variant={'caption'}>
						{'다양한 주제의 저장소를 이용해보거나 자신만의 저장소를 운영해보세요!'}
					</Typography>
				</Box>
			</Container>
		</Box>
	);
}

export default memo(StorageHeader);
