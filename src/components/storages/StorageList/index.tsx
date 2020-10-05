import React, { memo } from 'react';
import {
	createStyles, makeStyles, Theme, useTheme
} from '@material-ui/core/styles';

// Material UI
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import TodayIcon from '@material-ui/icons/Today';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Grow from '@material-ui/core/Grow';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Pagination from '@material-ui/lab/Pagination';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			backgroundColor: 'white'
		},
		box: {
			padding: theme.spacing(2, 0, 0)
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

function StorageList() {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Container className={classes.container}>
			<Box className={classes.box}>
				<Box>
					<TextField
						fullWidth
						type={'search'}
						variant={'outlined'}
						InputProps={{
							startAdornment: (
								<InputAdornment position={'start'}>
									<SearchIcon color={'action'} />
								</InputAdornment>
							)
						}}
						placeholder={'저장소명으로 검색'}
					/>
				</Box>
				<Box mt={1}>
					<Button color={'primary'} size={'large'} startIcon={<CheckIcon />}>
						<Typography className={classes.orderTypography} variant={'body1'}>
							{'최신순'}
						</Typography>
					</Button>
				</Box>
				<Box mt={1}>
					<Grid container spacing={2}>
						{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item) => (
							<Grow in>
								<Grid key={`index-${item}`} item xs={12} sm={4} md={3}>
									<Card>
										<CardActionArea>
											<CardContent className={classes.cardContentHead} />
											<CardContent>
												<Avatar
													className={classes.avatar}
													src={'https://image.chosun.com/sitedata/image/201908/23/2019082301404_0.png'}
													alt={'Storage Avatar Img'}
												/>
												<Box mt={1}>
													<Typography className={classes.typography}>{'라이언 저장소'}</Typography>
												</Box>
												<Box display={'flex'} alignItems={'center'} mt={1} justifyContent={'flex-end'}>
													<Box>
														<TodayIcon className={classes.icon} color={'action'} />
													</Box>
													<Box ml={0.5}>
														<Typography variant={'caption'}>{'2020. 10. 01'}</Typography>
													</Box>
												</Box>
											</CardContent>
										</CardActionArea>
									</Card>
								</Grid>
							</Grow>
						))}
					</Grid>
				</Box>
				<Box mt={2} textAlign={'right'}>
					<Button
						fullWidth={isMobile}
						className={classes.button}
						variant={'contained'}
						color={'primary'}
						startIcon={<AddBoxIcon />}
						size={'large'}
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
			</Box>
		</Container>
	);
}

export default memo(StorageList);
