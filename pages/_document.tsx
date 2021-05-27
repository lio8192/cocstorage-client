import React from 'react';
import Document, {
	Html, Head, Main, NextScript, DocumentContext
} from 'next/document';

// Material UI
import { ServerStyleSheets } from '@material-ui/core/styles';

export default class CustomDocument extends Document {
	render() {
		return (
			<Html lang={'ko'}>
				<Head>
					<script async src={'https://www.googletagmanager.com/gtag/js?id=G-20GMQTM36F'} />
					<script
						/* eslint-disable-next-line react/no-danger */
						dangerouslySetInnerHTML={{
							__html:
								'window.dataLayer = window.dataLayer || [];\n'
								+ '  function gtag(){dataLayer.push(arguments);}\n'
								+ '  gtag(\'js\', new Date());\n'
								+ '  gtag(\'config\', \'G-20GMQTM36F\');'
						}}
					/>
					<script async src={'https://www.googletagmanager.com/gtag/js?id=AW-468039660'} />
					<script
						/* eslint-disable-next-line react/no-danger */
						dangerouslySetInnerHTML={{
							__html:
								'  window.dataLayer = window.dataLayer || [];\n'
								+ '  function gtag(){dataLayer.push(arguments);}\n'
								+ '  gtag(\'js\', new Date());\n'
								+ '\n'
								+ '  gtag(\'config\', \'AW-468039660\');'
						}}
					/>
					<script
						/* eslint-disable-next-line react/no-danger */
						dangerouslySetInnerHTML={{
							__html: 'gtag(\'event\', \'conversion\', {\'send_to\': \'AW-468039660/XCKkCKfk3acCEOzvlt8B\'});'
						}}
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

CustomDocument.getInitialProps = async (ctx: DocumentContext) => {
	// Render app and page and get the context of the page with collected side effects.
	const sheets = new ServerStyleSheets();
	const originalRenderPage = ctx.renderPage;

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
		});

	const initialProps = await Document.getInitialProps(ctx);

	return {
		...initialProps,
		// Styles fragment is rendered after the app and page rendering finish.
		styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
	};
};
