import { useState } from 'react';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-edit.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '@services/user/reducer';
import { patchUser } from '@services/user/action';
import useForm from '../../hooks/useForm';

export const ProfileEdit = () => {
	const user = useSelector(getUser);
	const [data, onChange] = useForm({
		name: user.name,
		email: user.email,
		password: '',
	});
	const dispatch = useDispatch();

	// Пользователь отредактировал какое-то поле
	const edited =
		data.name !== user.name ||
		data.email !== user.email ||
		data.password !== '';

	const handleSubmit = (e) => {
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
				isIcon={true}
				autoComplete='name'
			/>

			<Input
				name='email'
				type='email'
				value={data.email}
				onChange={onChange}
				placeholder='Логин'
				isIcon={true}
				autoComplete='email'
			/>

			<Input
				name='password'
				type='password'
				value={data.password}
				onChange={onChange}
				placeholder='Пароль'
				isIcon={true}
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
