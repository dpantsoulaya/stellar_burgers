import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredientsSection } from './burger-ingredients-section';
import styles from './style.module.css';
import { loadIngredients } from '@services/ingredients/actions';
import {
	getAllIngredients,
	getIngredientsError,
	getIngredientsLoading,
} from '@services/ingredients/reducer';

const TAB_BUN = 'bun';
const TAB_SAUCE = 'sauce';
const TAB_MAIN = 'main';

export const BurgerIngredients = () => {
	const [activeTab, setActiveTab] = useState('bun');
	const dispatch = useDispatch();
	const ingredients = useSelector(getAllIngredients);
	const ingredientsLoading = useSelector(getIngredientsLoading);
	const ingredientsError = useSelector(getIngredientsError);

	const tabsRef = useRef(null);
	const bunRef = useRef(null);
	const sauceRef = useRef(null);
	const mainRef = useRef(null);

	useEffect(() => {
		dispatch(loadIngredients());
	}, []);

	const handleScroll = () => {
		const tabsY = tabsRef.current.getBoundingClientRect().y;
		const bunY = bunRef.current.getBoundingClientRect().y;
		const sauceY = sauceRef.current.getBoundingClientRect().y;
		const mainY = mainRef.current.getBoundingClientRect().y;

		const diffs = [
			{ name: TAB_BUN, val: Math.abs(tabsY - bunY) },
			{ name: TAB_SAUCE, val: Math.abs(tabsY - sauceY) },
			{ name: TAB_MAIN, val: Math.abs(tabsY - mainY) },
		].sort((a, b) => {
			return a.val - b.val;
		});

		const tabName = diffs[0].name;
		setActiveTab(tabName);
	};

	if (ingredientsLoading) return <p>Загрузка ингредиентов с сервера</p>;
	if (ingredientsError) return <p>Произошла непоправимая ошибка</p>;

	return ingredients && ingredients.length > 0 ? (
		<div>
			<h1 className='text text_type_main-large'>Соберите бургер</h1>
			<div ref={tabsRef} className={styles.tab_container}>
				<Tab value='Булки' active={activeTab === TAB_BUN}>
					Булки
				</Tab>

				<Tab value='Соусы' active={activeTab === TAB_SAUCE}>
					Соусы
				</Tab>

				<Tab value='Начинки' active={activeTab === TAB_MAIN}>
					Начинки
				</Tab>
			</div>

			<div className={styles.ingredients_container} onScroll={handleScroll}>
				<BurgerIngredientsSection
					ref={bunRef}
					title='Булки'
					ingredients={ingredients.filter(
						(ingredient) => ingredient.type === 'bun'
					)}
				/>

				<BurgerIngredientsSection
					ref={sauceRef}
					title='Соусы'
					ingredients={ingredients.filter(
						(ingredient) => ingredient.type === 'sauce'
					)}
				/>

				<BurgerIngredientsSection
					ref={mainRef}
					title='Начинки'
					ingredients={ingredients.filter(
						(ingredient) => ingredient.type === 'main'
					)}
				/>
			</div>
		</div>
	) : null;
};
