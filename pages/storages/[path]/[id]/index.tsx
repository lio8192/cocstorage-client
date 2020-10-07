import React from 'react';
import {
	createStyles, makeStyles, Theme, useTheme
} from '@material-ui/core/styles';

// Material UI
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Components
import NotificationModal from 'components/common/NotificationModal';
import CommentList from 'components/common/CommentList';
import CommentWriteForm from 'components/common/CommentWriteForm';
import DetailSideBox from 'components/storages/board/detail/DetailSideBox';
import DetailContent from 'components/storages/board/detail/DetailContent';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			backgroundColor: 'white',
			[theme.breakpoints.down('md')]: {
				padding: 0
			}
		},
		grid: {
			borderRight: '1px solid rgba(0, 0, 0, 0.23)',
			[theme.breakpoints.down('md')]: {
				borderColor: '#EAEAEA'
			}
		}
	})
);

function StorageBoardDetail() {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	return (
		<Container className={classes.root} maxWidth={isMobile ? 'md' : 'lg'}>
			<Grid container>
				<Grid item xs={12} sm={12} md={12} lg={9}>
					<DetailContent />
					<CommentWriteForm />
					<CommentList data={[]} pending={false} count={0} row={0} onHandleCommentRow={() => console.log('onHandle')} />
				</Grid>
				<Grid item xs={12} md={12} lg={3}>
					<Hidden mdDown>
						<DetailSideBox />
					</Hidden>
				</Grid>
			</Grid>
			<NotificationModal
				modalOpen={false}
				title={'안내'}
				contentText={'이미 삭제된 개념글입니다.'}
				onHandleNotificationModal={() => console.log('onHandle')}
			/>
		</Container>
	);
}

export default StorageBoardDetail;
