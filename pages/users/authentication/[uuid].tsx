import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// Material UI
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

// Material UI Icons
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

// Modules
import { putUserAuthentication } from 'modules/common';
import { RootState } from 'modules';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			backgroundColor: 'white',
			paddingTop: theme.spacing(15),
			paddingBottom: theme.spacing(15)
		},
		successIcon: {
			width: theme.spacing(10),
			height: theme.spacing(10),
			color: theme.palette.success.main
		},
		errorIcon: {
			width: theme.spacing(10),
			height: theme.spacing(10),
			color: theme.palette.error.main
		}
	})
);

function UserAuthenticationUUID() {
	const router = useRouter();
	const classes = useStyles();
	const dispatch = useDispatch();
	const {
		userAuthentication: { pending, error, helperText }
	} = useSelector((state: RootState) => state.common);

	useEffect(() => {
		const { uuid } = router.query;

		if (uuid) {
			dispatch(putUserAuthentication(String(uuid)));
		} else {
			router.push('/').then();
		}
	}, [dispatch, router]);

	return (
		<Container className={classes.root}>
			<Box display={'flex'} justifyContent={'center'}>
				<Box>
					{pending && (
						<Box textAlign={'center'}>
							<CircularProgress color={'primary'} size={50} />
						</Box>
					)}
					{!pending && !error && (
						<>
							<Box textAlign={'center'}>
								<CheckCircleIcon className={classes.successIcon} />
							</Box>
							<Box>
								<Typography variant={'h5'}>{'인증이 완료되었습니다.'}</Typography>
							</Box>
						</>
					)}
					{!pending && error && (
						<>
							<Box textAlign={'center'}>
								<ErrorIcon className={classes.errorIcon} />
							</Box>
							<Box textAlign={'center'}>
								<Typography variant={'h5'}>
									{helperText.split('\n').map((item) => (
										<>
											{item}
											<br />
										</>
									))}
								</Typography>
							</Box>
						</>
					)}
				</Box>
			</Box>
		</Container>
	);
}

export default memo(UserAuthenticationUUID);
