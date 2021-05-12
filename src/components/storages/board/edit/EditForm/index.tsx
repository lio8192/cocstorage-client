import React, { useCallback, useMemo, memo } from 'react';
import { useRouter } from 'next/router';
import {
	makeStyles, createStyles, Theme, useTheme
} from '@material-ui/core/styles';

// Material UI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import NoSsr from '@material-ui/core/NoSsr';
import Grow from '@material-ui/core/Grow';
import MUIRichTextEditor from 'mui-rte';

// Material UI Icons
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import DoneIcon from '@material-ui/icons/Done';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import BackupIcon from '@material-ui/icons/Backup';

// Custom Hooks
import useEditForm from 'hooks/storages/board/edit/useEditForm';

// Components
import AuthBox from './AuthBox';
import UploadImagePopover from './UploadPopover';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			marginTop: theme.spacing(3),
			backgroundColor: 'white',
			[theme.breakpoints.down('md')]: {
				marginTop: theme.spacing(0),
				padding: theme.spacing(0)
			}
		},
		subjectBox: {
			marginTop: theme.spacing(1),
			[theme.breakpoints.down('md')]: {
				marginTop: theme.spacing(0)
			}
		},
		textEditorBox: {
			minHeight: 500,
			margin: theme.spacing(1, 0, 1),
			padding: theme.spacing(0, '14px'),
			border: '1px solid rgba(0, 0, 0, 0.23)',
			borderRadius: 4,
			'& img': {
				maxWidth: '100%'
			},
			[theme.breakpoints.down('md')]: {
				margin: theme.spacing(0),
				border: 'none',
				borderTop: `1px solid ${theme.palette.grey.A100}`,
				borderRadius: 0
			}
		},
		nicknameTextFieldInput: {
			[theme.breakpoints.down('md')]: {
				borderRadius: 0,
				'& fieldset': {
					border: 'none'
				}
			}
		},
		passwordTextFieldInput: {
			[theme.breakpoints.down('md')]: {
				borderRadius: 0,
				'& fieldset': {
					border: 'none'
				}
			}
		},
		subjectTextFieldInput: {
			[theme.breakpoints.down('md')]: {
				borderRadius: 0,
				'& fieldset': {
					border: 'none'
				}
			}
		},
		buttonBox: {
			borderTop: '1px solid #d5d5d5',
			overflow: 'hidden'
		},
		button: {
			color: 'white',
			fontFamily: 'NanumSquareRoundEB'
		},
		prevButton: {
			fontFamily: 'NanumSquareRoundEB'
		},
		grid: {
			marginBottom: theme.spacing(2),
			[theme.breakpoints.down('md')]: {
				borderTop: '1px solid #d5d5d5',
				padding: theme.spacing(1, 2),
				marginBottom: theme.spacing(0)
			}
		},
		authenticationBox: {
			position: 'absolute',
			top: 0,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
			height: '100%',
			backgroundColor: 'white',
			zIndex: 10
		},
		icon: {
			verticalAlign: 'middle'
		},
		typography: {
			color: theme.palette.action.active,
			fontWeight: 700
		}
	})
);

