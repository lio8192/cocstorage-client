import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';

// Material UI
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';

// Common Components
import Header from 'components/common/Header';
import MobileHeader from 'components/common/MobileHeader';
import Footer from 'components/common/Footer';
import SignInDialog from 'components/common/SignInDialog';
import SignUpDialog from 'components/common/SignUpDialog';
import PasswordFinderDialog from 'components/common/PasswordFinderDialog';
import MobileBottomNavigation from 'components/common/MobileBottomNavigation';
import NotificationModal from 'components/common/NotificationModal';

// Custom Hooks
import useLayout from 'hooks/common/useLayout';
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';

type LayoutProps = {
	children: JSX.Element | JSX.Element[];
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			[theme.breakpoints.down('md')]: {
				backgroundColor: '#eff1f5'
			}
		},
		linearProgress: {
			position: 'fixed',
			width: '100%',
			top: 0,
			height: 5,
			zIndex: 10000
		}
	})
);

function Layout({ children }: LayoutProps) {
	const router = useRouter();
	const classes = useStyles();
	const {
		notification: {
			open, title, contentText, severity, route
		},
		onCloseNotificationModal
	} = useLayout();

	const [pending, setPending] = useState<boolean>(false);

	useEffect(() => {
		router.events.on('routeChangeStart', () => {
			setPending(true);
		});

		router.events.on('routeChangeComplete', () => {
			setPending(false);
		});
	}, [router, pending]);

	return (
		<SnackbarProvider maxSnack={3}>
			<Fade in={pending}>
				<LinearProgress className={classes.linearProgress} color={'primary'} />
			</Fade>
			<Hidden implementation={'css'} mdDown>
				<Header />
			</Hidden>
			<Hidden implementation={'css'} lgUp>
				<MobileHeader />
			</Hidden>
			<Box maxWidth={'lg'} className={classes.root}>
				{children}
			</Box>
			<Hidden mdDown>
				<Footer />
			</Hidden>
			<Hidden lgUp>
				<MobileBottomNavigation />
			</Hidden>
			<SignInDialog />
			<SignUpDialog />
			<PasswordFinderDialog />
			<NotificationModal
				open={open}
				title={title}
				contentText={contentText}
				severity={severity}
				route={route}
				onCloseNotificationModal={onCloseNotificationModal}
			/>
		</SnackbarProvider>
	);
}

export default Layout;
