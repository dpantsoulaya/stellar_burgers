import React from 'react';
import PropTypes from 'prop-types';
import IngredientCard from './ingredient-card';
import styles from './style.module.css';
import { IngredientType } from '@utils/types';
import { Link, useLocation } from 'react-router-dom';

// eslint-disable-next-line react/display-name
const BurgerIngredientsSection = React.forwardRef(
	({ title, ingredients }, ref) => {
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
									state={{ backgroundLocation: location }}>
									<IngredientCard ingredient={ingredient} />
								</Link>
							</li>
						))}
					</ul>
				)}
			</section>
		);
	}
);

BurgerIngredientsSection.propTypes = {
	title: PropTypes.string.isRequired,
	ingredients: PropTypes.arrayOf(IngredientType),
};

export default React.memo(BurgerIngredientsSection);
