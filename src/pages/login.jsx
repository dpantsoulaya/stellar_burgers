import { useState } from 'react';
import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@services/user/action';
import { getError, getErrorMessage } from '@services/user/reducer';
import styles from './registration.module.css';

export const Login = () => {
	const [data, setData] = useState({ email: '', password: '' });
	const error = useSelector(getError);
	const errorMessage = useSelector(getErrorMessage);
	const dispatch = useDispatch();

	const onChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(login(data));
	};

	return (
		<div className={styles.container}>
			<div className={styles.inner_container}>
				<p className='text text_type_main-medium mb-6'>Вход</p>

				{error && <p>Произошла ошибка: {errorMessage}</p>}

				<form className={`${styles.form} mb-20`} onSubmit={handleSubmit}>
					<EmailInput
						name='email'
						value={data['email']}
						onChange={onChange}
						placeholder='E-mail'
						isIcon={false}
					/>

					<PasswordInput
						name='password'
						value={data['password']}
						onChange={onChange}
					/>

					<Button htmlType='submit' type='primary' size='large'>
						Вход
					</Button>
				</form>

				<div>
					<p className='text text_type_main-default text_color_inactive'>
						Вы новый пользователь?{' '}
						<Link to='/register'>Зарегистрироваться</Link>
					</p>
					<p className='text text_type_main-default text_color_inactive'>
						Забыли пароль?{' '}
						<Link to='/forgot_password'>Восстановить пароль</Link>
					</p>
				</div>
			</div>
		</div>
	);
};
