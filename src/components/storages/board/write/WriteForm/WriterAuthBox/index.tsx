import React, { memo } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// Material UI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// Material UI Icons
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			position: 'absolute',
			top: 0,
			display: 'none',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
			height: '100%',
			backgroundColor: 'white',
			zIndex: 10
		},
		icon: {
			verticalAlign: 'middle'
		},
		typography: {
			color: theme.palette.action.active,
			fontWeight: 700
		},
		submitButton: {
			color: 'white'
		}
	})
);

function WriterAuthBox() {
	const classes = useStyles();
	return (
		<Box className={classes.root}>
			<Box width={'100%'} maxWidth={300}>
				<Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
					<Box>
						<LockIcon className={classes.icon} color={'primary'} fontSize={'large'} />
					</Box>
					<Box ml={1}>
						<Typography className={classes.typography} variant={'h6'}>
							{'비밀번호 인증'}
						</Typography>
					</Box>
				</Box>
				<Box mt={2}>
					<TextField
						fullWidth
						variant={'outlined'}
						placeholder={'비밀번호'}
						InputProps={{
							endAdornment: (
								<InputAdornment position={'end'}>
									<IconButton edge={'end'}>
										<Visibility />
									</IconButton>
								</InputAdornment>
							)
						}}
					/>
				</Box>
				<Box mt={1}>
					<Grid container spacing={1}>
						<Grid item xs={6}>
							<Button fullWidth variant={'contained'} size={'large'}>
								{'이전'}
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button className={classes.submitButton} fullWidth variant={'contained'} color={'primary'} size={'large'}>
								{'확인'}
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Box>
	);
}

export default memo(WriterAuthBox);
