import { useSelector } from 'react-redux';
import { Characteristic } from './characteristic';
import styles from './style.module.css';
import { getCurrentIngredient } from '@services/ingredient-details/reducer';

export const IngredientDetails = () => {
	const ingredient = useSelector(getCurrentIngredient);

	return (
		<>
			<img src={ingredient.image_large} alt='ingredient' />
			<h2 className={styles.title}>{ingredient.name}</h2>
			{/* Бэк не возвращает описание */}
			{/* <p>{ingredient.description}</p> */}
			<div className={styles.characteristics_container}>
				<Characteristic name='Калории, ккал' value={ingredient.calories} />
				<Characteristic name='Белки, г' value={ingredient.proteins} />
				<Characteristic name='Жиры, г' value={ingredient.fat} />
				<Characteristic name='Углеводы, г' value={ingredient.carbohydrates} />
			</div>
		</>
	);
};
