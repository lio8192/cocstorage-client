import React, { useState, useCallback, memo } from 'react';
import { useRouter } from 'next/router';
import {
	makeStyles, createStyles, Theme, useTheme
} from '@material-ui/core/styles';
import { Editor } from '@tinymce/tinymce-react';

// Material UI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grow from '@material-ui/core/Grow';
import CircularProgress from '@material-ui/core/CircularProgress';

// Material UI Icons
import DoneIcon from '@material-ui/icons/Done';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// Custom Hooks
import useWriteForm from 'hooks/notices/write/useWriteForm';

// Fonts
import NanumSquareRoundR from 'src/styles/fonts/NanumSquareRoundR.woff2';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			marginTop: theme.spacing(3),
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
			position: 'relative',
			minHeight: 450,
			margin: theme.spacing(1, 0, 1),
			border: `1px solid ${theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'}`,
			borderRadius: 4,
			overflow: 'hidden',
			backgroundColor: theme.palette.background.paper,
			[theme.breakpoints.down('md')]: {
				margin: theme.spacing(0),
				border: 'none',
				borderTop: `1px solid ${theme.palette.type === 'light' ? theme.palette.grey['50'] : theme.palette.grey['50']}`,
				borderRadius: 0
			},
			'& *:not(.MuiCircularProgress-colorPrimary)': {
				fontFamily: 'NanumSquareRoundR !important',
				borderColor: `${
					theme.palette.type === 'light' ? theme.palette.grey.A100 : theme.palette.grey['50']
				} !important`,
				color: `${theme.palette.type === 'light' ? 'inherit' : 'white'} !important`,
				[theme.breakpoints.down('md')]: {
					'& *:not(.MuiCircularProgress-colorPrimary)': {
						borderColor: `${theme.palette.grey['50']} !important`
					}
				}
			},
			'& .tox-toolbar': {
				background: 'none !important',
				backgroundColor: `${theme.palette.background.paper} !important`,
				borderBottom: `1px solid ${theme.palette.grey['50']}`
			},
			'& .tox-toolbar__primary': {
				background: 'none !important',
				backgroundColor: `${theme.palette.background.paper} !important`,
				borderBottom: `1px solid ${theme.palette.grey['50']}`
			},
			'& .tox-statusbar': {
				backgroundColor: `${theme.palette.background.paper} !important`
			},
			'& .tox.tox-tinymce': {
				backgroundColor: `${theme.palette.background.paper} !important`,
				border: 'none !important'
			},
			'& svg': {
				fill: `${theme.palette.type === 'light' ? 'inherit' : 'white'} !important`
			}
		},
		writerInfoTextFieldGrid: {
			[theme.breakpoints.down('md')]: {
				borderBottom: `1px solid ${theme.palette.grey['50']}`
			}
		},
		nicknameTextFieldInput: {
			[theme.breakpoints.down('md')]: {
				borderRight: `1px solid ${theme.palette.grey['50']}`,
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
			overflow: 'hidden',
			[theme.breakpoints.down('md')]: {
				borderTop: `1px solid ${theme.palette.grey['50']}`
			}
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
		}
	})
);

