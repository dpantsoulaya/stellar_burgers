import {
	ConstructorElement,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Price } from '../price/price';
import styles from './style.module.css';

export const BurgerConstructor = ({ elements }) => {
	return (
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
				<Button htmlType='button' type='primary' size='large'>
					Оформить заказ
				</Button>
			</div>
		</div>
	);
};
