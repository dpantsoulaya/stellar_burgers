import { useState } from 'react';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-edit.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '@services/user/reducer';
import { patchUser } from '@services/user/action';

export const ProfileEdit = () => {
	const user = useSelector(getUser);
	const [data, setData] = useState({
		name: user.name,
		email: user.email,
		password: '',
	});
	const dispatch = useDispatch();

	const anyData = data['name'] || data['email'] || data['password'];

	const onChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(patchUser(data));
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<Input
				type='text'
				value={data['name']}
				onChange={onChange}
				name='name'
				placeholder='Имя'
				isIcon={true}
			/>

			<Input
				type='email'
				value={data['email']}
				onChange={onChange}
				name='email'
				placeholder='Логин'
				isIcon={true}
			/>

			<Input
				type='password'
				value={data['password']}
				onChange={onChange}
				name='password'
				placeholder='Пароль'
				isIcon={true}
			/>

			{anyData && (
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