function WriteForm() {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const router = useRouter();
	const {
		manage: { pending, id },
		putNoticeBody: { subject },
		onHandleWriteFormTextField,
		onHandleWriteFormRichEditor,
		onPostNoticeImage,
		onPutNotice
	} = useWriteForm();

	const [open, setOpen] = useState<boolean>(false);

	const handleInit = useCallback(() => setOpen(true), []);
	const handlePrevButton = useCallback(() => router.back(), [router]);

	return (
		<Grow in>
			<Box position={'relative'}>
				<Container className={classes.container}>
					<Box className={classes.subjectBox}>
						<TextField
							fullWidth
							variant={'outlined'}
							label={isMobile ? null : '제목'}
							placeholder={isMobile ? '제목을 입력해주세요.' : undefined}
							InputProps={{
								className: classes.subjectTextFieldInput
							}}
							onChange={onHandleWriteFormTextField}
							name={'subject'}
							value={subject}
							disabled={pending}
						/>
					</Box>
					<Box className={classes.textEditorBox}>
						<Grow in={id === 0 || pending || !open}>
							<Box
								position={'absolute'}
								top={0}
								left={0}
								display={'flex'}
								alignItems={'center'}
								justifyContent={'center'}
								width={'100%'}
								height={'100%'}
								textAlign={'center'}
							>
								<CircularProgress color={'primary'} />
							</Box>
						</Grow>
						{id !== 0 && !pending && theme.palette.type === 'light' && (
							<Editor
								apiKey={'kmfhv3po7kg1phohpf4oxj6lmnm8vgpviv2anq3loui0joj8'}
								init={{
									height: 500,
									menubar: false,
									plugins:
										'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
									toolbar:
										'fontsizeselect | bold italic | image media link anchor |'
										+ 'forecolor backcolor | alignleft aligncenter '
										+ 'alignright alignjustify | bullist numlist outdent indent | '
										+ 'emoticons removeformat fullscreen  preview | help',
									toolbar_sticky: true,
									toolbar_mode: 'sliding',
									images_upload_handler: (blobInfo, success, failure) => onPostNoticeImage(blobInfo, success, failure),
									image_advtab: true,
									image_caption: true,
									language: 'ko_KR',
									placeholder: '내용을 입력해주세요.',
									content_style: `
										@font-face {
											font-family: NanumSquareRoundR;
											src: url(${NanumSquareRoundR}) format('woff2');
										}
										body {
											margin: 18.5px 14px;
											font-family: NanumSquareRoundR;
											background-color: ${theme.palette.background.paper};
										}
										p {
											margin: 0;
										}
										img {
											max-width: 100%;
										}`,
									mobile: {
										toolbar_sticky: true,
										toolbar_mode: 'sliding',
										toolbar: 'bold italic | image media link anchor | forecolor backcolor | alignleft aligncenter'
									}
								}}
								disabled={pending}
								onChange={onHandleWriteFormRichEditor}
								onInit={handleInit}
							/>
						)}
						{id !== 0 && !pending && theme.palette.type === 'dark' && (
							<Editor
								apiKey={'kmfhv3po7kg1phohpf4oxj6lmnm8vgpviv2anq3loui0joj8'}
								init={{
									height: 500,
									menubar: false,
									plugins:
										'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
									toolbar:
										'fontsizeselect | bold italic | image media link anchor |'
										+ 'forecolor backcolor | alignleft aligncenter '
										+ 'alignright alignjustify | bullist numlist outdent indent | '
										+ 'emoticons removeformat fullscreen  preview | help',
									toolbar_sticky: true,
									toolbar_mode: 'sliding',
									images_upload_handler: (blobInfo, success, failure) => onPostNoticeImage(blobInfo, success, failure),
									image_advtab: true,
									image_caption: true,
									language: 'ko_KR',
									placeholder: '내용을 입력해주세요.',
									content_style: `
										@font-face {
											font-family: NanumSquareRoundR;
											src: url(${NanumSquareRoundR}) format('woff2');
										}
										body {
											margin: 18.5px 14px;
											font-family: NanumSquareRoundR;
											background-color: ${theme.palette.background.paper};
											color: white;
										}
										.mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
											color: darkgray;
										}
										p {
											margin: 0;
										}
										img {
											max-width: 100%;
										}`,
									mobile: {
										toolbar_sticky: true,
										toolbar_mode: 'sliding',
										toolbar: 'bold italic | image media link anchor | forecolor backcolor | alignleft aligncenter'
									}
								}}
								disabled={pending}
								onChange={onHandleWriteFormRichEditor}
								onInit={handleInit}
							/>
						)}
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
									onClick={onPutNotice}
									disabled={pending}
								>
									{'완료'}
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Container>
			</Box>
		</Grow>
	);
}

export default memo(WriteForm);
