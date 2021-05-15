import React, { useEffect, useMemo } from 'react';
import { AppProps } from 'next/app';
import { useDispatch, useSelector } from 'react-redux';

// Material UI
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { lightTheme, darkTheme } from 'theme';

// Modules
import { setUserAuthentication, setPaletteType } from 'modules/common';
import wrapper from 'modules/store';

// Components
import Layout from 'components/common/Layout';
import { RootState } from 'modules';

function App({ Component, pageProps }: AppProps | any) {
	const dispatch = useDispatch();
	const paletteType = useSelector((state: RootState) => state.common.paletteType);

	const customTheme = useMemo(() => {
		if (paletteType === 'dark') {
			return darkTheme;
		}
		return lightTheme;
	}, [paletteType]);

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
	}, []);

	useEffect(() => {
		dispatch(setUserAuthentication());
		dispatch(setPaletteType());
	}, [dispatch]);

	return (
		<ThemeProvider theme={customTheme}>
			<CssBaseline />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ThemeProvider>
	);
}

export default wrapper.withRedux(App);
