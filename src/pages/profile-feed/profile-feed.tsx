import { useDispatch, useSelector } from '@services/store';
import { Orders as OrdersComponent } from '../../components/orders/orders';
import { getProfileFeed } from '@services/profile-feed/slice';
import { useEffect } from 'react';
import { LOCAL_STORAGE_ACCESS_TOKEN } from '@utils/api';
import { connect, disconnect } from '@services/profile-feed/actions';
import styles from './profile-feed.module.css';

const PROFILE_FEED_URL = 'wss://norma.nomoreparties.space/orders';

export const ProfileFeed = (): React.JSX.Element => {
	const orders = useSelector(getProfileFeed);
	const dispatch = useDispatch();

	useEffect(() => {
		const token = localStorage
			.getItem(LOCAL_STORAGE_ACCESS_TOKEN)
			?.replace('Bearer ', '');
		const url = `${PROFILE_FEED_URL}?token=${token}`;

		dispatch(connect(url));

		return () => {
			dispatch(disconnect());
		};
	}, []);

	return (
		<div className={styles.images_container}>
			{orders && <OrdersComponent orders={orders.orders} showStatus={true} />}
		</div>
	);
};
