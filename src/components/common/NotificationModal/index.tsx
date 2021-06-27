import React, { useCallback, memo } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

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
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';

type NotificationModalProps = {
	open: boolean;
	title: string;
	content: string | JSX.Element | JSX.Element[];
	severity: string;
	route: string;
	fullWidth?: boolean;
	onCloseNotificationModal: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		button: {
			fontFamily: 'NanumSquareRoundEB'
		},
		icon: {
			verticalAlign: 'middle'
		},
		successIcon: {
			verticalAlign: 'middle',
			color: theme.palette.success.main
		},
		warningIcon: {
			verticalAlign: 'middle',
			color: theme.palette.warning.main
		},
		errorIcon: {
			verticalAlign: 'middle',
			color: theme.palette.error.main
		}
	})
);

function NotificationModal({
	open,
	title,
	content,
	severity,
	route,
	fullWidth,
	onCloseNotificationModal
}: NotificationModalProps) {
	const classes = useStyles();
	const router = useRouter();

	const handleNotificationModal = useCallback(() => {
		if (route) {
			router.push(route).then(() => onCloseNotificationModal());
		} else {
			onCloseNotificationModal();
		}
	}, [router, route, onCloseNotificationModal]);

	return (
		<Dialog open={open} onClose={handleNotificationModal} fullWidth={fullWidth}>
			<DialogTitle>
				<Box display={'flex'} alignItems={'center'}>
					<Box>
						{severity === 'info' && <InfoIcon className={classes.icon} fontSize={'large'} color={'primary'} />}
						{severity === 'success' && <CheckCircleIcon className={classes.successIcon} fontSize={'large'} />}
						{severity === 'warning' && <WarningIcon className={classes.warningIcon} fontSize={'large'} />}
						{severity === 'error' && <ErrorIcon className={classes.errorIcon} fontSize={'large'} />}
					</Box>
					<Box ml={1}>{title}</Box>
				</Box>
			</DialogTitle>
			<DialogContent>
				<DialogContentText component={'div'}>{content}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button className={classes.button} onClick={handleNotificationModal} color={'primary'} autoFocus>
					{'확인'}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default memo(NotificationModal);
