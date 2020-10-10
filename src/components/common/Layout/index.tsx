import React from 'react';
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

type LayoutProps = {
	children: JSX.Element | JSX.Element[];
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			[theme.breakpoints.down('md')]: {
				backgroundColor: '#eff1f5'
			}
		}
	})
);

function Layout({ children }: LayoutProps) {
	const classes = useStyles();

	return (
		<SnackbarProvider maxSnack={3}>
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
		</SnackbarProvider>
	);
}

export default Layout;
