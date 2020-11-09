import React, { memo } from 'react';
import {
	createStyles, makeStyles, Theme, useTheme
} from '@material-ui/core/styles';

// Material UI
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

// Custom Hooks
import usePasswordFinder from 'hooks/common/usePasswordFinder';

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
		},
		logo: {
			maxWidth: 175
		},
		icon: {
			maxWidth: 50
		}
	})
);

function PasswordFinderDialog() {
	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const {
		open,
		pending,
		postPasswordFinderBody: { name, email },
		onHandleSignInDialog,
		onHandlePasswordFinderDialog,
		onHandlePasswordFinderDialogTextField,
		onPostPasswordFinder,
		onKeyUpHandleDialog
	} = usePasswordFinder();
	return (
		<Dialog
			className={classes.root}
			fullScreen={fullScreen}
			fullWidth
			maxWidth={'xs'}
			open={open}
			onClose={onHandlePasswordFinderDialog}
			onKeyUp={onKeyUpHandleDialog}
		>
			<Fade in={pending}>
				<LinearProgress className={classes.linearProgress} color={'primary'} />
			</Fade>
			<DialogTitle>
				<Box pt={2} pb={2}>
					<Box textAlign={'center'}>
						<img
							className={classes.icon}
							src={'https://static.cocstorage.com/images/icon.png'}
							alt={'PasswordFinder Logo Img'}
						/>
					</Box>
					<Box textAlign={'center'}>
						<img
							className={classes.logo}
							src={'https://static.cocstorage.com/images/logo_text.png'}
							alt={'PasswordFinder Logo Img'}
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
					<Button
						className={classes.button}
						fullWidth
						variant={'contained'}
						onClick={onPostPasswordFinder}
						color={'primary'}
						size={'large'}
						disabled={pending}
					>
						{'임시 비밀번호 발송'}
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

export default memo(PasswordFinderDialog);
