import React from 'react';
import { Price } from '../price/price';
import { useDrag } from 'react-dnd';
import { IngredientCounter } from './ingredient-counter';
import { Ingredient } from '@utils/types';
import styles from './style.module.css';

type IngredientCardProps = {
	ingredient: Ingredient;
};

const IngredientCard = ({
	ingredient,
}: IngredientCardProps): React.JSX.Element => {
	const [, dragRef] = useDrag({
		type: ingredient.type === 'bun' ? 'bun' : 'element',
		item: { id: ingredient._id },
	});

	return (
		<div
			className={`ml-4 mr-3 ${styles.card_container}`}
			data-testid='ingredient-card'>
			<IngredientCounter ingredientId={ingredient._id} />

			<img src={ingredient.image} alt='' ref={dragRef} />

			<Price value={ingredient.price} />
			<span>{ingredient.name}</span>
		</div>
	);
};
export default React.memo(IngredientCard);
