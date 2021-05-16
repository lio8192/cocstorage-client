import React, { forwardRef, memo } from 'react';
import {
	createStyles, makeStyles, Theme, useTheme
} from '@material-ui/core/styles';

// Material UI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
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
import Slide from '@material-ui/core/Slide';
// eslint-disable-next-line import/no-unresolved
import { TransitionProps } from '@material-ui/core/transitions';

// Material UI Icons
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// Custom Hooks
import useSignIn from 'hooks/common/useSingIn';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			position: 'relative'
		},
		button: {
			color: 'white',
			fontFamily: 'NanumSquareRoundEB'
		},
		closeButton: {
			fontFamily: 'NanumSquareRoundEB'
		},
		typography: {
			color: theme.palette.action.active
		},
		linearProgress: {
			position: 'absolute',
			width: '100%',
			height: 5
		},
		logo: {
			maxWidth: 175
		},
		icon: {
			maxWidth: 50
		}
	})
);

const Transition = forwardRef<unknown, TransitionProps>((props, ref) => (
	// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
	// @ts-ignore
	<Slide direction={'up'} ref={ref} {...props} />
));

function SignInDialog() {
	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const {
		paletteType,
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
			TransitionComponent={Transition}
		>
			<Fade in={pending}>
				<LinearProgress className={classes.linearProgress} color={'primary'} />
			</Fade>
			<DialogTitle>
				<Box pt={2} pb={2}>
					<Box textAlign={'center'}>
						<img
							className={classes.icon}
							src={
								paletteType === 'light'
									? 'https://static.cocstorage.com/images/icon.png'
									: 'https://static.cocstorage.com/images/icon_black.png'
							}
							alt={'SignInDialog Logo Img'}
						/>
					</Box>
					<Box textAlign={'center'}>
						<img
							className={classes.logo}
							src={
								paletteType === 'light'
									? 'https://static.cocstorage.com/images/logo_text.png'
									: 'https://static.cocstorage.com/images/logo_text_white.png'
							}
							alt={'SignInDialog Logo Img'}
						/>
					</Box>
				</Box>
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
					<Grid container spacing={1}>
						<Grid item xs={6} md={12}>
							<Button
								className={classes.button}
								fullWidth
								color={'primary'}
								variant={'contained'}
								onClick={onPostSignIn}
								size={'large'}
								disabled={pending}
							>
								{'로그인'}
							</Button>
						</Grid>
						{fullScreen && (
							<Grid item xs={6}>
								<Button
									className={classes.closeButton}
									fullWidth
									variant={'contained'}
									onClick={onHandleSignInDialog}
									size={'large'}
								>
									{'닫기'}
								</Button>
							</Grid>
						)}
					</Grid>
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
