import React, { useEffect, useState, memo } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import moment from 'moment';
import clsx from 'clsx';

// Material UI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';

// Material UI Icons
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ReplyIcon from '@material-ui/icons/Reply';
import DeleteIcon from '@material-ui/icons/Delete';

// Custom Hooks
import useDetailCommentList from 'hooks/notices/detail/useDetailCommentList';

// Modules
import { NoticeDetailComment, NoticeDetailReply } from 'modules/notices/detail';

// Components
import DataEmptyBox from 'components/common/DataEmptyBox';
import CommentWriterInfoBadge from 'components/common/CommentWriterInfoBadge';
import ReplyWriteForm from './ReplyWriteForm';

interface TransferReply extends NoticeDetailReply {
	popperId: number;
	open: boolean;
	anchorRef: any | null;
}

interface TransferComment extends NoticeDetailComment {
	popperId: number;
	open: boolean;
	anchorRef: any | null;
	replies: TransferReply[];
}

moment.locale('ko');

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginTop: theme.spacing(2),
			border: `1px solid ${theme.palette.grey['50']}`,
			borderRadius: 4,
			backgroundColor: theme.palette.background.paper,
			overflow: 'hidden',
			[theme.breakpoints.down('md')]: {
				marginTop: 0,
				borderLeft: 'none',
				borderRight: 'none',
				borderRadius: 'inherit'
			}
		},
		rootBorderBottomNone: {
			[theme.breakpoints.down('md')]: {
				borderBottom: 'none'
			}
		},
		commentOrderList: {
			display: 'flex',
			padding: theme.spacing(2, 0),
			borderBottom: `1px solid ${theme.palette.grey['50']}`,
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(2, 3)
			},
			[theme.breakpoints.down('xs')]: {
				padding: theme.spacing(2, 2)
			}
		},
		commentOrderListItem: {
			width: 'auto',
			padding: theme.spacing(0, 2),
			cursor: 'pointer',
			color: theme.palette.type === 'light' ? theme.palette.grey.A200 : '',
			transition: 'color .5s',
			'&::after': {
				content: '""',
				display: 'block',
				marginLeft: theme.spacing(1),
				width: 3,
				height: 3,
				border: `1px solid ${theme.palette.grey.A200}`,
				borderRadius: '50%',
				backgroundColor: theme.palette.grey.A200
			},
			'&:last-child::after': {
				display: 'none'
			},
			'&:hover': {
				backgroundColor: 'none !important',
				color: theme.palette.type === 'light' ? 'white' : 'none'
			},
			'&.Mui-selected': {
				backgroundColor: theme.palette.type === 'light' ? 'white' : theme.palette.background.paper,
				color: theme.palette.primary.main
			},
			'&.Mui-selected:hover': {
				backgroundColor: 'none !important'
			},
			'& p': {
				fontFamily: 'NanumSquareRoundEB'
			},
			[theme.breakpoints.down('md')]: {
				padding: 0
			}
		},
		commentListItem: {
			display: 'block',
			padding: 0
		},
		commentListBox: {
			padding: theme.spacing(2),
			wordBreak: 'break-all',
			wordWrap: 'break-word',
			overflow: 'hidden',
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(2, 1)
			},
			[theme.breakpoints.down('xs')]: {
				padding: theme.spacing(2, 0)
			}
		},
		commentListItemWriterBoxGrid: {
			alignItems: 'center',
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(0, 2)
			}
		},
		commentListItemWriterBox: {
			display: 'flex',
			alignItems: 'center',
			color: theme.palette.type === 'light' ? theme.palette.grey.A200 : '',
			marginBottom: theme.spacing(1),
			'& > div::after': {
				content: '""',
				display: 'inline-block',
				margin: theme.spacing(1),
				width: 3,
				height: 3,
				border: `1px solid ${theme.palette.grey.A200}`,
				borderRadius: '50%',
				backgroundColor: theme.palette.grey.A200,
				verticalAlign: 'middle'
			},
			'& > div:last-child::after': {
				display: 'none'
			},
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(0)
			}
		},
		commentListItemWriterAvatar: {
			width: theme.spacing(4),
			height: theme.spacing(4),
			fontSize: 14
		},
		commentListItemWriterNickname: {
			marginLeft: theme.spacing(1),
			fontSize: 16,
			color: theme.palette.type === 'light' ? theme.palette.grey.A700 : '',
			overflow: 'hidden',
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis'
		},
		commentListItemAdminSpecificNickname: {
			fontFamily: 'NanumSquareRoundEB'
		},
		commentListItemContent: {
			fontSize: 14,
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(1, 2, 0, 2)
			}
		},
		commentListItemButton: {
			padding: theme.spacing(2, 0, 1),
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(2, 2, 1, 2)
			}
		},
		commentListItemButtonSkeleton: {
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(0, 2)
			}
		},
		replyBox: {
			padding: theme.spacing(2, 4),
			backgroundColor: theme.palette.background.default,
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(2, 3)
			},
			[theme.breakpoints.down('xs')]: {
				padding: theme.spacing(2)
			}
		},
		replyBoxItemWriterBox: {
			display: 'flex',
			alignItems: 'center',
			color: theme.palette.type === 'light' ? theme.palette.grey.A200 : '',
			'&::before': {
				content: '""',
				display: 'inline-block',
				width: 20,
				height: 20,
				marginBottom: 15,
				borderLeft: `2px solid ${theme.palette.grey.A100}`,
				borderBottom: `2px solid ${theme.palette.grey.A100}`
			},
			'& > div::after': {
				content: '""',
				display: 'inline-block',
				margin: theme.spacing(1),
				width: 3,
				height: 3,
				border: `1px solid ${theme.palette.grey.A200}`,
				borderRadius: '50%',
				backgroundColor: theme.palette.grey.A200,
				verticalAlign: 'middle'
			},
			'& > div:last-child::after': {
				display: 'none'
			}
		},
		replyBoxItemWriterAvatar: {
			width: theme.spacing(4),
			height: theme.spacing(4),
			fontSize: 14
		},
		replyBoxItemWriterNickname: {
			marginLeft: theme.spacing(1),
			fontSize: 16,
			color: theme.palette.type === 'light' ? theme.palette.grey.A700 : '',
			overflow: 'hidden',
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis'
		},
		replyBoxItemAdminSpecificNickname: {
			fontFamily: 'NanumSquareRoundEB'
		},
		replyBoxItemContent: {
			padding: theme.spacing(1, 0, 2, 3),
			wordBreak: 'break-all',
			wordWrap: 'break-word',
			fontSize: 14,
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(1, 0, 0, 3)
			}
		},
		replyBoxItemWriterDate: {
			color: theme.palette.type === 'light' ? theme.palette.grey.A200 : '',
			[theme.breakpoints.down('md')]: {
				padding: theme.spacing(1, 0, 0, 3)
			}
		},
		button: {
			color: 'white'
		},
		popper: {
			left: '-50px !important',
			zIndex: 10,
			[theme.breakpoints.down('sm')]: {
				left: '-40px !important'
			}
		},
		noWrapBox: {
			overflow: 'hidden',
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis'
		}
	})
);

