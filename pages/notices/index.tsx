import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Material UI
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grow from '@material-ui/core/Grow';

// Material UI Icons
import CreateIcon from '@material-ui/icons/Create';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Components
import NoticeHeader from 'components/notices/NoticeHeader';
import NoticeGridList from 'components/notices/NoticeGridList';

// Custom Hooks
import useNotices from 'hooks/notices/useNotices';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			paddingTop: theme.spacing(2),
			paddingBottom: theme.spacing(2),
			backgroundColor: 'white',
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(0)
			}
		},
		button: {
			'& a': {
				textDecoration: 'none',
				color: 'white'
			}
		},
		icon: {
			color: 'white'
		},
		buttonBox: {
			marginTop: theme.spacing(1),
			[theme.breakpoints.down('md')]: {
				marginTop: theme.spacing(0)
			}
		},
		moreButton: {
			borderRadius: 0,
			color: theme.palette.action.active,
			fontWeight: 700
		},
		adminContainer: {
			paddingBottom: theme.spacing(1),
			backgroundColor: 'white',
			[theme.breakpoints.down('md')]: {
				paddingTop: theme.spacing(2),
				paddingBottom: theme.spacing(0)
			}
		}
	})
);

function Notices() {
	const classes = useStyles();
	const {
		pending,
		pagination: { isLastPage },
		isAuthenticated,
		role,
		hasPageHistory,
		onFetchNotices,
		onClickFetchNoticesMoreButton,
		onClearNotices
	} = useNotices();

	useEffect(() => {
		if (!hasPageHistory) {
			onFetchNotices();
		}
	}, [hasPageHistory, onFetchNotices]);

	useEffect(
		() => () => {
			onClearNotices();
		},
		[onClearNotices]
	);

	return (
		<>
			<Head>
				<meta charSet={'utf-8'} />
				<meta httpEquiv={'content-language'} content={'ko'} />
				<meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'} />
				<meta name={'author'} content={'개념글 저장소'} />
				<meta name={'title'} content={'새로운 소식 : 개념글 저장소'} />
				<meta name={'description'} content={'개념글 저장소의 새로운 소식을 확인해보세요!'} />
				<meta property={'og:title'} content={'새로운 소식 : 개념글 저장소'} />
				<meta property={'og:description'} content={'개념글 저장소의 새로운 소식을 확인해보세요!'} />
				<meta property={'og:type'} content={'website'} />
				<meta property={'og:image'} content={'/logo.png'} />
				<meta property={'og:url'} content={'https://www.cocstorage.com/notices'} />
				<meta property={'og:site_name'} content={'새로운 소식 : 개념글 저장소'} />
				<meta property={'og:locale'} content={'ko_KR'} />
				<meta property={'twitter:title'} content={'새로운 소식 : 개념글 저장소'} />
				<meta property={'twitter:description'} content={'개념글 저장소의 새로운 소식을 확인해보세요!'} />
				<meta property={'twitter:image'} content={'/logo.png'} />
				<meta property={'twitter:url'} content={'https://www.cocstorage.com/notices'} />
				<meta property={'twitter:card'} content={'summary'} />
				<meta name={'apple-mobile-web-app-title'} content={'새로운 소식 : 개념글 저장소'} />
				<title>{'새로운 소식 : 개념글 저장소'}</title>
				<link rel={'canonical'} href={'https://www.cocstorage.com/notices'} />
				<link rel={'shortcut icon'} href={'/favicon.ico'} />
				<link rel={'apple-touch-icon'} href={'/logo.png'} />
				<link rel={'manifest'} href={'/manifest.json'} />
			</Head>
			<NoticeHeader />
			<Container className={classes.container}>
				<NoticeGridList />
				{!isLastPage && (
					<Grow in>
						<Box className={classes.buttonBox}>
							<Button
								className={classes.moreButton}
								fullWidth
								startIcon={pending ? '' : <ExpandMoreIcon />}
								size={'large'}
								onClick={onClickFetchNoticesMoreButton}
							>
								{pending ? <CircularProgress size={30} /> : '더 보기'}
							</Button>
						</Box>
					</Grow>
				)}
			</Container>
			{isAuthenticated && role === 'admin' && (
				<Container className={classes.adminContainer}>
					<Box pb={2} textAlign={'right'}>
						<Button
							className={classes.button}
							variant={'contained'}
							color={'primary'}
							startIcon={<CreateIcon className={classes.icon} />}
							size={'large'}
						>
							<Link href={'/notices/write'} as={'/notices/write'}>
								{'새로운 소식 등록'}
							</Link>
						</Button>
					</Box>
				</Container>
			)}
		</>
	);
}

export default Notices;
