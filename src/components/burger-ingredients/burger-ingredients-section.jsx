import { IngredientCard } from '../app-header/ingredient-card/ingredient-card';
import styles from './style.module.css';

export const BurgerIngredientsSection = ({ title, ingredients }) => {
	return (
		<section>
			<h2 className='text text_type_main-medium'>{title}</h2>

			<ul className={styles.ingredients_list}>
				{ingredients.map((ingredient) => (
					<li key={ingredient._id}>
						<IngredientCard ingredient={ingredient} />
					</li>
				))}
			</ul>
		</section>
	);
};
