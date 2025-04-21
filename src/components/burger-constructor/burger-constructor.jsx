import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	ConstructorElement,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Price } from '../price/price';
import { OrderDetails } from '../order-details/order-details';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../modal/modal';
import { getAllIngredients } from '@services/ingredients/reducer';
import {
	addElement,
	changeBun,
	getBun,
	getElements,
	removeElement,
} from '@services/constructor/reducer';
import { DropTarget } from './drop-target';
import { makeOrder } from '@services/order/actions';
import { DraggableElement } from './draggable-element';
import { getUser } from '@services/user/reducer';
import styles from './style.module.css';

export const BurgerConstructor = () => {
	const user = useSelector(getUser);
	const bun = useSelector(getBun);
	const elements = useSelector(getElements);
	const [totalPrice, setTotalPrice] = useState(0);
	const { isModalOpen, openModal, closeModal } = useModal();
	const dispatch = useDispatch();
	const ingredients = useSelector(getAllIngredients);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		calculatePrice();
	}, [bun, elements]);

	const calculatePrice = useCallback(() => {
		const price =
			(bun ? 2 * bun.price : 0) +
			(elements ? elements.reduce((acc, el) => acc + Number(el.price), 0) : 0);
		setTotalPrice(price);
	}, [bun, elements]);

	// Бросили булку
	const handleDropBun = (id) => {
		const ingredient = ingredients.find((i) => i._id === id);
		if (ingredient.type !== 'bun') {
			console.error('Должна быть булка');
			return;
		}
		dispatch(changeBun(ingredient));
	};

	// Бросили начинку
	const handleDropElement = (id) => {
		const ingredient = ingredients.find((i) => i._id === id);
		dispatch(addElement(ingredient));
	};

	// Удалили ингредиент
	const handleRemoveElement = (uniqueId) => {
		dispatch(removeElement(uniqueId));
	};

	// Открытие модального окна с деталями заказа
	const handleMakeOrder = () => {
		// Если пользователь неавторизован, то перенаправлять его на страницу логина
		if (!user) {
			navigate('/login', { from: location });
			return;
		}

		if (!bun) {
			alert('Добавьте булку!');
			return;
		}
		if (elements.length === 0) {
			alert('Ингридиенты добавьте!');
			return;
		}

		const elementsIds = elements.map((e) => e._id);
		const ingredients = [bun._id, ...elementsIds, bun._id];
		dispatch(makeOrder(ingredients));
		openModal();
	};

	return (
		<>
			<div>
				<div className={styles.ingredients_list}>
					{!bun && (
						<DropTarget
							accept='bun'
							onDropHandler={handleDropBun}
							style={{
								borderRadius: 'var(--top-constructor-item-border-radius)',
							}}>
							<div
								className={`constructor-element constructor-element_pos_top ${styles.no_bun_container}`}>
								<p>Выберите булки</p>
							</div>
						</DropTarget>
					)}

					{bun && (
						<DropTarget
							accept='bun'
							onDropHandler={handleDropBun}
							style={{
								borderRadius: 'var(--top-constructor-item-border-radius)',
							}}>
							<ConstructorElement
								type='top'
								isLocked={true}
								text={`${bun.name} (верх)`}
								price={bun.price}
								thumbnail={bun.image}
							/>
						</DropTarget>
					)}

					{(!elements || elements.length === 0) && (
						<DropTarget accept='element' onDropHandler={handleDropElement}>
							<div
								className={`constructor-element ${styles.no_elements_container}`}>
								<p>Выберите начинку</p>
							</div>
						</DropTarget>
					)}

					{elements && elements.length > 0 && (
						<DropTarget accept='element' onDropHandler={handleDropElement}>
							<div className={styles.elements_container}>
								{elements.map((element, index) => (
									<DraggableElement
										key={element.uniqueId}
										id={element._id}
										index={index}>
										<ConstructorElement
											text={element.name}
											price={element.price}
											thumbnail={element.image}
											handleClose={() => handleRemoveElement(element.uniqueId)}
										/>
									</DraggableElement>
								))}
							</div>
						</DropTarget>
					)}

					{!bun && (
						<DropTarget
							accept='bun'
							onDropHandler={handleDropBun}
							style={{
								borderRadius: 'var(--bottom-constructor-item-border-radius)',
							}}>
							<div
								className={`constructor-element constructor-element_pos_bottom ${styles.no_bun_container}`}>
								<p>Выберите булки</p>
							</div>
						</DropTarget>
					)}

					{bun && (
						<DropTarget
							accept='bun'
							onDropHandler={handleDropBun}
							style={{
								borderRadius: 'var(--bottom-constructor-item-border-radius)',
							}}>
							<ConstructorElement
								type='bottom'
								isLocked={true}
								text={`${bun.name} (низ)`}
								price={bun.price}
								thumbnail={bun.image}
							/>
						</DropTarget>
					)}
				</div>

				<div className={styles.place_order_container}>
					<Price value={totalPrice} size='medium' />
					<Button
						htmlType='button'
						type='primary'
						size='large'
						onClick={handleMakeOrder}>
						Оформить заказ
					</Button>
				</div>
			</div>
			{isModalOpen && (
				<Modal onClose={closeModal}>
					<OrderDetails />
				</Modal>
			)}
		</>
	);
};
