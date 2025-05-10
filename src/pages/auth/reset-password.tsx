import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	Input,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { postPasswordResetReset } from '@utils/api';
import { FORGOT_PASSWORD_FLAG } from './forgot-password';
import { Routes } from '../../routes';
import { Error } from '../../components/error/error';
import useForm from '../../hooks/useForm';
import { TokenAndPassword } from '@utils/types';
import styles from './auth.module.css';

export const ResetPassword = (): React.JSX.Element => {
	const [data, onChange] = useForm<TokenAndPassword>({
		password: '',
		token: '',
	});
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const forgotPasswordFlag = localStorage.getItem(FORGOT_PASSWORD_FLAG);
		if (!forgotPasswordFlag) {
			navigate(Routes.FORGOT_PASSWORD);
		}
	}, []);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!data.password || !data.token) {
			setError('Введите пароль и токен');
			return;
		}
		postPasswordResetReset(data.password, data.token).then(() => {
			// Удалить флаг
			localStorage.removeItem(FORGOT_PASSWORD_FLAG);

			// перенаправление на страницу входа
			navigate(Routes.LOGIN);
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
						value={data.password}
						onChange={onChange}
						placeholder='Введите новый пароль'
						autoComplete='new-password'
					/>

					<Input
						name='token'
						type='text'
						value={data.token}
						onChange={onChange}
						placeholder='Введите код из письма'
						autoComplete='off'
					/>

					<Button htmlType='submit' type='primary' size='large'>
						Сохранить
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