function EditForm() {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const router = useRouter();
	const {
		manage: {
			pending,
			detail: { isMember },
			editAuthenticated
		},
		putStorageBoardBody: { nickname, password, subject },
		convertDefaultContent,
		showPassword,
		ref,
		anchor,
		setAnchor,
		passwordError,
		onHandleEditFormTextField,
		onShowEditFormPassword,
		onHandleEditFormRichEditor,
		onHandleFileUpload,
		onPutStorageBoard,
		onPutNonMemberStorageBoard,
		onFetchNonMemberStorageBoardEditDetail
	} = useEditForm();

	const controls = useMemo<Array<string>>(() => {
		if (isMobile) {
			return [
				'title',
				'bold',
				'italic',
				'strikethrough',
				'underline',
				'highlight',
				'upload-image',
				'media',
				'link',
				'numberList',
				'bulletList',
				'quote'
			];
		}
		return [
			'title',
			'bold',
			'italic',
			'strikethrough',
			'underline',
			'highlight',
			'undo',
			'redo',
			'upload-image',
			'media',
			'link',
			'numberList',
			'bulletList',
			'quote'
		];
	}, [isMobile]);

	const handlePrevButton = useCallback(() => router.back(), [router]);

	return (
		<Grow in>
			<Box position={'relative'}>
				<Container className={classes.container}>
					{!isMember && (
						<NoSsr>
							<Grid container spacing={isMobile ? 0 : 1}>
								<Grid item xs={6}>
									<TextField
										fullWidth
										variant={'outlined'}
										label={isMobile ? null : '닉네임'}
										placeholder={isMobile ? '닉네임' : undefined}
										InputProps={{
											className: classes.nicknameTextFieldInput
										}}
										onChange={onHandleEditFormTextField}
										name={'nickname'}
										value={nickname || ''}
										disabled={pending}
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										fullWidth
										variant={'outlined'}
										type={showPassword ? 'text' : 'password'}
										label={isMobile ? null : '비밀번호'}
										placeholder={isMobile ? '비밀번호' : undefined}
										InputProps={{
											className: classes.passwordTextFieldInput,
											endAdornment: (
												<InputAdornment position={'end'}>
													<IconButton edge={'end'} onClick={onShowEditFormPassword}>
														{showPassword ? <VisibilityOff /> : <Visibility />}
													</IconButton>
												</InputAdornment>
											)
										}}
										onChange={onHandleEditFormTextField}
										name={'password'}
										value={password || ''}
										disabled
									/>
								</Grid>
							</Grid>
						</NoSsr>
					)}
					<Box className={classes.subjectBox}>
						<TextField
							fullWidth
							variant={'outlined'}
							label={isMobile ? null : '제목'}
							placeholder={isMobile ? '제목을 입력해주세요.' : undefined}
							InputProps={{
								className: classes.subjectTextFieldInput
							}}
							onChange={onHandleEditFormTextField}
							name={'subject'}
							value={subject}
							disabled={pending}
						/>
					</Box>
					<Box className={classes.textEditorBox}>
						<UploadImagePopover
							anchor={anchor}
							onSubmit={(data, insert) => {
								if (insert && data.file) {
									onHandleFileUpload(data.file);
								}
								setAnchor(null);
							}}
						/>
						<MUIRichTextEditor
							ref={ref}
							inlineToolbar
							controls={controls}
							customControls={[
								{
									name: 'upload-image',
									icon: <BackupIcon />,
									type: 'callback',
									// eslint-disable-next-line no-shadow
									onClick: (_editorState, _name, anchor) => {
										setAnchor(anchor);
									}
								}
							]}
							label={'내용을 입력해주세요.'}
							onChange={onHandleEditFormRichEditor}
							defaultValue={convertDefaultContent}
							readOnly={pending}
						/>
					</Box>
					<Box className={classes.buttonBox}>
						<Grid className={classes.grid} container spacing={1} justify={'flex-end'}>
							<Grid item xs={isMobile && 6}>
								<Button
									fullWidth={isMobile}
									className={classes.prevButton}
									variant={'contained'}
									size={'large'}
									startIcon={<ArrowBackIcon />}
									onClick={handlePrevButton}
								>
									{'이전'}
								</Button>
							</Grid>
							<Grid item xs={isMobile && 6}>
								<Button
									fullWidth={isMobile}
									className={classes.button}
									variant={'contained'}
									color={'primary'}
									size={'large'}
									startIcon={<DoneIcon />}
									onClick={isMember ? onPutStorageBoard : onPutNonMemberStorageBoard}
									disabled={pending}
								>
									{'완료'}
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Container>
				<AuthBox
					pending={pending}
					isMember={isMember}
					editAuthenticated={editAuthenticated}
					showPassword={showPassword}
					password={password}
					passwordError={passwordError}
					onShowEditFormPassword={onShowEditFormPassword}
					onHandleEditFormTextField={onHandleEditFormTextField}
					onFetchNonMemberStorageBoardEditDetail={onFetchNonMemberStorageBoardEditDetail}
				/>
			</Box>
		</Grow>
	);
}

export default memo(EditForm);
