import React, { memo } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Material UI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginTop: theme.spacing(3)
		},
		typography: {
			color: theme.palette.action.active
		},
		box: {
			maxWidth: 700,
			[theme.breakpoints.down('md')]: {
				maxWidth: '100%'
			}
		},
		grid: {
			marginTop: theme.spacing(2)
		},
		divider: {
			marginTop: theme.spacing(2)
		},
		button: {
			color: 'white',
			[theme.breakpoints.down('md')]: {
				width: '100%'
			}
		}
	})
);

function MyInfoForm() {
	const classes = useStyles();
	return (
		<>
			<Typography className={classes.typography} variant={'h5'}>
				{'정보 수정'}
			</Typography>
			<Box className={classes.box}>
				<Grid className={classes.grid} container alignItems={'center'} spacing={1}>
					<Grid item xs={12} lg={3}>
						{'이름'}
					</Grid>
					<Grid item xs={12} lg={9}>
						<TextField fullWidth variant={'outlined'} value={'테스트'} disabled />
					</Grid>
				</Grid>
				<Grid className={classes.grid} container alignItems={'center'} spacing={1}>
					<Grid item xs={12} lg={3}>
						{'이메일'}
					</Grid>
					<Grid item xs={12} lg={9}>
						<TextField fullWidth variant={'outlined'} value={'test@naver.com'} disabled />
					</Grid>
				</Grid>
				<Divider className={classes.divider} />
				<Grid className={classes.grid} container alignItems={'center'} spacing={1}>
					<Grid item xs={12} lg={3}>
						{'현재 비밀번호'}
					</Grid>
					<Grid item xs={12} lg={9}>
						<TextField fullWidth variant={'outlined'} placeholder={'현재 비밀번호'} />
					</Grid>
				</Grid>
				<Grid className={classes.grid} container alignItems={'center'} spacing={1}>
					<Grid item xs={12} lg={3}>
						{'새 비밀번호'}
					</Grid>
					<Grid item xs={12} lg={9}>
						<TextField fullWidth variant={'outlined'} placeholder={'새 비밀번호'} />
					</Grid>
				</Grid>
				<Grid className={classes.grid} container alignItems={'center'} spacing={1}>
					<Grid item xs={12} lg={3}>
						{'새 비밀번호 확인'}
					</Grid>
					<Grid item xs={12} lg={9}>
						<TextField fullWidth variant={'outlined'} placeholder={'새 비밀번호 확인'} />
					</Grid>
				</Grid>
				<Box mt={2} mb={2} textAlign={'right'}>
					<Button className={classes.button} variant={'contained'} color={'primary'} size={'large'}>
						{'변경사항 저장'}
					</Button>
				</Box>
			</Box>
		</>
	);
}

export default memo(MyInfoForm);
