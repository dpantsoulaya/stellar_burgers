/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useDispatch } from 'react-redux';
import { Price } from '../price/price';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { useModal } from '../../hooks/useModal';
import { IngredientType } from '@utils/types';
import { Modal } from '../modal/modal';
import {
	clearCurrentIngredient,
	setCurrentIngredient,
} from '@services/ingredient-details/reducer';
import { useDrag } from 'react-dnd';
import { IngredientCounter } from './ingredient-counter';
import styles from './style.module.css';

export const IngredientCard = ({ ingredient }) => {
	const [, dragRef] = useDrag({
		type: ingredient.type === 'bun' ? 'bun' : 'element',
		item: { id: ingredient._id },
	});
	const { isModalOpen, openModal, closeModal } = useModal();
	const dispatch = useDispatch();

	const handleOpenModal = () => {
		dispatch(setCurrentIngredient(ingredient));
		openModal();
	};

	const handleCloseModal = () => {
		dispatch(clearCurrentIngredient());
		closeModal();
	};

	return (
		<>
			<div
				className={`ml-4 mr-3 ${styles.card_container}`}
				onClick={handleOpenModal}>
				<IngredientCounter ingredientId={ingredient._id} />

				<img src={ingredient.image} alt='' ref={dragRef} />

				<Price value={ingredient.price} />
				<span>{ingredient.name}</span>
			</div>
			{isModalOpen && (
				<Modal title='Детали ингредиента' onClose={handleCloseModal}>
					<IngredientDetails />
				</Modal>
			)}
		</>
	);
};

IngredientCard.propTypes = {
	ingredient: IngredientType.isRequired,
};
