import { OrderStatus as TOrderStatus } from '@utils/types';

type OrderStatusProps = {
	status: TOrderStatus;
};

export const OrderStatus = ({
	status,
}: OrderStatusProps): React.JSX.Element => {
	// Получить статус заказа в виде строки
	function getOrderStatusAsText(status: TOrderStatus): string {
		switch (status) {
			case 'created':
				return 'Создан';
			case 'pending':
				return 'Готовится';
			case 'done':
				return 'Выполнен';
		}
	}

	return (
		<p
			className='text text_type_main-small'
			style={{ color: status === 'done' ? '#00CCCC' : 'white' }}>
			{getOrderStatusAsText(status)}
		</p>
	);
};
