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
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Checkbox from '@material-ui/core/Checkbox';

// Material UI Icons
import Visibility from '@material-ui/icons/Visibility';

// Images
import Logo from 'public/logo.png';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		button: {
			color: 'white'
		},
		typography: {
			color: theme.palette.action.active
		},
		checkbox: {
			padding: theme.spacing(0)
		},
		formControlLabel: {
			'& .MuiTypography-body1': {
				fontSize: '0.875rem'
			}
		}
	})
);

function SignUpDialog() {
	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Dialog fullScreen={fullScreen} fullWidth maxWidth={'xs'} open={false} onClose={() => console.log('onClose')}>
			<DialogTitle>
				<img src={Logo} alt={'SignInDialog Logo Img'} />
				<Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
					<Box>
						<Typography className={classes.typography} variant={'h5'}>
							{'간편 회원가입'}
						</Typography>
					</Box>
					<Box>
						<Button>{'이미 회원이신가요?'}</Button>
					</Box>
				</Box>
			</DialogTitle>
			<DialogContent>
				<Box>
					<TextField fullWidth variant={'outlined'} label={'이름'} />
				</Box>
				<Box mt={1}>
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
				<Box display={'flex'} alignItems={'center'} mt={2}>
					<Box>
						<Checkbox
							className={classes.checkbox}
							checked
							onChange={() => console.log('onChange')}
							name={'agree'}
							color={'primary'}
						/>
					</Box>
					<Box flex={1} ml={1}>
						{'개념글 저장소의'}{' '}
						<Link href={'https://www.cocstorage.com'} underline={'always'} target={'_blank'}>
							{'이용약관'}
						</Link>{' '}
						{'및'}{' '}
						<Link href={'https://www.cocstorage.com'} underline={'always'} target={'_blank'}>
							{'개인정보처리방침'}
						</Link>{' '}
						{'에 대한 내용을 모두 확인하였으며, 이에 동의합니다.'}
					</Box>
				</Box>
				<Box mt={3} mb={3}>
					<Button
						className={classes.button}
						fullWidth
						variant={'contained'}
						onClick={() => console.log('onClose')}
						color={'primary'}
						size={'large'}
					>
						{'가입하기'}
					</Button>
				</Box>
			</DialogContent>
		</Dialog>
	);
}

export default memo(SignUpDialog);
