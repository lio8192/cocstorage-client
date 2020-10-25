import React, { memo } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Material UI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';

// Material UI Icons
import CreateIcon from '@material-ui/icons/Create';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// Custom Hooks
import useDetailReplyWriteForm from 'hooks/storages/board/detail/useDetailReplyWriteForm';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			border: '1px solid #EAEAEA',
			borderRadius: 4,
			backgroundColor: 'white',
			[theme.breakpoints.down('md')]: {
				marginTop: -1,
				borderRadius: 0
			}
		},
		grid: {
			borderBottom: '1px solid #EAEAEA'
		},
		inputBaseGrid: {
			borderRight: '1px solid #EAEAEA'
		},
		inputBase: {
			padding: '18.5px 14px'
		},
		inputBaseMultiline: {
			padding: '18.5px 14px'
		},
		box: {
			textAlign: 'right',
			padding: theme.spacing(1),
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(0)
			}
		},
		button: {
			color: 'white',
			[theme.breakpoints.down('md')]: {
				width: '100%',
				borderRadius: 0
			}
		}
	})
);

function ReplyWriteForm() {
	const classes = useStyles();
	const {
		replies: {
			manage: { pending }
		},
		postStorageBoardDetailReplyBody: { nickname, password, content },
		showPassword,
		isAuthenticated,
		onHandleStorageBoardDetailReplyTextField,
		onShowStorageBoardDetailReplyPassword,
		onPostStorageBoardDetailReply,
		onPostNonMemberStorageBoardDetailReply
	} = useDetailReplyWriteForm();
	return (
		<Box className={classes.root}>
			{!isAuthenticated && (
				<Grid className={classes.grid} container>
					<Grid className={classes.inputBaseGrid} item xs={6}>
						<InputBase
							className={classes.inputBase}
							fullWidth
							placeholder={'닉네임'}
							onChange={onHandleStorageBoardDetailReplyTextField}
							name={'nickname'}
							value={nickname || ''}
							disabled={pending}
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
									<IconButton edge={'end'} onClick={onShowStorageBoardDetailReplyPassword}>
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							)}
							onChange={onHandleStorageBoardDetailReplyTextField}
							name={'password'}
							value={password || ''}
							disabled={pending}
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
					onChange={onHandleStorageBoardDetailReplyTextField}
					name={'content'}
					value={content}
					disabled={pending}
				/>
			</Box>
			<Box className={classes.box}>
				<Button
					className={classes.button}
					variant={'contained'}
					color={'primary'}
					size={'large'}
					startIcon={<CreateIcon />}
					onClick={isAuthenticated ? onPostStorageBoardDetailReply : onPostNonMemberStorageBoardDetailReply}
					disabled={pending}
				>
					{'등록'}
				</Button>
			</Box>
		</Box>
	);
}

export default memo(ReplyWriteForm);
