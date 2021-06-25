import React, { useEffect } from 'react';
import Head from 'next/head';
import {
	createStyles, makeStyles, Theme, useTheme
} from '@material-ui/core/styles';

// Material UI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import Pagination from '@material-ui/lab/Pagination';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Material UI Labs
import Skeleton from '@material-ui/lab/Skeleton';

// Modules
import { fetchNoticeDetail } from 'modules/notices/detail';
import wrapper from 'modules/store';
import { END } from 'redux-saga';

// Components
import DetailContent from 'components/notices/detail/DetailContent';
import DetailCommentList from 'components/notices/detail/DetailCommentList';
import DetailCommentWriteForm from 'components/notices/detail/DetailCommentWriteForm';
import PasswordAuthDialog from 'components/common/PasswordAuthDialog';

// Custom Hooks
import useNoticeDetail from 'hooks/notices/detail/useNoticeDetail';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			[theme.breakpoints.down('md')]: {
				padding: 0
			}
		},
		grid: {
			borderRight: '1px solid rgba(0, 0, 0, 0.23)',
			[theme.breakpoints.down('md')]: {
				borderColor: theme.palette.grey['50']
			}
		},
		pagination: {
			padding: theme.spacing(2),
			'& > ul': {
				justifyContent: 'center',
				'& *': {
					color: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.5)' : ''
				},
				'& .Mui-selected': {
					color: 'white'
				}
			}
		},
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			color: '#fff'
		}
	})
);

function NoticeDetail() {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const {
		detail: {
			id: noticeId, user, subject, description, thumbnailUrl
		},
		comments: { pending, pagination },
		manage: {
			pending: deleteAuthPending,
			deleteAuth: { open: deleteAuthDialogOpen, subTitle }
		},
		deleteAuthDialogBody,
		showPassword,
		onShowDeleteAuthDialogPassword,
		onPutNoticeDetailViewCount,
		onFetchNoticeDetailComments,
		onHandleNoticeDetailCommentsPagination,
		onHandleDeleteAuthDialog,
		onHandleDeleteAuthDialogTextField,
		onDeleteNonMemberNoticeDetail
	} = useNoticeDetail();

	useEffect(() => {
		if (noticeId !== 0) {
			onPutNoticeDetailViewCount();
			onFetchNoticeDetailComments();
		}
	}, [noticeId, onPutNoticeDetailViewCount, onFetchNoticeDetailComments]);

	return (
		<>
			<Head>
				<meta charSet={'utf-8'} />
				<meta name={'viewport'} content={'minimum-scale=1, initial-scale=1, width=device-width'} />
				<meta httpEquiv={'content-language'} content={'ko'} />
				<meta httpEquiv={'X-UA-Compatible'} content={'IE=선edge'} />
				<meta name={'author'} content={user.nickname} />
				<meta name={'title'} content={subject ? `${subject} : 개념글 저장소` : '개념글 저장소'} />
				<meta name={'description'} content={description ? description.substr(9, 159) : ''} />
				<meta property={'og:title'} content={subject ? `${subject} : 개념글 저장소` : '개념글 저장소'} />
				<meta property={'og:description'} content={description ? description.substr(9, 159) : ''} />
				<meta property={'og:type'} content={'website'} />
				<meta property={'og:image'} content={thumbnailUrl || 'https://static.cocstorage.com/images/icon.png'} />
				<meta property={'og:url'} content={`https://www.cocstorage.com/notices/${noticeId}`} />
				<meta property={'og:site_name'} content={'새로운 소식 : 개념글 저장소'} />
				<meta property={'og:locale'} content={'ko_KR'} />
				<meta property={'twitter:title'} content={subject ? `${subject} : 개념글 저장소` : '개념글 저장소'} />
				<meta property={'twitter:description'} content={description ? description.substr(9, 159) : ''} />
				<meta property={'twitter:image'} content={thumbnailUrl || 'https://static.cocstorage.com/images/icon.png'} />
				<meta property={'twitter:url'} content={`https://www.cocstorage.com/notices/${noticeId}`} />
				<meta property={'twitter:card'} content={'summary'} />
				<meta name={'apple-mobile-web-app-title'} content={subject ? `${subject} : 개념글 저장소` : '개념글 저장소'} />
				<meta name={'theme-color'} content={theme.palette.primary.main} />
				<title>{subject ? `${subject} : 개념글 저장소` : '개념글 저장소'}</title>
				<link rel={'canonical'} href={`https://www.cocstorage.com/notices/${noticeId}`} />
				<link rel={'shortcut icon'} href={'https://static.cocstorage.com/images/favicon.ico'} />
				<link rel={'apple-touch-icon'} href={'https://static.cocstorage.com/images/icon.png'} />
				<link rel={'manifest'} href={'/manifest.json'} />
			</Head>
			<Container className={classes.root}>
				<Grid container>
					<Grid item xs={12}>
						<DetailContent />
						<DetailCommentList />
						{pending && (
							<Box display={'flex'} justifyContent={'center'} p={2} pt={1.5}>
								<Box ml={1}>
									<Skeleton width={30} height={40} animation={'wave'} />
								</Box>
								<Box ml={1}>
									<Skeleton width={30} height={40} animation={'wave'} />
								</Box>
								<Box ml={1}>
									<Skeleton width={30} height={40} animation={'wave'} />
								</Box>
								<Box ml={1}>
									<Skeleton width={30} height={40} animation={'wave'} />
								</Box>
								<Box ml={1}>
									<Skeleton width={30} height={40} animation={'wave'} />
								</Box>
							</Box>
						)}
						{!pending && pagination.totalPages > 0 && (
							<Pagination
								className={classes.pagination}
								page={pagination.currentPage}
								count={pagination.totalPages}
								color={'primary'}
								shape={'rounded'}
								onChange={onHandleNoticeDetailCommentsPagination}
								size={isMobile ? 'small' : 'medium'}
								siblingCount={isMobile ? 1 : 2}
							/>
						)}
						<Hidden mdDown>{!pending && pagination.totalPages === 0 && <Box mt={2} mb={2} />}</Hidden>
						<DetailCommentWriteForm />
					</Grid>
				</Grid>
			</Container>
			<PasswordAuthDialog
				open={deleteAuthDialogOpen}
				pending={deleteAuthPending}
				subTitle={subTitle}
				passwordAuthDialogBody={deleteAuthDialogBody}
				showPassword={showPassword}
				onShowPasswordAuthDialogPassword={onShowDeleteAuthDialogPassword}
				onHandlePasswordAuthDialogTextField={onHandleDeleteAuthDialogTextField}
				onHandlePasswordAuthDialog={onHandleDeleteAuthDialog}
				onRequestPasswordAuth={onDeleteNonMemberNoticeDetail}
			/>
		</>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, query }) => {
	store.dispatch(fetchNoticeDetail(Number(query.id || 0)));

	store.dispatch(END);
	await (store as any).sagaTask.toPromise();

	return {
		props: {}
	};
});

export default NoticeDetail;
