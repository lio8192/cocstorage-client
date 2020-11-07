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
import SecurityIcon from '@material-ui/icons/Security';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import CheckIcon from '@material-ui/icons/Check';

// Custom Hooks
import useMyPageMenu from 'hooks/mypage/useMyPageMenu';

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
	const {
		pending,
		activatedTab,
		putNicknameBody: {
			value, error, helperText, editNickname
		},
		onChangeMyPageTab,
		onClickEditNickname,
		onHandleNicknameTextField,
		onPutNickname
	} = useMyPageMenu();
	return (
		<>
			<Box mt={2} mb={2}>
				<TextField
					fullWidth
					InputProps={{
						endAdornment: (
							<InputAdornment position={'end'}>
								<IconButton
									edge={'end'}
									onClick={editNickname ? onPutNickname : onClickEditNickname}
									disabled={pending}
								>
									{editNickname ? <CheckIcon /> : <CreateIcon />}
								</IconButton>
							</InputAdornment>
						)
					}}
					onChange={onHandleNicknameTextField}
					value={value || ''}
					error={error}
					helperText={helperText}
					disabled={!editNickname || pending}
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
					<ListItem button selected={activatedTab === 0} onClick={onChangeMyPageTab} data-tab-value={0}>
						<ListItemIcon>
							<SecurityIcon />
						</ListItemIcon>
						<ListItemText primary={'개인 정보'} />
					</ListItem>
					<ListItem button selected={activatedTab === 1} onClick={onChangeMyPageTab} data-tab-value={1}>
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
