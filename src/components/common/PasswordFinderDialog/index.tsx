import React, { forwardRef, memo } from 'react';
import {
	createStyles, makeStyles, Theme, useTheme
} from '@material-ui/core/styles';

// Material UI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
// eslint-disable-next-line import/no-unresolved
import { TransitionProps } from '@material-ui/core/transitions';

// Custom Hooks
import usePasswordFinder from 'hooks/common/usePasswordFinder';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			position: 'relative'
		},
		box: {
			overflow: 'hidden',
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis'
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
			width: '100%'
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

function PasswordFinderDialog() {
	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const {
		paletteType,
		open,
		pending,
		postPasswordFinderBody: { name, email },
		onHandleSignInDialog,
		onHandlePasswordFinderDialog,
		onHandlePasswordFinderDialogTextField,
		onPostPasswordFinder
	} = usePasswordFinder();
	return (
		<Dialog
			className={classes.root}
			fullScreen={fullScreen}
			fullWidth
			maxWidth={'xs'}
			open={open}
			onClose={onHandlePasswordFinderDialog}
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
							{'비밀번호 찾기'}
						</Typography>
					</Box>
					<Box>
						<Button onClick={onHandleSignInDialog}>{'로그인하기'}</Button>
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
						onChange={onHandlePasswordFinderDialogTextField}
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
						onChange={onHandlePasswordFinderDialogTextField}
						value={email.value}
						error={email.error}
						helperText={email.helperText}
					/>
				</Box>
				<Box mt={2}>
					<Typography className={classes.typography} variant={'caption'}>
						{'가입한 이메일 주소로 임시 비밀번호를 안내드립니다. 로그인 후 반드시 비밀번호를 변경해주세요!'}
					</Typography>
				</Box>
				<Box mt={2}>
					<Grid container spacing={1}>
						<Grid item xs={6} md={12}>
							<Button
								className={classes.button}
								fullWidth
								color={'primary'}
								variant={'contained'}
								onClick={onPostPasswordFinder}
								size={'large'}
								disabled={pending}
							>
								<Box className={classes.box}>{'임시 비밀번호 발송'}</Box>
							</Button>
						</Grid>
						<Grid item xs={6} md={12}>
							{fullScreen && (
								<Button
									className={classes.closeButton}
									fullWidth
									variant={'contained'}
									onClick={onHandlePasswordFinderDialog}
									size={'large'}
								>
									{'닫기'}
								</Button>
							)}
						</Grid>
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

export default memo(PasswordFinderDialog);
