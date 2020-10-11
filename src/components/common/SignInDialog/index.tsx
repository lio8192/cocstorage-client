import React, { memo } from 'react';
import {
	createStyles, makeStyles, Theme, useTheme
} from '@material-ui/core/styles';

// Material UI
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Material UI Icons
import Visibility from '@material-ui/icons/Visibility';

// Images
import Logo from 'public/logo.png';

type SignInDialogProps = {
	open: boolean;
	onHandleSignInDialog: () => void;
	onHandleSignUpDialog: () => void;
	onHandlePasswordFinderDialog: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		button: {
			color: 'white'
		},
		typography: {
			color: theme.palette.action.active
		}
	})
);

function SignInDialog({
	open,
	onHandleSignInDialog,
	onHandleSignUpDialog,
	onHandlePasswordFinderDialog
}: SignInDialogProps) {
	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	return (
		<Dialog fullScreen={fullScreen} fullWidth maxWidth={'xs'} open={open} onClose={onHandleSignInDialog}>
			<DialogTitle>
				<img src={Logo} alt={'SignInDialog Logo Img'} />
				<Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
					<Box>
						<Typography className={classes.typography} variant={'h5'}>
							{'로그인'}
						</Typography>
					</Box>
					<Box>
						<Button onClick={onHandleSignUpDialog}>{'간편 회원가입'}</Button>
						<Button onClick={onHandlePasswordFinderDialog}>{'비밀번호 찾기'}</Button>
					</Box>
				</Box>
			</DialogTitle>
			<DialogContent>
				<Box>
					<TextField fullWidth variant={'outlined'} label={'이메일'} />
				</Box>
				<Box mt={1}>
					<TextField
						fullWidth
						variant={'outlined'}
						type={'password'}
						label={'비밀번호'}
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
				<Box mt={2}>
					<Button
						className={classes.button}
						fullWidth
						variant={'contained'}
						onClick={() => console.log('onClose')}
						color={'primary'}
						size={'large'}
					>
						{'로그인'}
					</Button>
				</Box>
				<Box mt={2} mb={3}>
					<Typography className={classes.typography} variant={'caption'}>
						{'ⓒ 개념글 저장소 All Rights Reserved.'}
					</Typography>
				</Box>
			</DialogContent>
		</Dialog>
	);
}

export default memo(SignInDialog);
