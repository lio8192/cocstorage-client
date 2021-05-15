import React, { useEffect, memo } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Material UI
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			minHeight: 100,
			margin: 'auto',
			textAlign: 'center',
			backgroundColor: theme.palette.type === 'light' ? '#E5EDF8' : theme.palette.background.paper,
			backgroundImage: 'url("https://static.cocstorage.com/images/ad_icon.png")',
			backgroundSize: 80,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center center',
			'& ins': {
				marginLeft: '0 !important'
			}
		}
	})
);

type GoogleAdSenseProps = {
	html: string;
};

function GoogleAdSense({ html }: GoogleAdSenseProps) {
	const classes = useStyles();

	useEffect(() => {
		if (html) {
			((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
		}
	}, [html]);

	return <Box className={classes.root} dangerouslySetInnerHTML={{ __html: html }} />;
}

export default memo(GoogleAdSense);
