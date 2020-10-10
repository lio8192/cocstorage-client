import React, { memo } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Material UI
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import StorageIcon from '@material-ui/icons/Storage';

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
							<StorageIcon className={classes.icon} fontSize={'large'} />
						</Box>
						<Box ml={0.5}>
							<Typography className={classes.typography} variant={'h5'}>
								{'저장소'}
							</Typography>
						</Box>
					</Box>
					<Typography className={classes.typography} variant={'caption'}>
						{'다양한 주제의 저장소를 이용해보거나 자신만의 저장소를 운영해보세요!'}
					</Typography>
				</Box>
			</Container>
		</Box>
	);
}

export default memo(StorageHeader);
