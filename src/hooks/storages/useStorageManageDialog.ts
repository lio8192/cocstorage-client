import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modules
import { handleStorageManageDialog, postStorage } from 'modules/storages';
import { RootState } from 'modules';

export type PostStorageFormData = {
	name: {
		value: string;
		error: boolean;
		helperText: string;
	};
	description: {
		value: string;
		error: boolean;
		helperText: string;
	};
	path: {
		value: string;
		error: boolean;
		helperText: string;
	};
	avatar: {
		value: FileList | null;
		url: string;
	};
	policy: {
		checked: boolean;
		error: boolean;
		helperText: string;
	};
};

export default function useStorages() {
	const dispatch = useDispatch();

	const storageState = useSelector((state: RootState) => state.storages);

	const [postStorageFormData, setPostStorageFormData] = useState<PostStorageFormData>({
		name: {
			value: '',
			error: false,
			helperText: ''
		},
		description: {
			value: '',
			error: false,
			helperText: ''
		},
		path: {
			value: '',
			error: false,
			helperText: ''
		},
		avatar: {
			value: null,
			url: ''
		},
		policy: {
			checked: false,
			error: false,
			helperText: ''
		}
	});

	const onHandleStorageManageDialogOpen = useCallback(() => dispatch(handleStorageManageDialog()), [dispatch]);

	const onHandleStorageManageDialogTextField = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const name: string = event.currentTarget.name || '';
			const value: string = event.currentTarget.value || '';

			setPostStorageFormData({
				...postStorageFormData,
				[name]: {
					value,
					error: false,
					helperText: ''
				}
			});
		},
		[postStorageFormData]
	);

	const onHandleStorageManageDialogCheckBox = useCallback(
		() =>
			setPostStorageFormData({
				...postStorageFormData,
				policy: { ...postStorageFormData.policy, checked: !postStorageFormData.policy.checked }
			}),
		[postStorageFormData]
	);

	const onChangeAvatarFile = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { files } = event.target;

			const reader = new FileReader();
			reader.onload = () => {
				const base64URL = String(reader.result);
				setPostStorageFormData({
					...postStorageFormData,
					avatar: {
						value: files,
						url: base64URL.toString()
					}
				});
			};

			try {
				if (files) {
					reader.readAsDataURL(files[0]);
				}
			} catch (error) {
				console.log(error);
			}
		},
		[postStorageFormData]
	);

	const onPostStorage = useCallback(() => {
		const {
			name, description, path, avatar, policy
		} = postStorageFormData;

		// Initialize PostStorageBody
		setPostStorageFormData({
			name: {
				...postStorageFormData.name,
				error: false,
				helperText: ''
			},
			description: {
				...postStorageFormData.description,
				error: false,
				helperText: ''
			},
			path: {
				...postStorageFormData.path,
				error: false,
				helperText: ''
			},
			avatar: {
				...postStorageFormData.avatar
			},
			policy: {
				...postStorageFormData.policy,
				error: false,
				helperText: ''
			}
		});

		// eslint-disable-next-line no-useless-escape
		const nameRegExp = /[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9\-]{3,20}/;
		const pathRegExp = /[a-zA-Z0-9]{3,20}/;
		const specialCharRegExp = '[!@\\#$%^&*(),.?\\":{}|<>]';

		if (!new RegExp(nameRegExp).test(name.value) || new RegExp(specialCharRegExp).test(name.value)) {
			setPostStorageFormData({
				...postStorageFormData,
				name: {
					...postStorageFormData.name,
					error: true,
					helperText: '올바른 저장소명을 입력해주세요.'
				}
			});

			return false;
		}

		if (!description.value || description.value.length > 200) {
			setPostStorageFormData({
				...postStorageFormData,
				description: {
					...postStorageFormData.description,
					error: true,
					helperText: '올바른 설명을 입력해주세요.'
				}
			});

			return false;
		}

		if (!new RegExp(pathRegExp).test(path.value) || new RegExp(specialCharRegExp).test(path.value)) {
			setPostStorageFormData({
				...postStorageFormData,
				path: {
					...postStorageFormData.path,
					error: true,
					helperText: '올바른 주소를 입력해주세요.'
				}
			});

			return false;
		}

		if (!policy.checked) {
			setPostStorageFormData({
				...postStorageFormData,
				policy: {
					...postStorageFormData.policy,
					error: true,
					helperText: '저장소 개인정보보호정책 및 이용약관에 동의해주세요.'
				}
			});

			return false;
		}

		dispatch(
			postStorage({
				name: name.value,
				description: description.value,
				path: path.value,
				avatar: avatar.value
			})
		);
		return true;
	}, [dispatch, postStorageFormData]);

	useEffect(() => {
		if (!storageState.manage.open) {
			setPostStorageFormData({
				name: {
					value: '',
					error: false,
					helperText: ''
				},
				description: {
					value: '',
					error: false,
					helperText: ''
				},
				path: {
					value: '',
					error: false,
					helperText: ''
				},
				avatar: {
					value: null,
					url: ''
				},
				policy: {
					checked: false,
					error: false,
					helperText: ''
				}
			});
		}
	}, [storageState.manage.open]);

	return {
		...storageState,
		postStorageFormData,
		onHandleStorageManageDialogOpen,
		onHandleStorageManageDialogTextField,
		onHandleStorageManageDialogCheckBox,
		onChangeAvatarFile,
		onPostStorage
	};
}
