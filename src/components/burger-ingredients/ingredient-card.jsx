import { useState } from 'react';
import PropTypes from 'prop-types';
import { Price } from '../price/price';
import styles from './style.module.css';
import { IngredientDetails } from '../../ingredient-details/ingredient-details';

export const IngredientCard = ({ ingredient }) => {
	const [showIngredientDetails, setShowIngredientDetails] = useState(false);

	const handleOpenIngredientDetails = () => {
		setShowIngredientDetails(true);
	};

	const handleCloseIngredientDetails = () => {
		setShowIngredientDetails(false);
	};

	return (
		<>
			<div
				className={`ml-4 mr-3 ${styles.card_container}`}
				onClick={handleOpenIngredientDetails}>
				<img src={ingredient.image} alt='' />

				<Price value={ingredient.price} />
				<span>{ingredient.name}</span>
			</div>
			{showIngredientDetails && (
				<IngredientDetails
					ingredient={ingredient}
					onClose={handleCloseIngredientDetails}
				/>
			)}
		</>
	);
};

IngredientCard.propTypes = {
	name: PropTypes.string,
	price: PropTypes.number,
	image: PropTypes.string,
};
