import React, { useEffect, memo } from 'react';
import Head from 'next/head';
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
		<>
			<Head>
				<meta charSet={'utf-8'} />
				<meta httpEquiv={'content-language'} content={'ko'} />
				<meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'} />
				<meta name={'author'} content={'개념글 저장소'} />
				<meta name={'title'} content={'회원 인증 : 개념글 저장소'} />
				<meta property={'og:title'} content={'개념글 저장소'} />
				<meta property={'og:type'} content={'website'} />
				<meta property={'og:image'} content={'/logo_prev.png'} />
				<meta property={'og:url'} content={'https://www.cocstorage.com'} />
				<meta property={'og:site_name'} content={'개념글 저장소'} />
				<meta property={'og:locale'} content={'ko_KR'} />
				<meta property={'twitter:title'} content={'회원 인증 : 개념글 저장소'} />
				<meta property={'twitter:image'} content={'/logo_prev.png'} />
				<meta property={'twitter:url'} content={'https://wwww.cocstorage.com'} />
				<meta property={'twitter:card'} content={'summary'} />
				<meta name={'apple-mobile-web-app-title'} content={'회원 인증 : 개념글 저장소'} />
				<title>{'회원 인증 : 개념글 저장소'}</title>
				<link rel={'shortcut icon'} href={'/favicon.ico'} />
				<link rel={'apple-touch-icon'} href={'/logo_prev.png'} />
				<link rel={'canonical'} href={'https://www.cocstorage.com'} />
				<link rel={'manifest'} href={'/manifest.json'} />
			</Head>
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
											<Box key={`helper-text-${item}`}>
												{item}
												<br />
											</Box>
										))}
									</Typography>
								</Box>
							</>
						)}
					</Box>
				</Box>
			</Container>
		</>
	);
}

export default memo(UserAuthenticationUUID);
