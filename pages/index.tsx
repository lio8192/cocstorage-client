import React, { useEffect } from 'react';
import { NextPageContext } from 'next';
import Head from 'next/head';

// Material UI Components
import Hidden from '@material-ui/core/Hidden';

// Modules
import { fetchNotices, fetchStorages } from 'modules/home';

// Components
import HomeNoticeGridList from 'components/home/HomeNoticeGridList';
import HomeStorageGridList from 'components/home/HomeStorageGridList';
import HomeBoardCardListSwiper from 'components/home/HomeBoardCardListSwiper';
import HomeBoardCardList from 'components/home/HomeBoardCardList';

// Custom Hooks
import useHome from 'hooks/home/useHome';

function Index() {
	const {
		previousState: { boardList, dailyPopularList, pending },
		onFetchMainContents
	} = useHome();

	useEffect(() => {
		onFetchMainContents();
	}, [onFetchMainContents]);

	return (
		<>
			<Head>
				<meta charSet={'utf-8'} />
				<meta httpEquiv={'content-language'} content={'ko'} />
				<meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'} />
				<meta name={'author'} content={'개념글 저장소'} />
				<meta name={'title'} content={'개념글 저장소'} />
				<meta name={'description'} content={'인기와 유머를 겸비한 게시글들을 한 눈에 확인해보세요!'} />
				<meta property={'og:title'} content={'개념글 저장소'} />
				<meta property={'og:description'} content={'인기와 유머를 겸비한 게시글들을 한 눈에 확인해보세요!'} />
				<meta property={'og:type'} content={'website'} />
				<meta property={'og:image'} content={'https://static.cocstorage.com/images/icon.png'} />
				<meta property={'og:url'} content={'https://www.cocstorage.com'} />
				<meta property={'og:site_name'} content={'개념글 저장소'} />
				<meta property={'og:locale'} content={'ko_KR'} />
				<meta property={'twitter:title'} content={'개념글 저장소'} />
				<meta property={'twitter:description'} content={'인기와 유머를 겸비한 게시글들을 한 눈에 확인해보세요!'} />
				<meta property={'twitter:image'} content={'https://static.cocstorage.com/images/icon.png'} />
				<meta property={'twitter:url'} content={'https://wwww.cocstorage.com'} />
				<meta property={'twitter:card'} content={'summary'} />
				<meta name={'apple-mobile-web-app-title'} content={'개념글 저장소'} />
				<title>{'개념글 저장소'}</title>
				<link rel={'shortcut icon'} href={'https://static.cocstorage.com/images/favicon.ico'} />
				<link rel={'apple-touch-icon'} href={'https://static.cocstorage.com/images/icon.png'} />
				<link rel={'canonical'} href={'https://www.cocstorage.com'} />
				<link rel={'manifest'} href={'/manifest.json'} />
			</Head>
			<HomeNoticeGridList />
			<HomeStorageGridList />
			<Hidden implementation={'css'} smDown>
				<HomeBoardCardListSwiper boardList={dailyPopularList} pending={pending} />
			</Hidden>
			<Hidden implementation={'css'} mdUp>
				<HomeBoardCardList title={'이전 저장소 일간 개념글'} boardList={dailyPopularList} pending={pending} />
			</Hidden>
			<HomeBoardCardList title={'이전 저장소 새로운 개념글'} boardList={boardList} pending={pending} />
		</>
	);
}

Index.getInitialProps = async ({ store }: NextPageContext) => {
	const {
		home: {
			notices: { pending: noticePending },
			storages: { pending: storagePending }
		}
	} = store.getState();

	if (!noticePending) {
		store.dispatch(fetchNotices());
	}

	if (!storagePending) {
		store.dispatch(fetchStorages());
	}

	return {
		store
	};
};

export default Index;
