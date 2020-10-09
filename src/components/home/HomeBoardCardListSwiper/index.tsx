import React, { memo } from 'react';
import Link from 'next/link';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Material UI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Grow from '@material-ui/core/Grow';
import NoSsr from '@material-ui/core/NoSsr';

// Material UI Labs
import Skeleton from '@material-ui/lab/Skeleton';

// Material UI Icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

// Svgs
import DefaultImageSvg from 'styles/svgs/default_image.svg';

// Modules
import { Board } from 'modules/boardDetail';

type HomeBoardCardListSwiperProps = {
	boardList: Array<Board>;
	pending: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			margin: theme.spacing(1, 0),
			padding: theme.spacing(1, 0, 0),
			backgroundColor: 'white'
		},
		title: {
			paddingBottom: theme.spacing(1),
			fontWeight: 700,
			color: '#3d3d3d',
			cursor: 'default'
		},
		box: {
			padding: theme.spacing(1, 0),
			backgroundColor: '#eff1f5',
			[theme.breakpoints.down('md')]: {
				backgroundColor: 'white'
			}
		},
		cardWrapper: {
			position: 'relative',
			'&:hover img': {
				transform: 'translate(-50%, -50%) scale(1.2)'
			}
		},
		cardWrapperInner: {
			position: 'relative',
			paddingTop: '100%',
			overflow: 'hidden'
		},
		cardCentered: {
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			transform: 'translate(50%, 50%)',
			'& img': {
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				maxWidth: '100%',
				height: '100%',
				backgroundSize: 'cover',
				transform: 'translate(-50%, -50%)',
				transition: 'all .5s'
			}
		},
		cardCenteredDefaultImage: {
			maxWidth: '100px !important'
		},
		cardBackground: {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			backgroundImage: 'linear-gradient(180deg, transparent, rgba(0, 0, 0, .8))',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'flex-end'
		},
		cardBackgroundSkeleton: {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'flex-end',
			backgroundColor: '#eff1f5',
			cursor: 'default',
			[theme.breakpoints.down('md')]: {
				backgroundColor: 'white'
			}
		},
		cardTitle: {
			padding: theme.spacing(1),
			color: 'white',
			[theme.breakpoints.down('md')]: {
				fontSize: 16
			}
		},
		cardTitleSkeleton: {
			padding: theme.spacing(1, 0)
		},
		cardDescription: {
			padding: theme.spacing(0, 1),
			display: 'box',
			boxOrient: 'vertical',
			lineClamp: 2,
			fontSize: '12px',
			textOverflow: 'ellipsis',
			overflow: 'hidden',
			color: '#888'
		},
		cardInfo: {
			padding: theme.spacing(1),
			color: '#888'
		},
		cardInfoViewCount: {
			textAlign: 'right',
			color: '#c7c7cc',
			'& svg': {
				verticalAlign: 'middle'
			}
		},
		cardInfoViewCountSkeleton: {
			marginLeft: 'auto'
		},
		swiperContainer: {
			paddingLeft: 'calc(50% - 616px)',
			[theme.breakpoints.down('md')]: {
				paddingLeft: theme.spacing(3)
			},
			'& .swiper-slide': {
				width: '23% !important'
			},
			'& .swiper-button-prev, .swiper-button-next': {
				color: theme.palette.primary.main
			}
		}
	})
);

SwiperCore.use([Navigation]);

function HomeBoardCardListSwiper({ boardList, pending }: HomeBoardCardListSwiperProps) {
	const classes = useStyles();
	return (
		<Box className={classes.root}>
			<Container>
				<Typography className={classes.title} variant={'h6'} component={'h6'}>
					{'이전 저장소 일간 개념글'}
				</Typography>
			</Container>
			<Box className={classes.box}>
				{pending && (
					<Swiper className={classes.swiperContainer} spaceBetween={15} slidesPerView={'auto'}>
						{Array.from({ length: 7 }, (value, index) => index).map((index) => (
							<SwiperSlide key={`dummy-swiper-board-card-${index}`}>
								<Grow in>
									<Card square elevation={0}>
										<Box className={classes.cardWrapper}>
											<Box className={classes.cardWrapperInner} />
											<Box className={classes.cardBackgroundSkeleton}>
												<Skeleton variant={'rect'} width={'100%'} height={'100%'} animation={'wave'} />
												<Typography noWrap className={classes.cardTitleSkeleton} variant={'h6'} component={'h6'}>
													<Skeleton animation={'wave'} />
												</Typography>
												<Typography variant={'h6'} component={'h6'}>
													<Skeleton animation={'wave'} height={15} />
													<Skeleton animation={'wave'} height={15} />
												</Typography>
												<Grid container justify={'center'}>
													<Grid item xs={6}>
														<Skeleton width={50} animation={'wave'} />
													</Grid>
													<Grid item xs={6} className={classes.cardInfoViewCount}>
														<Skeleton className={classes.cardInfoViewCountSkeleton} width={50} animation={'wave'} />
													</Grid>
												</Grid>
											</Box>
										</Box>
									</Card>
								</Grow>
							</SwiperSlide>
						))}
					</Swiper>
				)}
				<NoSsr>
					{!pending && (
						<Swiper
							className={classes.swiperContainer}
							spaceBetween={15}
							slidesPerView={'auto'}
							navigation
							pagination={{ clickable: true }}
							scrollbar={{ draggable: true }}
						>
							{boardList.map((item: Board) => (
								<SwiperSlide key={`swiper-board-card-${item.id}`}>
									<Grow in>
										<Card square>
											<Link href={'/board/[id]/[detail]'} as={`/board/${item.category_id}/${item.id}`}>
												<a>
													<Box className={classes.cardWrapper}>
														<Box className={classes.cardWrapperInner}>
															<Box className={classes.cardCentered}>
																{item.image ? (
																	<img src={item.image} alt={'Thumbnail'} />
																) : (
																	<img
																		className={classes.cardCenteredDefaultImage}
																		src={DefaultImageSvg}
																		alt={'Default Thumbnail'}
																	/>
																)}
																{item.image ? (
																	<img src={item.image} alt={'Thumbnail'} />
																) : (
																	<img
																		className={classes.cardCenteredDefaultImage}
																		src={DefaultImageSvg}
																		alt={'Default Thumbnail'}
																	/>
																)}
															</Box>
														</Box>
														<Box className={classes.cardBackground}>
															<Typography noWrap className={classes.cardTitle} variant={'h6'} component={'h6'}>
																{item.subject}
															</Typography>
															<Typography className={classes.cardDescription} variant={'subtitle1'}>
																{item.description}
															</Typography>
															<Grid container justify={'space-between'} className={classes.cardInfo}>
																<Grid item>{item.nickname}</Grid>
																<Grid item className={classes.cardInfoViewCount}>
																	<Box component={'span'} marginRight={1} fontSize={12}>
																		<ThumbUpAltIcon fontSize={'small'} /> {Number(item.up).toLocaleString()}
																	</Box>
																	<Box component={'span'} fontSize={12}>
																		<VisibilityIcon fontSize={'small'} /> {Number(item.view).toLocaleString()}
																	</Box>
																</Grid>
															</Grid>
														</Box>
													</Box>
												</a>
											</Link>
										</Card>
									</Grow>
								</SwiperSlide>
							))}
						</Swiper>
					)}
				</NoSsr>
			</Box>
		</Box>
	);
}

export default memo(HomeBoardCardListSwiper);
