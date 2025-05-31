import { Order } from '@utils/types';
import { CardOrder } from '../card-order/card-order';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '@services/store';
import {
	getAllIngredients,
	getIngredientsError,
	getIngredientsLoading,
} from '@services/ingredients/slice';
import { loadIngredients } from '@services/ingredients/actions';
import { Link, useLocation } from 'react-router-dom';
import styles from './style.module.css';
import { Loader } from '../loader/loader';

type OrderProps = {
	orders: Order[];
	showStatus?: boolean;
};

export const Orders = ({
	orders,
	showStatus = false,
}: OrderProps): React.JSX.Element => {
	const dispatch = useDispatch();
	const ingredients = useSelector(getAllIngredients);
	const ingredientsLoading = useSelector(getIngredientsLoading);
	const ingredientsError = useSelector(getIngredientsError);
	const location = useLocation();

	useEffect(() => {
		// Если ингредиенты не загружены (например, сразу открывается лента заказов), то загрузить их
		if (!ingredients || ingredients.length === 0) {
			dispatch(loadIngredients());
		}
	}, []);

	if (ingredientsLoading) return <Loader />;
	if (ingredientsError) return <p>Произошла непоправимая ошибка</p>;

	return ingredients && ingredients.length > 0 ? (
		<div className={styles.container}>
			<ul className={styles.orders_list}>
				{orders.map((order) => (
					<li key={order._id}>
						<Link
							to={`${location.pathname}/${order.number}`}
							state={{ backgroundLocation: location }}
							className={styles.link}>
							<CardOrder order={order} showStatus={showStatus} />
						</Link>
					</li>
				))}
			</ul>
		</div>
	) : (
		<div></div>
	);
};
