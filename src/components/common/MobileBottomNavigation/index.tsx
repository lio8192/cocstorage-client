import React, { memo } from 'react';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';

// Material UI
import Toolbar from '@material-ui/core/Toolbar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Material UI Icons
import ForumIcon from '@material-ui/icons/Forum';
import ArchiveIcon from '@material-ui/icons/Archive';
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
			'& .MuiBottomNavigationAction-label': {
				width: '100%',
				whiteSpace: 'nowrap',
				textOverflow: 'ellipsis',
				overflow: 'hidden'
			},
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
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
	const { bottomNavigationTabValue, onChangeBottomNavigation } = useBottomNavigation();

	return (
		<>
			<Paper className={classes.root} square elevation={3}>
				<BottomNavigation
					className={classes.bottomNavigation}
					value={bottomNavigationTabValue}
					onChange={onChangeBottomNavigation}
					showLabels
				>
					<BottomNavigationAction label={'홈'} icon={<HomeIcon />} showLabel={!isMobile} value={'home'} />
					<BottomNavigationAction
						label={'커뮤니티 저장소'}
						icon={<ForumIcon />}
						showLabel={!isMobile}
						value={'storage'}
						data-page-scope={'storage'}
					/>
					<BottomNavigationAction
						label={'수집 저장소'}
						icon={<ArchiveIcon />}
						showLabel={!isMobile}
						value={'collect-storage'}
						data-page-scope={'collect-storage'}
					/>
					<BottomNavigationAction
						label={'마이페이지'}
						icon={<PersonIcon />}
						showLabel={!isMobile}
						value={'mypage'}
						data-page-scope={'mypage'}
					/>
					{!isMobile && (
						<BottomNavigationAction
							label={'새로운 소식'}
							icon={<NearMeIcon />}
							showLabel={!isMobile}
							value={'notice'}
							data-page-scope={'notice'}
						/>
					)}
				</BottomNavigation>
			</Paper>
			<Toolbar className={classes.toolbar} />
		</>
	);
}

export default memo(MobileBottomNavigation);
