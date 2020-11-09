import React, { useEffect } from 'react';
import { NextPageContext } from 'next';
import Head from 'next/head';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';

// Material UI
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';

// Components
import BoardHeader from 'components/storages/board/BoardHeader';
import EditForm from 'components/storages/board/edit/EditForm';

// Modules
import { fetchStorageDetail } from 'modules/storages/board';
import { fetchStorageDetailAndStorageBoardDetail } from 'modules/storages/board/detail';

// Custom Hooks
import useStorageBoardEdit from 'hooks/storages/board/edit/useStorageBoardEdit';

const useStyles = makeStyles(() =>
	createStyles({
		linearProgress: {
			position: 'fixed',
			width: '100%',
			top: 0,
			height: 5,
			zIndex: 10000
		}
	})
);

function StorageBoardEdit() {
	const classes = useStyles();
	const theme = useTheme();
	const {
		storage,
		detail: { isMember },
		manage: { pending },
		onFetchStorageBoardEditDetail,
		onClearNonMemberStorageBoardAuthenticated
	} = useStorageBoardEdit();

	useEffect(() => {
		if (isMember) {
			onFetchStorageBoardEditDetail();
		}
	}, [isMember, onFetchStorageBoardEditDetail]);

	useEffect(
		() => () => {
			onClearNonMemberStorageBoardAuthenticated();
		},
		[onClearNonMemberStorageBoardAuthenticated]
	);

	return (
		<>
			<Head>
				<meta charSet={'utf-8'} />
				<meta httpEquiv={'content-language'} content={'ko'} />
				<meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'} />
				<meta name={'author'} content={storage.user ? storage.user.nickname : '개념글 저장소'} />
				<meta name={'title'} content={storage.name ? `${storage.name} 저장소 : 개념글 저장소` : '개념글 저장소'} />
				<meta name={'description'} content={storage.description} />
				<meta
					property={'og:title'}
					content={storage.name ? `${storage.name} 저장소 : 개념글 저장소` : '개념글 저장소'}
				/>
				<meta property={'og:description'} content={storage.description} />
				<meta property={'og:type'} content={'website'} />
				<meta property={'og:image'} content={storage.avatarUrl || 'https://static.cocstorage.com/images/icon.png'} />
				<meta
					property={'og:url'}
					content={
						storage.path ? `https://www.cocstorage.com/storages/${storage.path}` : 'https://www.cocstorage.com/storages'
					}
				/>
				<meta
					property={'og:site_name'}
					content={storage.name ? `${storage.name} 저장소 : 개념글 저장소` : '개념글 저장소'}
				/>
				<meta property={'og:locale'} content={'ko_KR'} />
				<meta
					property={'twitter:title'}
					content={storage.name ? `${storage.name} 저장소 : 개념글 저장소` : '개념글 저장소'}
				/>
				<meta property={'twitter:description'} content={storage.description} />
				<meta
					property={'twitter:image'}
					content={storage.avatarUrl || 'https://static.cocstorage.com/images/icon.png'}
				/>
				<meta
					property={'twitter:url'}
					content={
						storage.path ? `https://www.cocstorage.com/storages/${storage.path}` : 'https://www.cocstorage.com/storages'
					}
				/>
				<meta property={'twitter:card'} content={'summary'} />
				<meta
					name={'apple-mobile-web-app-title'}
					content={storage.name ? `${storage.name} 저장소 : 개념글 저장소` : '개념글 저장소'}
				/>
				<meta name={'theme-color'} content={theme.palette.primary.main} />
				<title>{storage.name ? `${storage.name} 저장소 : 개념글 저장소` : '개념글 저장소'}</title>
				<link
					rel={'canonical'}
					href={
						storage.path ? `https://www.cocstorage.com/storages/${storage.path}` : 'https://www.cocstorage.com/storages'
					}
				/>
				<link rel={'shortcut icon'} href={storage.avatarUrl || 'https://static.cocstorage.com/images/favicon.ico'} />
				<link rel={'apple-touch-icon'} href={storage.avatarUrl || 'https://static.cocstorage.com/images/icon.png'} />
				<link rel={'manifest'} href={'/manifest.json'} />
				<script async src={'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'} />
			</Head>
			<Fade in={pending}>
				<LinearProgress className={classes.linearProgress} color={'primary'} />
			</Fade>
			<BoardHeader />
			<EditForm />
		</>
	);
}

StorageBoardEdit.getInitialProps = async ({ req, store, query }: NextPageContext) => {
	const {
		storageBoard: { storage }
	} = store.getState();

	const isServerSide = req && true;

	if (isServerSide) {
		store.dispatch(fetchStorageDetailAndStorageBoardDetail({ storageId: String(query.path), id: Number(query.id) }));
	} else if (!storage.id) {
		store.dispatch(fetchStorageDetail(String(query.path)));
	}

	return {};
};

export default StorageBoardEdit;
