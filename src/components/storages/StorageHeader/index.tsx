import React, { memo } from 'react';
import Link from 'next/link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Material UI
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Material UI Icons
import ForumIcon from '@material-ui/icons/Forum';
import AddBoxIcon from '@material-ui/icons/AddBox';

// Custom Hooks
import useStorageHeader from 'hooks/storages/board/useStorageHeader';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			margin: theme.spacing(2, 2, 0),
			borderRadius: 4,
			background:
				theme.palette.type === 'light'
					? `linear-gradient(to right, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`
					: theme.palette.background.paper,
			[theme.breakpoints.down('md')]: {
				height: 'auto',
				margin: 0,
				borderRadius: 'inherit'
			},
			'& a': {
				textDecoration: 'none',
				color: 'inherit'
			}
		},
		container: {
			display: 'flex',
			height: '100%',
			flexDirection: 'column',
			justifyContent: 'flex-end'
		},
		typography: {
			width: '100%',
			color: 'white',
			cursor: 'pointer',
			[theme.breakpoints.down('md')]: {
				fontSize: 22
			},
			[theme.breakpoints.down('xs')]: {
				fontSize: 20
			}
		},
		descriptionTypography: {
			color: 'white'
		},
		box: {
			padding: theme.spacing(3, 0)
		},
		icon: {
			verticalAlign: 'middle',
			color: 'white',
			cursor: 'pointer'
		},
		button: {
			height: 20,
			color: 'white'
		}
	})
);

function StorageHeader() {
	const classes = useStyles();
	const { isAuthenticated, onHandleStorageManageDialogOpen, onHandleSignInDialog } = useStorageHeader();

	return (
		<Box className={classes.root}>
			<Container className={classes.container}>
				<Box className={classes.box}>
					<Box display={'flex'} alignItems={'center'}>
						<Box>
							<Link href={'/storages'} as={'/storages'}>
								<a>
									<ForumIcon className={classes.icon} fontSize={'large'} />
								</a>
							</Link>
						</Box>
						<Box flex={1} ml={0.5}>
							<Link href={'/storages'} as={'/storages'}>
								<a>
									<Typography className={classes.typography} variant={'h5'}>
										{'커뮤니티'}
									</Typography>
								</a>
							</Link>
						</Box>
					</Box>
					<Box display={'flex'} alignItems={'top'} justifyContent={'space-between'}>
						<Typography className={classes.descriptionTypography} variant={'caption'}>
							{'원하는 게시판을 만들어 운영해보세요!'}
						</Typography>
						<Button
							className={classes.button}
							size={'small'}
							startIcon={<AddBoxIcon />}
							onClick={isAuthenticated ? onHandleStorageManageDialogOpen : onHandleSignInDialog}
						>
							{'새 게시판 등록'}
						</Button>
					</Box>
				</Box>
			</Container>
		</Box>
	);
}

export default memo(StorageHeader);
