import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredientsSection } from './burger-ingredients-section';
import styles from './style.module.css';

export const BurgerIngredients = ({ ingredients }) => {
	return (
		<div>
			<h1 className='text text_type_main-large'>Соберите бургер</h1>
			<div className={styles.tab_container}>
				<Tab value='Булки' active={true}>
					Булки
				</Tab>

				<Tab value='Соусы'>Соусы</Tab>

				<Tab value='Начинки'>Начинки</Tab>
			</div>

			<div className={styles.ingredients_container}>
				<BurgerIngredientsSection
					title='Булки'
					ingredients={ingredients.filter(
						(ingredient) => ingredient.type === 'bun'
					)}
				/>

				<BurgerIngredientsSection
					title='Соусы'
					ingredients={ingredients.filter(
						(ingredient) => ingredient.type === 'sauce'
					)}
				/>

				<BurgerIngredientsSection
					title='Начинки'
					ingredients={ingredients.filter(
						(ingredient) => ingredient.type === 'main'
					)}
				/>
			</div>
		</div>
	);
};
