import React, { memo } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Material UI
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Material UI Icons
import CreateIcon from '@material-ui/icons/Create';
import SettingsIcon from '@material-ui/icons/Settings';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		list: {
			width: '100%',
			backgroundColor: theme.palette.background.paper,
			paddingBottom: theme.spacing(2)
		},
		listSubheader: {
			padding: theme.spacing(0)
		}
	})
);

function MyPageMenu() {
	const classes = useStyles();
	return (
		<>
			<Box mt={2} mb={2}>
				<TextField
					fullWidth
					value={'닉네임1357'}
					InputProps={{
						endAdornment: (
							<InputAdornment position={'end'}>
								<IconButton edge={'end'}>
									<CreateIcon />
								</IconButton>
							</InputAdornment>
						)
					}}
					disabled
				/>
			</Box>
			<Hidden mdDown>
				<List
					component={'nav'}
					subheader={(
						<ListSubheader className={classes.listSubheader} component={'div'}>
							{'내 정보 관리'}
						</ListSubheader>
					)}
					className={classes.list}
				>
					<ListItem button selected>
						<ListItemIcon>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText primary={'정보 수정'} />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<MeetingRoomIcon />
						</ListItemIcon>
						<ListItemText primary={'회원 탈퇴'} />
					</ListItem>
				</List>
			</Hidden>
		</>
	);
}

export default memo(MyPageMenu);
