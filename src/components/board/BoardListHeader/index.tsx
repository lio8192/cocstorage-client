import React, {
	useState, useCallback, useRef, memo
} from 'react';
import {
	createStyles, fade, makeStyles, Theme
} from '@material-ui/core/styles';

// Material UI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';
import MenuList from '@material-ui/core/MenuList';
import InputBase from '@material-ui/core/InputBase';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';

// Material UI Icons
import SearchIcon from '@material-ui/icons/Search';
import CastIcon from '@material-ui/icons/Cast';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import SchoolIcon from '@material-ui/icons/School';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import SportsBaseballIcon from '@material-ui/icons/SportsBaseball';

// Snippets
import { getSearchTypeLabelByType, getCategoryNameByCategoryId } from 'snippets/board';

type BoardHeaderProps = {
	categoryId: string | string[];
	searchState: {
		handle: boolean;
		type: string;
		value: string;
	};
	onHandleSearchTypeMenuSelect: (event: React.MouseEvent<HTMLLIElement>) => void;
	onHandleSearchValueInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onHandleSearchValueInputKey: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			height: 200,
			background: `linear-gradient(to right, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
			[theme.breakpoints.down('md')]: {
				height: 'auto'
			}
		},
		container: {
			display: 'flex',
			height: '100%',
			flexDirection: 'column',
			justifyContent: 'flex-end'
		},
		typography: {
			display: 'flex',
			alignItems: 'center',
			width: '100%',
			color: 'white',
			fontWeight: 700,
			[theme.breakpoints.down('md')]: {
				fontSize: 22
			},
			[theme.breakpoints.down('xs')]: {
				fontSize: 20
			}
		},
		icon: {
			verticalAlign: 'middle'
		},
		gridItem: {
			padding: theme.spacing(3, 0)
		},
		gridBox: {
			display: 'flex',
			justifyContent: 'flex-end'
		},
		search: {
			position: 'relative',
			borderRadius: theme.shape.borderRadius,
			backgroundColor: fade(theme.palette.common.white, 0.15),
			'&:hover': {
				backgroundColor: fade(theme.palette.common.white, 0.25)
			},
			marginLeft: theme.spacing(1),
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				width: 'auto'
			},
			color: 'white'
		},
		searchIcon: {
			padding: theme.spacing(0, 2),
			height: '100%',
			position: 'absolute',
			pointerEvents: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			color: 'white'
		},
		searchButton: {
			backgroundColor: 'rgba(255, 255, 255, 0.15)',
			color: 'white'
		},
		inputRoot: {
			color: 'inherit'
		},
		inputInput: {
			padding: theme.spacing(1, 1, 1, 0),
			paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
			transition: theme.transitions.create('width'),
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				width: '12ch',
				'&:focus': {
					width: '20ch'
				}
			}
		},
		dialogContainer: {
			display: 'flex',
			minWidth: 120
		},
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120
		},
		popper: {
			zIndex: 10
		}
	})
);

function getCategoryIconByCategoryId(categoryId: string | string[]) {
	let categoryIcon = <CastIcon fontSize={'large'} />;

	switch (categoryId) {
	case 'daily_popular':
		categoryIcon = <WhatshotIcon fontSize={'large'} />;
		break;
	case 'ib_new1':
		categoryIcon = <CastIcon fontSize={'large'} />;
		break;
	case 'stream':
		categoryIcon = <PlayArrowIcon fontSize={'large'} />;
		break;
	case 'football_new6':
		categoryIcon = <SportsSoccerIcon fontSize={'large'} />;
		break;
	case 'issuezoom':
		categoryIcon = <CalendarTodayIcon fontSize={'large'} />;
		break;
	case 'exam_new':
		categoryIcon = <SchoolIcon fontSize={'large'} />;
		break;
	case 'extra':
		categoryIcon = <FitnessCenterIcon fontSize={'large'} />;
		break;
	case 'baseball_new9':
		categoryIcon = <SportsBaseballIcon fontSize={'large'} />;
		break;
	default:
		categoryIcon = <CastIcon fontSize={'large'} />;
		break;
	}

	return categoryIcon;
}

function BoardHeader({
	categoryId,
	searchState,
	onHandleSearchTypeMenuSelect,
	onHandleSearchValueInput,
	onHandleSearchValueInputKey
}: BoardHeaderProps) {
	const classes = useStyles();
	const anchorRef = useRef<HTMLButtonElement>(null);
	const [open, setOpen] = useState<boolean>(false);

	const handleSearchMenu = useCallback(() => {
		setOpen(!open);
	}, [open]);

	const handleCloseSearchMenu = useCallback(() => {
		setOpen(false);
	}, []);

	const handleSearchTypeMenuSelect = useCallback(
		(event: React.MouseEvent<HTMLLIElement>) => {
			setOpen(false);
			onHandleSearchTypeMenuSelect(event);
		},
		[onHandleSearchTypeMenuSelect]
	);

	return (
		<Box className={classes.root}>
			<Container className={classes.container}>
				<Grid container justify={'space-between'}>
					<Grid className={classes.gridItem} item xs={12} sm={12} md={12} lg={6}>
						<Typography className={classes.typography} variant={'h5'}>
							{getCategoryIconByCategoryId(categoryId)}
							<Box component={'span'} ml={1}>
								{`${getCategoryNameByCategoryId(categoryId)} 저장소`}
							</Box>
						</Typography>
					</Grid>
					<Hidden mdDown>
						<Grid className={classes.gridItem} item xs={2} sm={6}>
							<Hidden implementation={'css'} mdDown>
								<Box className={classes.gridBox}>
									<Box>
										<Button
											ref={anchorRef}
											className={classes.searchButton}
											color={'inherit'}
											onClick={handleSearchMenu}
										>
											{getSearchTypeLabelByType(searchState.type)}
										</Button>
										<Popper
											className={classes.popper}
											open={open}
											anchorEl={anchorRef.current}
											role={undefined}
											transition
											disablePortal
										>
											{({ TransitionProps, placement }) => (
												<Grow
													{...TransitionProps}
													style={{
														transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
													}}
												>
													<Paper>
														<ClickAwayListener onClickAway={handleCloseSearchMenu}>
															<MenuList>
																<MenuItem data-value={'all'} onClick={handleSearchTypeMenuSelect}>
																	{'전체'}
																</MenuItem>
																<MenuItem data-value={'subject'} onClick={handleSearchTypeMenuSelect}>
																	{'제목'}
																</MenuItem>
																<MenuItem data-value={'nickname'} onClick={handleSearchTypeMenuSelect}>
																	{'닉네임'}
																</MenuItem>
																<MenuItem data-value={'content'} onClick={handleSearchTypeMenuSelect}>
																	{'내용'}
																</MenuItem>
															</MenuList>
														</ClickAwayListener>
													</Paper>
												</Grow>
											)}
										</Popper>
									</Box>
									<Box className={classes.search}>
										<Box className={classes.searchIcon}>
											<SearchIcon />
										</Box>
										<InputBase
											classes={{
												root: classes.inputRoot,
												input: classes.inputInput
											}}
											onChange={onHandleSearchValueInput}
											onKeyUp={onHandleSearchValueInputKey}
											value={searchState.value}
											placeholder={'검색'}
										/>
									</Box>
								</Box>
							</Hidden>
						</Grid>
					</Hidden>
				</Grid>
			</Container>
		</Box>
	);
}

export default memo(BoardHeader);
