import React, { memo } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Material UI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Grow from '@material-ui/core/Grow';

// Material UI Icons
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

// Custom Hooks
import useMyWithdrawalForm from 'hooks/mypage/useMyWithdrawalForm';
import PasswordAuthDialog from 'components/common/PasswordAuthDialog';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		typography: {
			color: theme.palette.action.active
		},
		box: {
			maxWidth: 700,
			[theme.breakpoints.down('md')]: {
				maxWidth: '100%'
			}
		},
		icon: {
			verticalAlign: 'middle'
		},
		button: {
			color: 'white',
			[theme.breakpoints.down('md')]: {
				width: '100%'
			}
		},
		checkbox: {
			padding: theme.spacing(0)
		}
	})
);

function MyWithdrawalForm() {
	const classes = useStyles();
	const {
		pending,
		deleteAuth: { open, pending: deleteAuthPending },
		user: { isAuthenticated },
		deleteUserBody: { checked, error, helperText },
		deleteUserAuthBody,
		showPassword,
		onHandlePolicyCheckBox,
		onHandleDeleteUserAuthDialog,
		onHandleDeleteUserAuthTextField,
		onShowDeleteUserAuthDialogPassword,
		onDeleteUser
	} = useMyWithdrawalForm();
	return (
		<>
			<Grow in>
				<Box>
					<Typography className={classes.typography} variant={'h5'}>
						{'회원 탈퇴'}
					</Typography>
					<Box mt={1} mb={2}>
						<Typography className={classes.typography} variant={'caption'}>
							{'회원 탈퇴 전 아래의 내용들을 반드시 확인해주세요.'}
						</Typography>
					</Box>
					<Box className={classes.box}>
						<Box display={'flex'} alignItems={'center'} mt={1}>
							<Box>
								<CheckCircleIcon className={classes.icon} color={'primary'} />
							</Box>
							<Box ml={1}>{'아이디와 개인정보는 즉시 삭제되며, 복구가 불가능합니다.'}</Box>
						</Box>
						<Box display={'flex'} alignItems={'center'} mt={1}>
							<Box>
								<CheckCircleIcon className={classes.icon} color={'primary'} />
							</Box>
							<Box ml={1}>{'회원 탈퇴 후 7일 이내에는 동일한 이메일의 회원가입이 제한됩니다.'}</Box>
						</Box>
						<Box display={'flex'} alignItems={'center'} mt={1}>
							<Box>
								<CheckCircleIcon className={classes.icon} color={'primary'} />
							</Box>
							<Box ml={1}>{'모든 저장소 내에 등록한 게시글, 댓글, 답글은 탈퇴 시 자동으로 모두 삭제됩니다.'}</Box>
						</Box>
						<Box display={'flex'} alignItems={'center'} mt={2}>
							<Box>
								<Checkbox
									className={classes.checkbox}
									checked={checked}
									color={'primary'}
									onChange={onHandlePolicyCheckBox}
									disabled={pending || !isAuthenticated}
								/>
							</Box>
							<Box flex={1} ml={1}>
								<Typography className={classes.typography} variant={'caption'}>
									{'위의 내용을 모두 확인하였으며, 이에 동의합니다.'}
								</Typography>
							</Box>
						</Box>
						<Box mt={1}>{error && <FormHelperText error>{helperText}</FormHelperText>}</Box>
						<Box mt={2} mb={2} textAlign={'right'}>
							<Button
								className={classes.button}
								variant={'contained'}
								color={'primary'}
								size={'large'}
								onClick={onHandleDeleteUserAuthDialog}
								disabled={pending || deleteAuthPending}
							>
								{'탈퇴하기'}
							</Button>
						</Box>
					</Box>
				</Box>
			</Grow>
			<PasswordAuthDialog
				open={open}
				pending={deleteAuthPending}
				subTitle={'회원 탈퇴'}
				passwordAuthDialogBody={deleteUserAuthBody}
				showPassword={showPassword}
				onShowPasswordAuthDialogPassword={onShowDeleteUserAuthDialogPassword}
				onHandlePasswordAuthDialogTextField={onHandleDeleteUserAuthTextField}
				onHandlePasswordAuthDialog={onHandleDeleteUserAuthDialog}
				onRequestPasswordAuth={onDeleteUser}
			/>
		</>
	);
}

export default memo(MyWithdrawalForm);
