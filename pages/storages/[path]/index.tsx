import React from 'react';
import {
	createStyles, makeStyles, Theme, useTheme
} from '@material-ui/core/styles';

// Material UI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Pagination from '@material-ui/lab/Pagination';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Material UI Icons
import CreateIcon from '@material-ui/icons/Create';
import SearchIcon from '@material-ui/icons/Search';

// Components
import BoardHeader from 'components/storages/board/BoardHeader';
import BoardList from 'components/storages/board/BoardList';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			[theme.breakpoints.down('md')]: {
				marginBottom: 1
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
		container: {
			backgroundColor: 'white',
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(0)
			}
		},
		buttonBox: {
			textAlign: 'right',
			padding: theme.spacing(2, 0, 0),
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(0)
			}
		},
		button: {
			color: 'white',
			[theme.breakpoints.down('md')]: {
				width: '100%',
				borderRadius: 0
			}
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
		},
		searchBox: {
			padding: theme.spacing(0, 0, 2),
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(0, 2, 2)
			}
		}
	})
);

function StorageBoard() {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<>
			<BoardHeader />
			<Grid className={classes.root} container>
				<Grid item xs={12}>
					<Container className={classes.container}>
						<Tabs
							className={classes.tabs}
							value={0}
							indicatorColor={'primary'}
							textColor={'primary'}
							onChange={() => console.log('onChange')}
						>
							<Tab label={'최신순'} />
						</Tabs>
					</Container>
					<Container className={classes.container}>
						<BoardList />
						<Box className={classes.buttonBox}>
							<Button
								className={classes.button}
								variant={'contained'}
								color={'primary'}
								size={'large'}
								startIcon={<CreateIcon />}
							>
								{'새 개념글 등록'}
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
						<Box className={classes.searchBox}>
							<TextField
								fullWidth
								variant={'outlined'}
								placeholder={'검색할 단어를 입력해주세요.'}
								InputProps={{
									startAdornment: (
										<InputAdornment position={'start'}>
											<SearchIcon color={'action'} />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position={'end'}>
											<Button variant={'outlined'}>{'전체'}</Button>
										</InputAdornment>
									)
								}}
							/>
						</Box>
					</Container>
				</Grid>
			</Grid>
		</>
	);
}

export default StorageBoard;
