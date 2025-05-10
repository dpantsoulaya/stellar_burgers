import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Characteristic } from './characteristic';
import { getAllIngredients } from '@services/ingredients/reducer';
import { Ingredient } from '@utils/types';
import styles from './style.module.css';

export const IngredientDetails = (): React.JSX.Element | null => {
	const { id } = useParams();
	const ingredients = useSelector<unknown, Ingredient[]>(getAllIngredients);
	const ingredient = ingredients.find((i) => i._id == id);

	return ingredient ? (
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
	) : null;
};
