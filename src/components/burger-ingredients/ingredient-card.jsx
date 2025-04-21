import React from 'react';
import { Price } from '../price/price';
import { IngredientType } from '@utils/types';
import { useDrag } from 'react-dnd';
import { IngredientCounter } from './ingredient-counter';
import styles from './style.module.css';

const IngredientCard = ({ ingredient }) => {
	const [, dragRef] = useDrag({
		type: ingredient.type === 'bun' ? 'bun' : 'element',
		item: { id: ingredient._id },
	});

	return (
		<>
			<div className={`ml-4 mr-3 ${styles.card_container}`}>
				<IngredientCounter ingredientId={ingredient._id} />

				<img src={ingredient.image} alt='' ref={dragRef} />

				<Price value={ingredient.price} />
				<span>{ingredient.name}</span>
			</div>
		</>
	);
};

IngredientCard.propTypes = {
	ingredient: IngredientType.isRequired,
};

export default React.memo(IngredientCard);
