import React, { memo } from 'react';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';

// Material UI
import Toolbar from '@material-ui/core/Toolbar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Material UI Icons
import StorageIcon from '@material-ui/icons/Storage';
import InboxIcon from '@material-ui/icons/Inbox';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import NearMeIcon from '@material-ui/icons/NearMe';

// Custom Hooks
import useBottomNavigation from 'hooks/common/useBottomNavigation';

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
	const { bottomNavigationTabValue, onChangeBottomNavigation } = useBottomNavigation();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

	return (
		<>
			<Paper className={classes.root} square elevation={3}>
				<BottomNavigation
					className={classes.bottomNavigation}
					value={bottomNavigationTabValue}
					onChange={onChangeBottomNavigation}
					showLabels
				>
					<BottomNavigationAction label={'홈'} icon={<HomeIcon />} value={'home'} />
					<BottomNavigationAction
						label={'새 저장소'}
						icon={<StorageIcon />}
						value={'storage'}
						data-page-scope={'storage'}
					/>
					<BottomNavigationAction
						label={'이전 저장소'}
						icon={<InboxIcon />}
						value={'previous-storage'}
						data-page-scope={'previous-storage'}
					/>
					<BottomNavigationAction label={'마이페이지'} icon={<PersonIcon />} value={'mypage'} />
					{!isMobile && <BottomNavigationAction label={'새로운 소식'} icon={<NearMeIcon />} value={'notice'} />}
				</BottomNavigation>
			</Paper>
			<Toolbar className={classes.toolbar} />
		</>
	);
}

export default memo(MobileBottomNavigation);
