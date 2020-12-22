import React, { memo } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Material UI Box
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

// Material UI Icons
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			backgroundColor: 'white'
		},
		avatar: {
			width: theme.spacing(7),
			height: theme.spacing(7),
			margin: 'auto',
			color: 'white',
			backgroundColor: theme.palette.primary.main
		},
		typography: {
			fontWeight: 700,
			color: theme.palette.action.active
		}
	})
);

type DataEmptyBoxProps = {
	message: string;
	paddingTop?: number;
	paddingBottom?: number;
	minHeight?: number;
	maxHeight?: number;
};

function DataEmptyBox({
	message, paddingTop, paddingBottom, minHeight, maxHeight
}: DataEmptyBoxProps) {
	const classes = useStyles();
	return (
		<Box
			className={classes.root}
			pt={paddingTop || 20}
			pb={paddingBottom || 20}
			maxHeight={maxHeight || 'auto'}
			minHeight={minHeight || 'auto'}
		>
			<Box textAlign={'center'}>
				<Avatar className={classes.avatar}>
					<FilterNoneIcon />
				</Avatar>
			</Box>
			<Box mt={2} textAlign={'center'}>
				<Typography className={classes.typography} variant={'h6'}>
					{message}
				</Typography>
			</Box>
		</Box>
	);
}

export default memo(DataEmptyBox);
