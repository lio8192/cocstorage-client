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
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';

// Material UI Icons
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// Custom Hooks
import useSignIn from 'hooks/common/useSingIn';

// Images
import Logo from 'public/logo.png';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			position: 'relative'
		},
		button: {
			color: 'white'
		},
		typography: {
			color: theme.palette.action.active
		},
		linearProgress: {
			position: 'absolute',
			width: '100%'
		}
	})
);

function SignInDialog() {
	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const {
		open,
		pending,
		postSignInBody: { email, password, showPassword },
		onHandleSignInDialog,
		onHandleSignUpDialog,
		onHandlePasswordFinderDialog,
		onHandleSignInDialogTextField,
		onShowSignInDialogPassword,
		onPostSignIn
	} = useSignIn();
	return (
		<Dialog
			className={classes.root}
			fullScreen={fullScreen}
			fullWidth
			maxWidth={'xs'}
			open={open}
			onClose={onHandleSignInDialog}
		>
			<Fade in={pending}>
				<LinearProgress className={classes.linearProgress} color={'primary'} />
			</Fade>
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
					<TextField
						fullWidth
						variant={'outlined'}
						label={'이메일'}
						onChange={onHandleSignInDialogTextField}
						name={'email'}
						value={email.value}
						error={email.error}
						helperText={email.helperText}
					/>
				</Box>
				<Box mt={1}>
					<TextField
						fullWidth
						variant={'outlined'}
						type={showPassword ? 'text' : 'password'}
						label={'비밀번호'}
						InputProps={{
							endAdornment: (
								<InputAdornment position={'end'}>
									<IconButton edge={'end'} onClick={onShowSignInDialogPassword}>
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							)
						}}
						name={'password'}
						onChange={onHandleSignInDialogTextField}
						value={password.value}
						error={password.error}
						helperText={password.helperText}
					/>
				</Box>
				<Box mt={2}>
					<Button
						className={classes.button}
						fullWidth
						variant={'contained'}
						onClick={onPostSignIn}
						color={'primary'}
						size={'large'}
						disabled={pending}
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
