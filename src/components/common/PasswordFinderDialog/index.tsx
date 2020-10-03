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

// Images
import Logo from 'public/logo.png';

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

function PasswordFinderDialog() {
	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Dialog fullScreen={fullScreen} fullWidth maxWidth={'xs'} open={false} onClose={() => console.log('onClose')}>
			<DialogTitle>
				<img src={Logo} alt={'SignInDialog Logo Img'} />
				<Box mt={1}>
					<Typography className={classes.typography} variant={'h5'}>
						{'비밀번호 찾기'}
					</Typography>
				</Box>
			</DialogTitle>
			<DialogContent>
				<Box>
					<TextField fullWidth variant={'outlined'} label={'이름'} />
				</Box>
				<Box mt={1}>
					<TextField fullWidth variant={'outlined'} label={'이메일'} />
				</Box>
				<Box mt={2}>
					<Typography className={classes.typography} variant={'caption'}>
						{'가입한 이메일 주소로 임시 비밀번호를 안내드립니다. 로그인 후 반드시 비밀번호를 변경해주세요!'}
					</Typography>
				</Box>
				<Box mt={2} mb={3}>
					<Button
						className={classes.button}
						fullWidth
						variant={'contained'}
						onClick={() => console.log('onClose')}
						color={'primary'}
						size={'large'}
					>
						{'임시 비밀번호 발송'}
					</Button>
				</Box>
			</DialogContent>
		</Dialog>
	);
}

export default memo(PasswordFinderDialog);
