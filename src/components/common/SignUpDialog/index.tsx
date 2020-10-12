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

// Material UI Icons
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// Custom Hooks
import useSignUp from 'hooks/common/useSignUp';

// Images
import Logo from 'public/logo.png';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			position: 'relative'
		},
		linearProgress: {
			position: 'absolute',
			width: '100%'
		},
		button: {
			color: 'white'
		},
		typography: {
			color: theme.palette.action.active
		},
		checkbox: {
			padding: theme.spacing(0)
		}
	})
);

function SignUpDialog() {
	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const {
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
		>
			<Fade in={pending}>
				<LinearProgress className={classes.linearProgress} color={'primary'} />
			</Fade>
			<DialogTitle>
				<img src={Logo} alt={'SignUpDialog Logo Img'} />
				<Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
					<Box>
						<Typography className={classes.typography} variant={'h5'}>
							{'간편 회원가입'}
						</Typography>
					</Box>
					<Box>
						<Button onClick={onHandleSignInDialog}>{'이미 회원이신가요?'}</Button>
					</Box>
				</Box>
			</DialogTitle>
			<DialogContent>
				<Box>
					<TextField
						fullWidth
						variant={'outlined'}
						label={'이름'}
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
						label={'이메일'}
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
						label={'비밀번호'}
						InputProps={{
							endAdornment: (
								<InputAdornment position={'end'}>
									<IconButton edge={'end'} onClick={onShowSignUpDialogPassword}>
										{showPassword ? <VisibilityOff /> : <Visibility />}
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
							{'개념글 저장소의'}{' '}
							<Link href={'https://www.cocstorage.com'} underline={'always'} target={'_blank'}>
								{'이용약관'}
							</Link>{' '}
							{'및'}{' '}
							<Link href={'https://www.cocstorage.com'} underline={'always'} target={'_blank'}>
								{'개인정보처리방침'}
							</Link>{' '}
							{'에 대한 내용을 모두 확인하였으며, 이에 동의합니다.'}
						</Typography>
					</Box>
				</Box>
				<Box mt={2}>
					<Button
						className={classes.button}
						fullWidth
						variant={'contained'}
						onClick={onPostSignUp}
						color={'primary'}
						size={'large'}
					>
						{'가입하기'}
					</Button>
				</Box>
				{policy.error && (
					<Box mt={1}>
						<FormHelperText error={policy.error}>{policy.helperText}</FormHelperText>
					</Box>
				)}
				<Box mt={2} mb={3}>
					<Typography className={classes.typography} variant={'caption'}>
						{'ⓒ 개념글 저장소 All Rights Reserved.'}
					</Typography>
				</Box>
			</DialogContent>
		</Dialog>
	);
}

export default memo(SignUpDialog);
