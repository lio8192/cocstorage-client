import React, { memo } from 'react';
import Link from 'next/link';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// Material UI Components
import Box from '@material-ui/core/Box';

// Images
import NoticeImg from '../../../../public/notice.png';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			backgroundColor: 'white',
			cursor: 'pointer',
			'& a': {
				textDecoration: 'none',
				color: 'black',
				'&:hover': {
					textDecoration: 'none'
				}
			}
		},
		box: {
			display: 'flex',
			alignItems: 'center',
			width: '100%',
			border: `1px solid ${theme.palette.grey['50']}`,
			'& img': {
				width: '100%',
				maxWidth: 1080,
				margin: 'auto'
			},
			[theme.breakpoints.down('md')]: {
				border: 'none'
			}
		}
	})
);

function NoticeCard() {
	const classes = useStyles();

	return (
		<Box className={classes.root}>
			<Link href={'/notice'} as={'/notice'}>
				<a>
					<Box className={classes.box}>
						<img src={NoticeImg} alt={'Notice Img'} />
					</Box>
				</a>
			</Link>
		</Box>
	);
}

export default memo(NoticeCard);
