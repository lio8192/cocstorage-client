import React, { memo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// Material UI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grow from '@material-ui/core/Grow';

// Material UI Icons
import LockIcon from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			position: 'absolute',
			top: 0,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
			height: '100%',
			backgroundColor: theme.palette.background.default,
			zIndex: 10
		},
		textField: {
			backgroundColor: theme.palette.type === 'light' ? theme.palette.common.white : theme.palette.background.paper
		},
		icon: {
			verticalAlign: 'middle'
		},
		typography: {
			color: theme.palette.action.active,
			fontWeight: 700
		},
		button: {
			color: 'white'
		}
	})
);

type AuthBoxProps = {
	pending: boolean;
	isMember: boolean;
	editAuthenticated: boolean;
	showPassword: boolean;
	password: string | null;
	passwordError: boolean;
	onShowEditFormPassword: () => void;
	onHandleEditFormTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onFetchNonMemberStorageBoardEditDetail: () => void;
};

function AuthBox({
	pending,
	isMember,
	editAuthenticated,
	showPassword,
	password,
	passwordError,
	onShowEditFormPassword,
	onHandleEditFormTextField,
	onFetchNonMemberStorageBoardEditDetail
}: AuthBoxProps) {
	const classes = useStyles();
	const router = useRouter();

	const handlePrevButton = useCallback(() => router.back(), [router]);

	return (
		<>
			{!isMember && !editAuthenticated && (
				<Grow in={!pending}>
					<Box className={classes.root}>
						<Box width={'100%'} maxWidth={300}>
							<Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
								<Box>
									<LockIcon className={classes.icon} color={'primary'} fontSize={'large'} />
								</Box>
								<Box ml={1}>
									<Typography className={classes.typography} variant={'h6'}>
										{'비밀번호 인증'}
									</Typography>
								</Box>
							</Box>
							<Box mt={2}>
								<TextField
									className={classes.textField}
									fullWidth
									type={showPassword ? 'text' : 'password'}
									variant={'outlined'}
									placeholder={'비밀번호'}
									InputProps={{
										endAdornment: (
											<InputAdornment position={'end'}>
												<IconButton edge={'end'} onClick={onShowEditFormPassword}>
													{showPassword ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										)
									}}
									onChange={onHandleEditFormTextField}
									name={'password'}
									value={password || ''}
									error={passwordError}
									helperText={passwordError ? '비밀번호를 입력해주세요.' : ''}
								/>
							</Box>
							<Box mt={1}>
								<Grid container spacing={1}>
									<Grid item xs={6}>
										<Button fullWidth variant={'contained'} size={'large'} onClick={handlePrevButton}>
											{'이전'}
										</Button>
									</Grid>
									<Grid item xs={6}>
										<Button
											className={classes.button}
											fullWidth
											variant={'contained'}
											color={'primary'}
											size={'large'}
											onClick={onFetchNonMemberStorageBoardEditDetail}
											disabled={pending}
										>
											{'확인'}
										</Button>
									</Grid>
								</Grid>
							</Box>
						</Box>
					</Box>
				</Grow>
			)}
		</>
	);
}

export default memo(AuthBox);
