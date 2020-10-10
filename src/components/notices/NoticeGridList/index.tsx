import React, { memo } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// Material UI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

// Material UI Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Images
import UpdateImg from 'images/update.png';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			paddingTop: theme.spacing(2),
			paddingBottom: theme.spacing(2),
			backgroundColor: 'white',
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(0)
			}
		},
		listItem: {
			padding: 0,
			border: '1px solid #EAEAEA',
			borderTop: 'none',
			[theme.breakpoints.down('md')]: {
				border: 'none'
			}
		},
		card: {
			display: 'flex',
			width: '100%',
			height: '100%'
		},
		details: {
			display: 'flex',
			flexDirection: 'column',
			flex: 1
		},
		content: {
			flex: '1 0 auto'
		},
		cover: {
			width: 230
		},
		controls: {
			display: 'flex',
			alignItems: 'center',
			paddingLeft: theme.spacing(1),
			paddingBottom: theme.spacing(1)
		},
		grid: {
			borderTop: '1px solid #EAEAEA'
		},
		gridItemContainer: {
			height: '100%'
		},
		gridCard: {
			height: '100%',
			border: '1px solid #EAEAEA',
			borderTop: 'none',
			borderLeft: 'none',
			[theme.breakpoints.down('md')]: {
				border: 'none'
			}
		},
		cardActionArea: {
			height: '100%'
		},
		media: {
			height: '55%',
			[theme.breakpoints.down('md')]: {
				height: 300
			},
			[theme.breakpoints.down('xs')]: {
				height: 150
			}
		},
		chip: {
			color: 'white'
		},
		infoBox: {
			'& span::after': {
				content: '""',
				display: 'inline-block',
				margin: theme.spacing(0.5),
				width: 3,
				height: 3,
				border: `1px solid ${theme.palette.grey.A200}`,
				borderRadius: '50%',
				backgroundColor: theme.palette.grey.A200,
				verticalAlign: 'middle'
			},
			'& span:last-child::after': {
				display: 'none'
			}
		},
		icon: {
			verticalAlign: 'middle'
		},
		typography: {
			fontWeight: 700
		},
		descriptionTypography: {
			display: 'box',
			boxOrient: 'vertical',
			lineClamp: 2,
			textOverflow: 'ellipsis',
			overflow: 'hidden'
		},
		buttonBox: {
			marginTop: theme.spacing(1),
			[theme.breakpoints.down('md')]: {
				marginTop: theme.spacing(0)
			}
		},
		button: {
			color: 'white',
			[theme.breakpoints.down('md')]: {
				borderRadius: 0
			}
		}
	})
);

