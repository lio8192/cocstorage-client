import React, { memo } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Material UI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			border: '1px solid #EAEAEA',
			borderRadius: 4,
			[theme.breakpoints.down('md')]: {
				marginTop: -1,
				borderRadius: 0,
				borderLeft: 'none',
				borderRight: 'none'
			}
		},
		grid: {
			borderRight: '1px solid #EAEAEA'
		},
		inputContentBox: {
			borderTop: '1px solid #EAEAEA'
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

function DetailCommentWriteForm() {
	const classes = useStyles();
	return (
		<Box className={classes.root}>
			<Grid container>
				<Grid className={classes.grid} item xs={6}>
					<InputBase className={classes.inputBase} fullWidth placeholder={'닉네임'} />
				</Grid>
				<Grid item xs={6}>
					<InputBase
						className={classes.inputBase}
						fullWidth
						type={'password'}
						placeholder={'비밀번호'}
						endAdornment={(
							<InputAdornment position={'end'}>
								<IconButton edge={'end'}>
									<Visibility />
								</IconButton>
							</InputAdornment>
						)}
					/>
				</Grid>
			</Grid>
			<Box className={classes.inputContentBox}>
				<InputBase
					className={classes.inputBaseMultiline}
					fullWidth
					multiline
					rows={5}
					rowsMin={5}
					placeholder={'내용을 입력해주세요.'}
				/>
			</Box>
			<Box className={classes.box}>
				<Button
					className={classes.button}
					variant={'contained'}
					color={'primary'}
					size={'large'}
					startIcon={<CreateIcon />}
				>
					{'등록'}
				</Button>
			</Box>
		</Box>
	);
}

export default memo(DetailCommentWriteForm);
