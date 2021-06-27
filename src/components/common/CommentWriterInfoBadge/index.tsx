import React, { memo } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Material UI
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

// Material UI Icons
import SettingsIcon from '@material-ui/icons/Settings';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		avatar: {
			width: theme.spacing(3),
			height: theme.spacing(3),
			backgroundColor: theme.palette.primary.main,
			color: theme.palette.common.white,
			cursor: 'pointer'
		},
		icon: {
			fontSize: 16
		}
	})
);

type CommentWriterInfoBadgeProps = {
	boardUserId: number;
	commentUserId: number;
	userRole: string | undefined;
};

function CommentWriterInfoBadge({ boardUserId, commentUserId, userRole }: CommentWriterInfoBadgeProps) {
	const classes = useStyles();

	if (userRole === 'admin' && boardUserId === commentUserId) {
		return (
			<AvatarGroup>
				<Tooltip title={'운영자'}>
					<Avatar className={classes.avatar}>
						<SettingsIcon className={classes.icon} />
					</Avatar>
				</Tooltip>
				<Tooltip title={'작성자'}>
					<Avatar className={classes.avatar}>
						<CreateIcon className={classes.icon} />
					</Avatar>
				</Tooltip>
			</AvatarGroup>
		);
	}

	if (userRole !== 'admin' && boardUserId === commentUserId) {
		return <Chip variant={'outlined'} label={'작성자'} color={'primary'} size={'small'} />;
	}

	if (userRole === 'admin') {
		return <Chip variant={'outlined'} label={'운영자'} color={'primary'} size={'small'} />;
	}

	return null;
}

export default memo(CommentWriterInfoBadge);
