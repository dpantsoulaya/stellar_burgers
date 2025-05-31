import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '@services/store';
import { getUser } from '@services/user/slice';
import { patchUser } from '@services/user/action';
import useForm from '../../hooks/useForm';
import { UserWithPassword } from '@utils/types';
import styles from './profile-edit.module.css';

export const ProfileEdit = (): React.JSX.Element => {
	const user = useSelector(getUser);
	const [data, onChange] = useForm<UserWithPassword>({
		name: user?.name ?? '',
		email: user?.email ?? '',
		password: '',
	});
	const dispatch = useDispatch();

	// Пользователь отредактировал какое-то поле
	const edited =
		data.name !== user?.name ||
		data.email !== user?.email ||
		data.password !== '';

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(patchUser(data));
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<Input
				name='name'
				type='text'
				value={data.name}
				onChange={onChange}
				placeholder='Имя'
				icon='EditIcon'
				autoComplete='name'
			/>

			<Input
				name='email'
				type='email'
				value={data.email}
				onChange={onChange}
				placeholder='Логин'
				icon='EditIcon'
				autoComplete='email'
			/>

			<Input
				name='password'
				type='password'
				value={data.password}
				onChange={onChange}
				placeholder='Пароль'
				icon='EditIcon'
				autoComplete='new-password'
			/>

			{edited && (
				<div className={styles.buttons_container}>
					<Button htmlType='reset' type='secondary'>
						Отменить
					</Button>
					<Button htmlType='submit' type='primary'>
						Сохранить
					</Button>
				</div>
			)}
		</form>
	);
};
