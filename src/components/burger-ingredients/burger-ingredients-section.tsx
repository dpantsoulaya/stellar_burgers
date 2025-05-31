import React from 'react';
import IngredientCard from './ingredient-card';
import { Link, useLocation } from 'react-router-dom';
import { Ingredient } from '@utils/types';
import styles from './style.module.css';

type BurgerIngredientsSectionProps = {
	title: string;
	ingredients: Ingredient[];
};

// eslint-disable-next-line react/display-name
const BurgerIngredientsSection = React.forwardRef<
	HTMLElement,
	BurgerIngredientsSectionProps
>(({ title, ingredients }, ref): React.JSX.Element => {
	const location = useLocation();

	return (
		<section ref={ref}>
			<h2 className='text text_type_main-medium'>{title}</h2>

			{ingredients && (
				<ul className={styles.ingredients_list}>
					{ingredients.map((ingredient) => (
						<li key={ingredient._id}>
							<Link
								to={`/ingredients/${ingredient._id}`}
								state={{ backgroundLocation: location }}
								className={styles.link}>
								<IngredientCard ingredient={ingredient} />
							</Link>
						</li>
					))}
				</ul>
			)}
		</section>
	);
});

export default React.memo(BurgerIngredientsSection);
