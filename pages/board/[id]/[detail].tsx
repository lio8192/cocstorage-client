import React, { useEffect } from 'react';
import {
	createStyles, makeStyles, Theme, useTheme
} from '@material-ui/core/styles';
import { NextPageContext } from 'next';
import Head from 'next/head';

// Material UI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Modules
import { fetchBoardDetail } from 'modules/boardDetail';

// Components
import DetailContent from 'components/boardDetail/DetailContent';
import SideBox from 'components/boardDetail/SideBox';
import CommentList from 'components/boardDetail/CommentList';
import GoogleAdSense from 'components/common/GoogleAdSense';

// Custom Hooks
import useBoardDetail from 'hooks/useBoardDetail';

// Snippets
import { getCategoryNameByCategoryId } from 'snippets/board';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			backgroundColor: 'white',
			[theme.breakpoints.down('md')]: {
				padding: 0
			}
		},
		adBox: {
			textAlign: 'center',
			borderTop: `1px solid ${theme.palette.grey['50']}`,
			borderBottom: `1px solid ${theme.palette.grey['50']}`
		}
	})
);

function getMetaTagTitle(data: any, id: any) {
	return data.subject
		? `${data.subject} : ${getCategoryNameByCategoryId(id)} 저장소`
		: `${getCategoryNameByCategoryId(id)} 저장소`;
}

function Detail({ query }: NextPageContext) {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const {
		board: { data, pending },
		comment: { data: commentList, pending: commentPending, count: commentCount },
		recommend: { data: alertMessage, pending: backdropOpen, errorMessage },
		row,
		thumbsSnackBarOpen,
		errorThumbsSnackBarOpen,
		disabledRecommend,
		onHandleBoardDetailRecommend,
		onHandleCloseSnackBar,
		onHandleExitedSnackBar,
		onClearGoogleAdSenseLimit,
		onHandleCommentRow
	} = useBoardDetail();

	useEffect(() => {
		onClearGoogleAdSenseLimit();
	}, [onClearGoogleAdSenseLimit]);

	return (
		<>
			<Head>
				<meta charSet={'utf-8'} />
				<meta httpEquiv={'content-language'} content={'ko'} />
				<meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'} />
				<meta name={'author'} content={`${data.nickname}`} />
				<meta name={'title'} content={getMetaTagTitle(data, query.id)} />
				<meta name={'description'} content={`${data.description}`} />
				<meta property={'og:title'} content={getMetaTagTitle(data, query.id)} />
				<meta property={'og:description'} content={`${data.description}`} />
				<meta property={'og:type'} content={'website'} />
				<meta property={'og:image'} content={data && data.image ? data.image : '/logo.png'} />
				<meta property={'og:url'} content={`https://www.cocstorage.com/board/${query.id}/${query.detail}`} />
				<meta property={'og:site_name'} content={getMetaTagTitle(data, query.id)} />
				<meta property={'og:locale'} content={'ko_KR'} />
				<meta property={'twitter:title'} content={getMetaTagTitle(data, query.id)} />
				<meta property={'twitter:description'} content={`${data.description}`} />
				<meta property={'twitter:image'} content={data && data.image ? data.image : '/logo.png'} />
				<meta property={'twitter:url'} content={`https://www.cocstorage.com/board/${query.id}/${query.detail}`} />
				<meta property={'twitter:card'} content={'summary'} />
				<meta name={'apple-mobile-web-app-title'} content={getMetaTagTitle(data, query.id)} />
				<title>{getMetaTagTitle(data, query.id)}</title>
				<link rel={'canonical'} href={`https://www.cocstorage.com/board/${query.id}/${query.detail}`} />
				<link rel={'shortcut icon'} href={'/favicon.ico'} />
				<link rel={'apple-touch-icon'} href={'/logo_prev.png'} />
				<link rel={'manifest'} href={'/manifest.json'} />
				<script async src={'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'} />
			</Head>
			<Container className={classes.root} maxWidth={isMobile ? 'md' : 'lg'}>
				<Grid container>
					<Grid item xs={12} sm={12} md={12} lg={9}>
						<DetailContent
							board={{ data, pending }}
							commentCount={commentCount}
							recommend={{ data: alertMessage, pending: backdropOpen, errorMessage }}
							thumbsSnackBarOpen={thumbsSnackBarOpen}
							disabledRecommend={disabledRecommend}
							errorThumbsSnackBarOpen={errorThumbsSnackBarOpen}
							onHandleBoardDetailRecommend={onHandleBoardDetailRecommend}
							onHandleCloseSnackBar={onHandleCloseSnackBar}
							onHandleExitedSnackBar={onHandleExitedSnackBar}
						/>
						<Hidden mdUp>
							<Box className={classes.adBox}>
								<GoogleAdSense
									html={
										'<ins class="adsbygoogle"'
										+ 'style="display:block"'
										+ 'data-ad-client="ca-pub-5809905264951057"'
										+ 'data-ad-slot="8033291397"'
										+ 'data-ad-format="auto"'
										+ 'data-full-width-responsive="true"></ins>'
									}
								/>
							</Box>
						</Hidden>
						<CommentList
							data={commentList}
							pending={commentPending}
							count={commentCount}
							row={row}
							onHandleCommentRow={onHandleCommentRow}
						/>
					</Grid>
					<Grid item xs={12} md={12} lg={3}>
						<Hidden smDown>
							<SideBox />
						</Hidden>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

Detail.getInitialProps = async ({ store, query }: NextPageContext) => {
	const payload = {
		id: Number(query.detail),
		categoryId: query.id
	};

	store.dispatch(fetchBoardDetail(payload));

	return {
		query
	};
};

export default Detail;
