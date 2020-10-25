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
import LockIcon from '@material-ui/icons/Lock';

// @types
import { DeleteAuthDialogBody } from 'hooks/storages/board/detail/useStorageBoardDetail';

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
		icon: {
			verticalAlign: 'middle'
		}
	})
);

type DeleteAuthDialogProps = {
	open: boolean;
	pending: boolean;
	subTitle: string;
	deleteAuthDialogBody: DeleteAuthDialogBody;
	showPassword: boolean;
	onShowAuthenticationDialogPassword: () => void;
	onHandleDeleteAuthDialogTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onHandleDeleteAuthDialog: () => void;
	onDeleteData: () => void;
};

function DeleteAuthDialog({
	open,
	pending,
	subTitle,
	deleteAuthDialogBody: { password, error, helperText },
	showPassword,
	onShowAuthenticationDialogPassword,
	onHandleDeleteAuthDialogTextField,
	onHandleDeleteAuthDialog,
	onDeleteData
}: DeleteAuthDialogProps) {
	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Dialog
			className={classes.root}
			fullScreen={fullScreen}
			fullWidth
			maxWidth={'xs'}
			open={open}
			onClose={onHandleDeleteAuthDialog}
		>
			<Fade in={pending}>
				<LinearProgress className={classes.linearProgress} color={'primary'} />
			</Fade>
			<DialogTitle>
				<Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
					<Box>
						<Typography className={classes.typography} variant={'h5'}>
							<LockIcon className={classes.icon} color={'primary'} fontSize={'large'} />
							<Box component={'span'} ml={1}>
								{'비밀번호 인증'}
							</Box>
						</Typography>
					</Box>
					<Box>
						<Typography className={classes.typography} variant={'caption'}>
							{subTitle}
						</Typography>
					</Box>
				</Box>
			</DialogTitle>
			<DialogContent>
				<Box>
					<TextField
						fullWidth
						variant={'outlined'}
						type={showPassword ? 'text' : 'password'}
						label={'비밀번호'}
						InputProps={{
							endAdornment: (
								<InputAdornment position={'end'}>
									<IconButton edge={'end'} onClick={onShowAuthenticationDialogPassword}>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							)
						}}
						name={'password'}
						onChange={onHandleDeleteAuthDialogTextField}
						value={password}
						error={error}
						helperText={helperText}
					/>
				</Box>
				<Box mt={2} mb={3}>
					<Button
						className={classes.button}
						fullWidth
						variant={'contained'}
						onClick={onDeleteData}
						color={'primary'}
						size={'large'}
						disabled={pending}
					>
						{'확인'}
					</Button>
				</Box>
			</DialogContent>
		</Dialog>
	);
}

export default memo(DeleteAuthDialog);
