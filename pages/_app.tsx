import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { useDispatch } from 'react-redux';

// Material UI
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from 'theme';

// Modules
import { setUserAuthentication } from 'modules/common';
import wrapper from 'modules/store';

// Global SCSS
import 'styles/index.scss';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

// Components
import Layout from 'components/common/Layout';

function App({ Component, pageProps }: AppProps | any) {
	const dispatch = useDispatch();
	useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles && jssStyles.parentElement) {
			jssStyles.parentElement.removeChild(jssStyles);
		}

		const welcomeConsoleLogTitleStyle: string = [
			'padding: 20px 0',
			'font-size: 60px',
			'font-weight: 700',
			'font-family: NanumSquareRound',
			'color: #8EC5FC'
		].join(';');
		const welcomeConsoleLogSubTitleStyle: string = [
			'padding: 10px 20px',
			'font-size: 14px',
			'font-weight: 500',
			'font-family: NanumSquareRound',
			'color: rgba(0, 0, 0, .5)'
		].join(';');
		console.log('%c 개념글 저장소', welcomeConsoleLogTitleStyle);
		console.log('%c ⓒ 개념글 저장소 All Rights Reserved.', welcomeConsoleLogSubTitleStyle);
		dispatch(setUserAuthentication());
	}, [dispatch]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ThemeProvider>
	);
}

export default wrapper.withRedux(App);
