import React, { useCallback, useRef, memo } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Material UI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Slide from '@material-ui/core/Slide';
// eslint-disable-next-line import/no-unresolved
import { TransitionProps } from '@material-ui/core/transitions';

// Material UI Icons
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import CloseIcon from '@material-ui/icons/Close';

// Custom Hooks
import useStorageManageDialog from 'hooks/storages/useStorageManageDialog';
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			position: 'relative',
			paddingRight: 0
		},
		appBar: {
			position: 'relative',
			paddingRight: '0 !important'
		},
		icon: {
			color: 'white'
		},
		title: {
			flex: 1,
			marginLeft: theme.spacing(2),
			color: 'white'
		},
		button: {
			color: 'white',
			fontFamily: 'NanumSquareRoundEB'
		},
		container: {
			display: 'flex',
			height: '100%',
			flexDirection: 'column',
			justifyContent: 'flex-end'
		},
		box: {
			display: 'flex',
			alignItems: 'center',
			padding: theme.spacing(3, 0)
		},
		typography: {
			fontFamily: 'NanumSquareRoundEB'
		},
		avatar: {
			width: theme.spacing(10),
			height: theme.spacing(10),
			cursor: 'pointer'
		},
		linearProgress: {
			position: 'absolute',
			width: '100%',
			zIndex: 10000
		}
	})
);

const Transition = React.forwardRef(
	(props: TransitionProps & { children?: React.ReactElement }, ref: React.Ref<unknown>) => (
		<Slide direction={'up'} ref={ref} {...props} />
	)
);