function NoticeGridList() {
	const classes = useStyles();
	return (
		<Container className={classes.root}>
			<Grid className={classes.grid} container>
				<Grid item xs={12} lg={6}>
					<Hidden xsDown>
						<Grid container>
							<Grid item xs={12}>
								<ListItem className={classes.listItem} disableGutters button>
									<Card className={classes.card} elevation={0} square>
										<CardMedia className={classes.cover} image={UpdateImg} />
										<div className={classes.details}>
											<CardContent>
												<Box display={'flex'} alignItems={'center'}>
													<Box maxWidth={'80%'}>
														<Typography className={classes.typography} noWrap variant={'body1'}>
															{'2020년 10월 10일 업데이트 안내'}
														</Typography>
													</Box>
													<Box ml={1}>
														<Chip className={classes.chip} label={'NEW'} color={'primary'} size={'small'} />
													</Box>
												</Box>
												<Box mt={1}>
													<Typography
														className={classes.descriptionTypography}
														variant={'body2'}
														color={'textSecondary'}
													>
														{
															'개념글 저장소 1주년을 맞이하여 대규모 업데이트가 진행되었습니다. 개념글 저장소 1주년을 맞이하여 대규모 업데이트가 진행되었습니다. 개념글 저장소 1주년을 맞이하여 대규모 업데이트가 진행되었습니다.'
														}
													</Typography>
												</Box>
												<Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={0.5}>
													<Box className={classes.infoBox}>
														<Typography variant={'caption'} color={'textSecondary'}>
															{'관리자'}
														</Typography>
														<Typography variant={'caption'} color={'textSecondary'}>
															{'1시간 전'}
														</Typography>
													</Box>
													<Box display={'flex'} alignItems={'center'}>
														<Box>
															<VisibilityIcon className={classes.icon} color={'action'} />
														</Box>
														<Box ml={0.5}>
															<Typography variant={'caption'} color={'textSecondary'}>
																{'1,000'}
															</Typography>
														</Box>
													</Box>
												</Box>
											</CardContent>
										</div>
									</Card>
								</ListItem>
							</Grid>
							<Grid item xs={12}>
								<ListItem className={classes.listItem} disableGutters button>
									<Card className={classes.card} elevation={0} square>
										<CardMedia className={classes.cover} image={UpdateImg} />
										<div className={classes.details}>
											<CardContent>
												<Box display={'flex'} alignItems={'center'}>
													<Box maxWidth={'80%'}>
														<Typography className={classes.typography} noWrap variant={'body1'}>
															{'2020년 10월 10일 업데이트 안내'}
														</Typography>
													</Box>
													<Box ml={1}>
														<Chip className={classes.chip} label={'NEW'} color={'primary'} size={'small'} />
													</Box>
												</Box>
												<Box mt={1}>
													<Typography
														className={classes.descriptionTypography}
														variant={'body2'}
														color={'textSecondary'}
													>
														{
															'개념글 저장소 1주년을 맞이하여 대규모 업데이트가 진행되었습니다. 개념글 저장소 1주년을 맞이하여 대규모 업데이트가 진행되었습니다. 개념글 저장소 1주년을 맞이하여 대규모 업데이트가 진행되었습니다.'
														}
													</Typography>
												</Box>
												<Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={0.5}>
													<Box className={classes.infoBox}>
														<Typography variant={'caption'} color={'textSecondary'}>
															{'관리자'}
														</Typography>
														<Typography variant={'caption'} color={'textSecondary'}>
															{'1시간 전'}
														</Typography>
													</Box>
													<Box display={'flex'} alignItems={'center'}>
														<Box>
															<VisibilityIcon className={classes.icon} color={'action'} />
														</Box>
														<Box ml={0.5}>
															<Typography variant={'caption'} color={'textSecondary'}>
																{'1,000'}
															</Typography>
														</Box>
													</Box>
												</Box>
											</CardContent>
										</div>
									</Card>
								</ListItem>
							</Grid>
						</Grid>
					</Hidden>
					<Hidden smUp>
						<Grid className={classes.gridItemContainer} container>
							<Grid item xs={12} lg={6}>
								<Card className={classes.gridCard} square elevation={0}>
									<CardActionArea className={classes.cardActionArea}>
										<CardMedia className={classes.media} image={UpdateImg} title={'Contemplative Reptile'} />
										<CardContent>
											<Box display={'flex'} alignItems={'center'}>
												<Box maxWidth={'80%'}>
													<Typography className={classes.typography} noWrap variant={'body1'}>
														{'2020년 10월 10일 업데이트 안내'}
													</Typography>
												</Box>
												<Box ml={1}>
													<Chip className={classes.chip} label={'NEW'} color={'primary'} size={'small'} />
												</Box>
											</Box>
											<Box mt={1}>
												<Typography className={classes.descriptionTypography} variant={'body2'} color={'textSecondary'}>
													{'개념글 저장소 1주년을 맞이하여 대규모 업데이트가 진행되었습니다.'}
												</Typography>
											</Box>
											<Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={0.5}>
												<Box className={classes.infoBox}>
													<Typography variant={'caption'} color={'textSecondary'}>
														{'관리자'}
													</Typography>
													<Typography variant={'caption'} color={'textSecondary'}>
														{'1시간 전'}
													</Typography>
												</Box>
												<Box display={'flex'} alignItems={'center'}>
													<Box>
														<VisibilityIcon className={classes.icon} color={'action'} />
													</Box>
													<Box ml={0.5}>
														<Typography variant={'caption'} color={'textSecondary'}>
															{'1,000'}
														</Typography>
													</Box>
												</Box>
											</Box>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
							<Grid item xs={12} lg={6}>
								<Card className={classes.gridCard} square elevation={0}>
									<CardActionArea className={classes.cardActionArea}>
										<CardMedia className={classes.media} image={UpdateImg} title={'Contemplative Reptile'} />
										<CardContent>
											<Box display={'flex'} alignItems={'center'}>
												<Box maxWidth={'80%'}>
													<Typography className={classes.typography} noWrap variant={'body1'}>
														{'2020년 10월 10일 업데이트 안내'}
													</Typography>
												</Box>
												<Box ml={1}>
													<Chip className={classes.chip} label={'NEW'} color={'primary'} size={'small'} />
												</Box>
											</Box>
											<Box mt={1}>
												<Typography className={classes.descriptionTypography} variant={'body2'} color={'textSecondary'}>
													{'개념글 저장소 1주년을 맞이하여 대규모 업데이트가 진행되었습니다.'}
												</Typography>
											</Box>
											<Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={0.5}>
												<Box className={classes.infoBox}>
													<Typography variant={'caption'} color={'textSecondary'}>
														{'관리자'}
													</Typography>
													<Typography variant={'caption'} color={'textSecondary'}>
														{'1시간 전'}
													</Typography>
												</Box>
												<Box display={'flex'} alignItems={'center'}>
													<Box>
														<VisibilityIcon className={classes.icon} color={'action'} />
													</Box>
													<Box ml={0.5}>
														<Typography variant={'caption'} color={'textSecondary'}>
															{'1,000'}
														</Typography>
													</Box>
												</Box>
											</Box>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
						</Grid>
					</Hidden>
				</Grid>
				<Grid item xs={12} lg={6}>
					<Grid className={classes.gridItemContainer} container>
						<Grid item xs={12} lg={6}>
							<Card className={classes.gridCard} square elevation={0}>
								<CardActionArea className={classes.cardActionArea}>
									<CardMedia className={classes.media} image={UpdateImg} title={'Contemplative Reptile'} />
									<CardContent>
										<Box display={'flex'} alignItems={'center'}>
											<Box maxWidth={'80%'}>
												<Typography className={classes.typography} noWrap variant={'body1'}>
													{'2020년 10월 10일 업데이트 안내'}
												</Typography>
											</Box>
											<Box ml={1}>
												<Chip className={classes.chip} label={'NEW'} color={'primary'} size={'small'} />
											</Box>
										</Box>
										<Box mt={1}>
											<Typography className={classes.descriptionTypography} variant={'body2'} color={'textSecondary'}>
												{'개념글 저장소 1주년을 맞이하여 대규모 업데이트가 진행되었습니다.'}
											</Typography>
										</Box>
										<Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={0.5}>
											<Box className={classes.infoBox}>
												<Typography variant={'caption'} color={'textSecondary'}>
													{'관리자'}
												</Typography>
												<Typography variant={'caption'} color={'textSecondary'}>
													{'1시간 전'}
												</Typography>
											</Box>
											<Box display={'flex'} alignItems={'center'}>
												<Box>
													<VisibilityIcon className={classes.icon} color={'action'} />
												</Box>
												<Box ml={0.5}>
													<Typography variant={'caption'} color={'textSecondary'}>
														{'1,000'}
													</Typography>
												</Box>
											</Box>
										</Box>
									</CardContent>
								</CardActionArea>
							</Card>
						</Grid>
						<Grid item xs={12} lg={6}>
							<Card className={classes.gridCard} square elevation={0}>
								<CardActionArea className={classes.cardActionArea}>
									<CardMedia className={classes.media} image={UpdateImg} title={'Contemplative Reptile'} />
									<CardContent>
										<Box display={'flex'} alignItems={'center'}>
											<Box maxWidth={'80%'}>
												<Typography className={classes.typography} noWrap variant={'body1'}>
													{'2020년 10월 10일 업데이트 안내'}
												</Typography>
											</Box>
											<Box ml={1}>
												<Chip className={classes.chip} label={'NEW'} color={'primary'} size={'small'} />
											</Box>
										</Box>
										<Box mt={1}>
											<Typography className={classes.descriptionTypography} variant={'body2'} color={'textSecondary'}>
												{'개념글 저장소 1주년을 맞이하여 대규모 업데이트가 진행되었습니다.'}
											</Typography>
										</Box>
										<Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={0.5}>
											<Box className={classes.infoBox}>
												<Typography variant={'caption'} color={'textSecondary'}>
													{'관리자'}
												</Typography>
												<Typography variant={'caption'} color={'textSecondary'}>
													{'1시간 전'}
												</Typography>
											</Box>
											<Box display={'flex'} alignItems={'center'}>
												<Box>
													<VisibilityIcon className={classes.icon} color={'action'} />
												</Box>
												<Box ml={0.5}>
													<Typography variant={'caption'} color={'textSecondary'}>
														{'1,000'}
													</Typography>
												</Box>
											</Box>
										</Box>
									</CardContent>
								</CardActionArea>
							</Card>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} lg={6}>
					<Hidden xsDown>
						<Grid container>
							<Grid item xs={12}>
								<ListItem className={classes.listItem} disableGutters button>
									<Card className={classes.card} elevation={0} square>
										<CardMedia className={classes.cover} image={UpdateImg} />
										<div className={classes.details}>
											<CardContent>
												<Box display={'flex'} alignItems={'center'}>
													<Box maxWidth={'80%'}>
														<Typography className={classes.typography} noWrap variant={'body1'}>
															{'2020년 10월 10일 업데이트 안내'}
														</Typography>
													</Box>
													<Box ml={1}>
														<Chip className={classes.chip} label={'NEW'} color={'primary'} size={'small'} />
													</Box>
												</Box>
												<Box mt={1}>
													<Typography
														className={classes.descriptionTypography}
														variant={'body2'}
														color={'textSecondary'}
													>
														{
															'개념글 저장소 1주년을 맞이하여 대규모 업데이트가 진행되었습니다. 개념글 저장소 1주년을 맞이하여 대규모 업데이트가 진행되었습니다. 개념글 저장소 1주년을 맞이하여 대규모 업데이트가 진행되었습니다.'
														}
													</Typography>
												</Box>
												<Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={0.5}>
													<Box className={classes.infoBox}>
														<Typography variant={'caption'} color={'textSecondary'}>
															{'관리자'}
														</Typography>
														<Typography variant={'caption'} color={'textSecondary'}>
															{'1시간 전'}
														</Typography>
													</Box>
													<Box display={'flex'} alignItems={'center'}>
														<Box>
															<VisibilityIcon className={classes.icon} color={'action'} />
														</Box>
														<Box ml={0.5}>
															<Typography variant={'caption'} color={'textSecondary'}>
																{'1,000'}
															</Typography>
														</Box>
													</Box>
												</Box>
											</CardContent>
										</div>
									</Card>
								</ListItem>
							</Grid>
							<Grid item xs={12}>
								<ListItem className={classes.listItem} disableGutters button>
									<Card className={classes.card} elevation={0} square>
										<CardMedia className={classes.cover} image={UpdateImg} />
										<div className={classes.details}>
											<CardContent>
												<Box display={'flex'} alignItems={'center'}>
													<Box maxWidth={'80%'}>
														<Typography className={classes.typography} noWrap variant={'body1'}>
															{'2020년 10월 10일 업데이트 안내'}
														</Typography>
													</Box>
													<Box ml={1}>
														<Chip className={classes.chip} label={'NEW'} color={'primary'} size={'small'} />
													</Box>
												</Box>
												<Box mt={1}>
													<Typography
														className={classes.descriptionTypography}
														variant={'body2'}
														color={'textSecondary'}
													>
														{
															'개념글 저장소 1주년을 맞이하여 대규모 업데이트가 진행되었습니다. 개념글 저장소 1주년을 맞이하여 대규모 업데이트가 진행되었습니다. 개념글 저장소 1주년을 맞이하여 대규모 업데이트가 진행되었습니다.'
														}
													</Typography>
												</Box>
												<Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={0.5}>
													<Box className={classes.infoBox}>
														<Typography variant={'caption'} color={'textSecondary'}>
															{'관리자'}
														</Typography>
														<Typography variant={'caption'} color={'textSecondary'}>
															{'1시간 전'}
														</Typography>
													</Box>
													<Box display={'flex'} alignItems={'center'}>
														<Box>
															<VisibilityIcon className={classes.icon} color={'action'} />
														</Box>
														<Box ml={0.5}>
															<Typography variant={'caption'} color={'textSecondary'}>
																{'1,000'}
															</Typography>
														</Box>
													</Box>
												</Box>
											</CardContent>
										</div>
									</Card>
								</ListItem>
							</Grid>
						</Grid>
					</Hidden>
					<Hidden smUp>
						<Grid className={classes.gridItemContainer} container>
							<Grid item xs={12} lg={6}>
								<Card className={classes.gridCard} square elevation={0}>
									<CardActionArea className={classes.cardActionArea}>
										<CardMedia className={classes.media} image={UpdateImg} title={'Contemplative Reptile'} />
										<CardContent>
											<Box display={'flex'} alignItems={'center'}>
												<Box maxWidth={'80%'}>
													<Typography className={classes.typography} noWrap variant={'body1'}>
														{'2020년 10월 10일 업데이트 안내'}
													</Typography>
												</Box>
												<Box ml={1}>
													<Chip className={classes.chip} label={'NEW'} color={'primary'} size={'small'} />
												</Box>
											</Box>
											<Box mt={1}>
												<Typography className={classes.descriptionTypography} variant={'body2'} color={'textSecondary'}>
													{'개념글 저장소 1주년을 맞이하여 대규모 업데이트가 진행되었습니다.'}
												</Typography>
											</Box>
											<Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={0.5}>
												<Box className={classes.infoBox}>
													<Typography variant={'caption'} color={'textSecondary'}>
														{'관리자'}
													</Typography>
													<Typography variant={'caption'} color={'textSecondary'}>
														{'1시간 전'}
													</Typography>
												</Box>
												<Box display={'flex'} alignItems={'center'}>
													<Box>
														<VisibilityIcon className={classes.icon} color={'action'} />
													</Box>
													<Box ml={0.5}>
														<Typography variant={'caption'} color={'textSecondary'}>
															{'1,000'}
														</Typography>
													</Box>
												</Box>
											</Box>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
							<Grid item xs={12} lg={6}>
								<Card className={classes.gridCard} square elevation={0}>
									<CardActionArea className={classes.cardActionArea}>
										<CardMedia className={classes.media} image={UpdateImg} title={'Contemplative Reptile'} />
										<CardContent>
											<Box display={'flex'} alignItems={'center'}>
												<Box maxWidth={'80%'}>
													<Typography className={classes.typography} noWrap variant={'body1'}>
														{'2020년 10월 10일 업데이트 안내'}
													</Typography>
												</Box>
												<Box ml={1}>
													<Chip className={classes.chip} label={'NEW'} color={'primary'} size={'small'} />
												</Box>
											</Box>
											<Box mt={1}>
												<Typography className={classes.descriptionTypography} variant={'body2'} color={'textSecondary'}>
													{'개념글 저장소 1주년을 맞이하여 대규모 업데이트가 진행되었습니다.'}
												</Typography>
											</Box>
											<Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={0.5}>
												<Box className={classes.infoBox}>
													<Typography variant={'caption'} color={'textSecondary'}>
														{'관리자'}
													</Typography>
													<Typography variant={'caption'} color={'textSecondary'}>
														{'1시간 전'}
													</Typography>
												</Box>
												<Box display={'flex'} alignItems={'center'}>
													<Box>
														<VisibilityIcon className={classes.icon} color={'action'} />
													</Box>
													<Box ml={0.5}>
														<Typography variant={'caption'} color={'textSecondary'}>
															{'1,000'}
														</Typography>
													</Box>
												</Box>
											</Box>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
						</Grid>
					</Hidden>
				</Grid>
				<Grid item xs={12} lg={6}>
					<Grid className={classes.gridItemContainer} container>
						<Grid item xs={12} lg={6}>
							<Card className={classes.gridCard} square elevation={0}>
								<CardActionArea className={classes.cardActionArea}>
									<CardMedia className={classes.media} image={UpdateImg} title={'Contemplative Reptile'} />
									<CardContent>
										<Box display={'flex'} alignItems={'center'}>
											<Box maxWidth={'80%'}>
												<Typography className={classes.typography} noWrap variant={'body1'}>
													{'2020년 10월 10일 업데이트 안내'}
												</Typography>
											</Box>
											<Box ml={1}>
												<Chip className={classes.chip} label={'NEW'} color={'primary'} size={'small'} />
											</Box>
										</Box>
										<Box mt={1}>
											<Typography className={classes.descriptionTypography} variant={'body2'} color={'textSecondary'}>
												{'개념글 저장소 1주년을 맞이하여 대규모 업데이트가 진행되었습니다.'}
											</Typography>
										</Box>
										<Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={0.5}>
											<Box className={classes.infoBox}>
												<Typography variant={'caption'} color={'textSecondary'}>
													{'관리자'}
												</Typography>
												<Typography variant={'caption'} color={'textSecondary'}>
													{'1시간 전'}
												</Typography>
											</Box>
											<Box display={'flex'} alignItems={'center'}>
												<Box>
													<VisibilityIcon className={classes.icon} color={'action'} />
												</Box>
												<Box ml={0.5}>
													<Typography variant={'caption'} color={'textSecondary'}>
														{'1,000'}
													</Typography>
												</Box>
											</Box>
										</Box>
									</CardContent>
								</CardActionArea>
							</Card>
						</Grid>
						<Grid item xs={12} lg={6}>
							<Card className={classes.gridCard} square elevation={0}>
								<CardActionArea className={classes.cardActionArea}>
									<CardMedia className={classes.media} image={UpdateImg} title={'Contemplative Reptile'} />
									<CardContent>
										<Box display={'flex'} alignItems={'center'}>
											<Box maxWidth={'80%'}>
												<Typography className={classes.typography} noWrap variant={'body1'}>
													{'2020년 10월 10일 업데이트 안내'}
												</Typography>
											</Box>
											<Box ml={1}>
												<Chip className={classes.chip} label={'NEW'} color={'primary'} size={'small'} />
											</Box>
										</Box>
										<Box mt={1}>
											<Typography className={classes.descriptionTypography} variant={'body2'} color={'textSecondary'}>
												{'개념글 저장소 1주년을 맞이하여 대규모 업데이트가 진행되었습니다.'}
											</Typography>
										</Box>
										<Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={0.5}>
											<Box className={classes.infoBox}>
												<Typography variant={'caption'} color={'textSecondary'}>
													{'관리자'}
												</Typography>
												<Typography variant={'caption'} color={'textSecondary'}>
													{'1시간 전'}
												</Typography>
											</Box>
											<Box display={'flex'} alignItems={'center'}>
												<Box>
													<VisibilityIcon className={classes.icon} color={'action'} />
												</Box>
												<Box ml={0.5}>
													<Typography variant={'caption'} color={'textSecondary'}>
														{'1,000'}
													</Typography>
												</Box>
											</Box>
										</Box>
									</CardContent>
								</CardActionArea>
							</Card>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Box className={classes.buttonBox}>
				<Button
					className={classes.button}
					fullWidth
					variant={'contained'}
					color={'primary'}
					startIcon={<ExpandMoreIcon />}
				>
					{'더 보기'}
				</Button>
			</Box>
		</Container>
	);
}

export default memo(NoticeGridList);
