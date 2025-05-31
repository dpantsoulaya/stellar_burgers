import React, { useEffect } from 'react';
import { Orders as OrdersComponent } from '../../components/orders/orders';
import { Stats } from '../../components/stats/stats';
import styles from './feed.module.css';
import { useDispatch, useSelector } from '@services/store';
import { getFeed } from '@services/feed/slice';
import { connect, disconnect } from '@services/feed/actions';

const FEED_URL = 'wss://norma.nomoreparties.space/orders/all';

export const Feed = (): React.JSX.Element => {
	const feed = useSelector(getFeed);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(connect(FEED_URL));

		return () => {
			dispatch(disconnect());
		};
	}, []);

	return (
		<div>
			<p className='text text_type_main-large'>Лента заказов</p>

			<div className={styles.container}>
				{feed && (
					<div className={styles.orders_container}>
						<OrdersComponent orders={feed.orders} />
					</div>
				)}

				{feed && <Stats feed={feed} />}
			</div>
		</div>
	);
};
