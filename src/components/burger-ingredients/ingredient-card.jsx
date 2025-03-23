import { Price } from '../price/price';
import styles from './style.module.css';
import { IngredientDetails } from '../../ingredient-details/ingredient-details';
import { useModal } from '../../hooks/useModal';
import { IngredientType } from '@utils/types';
import { Modal } from '../modal/modal';

export const IngredientCard = ({ ingredient }) => {
	const { isModalOpen, openModal, closeModal } = useModal();

	return (
		<>
			<div className={`ml-4 mr-3 ${styles.card_container}`} onClick={openModal}>
				<img src={ingredient.image} alt='' />

				<Price value={ingredient.price} />
				<span>{ingredient.name}</span>
			</div>
			{isModalOpen && (
				<Modal title='Детали ингредиента' onClose={closeModal}>
					<IngredientDetails ingredient={ingredient} />
				</Modal>
			)}
		</>
	);
};

IngredientCard.propTypes = {
	ingredient: IngredientType,
};
