import React from 'react';
import { Ingredient } from '@utils/types';
import styles from './style.module.css';
import { Price } from '../price/price';

type OrderIngredientsProps = {
	ingredients: Ingredient[];
};

export const OrderIngredients = ({
	ingredients,
}: OrderIngredientsProps): React.JSX.Element => {
	const ingredientsMap = new Map<
		string,
		{ ingredient: Ingredient; count: number }
	>();

	ingredients.forEach((ingredient) => {
		const id = ingredient._id;
		ingredientsMap.set(id, {
			ingredient,
			count: (ingredientsMap.get(id)?.count ?? 0) + 1,
		});
	});

	return (
		<div className={`${styles.ingredients_container} mb-10`}>
			<ul className={styles.ingredient_list}>
				{Array.from(ingredientsMap.values()).map(
					({ ingredient, count }, index) => (
						<div key={index} className={`${styles.ingredient_container} mb-4`}>
							<div className={styles.image_container}>
								<img src={ingredient.image} alt={ingredient.name} />
							</div>
							<div className={`${styles.name_container} ml-4 mr-4`}>
								<p className='text text_type_main-default'>{ingredient.name}</p>
							</div>
							<div className={styles.price_container}>
								<span className='text text_type_digits-default'>
									{count}&nbsp;x&nbsp;
								</span>
								<Price value={ingredient.price} />
							</div>
						</div>
					)
				)}
			</ul>
		</div>
	);
};
