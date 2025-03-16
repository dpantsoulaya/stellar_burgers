import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { HeaderButton } from '../header-button/header-button';
import styles from './style.module.css';

export const AppHeader = () => (
	<nav className={styles.header}>
		<ul
			className={styles.col}
			style={{
				display: 'flex',
				flexDirection: 'row',
			}}>
			<HeaderButton icon={<BurgerIcon />} text='Конструктор' active={true} />
			<HeaderButton icon={<ListIcon type='secondary' />} text='Лента заказов' />
		</ul>

		<div className={styles.col}>
			<Logo />
		</div>

		<div className={styles.col}>
			<HeaderButton
				icon={<ProfileIcon type='secondary' />}
				text='Личный кабинет'
			/>
		</div>
	</nav>
);
