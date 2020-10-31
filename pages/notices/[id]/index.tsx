import React, { useEffect } from 'react';
import { NextPageContext } from 'next';
import Head from 'next/head';
import {
	createStyles, makeStyles, Theme, useTheme
} from '@material-ui/core/styles';

// Material UI
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Modules
import { fetchNoticeDetail } from 'modules/notices/detail';

// Components
import DetailContent from 'components/notices/detail/DetailContent';
import DetailCommentList from 'components/notices/detail/DetailCommentList';
import DetailCommentWriteForm from 'components/notices/detail/DetailCommentWriteForm';
import DeleteAuthDialog from 'components/common/DeleteAuthDialog';

// Custom Hooks
import useNoticeDetail from 'hooks/notices/detail/useNoticeDetail';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			backgroundColor: 'white',
			[theme.breakpoints.down('md')]: {
				padding: 0
			}
		},
		grid: {
			borderRight: '1px solid rgba(0, 0, 0, 0.23)',
			[theme.breakpoints.down('md')]: {
				borderColor: '#EAEAEA'
			}
		},
		pagination: {
			padding: theme.spacing(2),
			'& > ul': {
				justifyContent: 'center',
				'& *': {
					color: 'rgba(0, 0, 0, 0.5)'
				},
				'& .Mui-selected': {
					color: 'white'
				}
			}
		},
		linearProgress: {
			position: 'fixed',
			width: '100%',
			top: 0,
			height: 5,
			zIndex: 10000
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
		pending,
		detail: {
			id: noticeId, user, subject, description, thumbnailUrl
		},
		comments: {
			pagination,
			pending: commentPending,
			manage: { pending: commentManagePending }
		},
		replies: {
			manage: { pending: replyManagePending }
		},
		manage: {
			pending: deleteAuthPending,
			deleteAuth: { open: deleteAuthDialogOpen, subTitle }
		},
		deleteAuthDialogBody,
		showPassword,
		onShowDeleteAuthDialogPassword,
		onFetchNoticeDetailComments,
		onHandleNoticeDetailCommentsPagination,
		onHandleDeleteAuthDialog,
		onHandleDeleteAuthDialogTextField,
		onDeleteNonMemberNoticeDetail
	} = useNoticeDetail();

	useEffect(() => {
		if (noticeId !== 0) {
			onFetchNoticeDetailComments();
		}
	}, [noticeId, onFetchNoticeDetailComments]);

	return (
		<>
			<Head>
				<meta charSet={'utf-8'} />
				<meta httpEquiv={'content-language'} content={'ko'} />
				<meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'} />
				<meta name={'author'} content={user.nickname} />
				<meta name={'title'} content={subject ? `${subject} : 개념글 저장소` : '개념글 저장소'} />
				<meta name={'description'} content={description} />
				<meta property={'og:title'} content={subject ? `${subject} : 개념글 저장소` : '개념글 저장소'} />
				<meta property={'og:description'} content={description} />
				<meta property={'og:type'} content={'website'} />
				<meta property={'og:image'} content={thumbnailUrl || '/logo.png'} />
				<meta property={'og:url'} content={`https://www.cocstorage.com/notices/${noticeId}`} />
				<meta property={'og:site_name'} content={'새로운 소식 : 개념글 저장소'} />
				<meta property={'og:locale'} content={'ko_KR'} />
				<meta property={'twitter:title'} content={subject ? `${subject} : 개념글 저장소` : '개념글 저장소'} />
				<meta property={'twitter:description'} content={description} />
				<meta property={'twitter:image'} content={thumbnailUrl || '/logo.png'} />
				<meta property={'twitter:url'} content={`https://www.cocstorage.com/notices/${noticeId}`} />
				<meta property={'twitter:card'} content={'summary'} />
				<meta name={'apple-mobile-web-app-title'} content={subject ? `${subject} : 개념글 저장소` : '개념글 저장소'} />
				<title>{subject ? `${subject} : 개념글 저장소` : '개념글 저장소'}</title>
				<link rel={'canonical'} href={`https://www.cocstorage.com/notices/${noticeId}`} />
				<link rel={'shortcut icon'} href={'/favicon.ico'} />
				<link rel={'apple-touch-icon'} href={'/logo.png'} />
				<link rel={'manifest'} href={'/manifest.json'} />
			</Head>
			<Fade in={pending || commentPending || commentManagePending || replyManagePending}>
				<LinearProgress className={classes.linearProgress} color={'primary'} />
			</Fade>
			<Container className={classes.root} maxWidth={isMobile ? 'md' : 'lg'}>
				<Grid container>
					<Grid item xs={12}>
						<DetailContent />
						<DetailCommentWriteForm />
						<DetailCommentList />
						{pagination.totalPages > 0 && (
							<Pagination
								className={classes.pagination}
								page={pagination.currentPage}
								count={pagination.totalPages}
								color={'primary'}
								shape={'rounded'}
								onChange={onHandleNoticeDetailCommentsPagination}
								size={isMobile ? 'small' : 'medium'}
								siblingCount={isMobile ? 0 : 2}
							/>
						)}
					</Grid>
				</Grid>
			</Container>
			<DeleteAuthDialog
				open={deleteAuthDialogOpen}
				pending={deleteAuthPending}
				subTitle={subTitle}
				deleteAuthDialogBody={deleteAuthDialogBody}
				showPassword={showPassword}
				onShowAuthenticationDialogPassword={onShowDeleteAuthDialogPassword}
				onHandleDeleteAuthDialogTextField={onHandleDeleteAuthDialogTextField}
				onHandleDeleteAuthDialog={onHandleDeleteAuthDialog}
				onDeleteData={onDeleteNonMemberNoticeDetail}
			/>
		</>
	);
}

NoticeDetail.getInitialProps = async ({ store, query }: NextPageContext) => {
	store.dispatch(fetchNoticeDetail(Number(query.id || 0)));

	return {};
};

export default NoticeDetail;
