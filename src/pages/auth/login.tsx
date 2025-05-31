import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from '@services/store';
import { login } from '@services/user/action';
import { getError, getErrorMessage } from '@services/user/slice';
import useForm from '../../hooks/useForm';
import { UserWithPassword } from '@utils/types';
import styles from './auth.module.css';

export const Login = (): React.JSX.Element => {
	const [data, onChange] = useForm<
		Pick<UserWithPassword, 'email' | 'password'>
	>({ email: '', password: '' });
	const error = useSelector(getError);
	const errorMessage = useSelector(getErrorMessage);
	const dispatch = useDispatch();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
						autoComplete='current-password'
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
