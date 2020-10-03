import React, { memo } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Material UI
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';

// Material UI Icons
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';

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
		},
		avatar: {
			width: theme.spacing(12),
			height: theme.spacing(12),
			marginBottom: theme.spacing(-5),
			cursor: 'pointer',
			[theme.breakpoints.down('md')]: {
				width: theme.spacing(9),
				height: theme.spacing(9),
				margin: theme.spacing(0, 'auto', -3.5)
			}
		}
	})
);

function MyPageHeader() {
	const classes = useStyles();
	return (
		<Box className={classes.root}>
			<Container className={classes.container}>
				<Box className={classes.box}>
					<Avatar className={classes.avatar} alt={'User Avatar Img'}>
						<InsertPhotoIcon />
					</Avatar>
				</Box>
			</Container>
		</Box>
	);
}

export default memo(MyPageHeader);