function DetailCommentList() {
	const classes = useStyles();
	const {
		detail: { user },
		userId,
		comments: { pending, data },
		onHandleNoticeDetailDeleteAuthDialog,
		onHandleNoticeDetailReplyWriteForm,
		onDeleteNoticeDetailComment,
		onDeleteNoticeDetailReply
	} = useDetailCommentList();

	const [transferComments, setTransferComments] = useState<TransferComment[]>([]);

	const handleCommentPopperToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
		const id = Number(event.currentTarget.getAttribute('data-comment-id') || 0);

		setTransferComments(
			transferComments.map((item) => ({
				...item,
				anchorRef: item.id === id ? event.currentTarget : item.anchorRef,
				open: item.id === id ? !item.open : item.open
			}))
		);
	};

	const handleCommentPopperClose = () => {
		setTransferComments(
			transferComments.map((item) => ({
				...item,
				open: false
			}))
		);
	};

	const handleReplyPopperToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
		const id = Number(event.currentTarget.getAttribute('data-reply-id') || 0);

		setTransferComments(
			transferComments.map((item) => ({
				...item,
				replies: item.replies.map((reply) => ({
					...reply,
					anchorRef: reply.id === id ? event.currentTarget : reply.anchorRef,
					open: reply.id === id ? !reply.open : reply.open
				}))
			}))
		);
	};

	const handleReplyPopperClose = () => {
		setTransferComments(
			transferComments.map((item) => ({
				...item,
				replies: item.replies.map((reply) => ({
					...reply,
					open: false
				}))
			}))
		);
	};

	useEffect(() => {
		setTransferComments(
			data.map((item) => ({
				...item,
				popperId: item.id,
				open: false,
				anchorRef: null,
				replies: item.replies.map((reply) => ({
					...reply,
					popperId: reply.id,
					open: false,
					anchorRef: null
				}))
			}))
		);
	}, [data]);

	return (
		<Box
			className={clsx(classes.root, {
				[classes.rootBorderBottomNone]: !pending && transferComments.length === 0
			})}
		>
			<List className={classes.commentOrderList} disablePadding>
				<ListItem className={classes.commentOrderListItem} selected>
					<Box>
						{pending ? (
							<Box>
								<Skeleton width={50} height={50} />
							</Box>
						) : (
							<Typography variant={'body1'}>{'최신순'}</Typography>
						)}
					</Box>
				</ListItem>
			</List>
			<List disablePadding>
				<ListItem className={classes.commentListItem}>
					{pending && (
						<Grow in>
							<Box>
								<Box className={classes.commentListBox}>
									<Grid className={classes.commentListItemWriterBoxGrid} container>
										<Grid item xs={10}>
											<Box className={classes.commentListItemWriterBox}>
												<Box display={'flex'} alignItems={'center'}>
													<Skeleton variant={'circle'} animation={'wave'} width={35} height={35} />
													<Box className={classes.commentListItemWriterNickname} component={'span'}>
														<Skeleton animation={'wave'} width={35} />
													</Box>
													<Box component={'span'} ml={1}>
														<Skeleton animation={'wave'} width={35} />
													</Box>
												</Box>
												<Box>
													<Skeleton animation={'wave'} width={50} />
												</Box>
											</Box>
										</Grid>
										<Grid item xs={2}>
											<Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
												<Skeleton animation={'wave'} width={30} />
											</Box>
										</Grid>
									</Grid>
									<Box className={classes.commentListItemContent}>
										<Skeleton animation={'wave'} />
										<Skeleton animation={'wave'} />
										<Skeleton animation={'wave'} />
									</Box>
									<Box className={classes.commentListItemButtonSkeleton}>
										<Skeleton animation={'wave'} width={70} height={50} />
									</Box>
								</Box>
								<Box className={classes.replyBox}>
									<Grid container alignItems={'center'}>
										<Grid item xs={10}>
											<Box className={classes.replyBoxItemWriterBox}>
												<Box display={'flex'} alignItems={'center'}>
													<Skeleton variant={'circle'} animation={'wave'} width={35} height={35} />
													<Box className={classes.replyBoxItemWriterNickname} component={'span'}>
														<Skeleton animation={'wave'} width={35} />
													</Box>
													<Box component={'span'} ml={1}>
														<Skeleton animation={'wave'} width={35} />
													</Box>
												</Box>
												<Box>
													<Skeleton animation={'wave'} width={50} />
												</Box>
											</Box>
										</Grid>
										<Grid item xs={2}>
											<Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
												<Skeleton animation={'wave'} width={30} />
											</Box>
										</Grid>
									</Grid>
									<Box pt={1} pl={3}>
										<Skeleton animation={'wave'} />
										<Skeleton animation={'wave'} />
										<Skeleton animation={'wave'} />
									</Box>
								</Box>
								<Box className={classes.commentListBox}>
									<Grid className={classes.commentListItemWriterBoxGrid} container>
										<Grid item xs={10}>
											<Box className={classes.commentListItemWriterBox}>
												<Box display={'flex'} alignItems={'center'}>
													<Skeleton variant={'circle'} animation={'wave'} width={35} height={35} />
													<Box className={classes.commentListItemWriterNickname} component={'span'}>
														<Skeleton animation={'wave'} width={35} />
													</Box>
													<Box component={'span'} ml={1}>
														<Skeleton animation={'wave'} width={35} />
													</Box>
												</Box>
												<Box>
													<Skeleton animation={'wave'} width={50} />
												</Box>
											</Box>
										</Grid>
										<Grid item xs={2}>
											<Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
												<Skeleton animation={'wave'} width={30} />
											</Box>
										</Grid>
									</Grid>
									<Box className={classes.commentListItemContent}>
										<Skeleton animation={'wave'} />
										<Skeleton animation={'wave'} />
										<Skeleton animation={'wave'} />
									</Box>
									<Box className={classes.commentListItemButtonSkeleton}>
										<Skeleton animation={'wave'} width={70} height={50} />
									</Box>
								</Box>
								<Box className={classes.replyBox}>
									<Grid container alignItems={'center'}>
										<Grid item xs={10}>
											<Box className={classes.replyBoxItemWriterBox}>
												<Box display={'flex'} alignItems={'center'}>
													<Skeleton variant={'circle'} animation={'wave'} width={35} height={35} />
													<Box className={classes.replyBoxItemWriterNickname} component={'span'}>
														<Skeleton animation={'wave'} width={35} />
													</Box>
													<Box component={'span'} ml={1}>
														<Skeleton animation={'wave'} width={35} />
													</Box>
												</Box>
												<Box>
													<Skeleton animation={'wave'} width={50} />
												</Box>
											</Box>
										</Grid>
										<Grid item xs={2}>
											<Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
												<Skeleton animation={'wave'} width={30} />
											</Box>
										</Grid>
									</Grid>
									<Box pt={1} pl={3}>
										<Skeleton animation={'wave'} />
										<Skeleton animation={'wave'} />
										<Skeleton animation={'wave'} />
									</Box>
								</Box>
								<Box className={classes.commentListBox}>
									<Grid className={classes.commentListItemWriterBoxGrid} container>
										<Grid item xs={10}>
											<Box className={classes.commentListItemWriterBox}>
												<Box display={'flex'} alignItems={'center'}>
													<Skeleton variant={'circle'} animation={'wave'} width={35} height={35} />
													<Box className={classes.commentListItemWriterNickname} component={'span'}>
														<Skeleton animation={'wave'} width={35} />
													</Box>
													<Box component={'span'} ml={1}>
														<Skeleton animation={'wave'} width={35} />
													</Box>
												</Box>
												<Box>
													<Skeleton animation={'wave'} width={50} />
												</Box>
											</Box>
										</Grid>
										<Grid item xs={2}>
											<Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
												<Skeleton animation={'wave'} width={30} />
											</Box>
										</Grid>
									</Grid>
									<Box className={classes.commentListItemContent}>
										<Skeleton animation={'wave'} />
										<Skeleton animation={'wave'} />
										<Skeleton animation={'wave'} />
									</Box>
									<Box className={classes.commentListItemButtonSkeleton}>
										<Skeleton animation={'wave'} width={70} height={50} />
									</Box>
								</Box>
							</Box>
						</Grow>
					)}
					{!pending
						&& transferComments.map((item) => (
							<Grow key={`notice-detail-comment-${item.id}`} in>
								<Box>
									<Box className={classes.commentListBox}>
										<Grid className={classes.commentListItemWriterBoxGrid} container justify={'space-between'}>
											<Grid item xs={10}>
												<Box className={classes.commentListItemWriterBox}>
													<Box display={'flex'} alignItems={'center'}>
														{item.isMember ? (
															<>
																<Avatar
																	className={classes.commentListItemWriterAvatar}
																	src={item.user?.avatarUrl || ''}
																>
																	{!item.user?.avatarUrl && item.user?.nickname.charAt(0)}
																</Avatar>
																<Box
																	component={'span'}
																	className={clsx(classes.commentListItemWriterNickname, {
																		[classes.commentListItemAdminSpecificNickname]: item.user?.role === 'admin'
																	})}
																>
																	{item.user?.nickname}
																</Box>
																{(item.user?.role === 'admin' || user?.id === item.user?.id) && (
																	<Box component={'span'} ml={1}>
																		<CommentWriterInfoBadge
																			boardUserId={user?.id || 0}
																			commentUserId={item.user?.id}
																			userRole={item.user?.role}
																		/>
																	</Box>
																)}
															</>
														) : (
															<>
																<Avatar className={classes.commentListItemWriterAvatar}>
																	{item.nickname && item.nickname.charAt(0)}
																</Avatar>
																<Box component={'span'} className={classes.commentListItemWriterNickname}>
																	{item.nickname}
																</Box>
																<Box className={classes.noWrapBox} component={'span'} ml={0.5}>
																	{`(${item.createdIp})`}
																</Box>
															</>
														)}
													</Box>
													<Box className={classes.noWrapBox}>
														{moment(item.createdAt, 'YYYYMMDDHH:mm:ss').fromNow()}
													</Box>
												</Box>
											</Grid>
											<Grid item xs={2}>
												{!item.isMember && (
													<Box textAlign={'right'}>
														<IconButton
															ref={item.anchorRef}
															data-comment-id={item.id}
															onClick={handleCommentPopperToggle}
														>
															<MoreVertIcon />
														</IconButton>
														<Popper
															className={classes.popper}
															open={item.open}
															anchorEl={item.anchorRef}
															role={undefined}
															transition
															disablePortal
														>
															{({ TransitionProps, placement }) => (
																<Grow
																	{...TransitionProps}
																	style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
																>
																	<Paper>
																		<ClickAwayListener onClickAway={handleCommentPopperClose}>
																			<MenuList autoFocusItem={item.open}>
																				<MenuItem
																					onClick={onHandleNoticeDetailDeleteAuthDialog}
																					data-id={item.id}
																					data-sub-title={'댓글 삭제'}
																					data-type={'comment'}
																				>
																					<ListItemIcon>
																						<DeleteIcon />
																					</ListItemIcon>
																					{'삭제'}
																				</MenuItem>
																			</MenuList>
																		</ClickAwayListener>
																	</Paper>
																</Grow>
															)}
														</Popper>
													</Box>
												)}
												{item.isMember && item.user?.id === userId && (
													<Box textAlign={'right'}>
														<IconButton
															ref={item.anchorRef}
															data-comment-id={item.id}
															onClick={handleCommentPopperToggle}
														>
															<MoreVertIcon />
														</IconButton>
														<Popper
															className={classes.popper}
															open={item.open}
															anchorEl={item.anchorRef}
															role={undefined}
															transition
															disablePortal
														>
															{({ TransitionProps, placement }) => (
																<Grow
																	{...TransitionProps}
																	style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
																>
																	<Paper>
																		<ClickAwayListener onClickAway={handleCommentPopperClose}>
																			<MenuList autoFocusItem={item.open}>
																				<MenuItem onClick={onDeleteNoticeDetailComment} data-comment-id={item.id}>
																					<ListItemIcon>
																						<DeleteIcon />
																					</ListItemIcon>
																					{'삭제'}
																				</MenuItem>
																			</MenuList>
																		</ClickAwayListener>
																	</Paper>
																</Grow>
															)}
														</Popper>
													</Box>
												)}
											</Grid>
										</Grid>
										<Box className={classes.commentListItemContent}>
											{item.content.split('\n').map((item) => (
												<span key={`notice-detail-comment-content-line-${item}`}>
													{item}
													<br />
												</span>
											))}
										</Box>
										<Box className={classes.commentListItemButton}>
											<Button
												className={classes.button}
												variant={'contained'}
												color={'primary'}
												startIcon={<ReplyIcon />}
												data-comment-id={item.id}
												onClick={onHandleNoticeDetailReplyWriteForm}
											>
												{`답글 ${item.replies.length}`}
											</Button>
										</Box>
									</Box>
									{item.replies.map((reply) => (
										<Box key={`notice-detail-comment-reply-${reply.id}`} className={classes.replyBox}>
											<Grid container alignItems={'center'} justify={'space-between'}>
												<Grid item xs={10}>
													<Box className={classes.replyBoxItemWriterBox} display={'flex'} alignItems={'center'}>
														<Box display={'flex'} alignItems={'center'}>
															{reply.isMember ? (
																<>
																	<Avatar
																		className={classes.replyBoxItemWriterAvatar}
																		src={reply.user?.avatarUrl || ''}
																	>
																		{!reply.user?.avatarUrl && reply.user?.nickname.charAt(0)}
																	</Avatar>
																	<Box
																		component={'span'}
																		className={clsx(classes.replyBoxItemWriterNickname, {
																			[classes.replyBoxItemAdminSpecificNickname]: reply.user?.role === 'admin'
																		})}
																	>
																		{reply.user?.nickname}
																	</Box>
																	{(reply.user?.role === 'admin' || user?.id === reply.user?.id) && (
																		<Box component={'span'} ml={1}>
																			<CommentWriterInfoBadge
																				boardUserId={user?.id || 0}
																				commentUserId={reply.user?.id}
																				userRole={reply.user?.role}
																			/>
																		</Box>
																	)}
																</>
															) : (
																<>
																	<Avatar className={classes.replyBoxItemWriterAvatar}>
																		{reply.nickname && reply.nickname.charAt(0)}
																	</Avatar>
																	<Box className={classes.replyBoxItemWriterNickname} component={'span'}>
																		{reply.nickname}
																	</Box>
																	<Box className={classes.noWrapBox} component={'span'} ml={0.5}>
																		{`(${reply.createdIp})`}
																	</Box>
																</>
															)}
														</Box>
														<Box className={classes.noWrapBox}>
															{moment(reply.createdAt, 'YYYYMMDDHH:mm:ss').fromNow()}
														</Box>
													</Box>
												</Grid>
												<Grid item xs={2}>
													{!reply.isMember && (
														<Box textAlign={'right'}>
															<IconButton
																ref={reply.anchorRef}
																data-reply-id={reply.id}
																onClick={handleReplyPopperToggle}
															>
																<MoreVertIcon />
															</IconButton>
															<Popper
																className={classes.popper}
																open={reply.open}
																anchorEl={reply.anchorRef}
																role={undefined}
																transition
																disablePortal
															>
																{({ TransitionProps, placement }) => (
																	<Grow
																		{...TransitionProps}
																		style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
																	>
																		<Paper>
																			<ClickAwayListener onClickAway={handleReplyPopperClose}>
																				<MenuList autoFocusItem={reply.open}>
																					<MenuItem
																						onClick={onHandleNoticeDetailDeleteAuthDialog}
																						data-id={reply.id}
																						data-sub-title={'답글 삭제'}
																						data-type={'reply'}
																					>
																						<ListItemIcon>
																							<DeleteIcon />
																						</ListItemIcon>
																						{'삭제'}
																					</MenuItem>
																				</MenuList>
																			</ClickAwayListener>
																		</Paper>
																	</Grow>
																)}
															</Popper>
														</Box>
													)}
													{reply.isMember && reply.user?.id === userId && (
														<Box textAlign={'right'}>
															<IconButton
																ref={reply.anchorRef}
																data-reply-id={reply.id}
																onClick={handleReplyPopperToggle}
															>
																<MoreVertIcon />
															</IconButton>
															<Popper
																className={classes.popper}
																open={reply.open}
																anchorEl={reply.anchorRef}
																role={undefined}
																transition
																disablePortal
															>
																{({ TransitionProps, placement }) => (
																	<Grow
																		{...TransitionProps}
																		style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
																	>
																		<Paper>
																			<ClickAwayListener onClickAway={handleReplyPopperClose}>
																				<MenuList autoFocusItem={reply.open}>
																					<MenuItem
																						onClick={onDeleteNoticeDetailReply}
																						data-comment-id={item.id}
																						data-reply-id={reply.id}
																					>
																						<ListItemIcon>
																							<DeleteIcon />
																						</ListItemIcon>
																						{'삭제'}
																					</MenuItem>
																				</MenuList>
																			</ClickAwayListener>
																		</Paper>
																	</Grow>
																)}
															</Popper>
														</Box>
													)}
												</Grid>
											</Grid>
											<Box className={classes.replyBoxItemContent}>
												{reply.content.split('\n').map((item, index) => (
													// eslint-disable-next-line react/no-array-index-key
													<span key={`notice-detail-reply-content-line-${index}`}>
														{item}
														<br />
													</span>
												))}
											</Box>
										</Box>
									))}
									{item.selected && (
										<Grow in>
											<Box className={classes.replyBox}>
												<ReplyWriteForm />
											</Box>
										</Grow>
									)}
								</Box>
							</Grow>
						))}
					{!pending && data.length === 0 && (
						<Grow in>
							<DataEmptyBox message={'첫 댓글의 주인공이 되어보세요!'} paddingTop={10} paddingBottom={10} />
						</Grow>
					)}
				</ListItem>
			</List>
		</Box>
	);
}

export default memo(DetailCommentList);
