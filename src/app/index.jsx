import { useEffect, useState } from 'react';
import { AppHeader } from '../components/app-header/app-header';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import styles from './app.module.scss';

const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const App = () => {
	const [ingredients, setIngredients] = useState([]);
	const [elements, setElements] = useState([]);

	useEffect(() => {
		fetch(INGREDIENTS_URL)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					setIngredients(data.data);
				} else {
					alert('Ошибка получения данных с сервера об ингредиентах');
				}
			})
			.catch((err) => console.error(err));
	}, []);

	useEffect(() => {
		const constructorElementsIds = [
			'643d69a5c3f7b9001cfa0944',
			'643d69a5c3f7b9001cfa093f',
			'643d69a5c3f7b9001cfa0947',
			'643d69a5c3f7b9001cfa0946',
			'643d69a5c3f7b9001cfa0946',
		];

		if (ingredients.length > 0) {
			const els = constructorElementsIds.map((id) =>
				ingredients.find((i) => i._id === id)
			);
			setElements(els);
		}
	}, [ingredients]);

	return (
		<div className='page'>
			<AppHeader />

			{ingredients.length > 0 && (
				<main className={styles.container}>
					<BurgerIngredients ingredients={ingredients} />
					<BurgerConstructor elements={elements} />
				</main>
			)}
			{ingredients.length === 0 && <p>Загрузка данных с сервера....</p>}
		</div>
	);
};