function StorageManageDialog() {
	const classes = useStyles();
	const {
		manage: { open, pending },
		postStorageFormData: {
			name, path, description, avatar, policy
		},
		onHandleStorageManageDialogOpen,
		onHandleStorageManageDialogTextField,
		onHandleStorageManageDialogCheckBox,
		onChangeAvatarFile,
		onPostStorage
	} = useStorageManageDialog();
	const avatarRef = useRef({} as HTMLInputElement);
	const clickAvatar = useCallback(() => avatarRef.current.click(), [avatarRef]);
	return (
		<Dialog
			className={classes.root}
			fullScreen
			open={open}
			onClose={onHandleStorageManageDialogOpen}
			TransitionComponent={Transition}
		>
			<Fade in={pending}>
				<LinearProgress className={classes.linearProgress} color={'primary'} />
			</Fade>
			<AppBar className={classes.appBar}>
				<Toolbar>
					<IconButton edge={'start'} color={'inherit'} onClick={onHandleStorageManageDialogOpen}>
						<CloseIcon className={classes.icon} />
					</IconButton>
					<Typography variant={'h6'} className={classes.title}>
						{'새 저장소 등록'}
					</Typography>
					<Button className={classes.button} onClick={onPostStorage} disabled={pending}>
						{'등록'}
					</Button>
				</Toolbar>
			</AppBar>
			<Box>
				<Container className={classes.container}>
					<Box className={classes.box}>
						<Box>
							<Avatar
								className={classes.avatar}
								onClick={clickAvatar}
								src={avatar.url || ''}
								alt={'Storage Avatar Img'}
							>
								<InsertPhotoIcon />
							</Avatar>
							<input ref={avatarRef} type={'file'} style={{ display: 'none' }} onChange={onChangeAvatarFile} />
						</Box>
						<Box flex={1} ml={1}>
							<TextField
								variant={'outlined'}
								fullWidth
								label={'저장소명'}
								onChange={onHandleStorageManageDialogTextField}
								name={'name'}
								value={name.value}
								error={name.error}
								helperText={name.helperText}
							/>
						</Box>
					</Box>
					<Box>
						<Box>
							<Typography className={classes.typography} variant={'body1'}>
								{'설명'}
							</Typography>
						</Box>
						<Box mt={1}>
							<TextField
								fullWidth
								variant={'outlined'}
								placeholder={'설명을 입력해주세요.'}
								onChange={onHandleStorageManageDialogTextField}
								name={'description'}
								value={description.value}
								error={description.error}
								helperText={description.helperText}
							/>
						</Box>
					</Box>
					<Box mt={2}>
						<Box>
							<Typography className={classes.typography} variant={'body1'}>
								{'주소'}
							</Typography>
						</Box>
						<Box mt={1}>
							<Grid container spacing={1}>
								<Grid item xs={12} md={6}>
									<TextField
										fullWidth
										variant={'outlined'}
										value={`https://www.cocstorage.com/storages/[${path.value}]`}
										error={path.error}
										disabled
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<TextField
										fullWidth
										variant={'outlined'}
										placeholder={'주소를 입력해주세요.'}
										onChange={onHandleStorageManageDialogTextField}
										name={'path'}
										value={path.value}
										error={path.error}
										helperText={path.helperText}
									/>
								</Grid>
							</Grid>
						</Box>
					</Box>
					<Box mt={2}>
						<Grid container spacing={1}>
							<Grid item xs={12} md={6}>
								<Box mb={1}>
									<Typography className={classes.typography} variant={'body1'}>
										{'개인정보보호정책'}
									</Typography>
								</Box>
								<TextField
									fullWidth
									variant={'outlined'}
									multiline
									rows={10}
									value={
										'저장소의 관리자는 불필요한 개인정보를 수집하거나 처리하지 않도록 하며, 관련 법령 및 약관을 준수합니다.\n'
										+ '\n'
										+ '1. 부정한 목적으로의 개인정보 처리 금지\n\n'
										+ '금전적 이득 등을 위하여 부정한 목적으로 개인정보를 수집하거나 매매 등을 이용한 우회적인 개인정보 부정 판매 등이 적발될 경우, 개념글 저장소는 관련 법령과 사이트 이용약관 및 저장소 운영원칙 등에 따라 해당 저장소에 대한 제재, 그리고 관련 법령에 따른 민형사상의 책임을 물을 수 있습니다.\n\n'
										+ '2. 불필요한 개인정보에 대한 수집 및 이용 금지\n\n'
										+ '불필요한 개인정보에 대한 수집, 이용을 해서는 안되며, 불가피하게 개인정보를 수집해야 하는 경우 최소한의 개인정보에 한해야 합니다. 또한, 관련 법령 및 이용약관, 운영원칙에 위배되지 않음을 합리적으로 증명할 수 있어야 합니다.\n\n'
										+ '3. 개인정보의 수집 시 사전동의\n\n'
										+ '개인정보를 수집하는 경우 반드시 사전에 \'개인정보 항목, 수집목적, 보관기간, 개인정보의 수집을 거부할 권리 및 이로 인한 불이익\'에 대해 명확히 고지하고, 정보주체(개인정보가 수집되는 다른 이용자)들의 개별 동의를 받아야 합니다.\n\n'
										+ '4. 개인정보 제공의 금지\n\n'
										+ '개인정보를 동의를 받아 수집한 경우라도 외부(수집한 사람을 제외한 모든 사람)에 제공하는 것은 원칙적으로 금지됩니다. 만약 외부에 제공하고자 하는 경우에는 정보주체에게 ‘제공받는 자, 제공하는 항목, 제공목적, 이용기간’을 명확히 고지하고 사전에 개별 동의를 받아야 합니다.\n\n'
										+ '5. 주민등록번호 등 고유식별정보의 처리 금지\n\n'
										+ '주민등록번호는 법령에 의하여 처리 근거가 있는 경우를 제외하고 어떤 목적으로도 처리할 수 없으며, 여권번호, 운전면허번호, 외국인 등록번호도 처리할 수 없습니다. 단, 불가피하게 처리가 필요한 경우에 한해 정보주체에게 사전에 개별 동의를 받아야 합니다.\n\n'
										+ '6. 민감 정보의 처리 제한\n\n'
										+ '사상/신념, 정치적 견해, 노동조합/정당의 가입/탈퇴, 건강 및 성생활 등에 관한 정보, 유전정보, 범죄경력’에 관한 정보는 법령에 의하여 처리 근거가 있는 경우를 제외하고 처리할 수 없습니다. 단, 불가피하게 처리가 필요한 경우, 정보 주체로부터 사전에 개인정보 활용 동의를 반드시 받은 후 처리를 할 수 있습니다.\n\n'
										+ '7. 영리 목적의 개인정보 처리 금지\n\n'
										+ '상품판매, 공동구매, 수강생 모집 등 여타의 영리 목적을 목적으로 개인정보를 처리하는 것은 어떠한 경우에도 금지됩니다.\n\n'
										+ '그 밖에 위에 기재하지 않은 사항은 개념글 저장소 개인정보처리방침, 이용약관, 저장소 서비스 운영원칙 등에서 정한 바에 의합니다.'
									}
									disabled
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<Box mb={1}>
									<Typography className={classes.typography} variant={'body1'}>
										{'운영원칙'}
									</Typography>
								</Box>
								<TextField
									fullWidth
									variant={'outlined'}
									multiline
									rows={10}
									value={
										'저장소 서비스는 이용자분들이 직접 만들고 운영하는 커뮤니티 공간으로 모든 이용자들은 아래 운영원칙을 준수해야 합니다.\n\n'
										+ '[모든 이용자가 지켜야 하는 원칙]\n\n'
										+ '모든 이용자는 저장소 주제에 맞는 정상적인 활동을 해주셔야 합니다.\n\n'
										+ '저장소 서비스에 등록하는 모든 콘텐츠의 저작권은 게시한 이용자 본인에게 있으며, 이로 인해 발생되는 문제에 대해서도 해당 게시물을 게시한 이용자에게 책임이 있습니다.\n'
										+ '모든 이용자는 이용약관 및 운영원칙을 준수해야 하며, 이를 지키지 않아 발생하는 문제에 대해 일체의 책임을 져야 합니다.\n\n'
										+ '[관리자가 지켜야 하는 원칙]\n\n'
										+ '\'관리자\'란 저장소의 운영 권한을 갖는 이용자를 가리키는 단어입니다.\n\n'
										+ '관리자는 저장소를 최초 개설하였거나, 이전 관리자로부터 저장소를 위임받은 이용자로서 해당 저장소를 대표하며, 저장소를 관리할 수 있는 모든 권한과 책임을 갖고 있습니다.\n'
										+ '관리자는 이용약관, 운영원칙, 법령 등에 위배되는 게시물 또는 이용자의 행동을 방치한 경우 이에 대한 책임을 일차적으로 부담하게 됩니다. 단, 관리자는 이용 제한 사유에 해당하지 않는 글(관리자에 대한 비판글 포함)의 삭제, 이용자 차단, 금지어 설정 등으로 이용자들의 정상적인 활동을 제한해서는 안됩니다.\n\n'
										+ '관리자는 저장소가 원활히 운영될 수 있도록 주기적으로 저장소에 방문해 성실하고 공정한 관리를 다해야 합니다. 만약, 장기간(최소 10일 이상) 부재 시 다른 이용자에게 관리자의 책임과 권한이 이관될 수 있습니다.\n'
										+ '부관리자는 관리자가 임명하고 이를 수락한 이용자로 저장소를 관리할 수 있는 일부 권한과 책임이 있습니다.\n\n'
										+ '[이용제한 사유에 해당하는 금지 활동]\n\n'
										+ '1. 음란물 유포\n\n'
										+ '외설적인 내용으로 성적 수치심과 혐오감을 유발하고 일반인의 성 관념에 위배되는 경우\n'
										+ '남녀의 성기, 음모, 항문을 묘사하거나 성행위 등을 표현하는 경우\n'
										+ '외설적인 내용으로 성적 수치심과 혐오감을 유발하고 일반인의 성 관념에 위배되는 경우\n'
										+ '윤락행위를 알선하거나 성관계를 목적으로 하는 만남 알선 내용\n\n'
										+ '2. 청소년 노출 부적합 게시물 유포\n\n'
										+ '일반적인 사람이 보기에 혐오스럽고 눈살이 찌푸려지는 사진 또는 내용을 작성 (인간/동물의 사체 또는 훼손된 모습, 방뇨/배설/살인/자살의 장면 등)\n'
										+ '차별/갈등 조장 활동\n'
										+ '스와핑, 동거 등 사회 윤리적으로 용납되지 않은 행위를 매개하는 경우\n'
										+ '존속에 대한 상해 폭행 살인 등 전통적인 가족윤리를 훼손할 우려가 있는 내용\n'
										+ '청소년 유해약물 등의 효능 및 제조방법 등을 구체적으로 기술하여 그 복용 제조 및 사용을 조장하거나 이를 매개하는 내용\n'
										+ '청소년에게 불건전한 교제를 조장할 우려가 있거나 이를 매개하는 내용\n\n'
										+ '3. 불법적 내용 유포\n\n'
										+ '범죄 관련 내용을 미화/권유/조장하는 내용\n'
										+ '범죄 행위를 청탁하거나 이를 권유, 유도 및 매개하는 내용\n'
										+ '타인을 협박, 위협하는 게시물\n'
										+ '여타의 범법 행위에 대한 동기 부여 및 실행에 도움이 되는 정보를 제공하는 내용\n'
										+ '불법제품, 통신판매가 금지된 품목에 대한 판매, 알선 행위\n'
										+ '해킹, 악성코드, 바이러스 유포하거나 타인의 권리를 침해할 수 있는 불법 자료를 유포하는 내용\n'
										+ '다단계 영업, 자살 권유, 불법 도박, 사행심 조장 등의 내용\n\n'
										+ '4. 도배, 스팸, 상업적 홍보 및 광고 활동\n\n'
										+ '동일한 내용을 반복적으로 등록하는 도배, 스팸 행위\n'
										+ '상업적 목적으로 저장소를 운영하거나 게시물을 등록하는 행위\n\n'
										+ '5. 명예훼손 행위\n\n'
										+ '타인에게 수치심, 혐오감, 불쾌감을 일으키는 게시물\n'
										+ '타인의 사생활 침해, 명예훼손, 개인정보(이름, 주민번호, 연락처, 사진) 등을 게시한 경우\n'
										+ '욕설 또는 언어폭력 등의 저속한 표현으로 특정인의 인격을 모독하거나 불쾌감을 불러 일으키는 내용\n\n'
										+ '6. 저작권 침해 행위\n\n'
										+ '권리자의 동의 없이 자료를 불법 게시, 배포, 복제하는 경우\n'
										+ '저작권이 있는 소프트웨어 불법 다운로드 및 시리얼 넘버, 시디키 등를 공유하는 경우\n'
										+ '여타 타인의 지적재산권을 침해하는 행위\n\n'
										+ '7. 불법적 거래 행위\n\n'
										+ '타인에게 금전적 거래로 저장소를 양도, 대여하거나 그에 준하는 행위\n'
										+ '타인을 기망하여 저장소를 위임받거나 탈취하는 행위\n\n'
										+ '8. 기타 금지 행위\n\n'
										+ '저장소의 주제와 동떨어진 내용과 상식에 어긋나는 내용으로 지속적으로 분란을 야기하는 경우\n'
										+ '특정 단어, 문구를 반복적으로 등록하는 행위\n'
										+ '홍보성 타 사이트 링크 포함 및 광고 게시물\n'
										+ '정상적인 활동으로 볼 수 없는 반복적인 저장소 만들기, 폐쇄, 위임 등의 행위\n'
										+ '개념글 저장소 서비스 운영진을 사칭하는 행위\n\n'
										+ '[이용제한 내용]\n\n'
										+ '1. 게시물 제한\n\n'
										+ '운영원칙에 어긋나는 게시물인 경우 타 이용자가 볼 수 없도록 노출이 제한됩니다.\n\n'
										+ '2. 이용자 이용 정지\n\n'
										+ '운영원칙에 어긋나는 행위를 한 이용자인 경우 게시물/댓글 등록 및 저장소 개설 등의 활동을 할 수 없게 이용이 일시 또는 영구 정지됩니다.\n\n'
										+ '3. 매니저 해임\n\n'
										+ '매니저의 장기간 부재 또는 본 운영원칙에 위반되는 내용의 게시물의 방치 등 불성실한 운영 시 매니저를 해임할 수 있습니다.\n\n'
										+ '4. 저장소 접근 제한\n\n'
										+ '운영원칙에 어긋나는 행위를 방치, 조장했거나 여타의 문제가 있는 경우 다른 이용자가 볼 수 없도록 저장소 접근을 일시 또는 영구적으로 제한합니다.\n\n'
										+ '5. 저장소 폐쇄\n\n'
										+ '중복된 주제의 개설, 개설 시와 무관한 주제로의 무단 변경, 운영원칙에 어긋나는 문제가 반복되거나 심대한 경우, 또는 수사기관의 요청, 불법적인 목적의 운영/개설 의도가 명확한 경우 해당 저장소는 폐쇄 조치됩니다.'
									}
									disabled
								/>
							</Grid>
						</Grid>
					</Box>
					<Box mt={1}>
						<FormControlLabel
							control={(
								<Checkbox
									checked={policy.checked}
									onChange={onHandleStorageManageDialogCheckBox}
									name={'policy'}
									color={'primary'}
								/>
							)}
							label={'저장소 개인정보보호정책 및 운영원칙에 동의합니다.'}
						/>
					</Box>
					{policy.error && <FormHelperText error>{policy.helperText}</FormHelperText>}
				</Container>
			</Box>
		</Dialog>
	);
}

export default memo(StorageManageDialog);
