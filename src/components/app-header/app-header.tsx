import React from 'react';
import { useLocation } from 'react-router-dom';
import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { HeaderButton } from './header-button';
import { Routes } from '../../routes';
import styles from './style.module.css';

export const AppHeader = (): React.JSX.Element => {
	const location = useLocation();

	return (
		<header>
			<nav className={styles.header_nav}>
				<ul className={`${styles.col} ${styles.left_menu}`}>
					<HeaderButton
						icon={
							<BurgerIcon
								type={
									location.pathname === Routes.HOME ? 'primary' : 'secondary'
								}
							/>
						}
						text='Конструктор'
						link={Routes.HOME}
						active={location.pathname === Routes.HOME}
					/>

					<HeaderButton
						icon={<ListIcon type='secondary' />}
						link=''
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
									location.pathname.startsWith(Routes.PROFILE)
										? 'primary'
										: 'secondary'
								}
							/>
						}
						text='Личный кабинет'
						link={Routes.EDIT_PROFILE}
						active={location.pathname.startsWith(Routes.PROFILE)}
					/>
				</div>
			</nav>
		</header>
	);
};
