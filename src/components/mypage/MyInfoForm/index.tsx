import React, { memo } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Material UI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Grow from '@material-ui/core/Grow';

// Material UI Icons
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// Components
import PasswordAuthDialog from 'components/common/PasswordAuthDialog';

// Custom Hooks
import useMyInfoForm from 'hooks/mypage/useMyInfoForm';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		box: {
			padding: theme.spacing(2),
			border: `1px solid ${theme.palette.grey['50']}`,
			borderRadius: 4,
			backgroundColor: theme.palette.background.paper
		},
		typography: {
			color: theme.palette.action.active
		},
		gridBox: {
			[theme.breakpoints.down('md')]: {
				maxWidth: '100%'
			}
		},
		grid: {
			marginTop: theme.spacing(2)
		},
		divider: {
			marginTop: theme.spacing(2)
		},
		button: {
			color: 'white',
			fontFamily: 'NanumSquareRoundEB',
			[theme.breakpoints.down('md')]: {
				width: '100%'
			}
		}
	})
);

function MyInfoForm() {
	const classes = useStyles();
	const {
		pending,
		user: { isAuthenticated },
		putPasswordBody: { currentPassword, password, retypePassword },
		privacy: {
			open, name, email, pending: privacyPending
		},
		fetchPrivacyAuthBody,
		showPassword,
		onHandlePasswordTextField,
		onHandlePrivacyAuthDialog,
		onHandlePrivacyAuthDialogTextField,
		onShowPrivacyAuthDialogPassword,
		onFetchPrivacy,
		onShowCurrentPassword,
		onShowPassword,
		onShowReTypePassword,
		onPutPassword
	} = useMyInfoForm();
	return (
		<Box mb={2}>
			<Grow in>
				<Box className={classes.box}>
					<Typography className={classes.typography} variant={'h5'}>
						{'개인 정보'}
					</Typography>
					<Box className={classes.gridBox}>
						<Grid className={classes.grid} container alignItems={'center'} spacing={1}>
							<Grid item xs={12} lg={3}>
								{'이름'}
							</Grid>
							<Grid item xs={12} lg={9}>
								<TextField fullWidth variant={'outlined'} value={name} disabled />
							</Grid>
						</Grid>
						<Grid className={classes.grid} container alignItems={'center'} spacing={1}>
							<Grid item xs={12} lg={3}>
								{'이메일'}
							</Grid>
							<Grid item xs={12} lg={9}>
								<TextField fullWidth variant={'outlined'} value={email} disabled />
							</Grid>
						</Grid>
						<Box mt={2} mb={2} textAlign={'right'}>
							<Button
								className={classes.button}
								variant={'contained'}
								color={'primary'}
								size={'large'}
								onClick={onHandlePrivacyAuthDialog}
								disabled={pending || privacyPending || !isAuthenticated}
							>
								{'개인 정보 확인'}
							</Button>
						</Box>
						<Divider className={classes.divider} />
						<Grid className={classes.grid} container alignItems={'center'} spacing={1}>
							<Grid item xs={12} lg={3}>
								{'현재 비밀번호'}
							</Grid>
							<Grid item xs={12} lg={9}>
								<TextField
									fullWidth
									type={currentPassword.showPassword ? 'text' : 'password'}
									variant={'outlined'}
									placeholder={'현재 비밀번호'}
									InputProps={{
										endAdornment: (
											<InputAdornment position={'end'}>
												<IconButton edge={'end'} onClick={onShowCurrentPassword}>
													{currentPassword.showPassword ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										)
									}}
									name={'currentPassword'}
									value={currentPassword.value || ''}
									error={currentPassword.error}
									helperText={currentPassword.helperText}
									onChange={onHandlePasswordTextField}
									disabled={pending || !isAuthenticated}
								/>
							</Grid>
						</Grid>
						<Grid className={classes.grid} container alignItems={'center'} spacing={1}>
							<Grid item xs={12} lg={3}>
								{'새 비밀번호'}
							</Grid>
							<Grid item xs={12} lg={9}>
								<TextField
									fullWidth
									type={password.showPassword ? 'text' : 'password'}
									variant={'outlined'}
									placeholder={'새 비밀번호'}
									InputProps={{
										endAdornment: (
											<InputAdornment position={'end'}>
												<IconButton edge={'end'} onClick={onShowPassword}>
													{password.showPassword ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										)
									}}
									name={'password'}
									value={password.value || ''}
									error={password.error}
									helperText={password.helperText}
									onChange={onHandlePasswordTextField}
									disabled={pending || !isAuthenticated}
								/>
							</Grid>
						</Grid>
						<Grid className={classes.grid} container alignItems={'center'} spacing={1}>
							<Grid item xs={12} lg={3}>
								{'새 비밀번호 확인'}
							</Grid>
							<Grid item xs={12} lg={9}>
								<TextField
									fullWidth
									type={retypePassword.showPassword ? 'text' : 'password'}
									variant={'outlined'}
									placeholder={'새 비밀번호 확인'}
									InputProps={{
										endAdornment: (
											<InputAdornment position={'end'}>
												<IconButton edge={'end'} onClick={onShowReTypePassword}>
													{retypePassword.showPassword ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										)
									}}
									name={'retypePassword'}
									value={retypePassword.value || ''}
									error={retypePassword.error}
									helperText={retypePassword.helperText}
									onChange={onHandlePasswordTextField}
									disabled={pending || !isAuthenticated}
								/>
							</Grid>
						</Grid>
						<Box mt={2} textAlign={'right'}>
							<Button
								className={classes.button}
								variant={'contained'}
								color={'primary'}
								size={'large'}
								onClick={onPutPassword}
								disabled={pending || privacyPending || !isAuthenticated}
							>
								{'변경사항 저장'}
							</Button>
						</Box>
					</Box>
				</Box>
			</Grow>
			<PasswordAuthDialog
				open={open}
				pending={privacyPending}
				subTitle={'개인 정보 확인'}
				passwordAuthDialogBody={fetchPrivacyAuthBody}
				showPassword={showPassword}
				onShowPasswordAuthDialogPassword={onShowPrivacyAuthDialogPassword}
				onHandlePasswordAuthDialogTextField={onHandlePrivacyAuthDialogTextField}
				onHandlePasswordAuthDialog={onHandlePrivacyAuthDialog}
				onRequestPasswordAuth={onFetchPrivacy}
			/>
		</Box>
	);
}

export default memo(MyInfoForm);
