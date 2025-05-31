import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFeed } from '@services/feed/slice';
import { useDispatch, useSelector } from '@services/store';
import { getAllIngredients } from '@services/ingredients/slice';
import styles from './style.module.css';
import { Price } from '../price/price';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient, Order } from '@utils/types';
import { OrderStatus } from '../order-status/order-status';
import { getCurrentOrder, getOrderLoading } from '@services/order/slice';
import { getOrder } from '@services/order/actions';
import { Loader } from '../loader/loader';
import { loadIngredients } from '@services/ingredients/actions';
import { OrderIngredients } from './order-ingredients';
import { getProfileFeed } from '@services/profile-feed/slice';

export const OrderInfo = (): React.JSX.Element => {
	const { number } = useParams();
	const [order, setOrder] = useState<Order | null>(null);
	const dispatch = useDispatch();

	const currentOrder = useSelector(getCurrentOrder);
	const loading = useSelector(getOrderLoading);
	const allIngredients = useSelector(getAllIngredients);
	const feed = useSelector(getFeed);
	const profileFeed = useSelector(getProfileFeed);

	if (number === undefined) throw new Error('Не указан номер заказа');

	useEffect(() => {
		// Если нет ингредиентов, то надо запросить их с севера
		if (!allIngredients || allIngredients.length === 0) {
			dispatch(loadIngredients());
		}

		const orderNumber = parseInt(number, 10);

		// Если у нас есть в ленте заказ с таким номером, то берём его
		let o = feed?.orders.find((o) => o.number === orderNumber);
		if (o) {
			setOrder(o);
			return;
		}

		// Или в заказах профиля
		o = profileFeed?.orders.find((o) => o.number === orderNumber);
		if (o) {
			setOrder(o);
			return;
		}

		if (currentOrder) {
			setOrder(currentOrder);
			return;
		}

		// Если нигде нет заказа с таким номером, то запрашиваем его с сервера (и он должен появиться в currentOrder)
		dispatch(getOrder(orderNumber));
	}, []);

	useEffect(() => {
		if (currentOrder) {
			setOrder(currentOrder);
		}
	}, [currentOrder]);

	if (loading) return <Loader />;
	if (!order) return <p>Заказ не найден</p>;

	const ingredients = order.ingredients
		.map((i) => allIngredients.find((ai) => ai._id === i))
		.filter((i): i is Ingredient => i !== undefined);

	const totalPrice = ingredients.reduce((acc, i) => acc + i.price, 0);

	return (
		<div>
			<p className={`${styles.number} text text_type_digits-default mb-10`}>
				#{order.number}
			</p>
			<p className='text text_type_main-medium mb-3'>{order.name}</p>

			<OrderStatus status={order.status} />

			<p className='text text_type_main-medium mt-15 mb-6'>Состав:</p>
			<OrderIngredients ingredients={ingredients} />

			<div className={styles.footer}>
				<FormattedDate
					date={new Date(order.updatedAt)}
					className='text text_type_main-default text_color_inactive'
				/>
				<Price value={totalPrice} />
			</div>
		</div>
	);
};
