import React from 'react';
import {
	createStyles, makeStyles, Theme, useTheme
} from '@material-ui/core/styles';

// Material UI
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Material UI Icons
import AddBoxIcon from '@material-ui/icons/AddBox';

// Components
import StorageHeader from 'components/storages/StorageHeader';
import StorageGridList from 'components/storages/StorageGridList';
import StorageManageDialog from 'components/storages/StorageManageDialog';

// Custom Hooks
import useStorages from 'hooks/storages/useStorages';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			backgroundColor: 'white'
		},
		box: {
			padding: theme.spacing(2, 0, 0)
		},
		card: {
			border: '1px solid #EAEAEA'
		},
		cardContentHead: {
			padding: theme.spacing(3),
			background: 'linear-gradient(rgb(244, 245, 247) 100%, rgb(255, 255, 255) 35%, rgb(255, 255, 255) 100%)'
		},
		avatar: {
			width: theme.spacing(7),
			height: theme.spacing(7),
			marginTop: theme.spacing(-5)
		},
		typography: {
			fontWeight: 700
		},
		orderTypography: {
			fontFamily: 'NanumSquareRoundEB'
		},
		icon: {
			verticalAlign: 'middle'
		},
		button: {
			color: 'white'
		},
		pagination: {
			padding: theme.spacing(2),
			'& > ul': {
				justifyContent: 'center',
				'& *': {
					color: 'rgba(0, 0, 0, 0.5)'
				},
				'& .Mui-selected': {
					color: 'white'
				}
			}
		}
	})
);

function Storages() {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const { onHandleStorageManageDialogOpen } = useStorages();
	return (
		<>
			<StorageHeader />
			<Container className={classes.container}>
				<StorageGridList />
				<Box mt={2} textAlign={'right'}>
					<Button
						fullWidth={isMobile}
						className={classes.button}
						variant={'contained'}
						color={'primary'}
						startIcon={<AddBoxIcon />}
						size={'large'}
						onClick={onHandleStorageManageDialogOpen}
					>
						{'새 저장소 등록'}
					</Button>
				</Box>
				<Pagination
					className={classes.pagination}
					page={1}
					count={10}
					color={'primary'}
					shape={'rounded'}
					onChange={() => console.log('onPagination')}
					size={isMobile ? 'small' : 'medium'}
					siblingCount={isMobile ? 0 : 2}
				/>
			</Container>
			<StorageManageDialog />
		</>
	);
}

export default Storages;
