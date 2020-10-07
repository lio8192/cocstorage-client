import React, { memo } from 'react';
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
import MUIRichTextEditor from 'mui-rte';

// Material UI Icons
import Visibility from '@material-ui/icons/Visibility';
import DoneIcon from '@material-ui/icons/Done';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
		button: {
			color: 'white',
			[theme.breakpoints.down('md')]: {
				borderRadius: 0
			}
		},
		grid: {
			marginBottom: theme.spacing(2),
			[theme.breakpoints.down('md')]: {
				marginBottom: theme.spacing(0)
			}
		}
	})
);

function StorageBoardWriteForm() {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<Container className={classes.container}>
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
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						fullWidth
						variant={'outlined'}
						type={'password'}
						label={isMobile ? null : '비밀번호'}
						placeholder={isMobile ? '비밀번호' : undefined}
						InputProps={{
							className: classes.passwordTextFieldInput,
							endAdornment: (
								<InputAdornment position={'end'}>
									<IconButton edge={'end'}>
										<Visibility />
									</IconButton>
								</InputAdornment>
							)
						}}
					/>
				</Grid>
			</Grid>
			<Box className={classes.subjectBox}>
				<TextField
					fullWidth
					variant={'outlined'}
					label={isMobile ? null : '제목'}
					placeholder={isMobile ? '제목을 입력해주세요.' : undefined}
					InputProps={{
						className: classes.subjectTextFieldInput
					}}
				/>
			</Box>
			<Box className={classes.textEditorBox}>
				<MUIRichTextEditor defaultValue={''} label={'내용을 입력해주세요.'} />
			</Box>
			<Grid className={classes.grid} container spacing={!isMobile ? 1 : 0} justify={'flex-end'}>
				<Grid item xs={isMobile && 6}>
					<Button
						fullWidth={isMobile}
						className={classes.button}
						variant={'contained'}
						size={'large'}
						startIcon={<ArrowBackIcon />}
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
					>
						{'완료'}
					</Button>
				</Grid>
			</Grid>
		</Container>
	);
}

export default memo(StorageBoardWriteForm);
