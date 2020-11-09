import React, { memo } from 'react';
import Head from 'next/head';
import { useTheme } from '@material-ui/core/styles';

// Components
import DataEmptyBox from 'components/common/DataEmptyBox';

function Error404() {
	const theme = useTheme();
	return (
		<>
			<Head>
				<meta charSet={'utf-8'} />
				<meta name={'viewport'} content={'minimum-scale=1, initial-scale=1, width=device-width'} />
				<meta httpEquiv={'content-language'} content={'ko'} />
				<meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'} />
				<meta name={'author'} content={'개념글 저장소'} />
				<meta name={'title'} content={'404 Page Not Found : 개념글 저장소'} />
				<meta name={'description'} content={'404 Page Not Found'} />
				<meta property={'og:title'} content={'404 Page Not Found : 개념글 저장소'} />
				<meta property={'og:description'} content={'404 Page Not Found'} />
				<meta property={'og:type'} content={'website'} />
				<meta property={'og:image'} content={'https://static.cocstorage.com/images/icon.png'} />
				<meta property={'og:site_name'} content={'404 Page Not Found : 개념글 저장소'} />
				<meta property={'og:locale'} content={'ko_KR'} />
				<meta property={'twitter:title'} content={'404 Page Not Found : 개념글 저장소'} />
				<meta property={'twitter:description'} content={'404 Page Not Found'} />
				<meta property={'twitter:image'} content={'https://static.cocstorage.com/images/icon.png'} />
				<meta property={'twitter:card'} content={'summary'} />
				<meta name={'apple-mobile-web-app-title'} content={'404 Page Not Found'} />
				<meta name={'theme-color'} content={theme.palette.primary.main} />
				<title>{'404 Page Not Found : 개념글 저장소'}</title>
				<link rel={'shortcut icon'} href={'https://static.cocstorage.com/images/favicon.ico'} />
				<link rel={'apple-touch-icon'} href={'https://static.cocstorage.com/images/icon.png'} />
				<link rel={'manifest'} href={'/manifest.json'} />
			</Head>
			<DataEmptyBox message={'페이지를 찾을 수 없습니다.'} paddingTop={50} paddingBottom={50} />
		</>
	);
}

export default memo(Error404);
