import React, { useEffect } from 'react';
import Head from 'next/head';
import { makeStyles, createStyles } from '@material-ui/core/styles';

// Material UI
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';
import Hidden from '@material-ui/core/Hidden';

// Components
import BoardHeader from 'components/storages/board/BoardHeader';
import WriteForm from 'components/storages/board/write/WriteForm';

// Modules
import { fetchStorageDetail } from 'modules/storages/board';
import wrapper from 'modules/store';
import { END } from 'redux-saga';

// Custom Hooks
import useStorageBoardWrite from 'hooks/storages/board/write/useStorageBoardWrite';

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

function StorageBoardWrite() {
	const classes = useStyles();
	const {
		storage,
		manage: { pending },
		isAuthenticated,
		onPostStorageBoardDraft,
		onPostNonMemberStorageBoardDraft
	} = useStorageBoardWrite();

	useEffect(() => {
		if (isAuthenticated) {
			onPostStorageBoardDraft();
		} else {
			onPostNonMemberStorageBoardDraft();
		}
	}, [isAuthenticated, onPostStorageBoardDraft, onPostNonMemberStorageBoardDraft]);

	return (
		<>
			<Head>
				<meta charSet={'utf-8'} />
				<meta name={'viewport'} content={'minimum-scale=1, initial-scale=1, width=device-width'} />
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
			<Hidden mdDown>
				<BoardHeader />
			</Hidden>
			<WriteForm />
		</>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, query }) => {
	const {
		storageBoard: { storage }
	} = store.getState();

	if (!storage.id) {
		store.dispatch(fetchStorageDetail(String(query.path)));
	}

	store.dispatch(END);
	await (store as any).sagaTask.toPromise();

	return {
		props: {}
	};
});

export default StorageBoardWrite;
