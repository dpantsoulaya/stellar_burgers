import { Link, Outlet, useMatch } from 'react-router-dom';
import { useDispatch } from '@services/store';
import { logout } from '@services/user/action';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';

export const Profile = (): React.JSX.Element => {
	const dispatch = useDispatch();

	const isProfileEdit = useMatch('/profile/edit');
	const isProfileOrders = useMatch('/profile/orders');

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<div className={styles.container}>
			<div className={`${styles.menu_container} mr-15`}>
				<nav>
					<ul className={`${styles.menu} mb-20`}>
						<li>
							<Link
								to='/profile/edit'
								className={
									isProfileEdit ? styles.active_link : styles.default_link
								}>
								<p className='text text_type_main-medium'>Профиль</p>
							</Link>
						</li>
						<li>
							<Link
								to='/profile/orders'
								className={
									isProfileOrders ? styles.active_link : styles.default_link
								}>
								<p className='text text_type_main-medium'>История заказов</p>
							</Link>
						</li>
						<li>
							<Button
								htmlType='button'
								type='secondary'
								size='medium'
								className={styles.logout_button}
								onClick={handleLogout}>
								<p className='text text_type_main-medium'>Выход</p>
							</Button>
						</li>
					</ul>
				</nav>

				<p className='text text_type_main-default text_color_inactive'>
					В этом разделе вы можете просмотреть свою историю заказов
				</p>
			</div>

			<div className={styles.content_container}>
				<Outlet />
			</div>
		</div>
	);
};
