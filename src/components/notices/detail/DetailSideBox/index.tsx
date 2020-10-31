import React, { memo } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Material UI
import Box from '@material-ui/core/Box';

// Components
import GoogleAdSense from 'components/common/GoogleAdSense';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		box: {
			margin: theme.spacing(1, 0, 0, 1),
			border: `1px solid ${theme.palette.grey['50']}`,
			backgroundColor: 'white',
			[theme.breakpoints.down('md')]: {
				margin: 0
			}
		},
		adBox: {
			margin: theme.spacing(1, 0, 1, 1),
			[theme.breakpoints.down('md')]: {
				margin: 0
			}
		},
		link: {
			display: 'flex',
			alignItems: 'center',
			width: '100%'
		}
	})
);

function DetailSideBox() {
	const classes = useStyles();
	return (
		<Box position={'relative'}>
			<Box width={'100%'} maxWidth={308} position={'fixed'}>
				<Box className={classes.adBox}>
					<GoogleAdSense
						html={
							'<ins class="adsbygoogle"'
							+ 'style="display:block"'
							+ 'data-ad-client="ca-pub-5809905264951057"'
							+ 'data-ad-slot="7258431621"'
							+ 'data-ad-format="auto"'
							+ 'data-full-width-responsive="true"></ins>'
						}
					/>
				</Box>
			</Box>
		</Box>
	);
}

export default memo(DetailSideBox);
