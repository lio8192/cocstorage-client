import React, { useEffect } from 'react';
import { AppContext, AppProps } from 'next/app';
import moment from 'moment';

// Redux
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Redux-Saga
import withReduxSaga from 'next-redux-saga';
import createSagaMiddleware from 'redux-saga';

// Material UI
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';

// RootReducer
import rootReducer from '../src/modules';

// RootSaga
import rootSaga from '../src/sagas';

// Global SCSS
import '../styles/index.scss';
import 'swiper/swiper.scss';
import '../styles/common/swiper.scss';

// Components
import Layout from '../src/components/common/Layout';

moment.locale('ko');

function App({ Component, pageProps, store }: AppProps | any) {
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
		const welcomeConsoleLogEasterEggStyle: string = [
			'padding: 10px 20px',
			'font-size: 14px',
			'font-weight: 500',
			'font-family: NanumSquareRound',
			'color: rgba(0, 0, 0, .5)'
		].join(';');
		console.log('%c 개념글 저장소', welcomeConsoleLogTitleStyle);
		console.log('%c ⓒ 개념글 저장소 All Rights Reserved.', welcomeConsoleLogSubTitleStyle);
		console.log(`%c 나만의 저장소 (D-${moment('2020-09-12').diff(moment('2020-08-07'), 'days')})`, welcomeConsoleLogEasterEggStyle);
	}, []);

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ThemeProvider>
		</Provider>
	);
}

App.getInitialProps = async ({ Component, ctx }: AppContext) => {
	const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

	return {
		pageProps
	};
};

const configureStore = (preloadedState: any) => {
	const sagaMiddleware = createSagaMiddleware();

	const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));
	const store = createStore(rootReducer, preloadedState, enhancer);
	(store as any).sagaTask = sagaMiddleware.run(rootSaga);

	return store;
};

export default withRedux(configureStore)(withReduxSaga(App));
