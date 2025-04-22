import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { postPasswordReset } from '@utils/api';
import { Routes } from '../../routes';
import { Error } from '../../components/error/error';
import styles from './auth.module.css';
import useForm from '../../hooks/useForm';

export const FORGOT_PASSWORD_FLAG = 'resetPassword';

export const ForgotPassword = () => {
	const [data, onChange] = useForm({ email: '' });
	const [error, setError] = useState();
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!data.email) {
			setError('Введите email');
			return;
		}

		postPasswordReset(email).then(() => {
			// устанавливаем флаг, что мы со страницы forgot-password
			localStorage.setItem(FORGOT_PASSWORD_FLAG, true);

			// Пользователь направляется на маршрут /reset-password
			navigate(Routes.RESET_PASSWORD);
		});
	};

	return (
		<div className={styles.container}>
			<div className={styles.inner_container}>
				<p className='text text_type_main-medium mb-6'>Восстановление пароля</p>

				{error && <Error text={error} />}

				<form className={`${styles.form} mb-20`} onSubmit={handleSubmit}>
					<EmailInput
						name='email'
						value={data.email}
						onChange={onChange}
						placeholder='Укажите e-mail'
						isIcon={false}
						autoComplete='email'
					/>

					<Button htmlType='submit' type='primary' size='large'>
						Восстановить
					</Button>
				</form>

				<div>
					<p className='text text_type_main-default text_color_inactive'>
						Вспомнили пароль? <Link to={Routes.LOGIN}>Войти</Link>
					</p>
				</div>
			</div>
		</div>
	);
};
