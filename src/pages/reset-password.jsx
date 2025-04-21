import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	Input,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { postPasswordResetReset } from '@utils/api';
import { FORGOT_PASSWORD_FLAG } from './forgot-password';
import { Error } from '../components/error/error';
import styles from './registration.module.css';

export const ResetPassword = () => {
	const [password, setPassword] = useState('');
	const [token, setToken] = useState('');
	const [error, setError] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		const forgotPasswordFlag = localStorage.getItem(FORGOT_PASSWORD_FLAG);
		console.log('forgotPasswordFlag', forgotPasswordFlag);

		if (!forgotPasswordFlag) {
			navigate('/forgot_password');
		}
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!password || !token) {
			setError('Введите пароль и токен');
			return;
		}
		postPasswordResetReset(password, token).then(() => {
			// Удалить флаг
			localStorage.removeItem(FORGOT_PASSWORD_FLAG);

			// перенаправление на страницу входа
			navigate('/login');
		});
	};

	return (
		<div className={styles.container}>
			<div className={styles.inner_container}>
				<p className='text text_type_main-medium mb-6'>Восстановление пароля</p>

				{error && <Error text={error} />}

				<form className={`${styles.form} mb-20`} onSubmit={handleSubmit}>
					<PasswordInput
						name='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder='Введите новый пароль'
					/>

					<Input
						type='text'
						value={token}
						onChange={(e) => setToken(e.target.value)}
						placeholder='Введите код из письма'
					/>

					<Button htmlType='submit' type='primary' size='large'>
						Сохранить
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
