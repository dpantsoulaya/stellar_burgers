import { useState } from 'react';
import {
	ConstructorElement,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { Price } from '../price/price';
import { OrderDetails } from '../order-details/order-details';
import styles from './style.module.css';

export const BurgerConstructor = ({ elements }) => {
	const [showOrderDetails, setShowOrderDetails] = useState(false);

	const handleOpenOrderDetails = () => {
		setShowOrderDetails(true);
	};

	const handleCloseOrderDetails = () => {
		setShowOrderDetails(false);
	};

	return elements.length > 0 ? (
		<>
			<div>
				<div className={styles.ingredients_list}>
					<ConstructorElement
						type='top'
						isLocked={true}
						text='Краторная булка N-200i (верх)'
						price={200}
						thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
					/>

					{elements.map((element, index) => (
						<ConstructorElement
							key={index}
							text={element.name}
							price={element.price}
							thumbnail={element.image}
						/>
					))}

					<ConstructorElement
						type='bottom'
						isLocked={true}
						text='Краторная булка N-200i (низ)'
						price={200}
						thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
					/>
				</div>

				<div className={styles.place_order_container}>
					<Price value={610} size='medium' />
					<Button
						htmlType='button'
						type='primary'
						size='large'
						onClick={handleOpenOrderDetails}>
						Оформить заказ
					</Button>
				</div>
			</div>
			{showOrderDetails && <OrderDetails onClose={handleCloseOrderDetails} />}
		</>
	) : null;
};

BurgerConstructor.propTypes = {
	elements: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			price: PropTypes.number,
			image: PropTypes.string,
		})
	).isRequired,
};
