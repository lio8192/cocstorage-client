import React from 'react';
import axios from 'axios';

// Modules
import wrapper from 'modules/store';

function RSS() {
	return <></>;
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ res }) => {
	const xml = await axios('http://localhost:3001/rss', {
		headers: {
			'X-Api-Key': process.env.X_API_KEY
		}
	});

	res.setHeader('Content-Type', 'text/xml');
	res.write(xml.data);
	res.end();

	return {
		props: {}
	};
});

export default RSS;
