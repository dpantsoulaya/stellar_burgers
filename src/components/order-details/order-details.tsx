import { useSelector } from 'react-redux';
import {
	getOrderDetails,
	getOrderDetailsError,
	getOrderDetailsLoading,
} from '@services/order/reducer';
import { Loader } from '../loader/loader';
import styles from './style.module.css';
import { OrderDetails as TOrderDetails } from '@utils/types';

export const OrderDetails = (): React.JSX.Element => {
	const orderDetails = useSelector<unknown, TOrderDetails>(getOrderDetails);
	const loading = useSelector(getOrderDetailsLoading);
	const error = useSelector(getOrderDetailsError);

	if (loading)
		return (
			<div className={`pb-10 pt-10 ${styles.container}`}>
				<Loader />
			</div>
		);

	if (error) return <div>Произошла ошибка</div>;

	return (
		<div className={`pb-10 pt-10 ${styles.container}`}>
			<p className='text text_type_digits-large'>
				{orderDetails?.order?.number}
			</p>
			<p className='pt-8 text text_type_main-medium'>идентификатор заказа</p>
			<img
				className='pt-15 pb-15'
				src={require('../../images/done.png')}
				alt='done'
			/>
			<p className='text text_type_main-default'>Ваш заказ начали готовить</p>
			<p className='pt-2 text text_type_main-default text_color_inactive'>
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	);
};
