import React, { useEffect, useState } from 'react';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsImages } from '../../components/ingredients-images/ingredients-images';
import { useSelector } from '@services/store';
import { getAllIngredients } from '@services/ingredients/slice';
import { Order } from '@utils/types';
import { Price } from '../price/price';
import styles from './style.module.css';
import { OrderStatus } from '../order-status/order-status';

type CardOrderProps = {
	order: Order;
	showStatus: boolean;
};

export const CardOrder = ({
	order,
	showStatus,
}: CardOrderProps): React.JSX.Element => {
	const [images, setImages] = useState<string[]>([]);
	const [price, setPrice] = useState(0);

	const ingredients = useSelector(getAllIngredients);

	useEffect(() => {
		if (!ingredients || ingredients.length === 0) return;

		const usedIngredients = ingredients.filter((i) =>
			order.ingredients.includes(i._id)
		);

		const images = usedIngredients.map((i) => i.image);
		setImages(images);

		const price = usedIngredients.reduce((acc, i) => acc + i.price, 0);
		setPrice(price);
	}, [ingredients]);

	return (
		<div className={`${styles.container} p-6`}>
			<div className={`${styles.order_id} mb-6`}>
				<p className='text text_type_digits-default'>#{order.number}</p>
				<FormattedDate
					date={new Date(order.updatedAt)}
					className={`${styles.date} text text_type_main-default text_color_inactive`}
				/>
			</div>
			<div className='mb-2'>
				<p className='text text_type_main-medium'>{order.name}</p>
			</div>

			{showStatus && <OrderStatus status={order.status} />}

			{ingredients && (
				<div className={`${styles.images_and_price} mt-4`}>
					<div className={styles.images_container}>
						<IngredientsImages images={images} />
					</div>
					<Price value={price} size='default' />
				</div>
			)}
		</div>
	);
};
