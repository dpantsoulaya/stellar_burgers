import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { postPasswordReset } from '@utils/api';
import { Error } from '../components/error/error';
import styles from './registration.module.css';

export const FORGOT_PASSWORD_FLAG = 'resetPassword';

export const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [error, setError] = useState();
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!email) {
			setError('Введите email');
			return;
		}

		postPasswordReset(email).then(() => {
			// устанавливаем флаг, что мы со страницы forgot-password
			localStorage.setItem(FORGOT_PASSWORD_FLAG, true);

			// Пользователь направляется на маршрут /reset-password
			navigate('/reset_password');
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
						value={email || ''}
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Укажите e-mail'
						isIcon={false}
					/>

					<Button htmlType='submit' type='primary' size='large'>
						Восстановить
					</Button>
				</form>

				<div>
					<p className='text text_type_main-default text_color_inactive'>
						Вспомнили пароль? <Link to='/login'>Войти</Link>
					</p>
				</div>
			</div>
		</div>
	);
};
