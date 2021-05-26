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
			backgroundColor: theme.palette.background.paper
		},
		rootBorderRadius: {
			borderRadius: 4,
			overflow: 'hidden'
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
	marginTop?: number;
	marginBottom?: number;
	paddingTop?: number;
	paddingBottom?: number;
	minHeight?: number;
	maxHeight?: number;
	borderRadius?: number;
};

function DataEmptyBox({
	message,
	marginTop,
	marginBottom,
	paddingTop,
	paddingBottom,
	minHeight,
	maxHeight,
	borderRadius
}: DataEmptyBoxProps) {
	const classes = useStyles();
	return (
		<Box
			className={classes.root}
			mt={marginTop || 0}
			mb={marginBottom || 0}
			pt={paddingTop || 20}
			pb={paddingBottom || 20}
			borderRadius={borderRadius || 'inherit'}
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
