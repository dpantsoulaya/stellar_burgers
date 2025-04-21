import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { HeaderButton } from './header-button';
import styles from './style.module.css';
import { useLocation } from 'react-router-dom';

export const AppHeader = () => {
	const location = useLocation();

	return (
		<header>
			<nav className={styles.header_nav}>
				<ul className={`${styles.col} ${styles.left_menu}`}>
					<HeaderButton
						icon={
							<BurgerIcon
								type={location.pathname === '/' ? 'primary' : 'secondary'}
							/>
						}
						text='Конструктор'
						link='/'
						active={location.pathname === '/'}
					/>

					<HeaderButton
						icon={<ListIcon type='secondary' />}
						text='Лента заказов'
					/>
				</ul>

				<div className={styles.col}>
					<Logo />
				</div>

				<div className={styles.col}>
					<HeaderButton
						icon={
							<ProfileIcon
								type={
									location.pathname.startsWith('/profile')
										? 'primary'
										: 'secondary'
								}
							/>
						}
						text='Личный кабинет'
						link='/profile/edit'
						active={location.pathname.startsWith('/profile')}
					/>
				</div>
			</nav>
		</header>
	);
};
