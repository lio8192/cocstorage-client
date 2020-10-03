import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Material UI
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// Components
import MyPageHeader from 'components/mypage/MyPageHeader';
import MyPageMenu from 'components/mypage/MyPageMenu';
import MyPageForm from 'components/mypage/MyPageForm';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginTop: theme.spacing(3),
			backgroundColor: 'white',
			[theme.breakpoints.down('md')]: {
				marginTop: theme.spacing(0)
			}
		},
		tabs: {
			backgroundColor: 'white',
			'& *': {
				fontFamily: 'NanumSquareRoundEB'
			},
			'& .MuiTabs-indicator': {
				height: 5
			}
		},
		grid: {
			backgroundColor: 'white'
		}
	})
);

function MyPage() {
	const classes = useStyles();
	return (
		<>
			<Hidden lgUp>
				<Tabs
					className={classes.tabs}
					value={0}
					indicatorColor={'primary'}
					textColor={'primary'}
					onChange={() => console.log('onChange')}
				>
					<Tab label={'정보 수정'} />
					<Tab label={'회원 탈퇴'} />
				</Tabs>
			</Hidden>
			<MyPageHeader />
			<Container className={classes.root}>
				<Grid container spacing={3}>
					<Grid item xs={12} lg={3}>
						<MyPageMenu />
					</Grid>
					<Grid item xs={12} lg={9}>
						<MyPageForm />
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default MyPage;
