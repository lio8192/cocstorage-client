import React, { memo } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Material UI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import InputBase from '@material-ui/core/InputBase';

// Material UI Icons
import CreateIcon from '@material-ui/icons/Create';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// Custom Hooks
import useDetailCommentWriteForm from 'hooks/storages/board/detail/useDetailCommentWriteForm';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			backgroundColor: theme.palette.background.paper,
			border: `1px solid ${theme.palette.grey['50']}`,
			borderRadius: 4,
			marginBottom: theme.spacing(2),
			[theme.breakpoints.down('md')]: {
				marginBottom: 0,
				border: 'none',
				borderTop: `1px solid ${theme.palette.grey['50']}`,
				borderRadius: 'inherit'
			}
		},
		grid: {
			borderBottom: `1px solid ${theme.palette.grey['50']}`
		},
		inputBaseGrid: {
			borderRight: `1px solid ${theme.palette.grey['50']}`
		},
		inputBase: {
			padding: '18.5px 14px'
		},
		inputBaseMultiline: {
			padding: '18.5px 14px'
		},
		box: {
			textAlign: 'right',
			padding: theme.spacing(1)
		},
		button: {
			color: 'white',
			[theme.breakpoints.down('md')]: {
				width: '100%'
			}
		}
	})
);

function DetailCommentWriteForm() {
	const classes = useStyles();
	const {
		comments: {
			pending,
			manage: { pending: managePending }
		},
		postStorageBoardDetailCommentBody: { nickname, password, content },
		showPassword,
		isAuthenticated,
		onHandleStorageBoardDetailCommentTextField,
		onShowStorageBoardDetailCommentPassword,
		onPostStorageBoardDetailComment,
		onPostNonMemberStorageBoardDetailComment
	} = useDetailCommentWriteForm();
	return (
		<Grow in>
			<Box className={classes.root}>
				{!isAuthenticated && (
					<Grid className={classes.grid} container>
						<Grid className={classes.inputBaseGrid} item xs={6}>
							<InputBase
								className={classes.inputBase}
								fullWidth
								placeholder={'닉네임'}
								onChange={onHandleStorageBoardDetailCommentTextField}
								name={'nickname'}
								value={nickname || ''}
								disabled={pending || managePending}
							/>
						</Grid>
						<Grid item xs={6}>
							<InputBase
								className={classes.inputBase}
								fullWidth
								type={showPassword ? 'text' : 'password'}
								placeholder={'비밀번호'}
								endAdornment={(
									<InputAdornment position={'end'}>
										<IconButton edge={'end'} onClick={onShowStorageBoardDetailCommentPassword}>
											{showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								)}
								onChange={onHandleStorageBoardDetailCommentTextField}
								name={'password'}
								value={password || ''}
								disabled={pending || managePending}
							/>
						</Grid>
					</Grid>
				)}
				<Box>
					<InputBase
						className={classes.inputBaseMultiline}
						fullWidth
						multiline
						rows={5}
						rowsMin={5}
						placeholder={'내용을 입력해주세요.'}
						onChange={onHandleStorageBoardDetailCommentTextField}
						name={'content'}
						value={content}
						disabled={pending || managePending}
					/>
				</Box>
				<Box className={classes.box}>
					<Button
						className={classes.button}
						variant={'contained'}
						color={'primary'}
						size={'large'}
						startIcon={<CreateIcon />}
						onClick={isAuthenticated ? onPostStorageBoardDetailComment : onPostNonMemberStorageBoardDetailComment}
						disabled={pending || managePending}
					>
						{'등록'}
					</Button>
				</Box>
			</Box>
		</Grow>
	);
}

export default memo(DetailCommentWriteForm);
