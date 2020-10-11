import React, { memo } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

// Material UI
import Toolbar from '@material-ui/core/Toolbar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Paper from '@material-ui/core/Paper';

// Material UI Icons
import StorageIcon from '@material-ui/icons/Storage';
import InboxIcon from '@material-ui/icons/Inbox';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			position: 'fixed',
			width: '100%',
			bottom: 0,
			backgroundColor: 'white',
			zIndex: 100
		},
		bottomNavigation: {
			'& .Mui-selected': {
				fontWeight: 700
			}
		},
		toolbar: {
			minHeight: 56
		}
	})
);

function MobileBottomNavigation() {
	const classes = useStyles();
	return (
		<>
			<Paper className={classes.root} square elevation={3}>
				<BottomNavigation
					className={classes.bottomNavigation}
					value={0}
					onChange={() => console.log('onChange')}
					showLabels
				>
					<BottomNavigationAction label={'새 저장소'} icon={<StorageIcon />} />
					<BottomNavigationAction label={'이전 저장소'} icon={<InboxIcon />} />
					<BottomNavigationAction label={'마이페이지'} icon={<PersonIcon />} />
				</BottomNavigation>
			</Paper>
			<Toolbar className={classes.toolbar} />
		</>
	);
}

export default memo(MobileBottomNavigation);
