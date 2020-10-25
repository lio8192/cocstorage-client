import React, {
	useEffect, useState, useCallback, FunctionComponent, memo
} from 'react';

// Material UI
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';

// Material UI Icons
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import AttachFileIcon from '@material-ui/icons/AttachFile';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IUploadImagePopoverProps {
	anchor: TAnchor;
	onSubmit: (data: TUploadImageData, insert: boolean) => void;
}

type TUploadImagePopoverState = {
	anchor: TAnchor;
	isCancelled: boolean;
};

type TUploadImageData = {
	file?: File;
};

type TAnchor = HTMLElement | null;

const cardPopoverStyles = makeStyles({
	root: {
		padding: 10,
		maxWidth: 350,
		overflow: 'hidden'
	},
	textField: {
		width: '100%'
	},
	textFieldInput: {
		padding: 8
	},
	input: {
		display: 'none'
	}
});

const UploadImagePopover: FunctionComponent<IUploadImagePopoverProps> = (props) => {
	const classes = cardPopoverStyles(props);
	const [state, setState] = useState<TUploadImagePopoverState>({
		anchor: null,
		isCancelled: false
	});
	const [data, setData] = useState<TUploadImageData>({});

	// eslint-disable-next-line react/prop-types
	const handleOnExited = useCallback(() => props.onSubmit(data, !state.isCancelled), [props, data, state.isCancelled]);

	const handleCancelled = useCallback(
		() =>
			setState({
				anchor: null,
				isCancelled: true
			}),
		[]
	);

	const handleNoCancelled = useCallback(
		() =>
			setState({
				anchor: null,
				isCancelled: false
			}),
		[]
	);

	useEffect(() => {
		setState({
			// eslint-disable-next-line react/prop-types
			anchor: props.anchor,
			isCancelled: false
		});
		setData({
			file: undefined
		});
		// eslint-disable-next-line react/prop-types,react/destructuring-assignment
	}, [props.anchor]);

	return (
		<Popover
			anchorEl={state.anchor}
			open={state.anchor !== null}
			onExited={handleOnExited}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right'
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'left'
			}}
		>
			<Grid container spacing={1} className={classes.root}>
				<Grid item xs={10}>
					<TextField
						className={classes.textField}
						disabled
						value={data.file?.name || ''}
						placeholder={'이미지를 업로드해주세요.'}
						inputProps={{
							className: classes.textFieldInput
						}}
					/>
				</Grid>
				<Grid item xs={2}>
					<input
						accept={'image/*'}
						className={classes.input}
						id={'contained-button-file'}
						type={'file'}
						onChange={(event) => {
							setData({
								...data,
								file: event.target.files![0]
							});
						}}
					/>
					<label htmlFor={'contained-button-file'}>
						<IconButton color={'primary'} aria-label={'upload image'} component={'span'}>
							<AttachFileIcon />
						</IconButton>
					</label>
				</Grid>
				<Grid item container xs={12} justify={'flex-end'}>
					<Button onClick={handleCancelled}>
						<CloseIcon />
					</Button>
					<Button onClick={handleNoCancelled}>
						<DoneIcon />
					</Button>
				</Grid>
			</Grid>
		</Popover>
	);
};

export default memo(UploadImagePopover);
