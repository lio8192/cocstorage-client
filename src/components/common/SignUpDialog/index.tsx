import React, { forwardRef, memo } from 'react';
import {
	createStyles, makeStyles, Theme, useTheme
} from '@material-ui/core/styles';

// Material UI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Checkbox from '@material-ui/core/Checkbox';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
// eslint-disable-next-line import/no-unresolved
import { TransitionProps } from '@material-ui/core/transitions';

// Material UI Icons
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// Custom Hooks
import useSignUp from 'hooks/common/useSignUp';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			position: 'relative'
		},
		linearProgress: {
			position: 'absolute',
			width: '100%',
			height: 5
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
		checkbox: {
			padding: theme.spacing(0)
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

function SignUpDialog() {
	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const {
		paletteType,
		open,
		pending,
		postSignUpBody: {
			name, email, password, policy, showPassword
		},
		onHandleSignInDialog,
		onHandleSignUpDialog,
		onHandleSignUpDialogTextField,
		onHandleSignUpDialogCheckbox,
		onShowSignUpDialogPassword,
		onPostSignUp
	} = useSignUp();
	return (
		<Dialog
			className={classes.root}
			fullScreen={fullScreen}
			fullWidth
			maxWidth={'xs'}
			open={open}
			onClose={onHandleSignUpDialog}
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
							{'?????? ????????????'}
						</Typography>
					</Box>
					<Box>
						<Button onClick={onHandleSignInDialog}>{'?????? ???????????????????'}</Button>
					</Box>
				</Box>
			</DialogTitle>
			<DialogContent>
				<Box>
					<TextField
						fullWidth
						variant={'outlined'}
						label={'??????'}
						name={'name'}
						onChange={onHandleSignUpDialogTextField}
						value={name.value}
						error={name.error}
						helperText={name.helperText}
					/>
				</Box>
				<Box mt={1}>
					<TextField
						fullWidth
						variant={'outlined'}
						label={'?????????'}
						name={'email'}
						onChange={onHandleSignUpDialogTextField}
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
						label={'????????????'}
						InputProps={{
							endAdornment: (
								<InputAdornment position={'end'}>
									<IconButton edge={'end'} onClick={onShowSignUpDialogPassword}>
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							)
						}}
						name={'password'}
						onChange={onHandleSignUpDialogTextField}
						value={password.value}
						error={password.error}
						helperText={password.helperText}
					/>
				</Box>
				<Box display={'flex'} alignItems={'center'} mt={2}>
					<Box>
						<Checkbox
							className={classes.checkbox}
							checked={policy.checked}
							onChange={onHandleSignUpDialogCheckbox}
							name={'policy'}
							color={'primary'}
						/>
					</Box>
					<Box flex={1} ml={1}>
						<Typography className={classes.typography} variant={'caption'}>
							{'????????? ????????????'}{' '}
							<Link href={'https://www.cocstorage.com'} underline={'always'} target={'_blank'}>
								{'????????????'}
							</Link>{' '}
							{'???'}{' '}
							<Link href={'https://www.cocstorage.com'} underline={'always'} target={'_blank'}>
								{'????????????????????????'}
							</Link>{' '}
							{'??? ?????? ????????? ?????? ??????????????????, ?????? ???????????????.'}
						</Typography>
					</Box>
				</Box>
				<Box mt={2}>
					<Grid container spacing={1}>
						<Grid item xs={6} md={12}>
							<Button
								className={classes.button}
								fullWidth
								color={'primary'}
								variant={'contained'}
								onClick={onPostSignUp}
								size={'large'}
								disabled={pending}
							>
								{'????????????'}
							</Button>
						</Grid>
						{fullScreen && (
							<Grid item xs={6}>
								<Button
									className={classes.closeButton}
									fullWidth
									variant={'contained'}
									onClick={onHandleSignUpDialog}
									size={'large'}
								>
									{'??????'}
								</Button>
							</Grid>
						)}
					</Grid>
				</Box>
				{policy.error && (
					<Box mt={1}>
						<FormHelperText error={policy.error}>{policy.helperText}</FormHelperText>
					</Box>
				)}
				<Box mt={2} mb={3}>
					<Typography className={classes.typography} variant={'caption'}>
						{'??? ????????? ????????? All Rights Reserved.'}
					</Typography>
				</Box>
			</DialogContent>
		</Dialog>
	);
}

export default memo(SignUpDialog);
