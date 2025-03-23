import PropTypes from 'prop-types';
import { IngredientCard } from './ingredient-card';
import styles from './style.module.css';
import { IngredientType } from '@utils/types';

export const BurgerIngredientsSection = ({ title, ingredients }) => {
	return (
		<section>
			<h2 className='text text_type_main-medium'>{title}</h2>

			{ingredients && (
				<ul className={styles.ingredients_list}>
					{ingredients.map((ingredient) => (
						<li key={ingredient._id}>
							<IngredientCard ingredient={ingredient} />
						</li>
					))}
				</ul>
			)}
		</section>
	);
};

BurgerIngredientsSection.propTypes = {
	title: PropTypes.string.isRequired,
	ingredients: PropTypes.arrayOf(IngredientType),
};
