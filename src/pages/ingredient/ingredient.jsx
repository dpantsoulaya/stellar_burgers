import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllIngredients,
	getIngredientsLoading,
	getIngredientsError,
} from '@services/ingredients/reducer';
import { loadIngredients } from '@services/ingredients/actions';
import { IngredientDetails } from '../../components/ingredient-details/ingredient-details';
import styles from './ingredient.module.css';

export const Ingredient = () => {
	const dispatch = useDispatch();
	const ingredients = useSelector(getAllIngredients);
	const ingredientsLoading = useSelector(getIngredientsLoading);
	const ingredientsError = useSelector(getIngredientsError);

	useEffect(() => {
		dispatch(loadIngredients());
	}, []);

	if (ingredientsLoading) return <p>Загрузка ингредиентов с сервера</p>;
	if (ingredientsError) return <p>Произошла непоправимая ошибка</p>;

	return ingredients && ingredients.length > 0 ? (
		<div className={styles.container}>
			<div className={styles.inner_container}>
				<IngredientDetails />
			</div>
		</div>
	) : null;
};
