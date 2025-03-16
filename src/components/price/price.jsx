import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './style.module.css';

export const Price = ({ value, size }) => {
	return (
		<div className={styles.container}>
			<span
				className={
					size === 'medium'
						? 'text text_type_digits-medium'
						: 'text text_type_digits-default'
				}>
				{value}
			</span>
			<CurrencyIcon />
		</div>
	);
};
