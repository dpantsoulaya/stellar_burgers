import React from 'react';
import styles from './style.module.css';
import { FeedResponse } from '@utils/types';

type StatsProps = {
	feed: FeedResponse;
};

export const Stats = ({ feed }: StatsProps): React.JSX.Element => {
	const ordersDone = feed.orders
		.filter((o) => o.status === 'done')
		.map((o) => o.number)
		.slice(0, 10);

	const ordersInWork = feed.orders
		.filter((o) => o.status !== 'done')
		.map((o) => o.number)
		.slice(0, 10);

	return (
		<div className={`${styles.container} ml-15`}>
			<div className={styles.in_progress_container}>
				<div>
					<p className='text text_type_main-medium mb-6'>Готовы:</p>
					<ul className={styles.in_progress_list}>
						{ordersDone.map((o) => (
							<li key={o}>
								<p
									className={`${styles.order_done} text text_type_digits-default`}>
									{o}
								</p>
							</li>
						))}
					</ul>
				</div>
				<div className='ml-9'>
					<p className='text text_type_main-medium mb-6'>В работе:</p>
					<ul className={styles.in_progress_list}>
						{ordersInWork.map((o) => (
							<li key={o}>
								<p className='text text_type_digits-default'>{o}</p>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className='mt-15'>
				<p className='text text_type_main-medium'>Выполнено за всё время:</p>
				<p className='text text_type_digits-large'>{feed.total}</p>
			</div>

			<div className='mt-15'>
				<p className='text text_type_main-medium'>Выполнено за сегодня:</p>
				<p className='text text_type_digits-large'>{feed.totalToday}</p>
			</div>
		</div>
	);
};
