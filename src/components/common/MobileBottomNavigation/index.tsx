import React, { memo } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Material UI
import Toolbar from '@material-ui/core/Toolbar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Paper from '@material-ui/core/Paper';

// Material UI Icons
import ForumIcon from '@material-ui/icons/Forum';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import NearMeIcon from '@material-ui/icons/NearMe';

// Custom Hooks
import useBottomNavigation from 'hooks/common/useBottomNavigation';

const useStyles = makeStyles((theme: Theme) =>
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
				overflow: 'hidden',
				[theme.breakpoints.down('sm')]: {
					fontSize: 12
				}
			},
			'& .Mui-selected': {
				fontFamily: 'NanumSquareRoundEB',
				'& .MuiBottomNavigationAction-label': {
					display: 'none'
				}
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
						label={'커뮤니티 저장소'}
						icon={<ForumIcon />}
						value={'storage'}
						data-page-scope={'storage'}
					/>
					<BottomNavigationAction
						label={'새로운 소식'}
						icon={<NearMeIcon />}
						value={'notice'}
						data-page-scope={'notice'}
					/>
					<BottomNavigationAction
						label={'마이페이지'}
						icon={<PersonIcon />}
						value={'mypage'}
						data-page-scope={'mypage'}
					/>
				</BottomNavigation>
			</Paper>
			<Toolbar className={classes.toolbar} />
		</>
	);
}

export default memo(MobileBottomNavigation);
