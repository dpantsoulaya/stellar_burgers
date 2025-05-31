import { OrderInfo } from '../../components/order-info/order-info';
import styles from './order.module.css';

export const Order = () => {
	return (
		<div className={styles.container}>
			<div className={styles.inner_container}>
				<OrderInfo />
			</div>
		</div>
	);
};
