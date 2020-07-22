import React, { memo } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

// Material UI
import Box from '@material-ui/core/Box';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

// Material UI Icons
import InfoIcon from '@material-ui/icons/Info';

type NotificationModalProps = {
	modalOpen: boolean;
	title: string;
	contentText: string;
	onHandleNotificationModal: () => void;
	onCloseNotificationModal?: () => void;
};

const useStyles = makeStyles(() =>
	createStyles({
		icon: {
			verticalAlign: 'middle'
		}
	})
);

function NotificationModal({
	modalOpen,
	title,
	contentText,
	onHandleNotificationModal,
	onCloseNotificationModal
}: NotificationModalProps) {
	const classes = useStyles();

	return (
		<Dialog open={modalOpen} onClose={onCloseNotificationModal}>
			<DialogTitle>
				<Box display={'flex'} alignItems={'center'}>
					<Box>
						<InfoIcon className={classes.icon} fontSize={'large'} color={'primary'} />
					</Box>
					<Box ml={1}>{title}</Box>
				</Box>
			</DialogTitle>
			<DialogContent>
				<DialogContentText>{contentText}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onHandleNotificationModal} color={'primary'} autoFocus>
					{'확인'}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default memo(NotificationModal);
