import { Link } from 'react-router-dom';
import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './registration.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '@services/user/action';

export const Register = () => {
	const [data, setData] = useState({ name: '', email: '', password: '' });
	const dispatch = useDispatch();

	const onChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(register(data));
	};

	return (
		<div className={styles.container}>
			<div className={styles.inner_container}>
				<p className='text text_type_main-medium mb-6'>Регистрация</p>
				<form className={`${styles.form} mb-20`} onSubmit={handleSubmit}>
					<Input
						type='text'
						value={data['name']}
						onChange={onChange}
						name='name'
						placeholder='Имя'
					/>

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
						Зарегистрироваться
					</Button>
				</form>

				<div>
					<p className='text text_type_main-default text_color_inactive'>
						Уже зарегистрированы? <Link to='/login'>Войти</Link>
					</p>
				</div>
			</div>
		</div>
	);
};
