import React from 'react';
import { Link } from 'react-router-dom';
import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from '@services/store';
import { register } from '@services/user/action';
import { Routes } from '../../routes';
import useForm from '../../hooks/useForm';
import { UserWithPassword } from '@utils/types';
import styles from './auth.module.css';

export const Register = (): React.JSX.Element => {
	const [data, onChange] = useForm<UserWithPassword>({
		name: '',
		email: '',
		password: '',
	});
	const dispatch = useDispatch();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(register(data));
	};

	return (
		<div className={styles.container}>
			<div className={styles.inner_container}>
				<p className='text text_type_main-medium mb-6'>Регистрация</p>
				<form className={`${styles.form} mb-20`} onSubmit={handleSubmit}>
					<Input
						name='name'
						type='text'
						value={data.name}
						onChange={onChange}
						placeholder='Имя'
						autoComplete='name'
					/>

					<EmailInput
						name='email'
						value={data.email}
						onChange={onChange}
						placeholder='E-mail'
						isIcon={false}
						autoComplete='email'
					/>

					<PasswordInput
						name='password'
						value={data.password}
						onChange={onChange}
						autoComplete='new-password'
					/>

					<Button htmlType='submit' type='primary' size='large'>
						Зарегистрироваться
					</Button>
				</form>

				<div>
					<p className='text text_type_main-default text_color_inactive'>
						Уже зарегистрированы? <Link to={Routes.LOGIN}>Войти</Link>
					</p>
				</div>
			</div>
		</div>
	);
};
