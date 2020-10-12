export function getErrorMessageByCode(code: string): string {
	let errorMessage = `CODE: ${code || 'NONE'}\n알 수 없는 오류입니다.`;

	switch (code) {
	case 'COC003':
		errorMessage = '이미 가입된 이메일입니다.';
		break;
	case 'COC004':
		errorMessage = '비밀번호는 최소 7자 이상으로 입력해주세요.';
		break;
	case 'COC005':
		errorMessage = '비밀번호에는 최소 1개 이상의 특수문자가 포함되어야 합니다.';
		break;
	case 'COC007':
		errorMessage = '이미 인증된 계정입니다.';
		break;
	case 'COC017':
		errorMessage = '인증 기간이 만료되었습니다. 관리자에게 문의해주세요.';
		break;
	case 'COC018':
		errorMessage = '입력하신 정보로 가입된 계정이 존재하지 않습니다.';
		break;
	default:
		break;
	}

	return errorMessage;
}

export default getErrorMessageByCode;
