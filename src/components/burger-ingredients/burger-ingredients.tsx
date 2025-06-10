import React, { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from '@services/store';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsSection from './burger-ingredients-section';
import { loadIngredients } from '@services/ingredients/actions';
import {
	getAllIngredients,
	getIngredientsError,
	getIngredientsLoading,
} from '@services/ingredients/slice';
import { Loader } from '../loader/loader';
import styles from './style.module.css';

enum TabName {
	BUN = 'bun',
	SAUCE = 'sauce',
	MAIN = 'main',
}

export const BurgerIngredients = (): React.JSX.Element => {
	const [activeTab, setActiveTab] = useState('bun');
	const dispatch = useDispatch();
	const ingredients = useSelector(getAllIngredients);
	const ingredientsLoading = useSelector(getIngredientsLoading);
	const ingredientsError = useSelector(getIngredientsError);

	const tabsRef = useRef<HTMLDivElement>(null);
	const bunRef = useRef<HTMLElement>(null);
	const sauceRef = useRef<HTMLElement>(null);
	const mainRef = useRef<HTMLElement>(null);

	useEffect(() => {
		dispatch(loadIngredients());
	}, []);

	const buns = useMemo(
		() => ingredients?.filter((ingredient) => ingredient.type === TabName.BUN),
		[ingredients]
	);

	const sauces = useMemo(
		() =>
			ingredients?.filter((ingredient) => ingredient.type === TabName.SAUCE),
		[ingredients]
	);

	const mains = useMemo(
		() => ingredients?.filter((ingredient) => ingredient.type === TabName.MAIN),
		[ingredients]
	);

	const handleScroll = () => {
		const tabsY = tabsRef.current?.getBoundingClientRect().y;
		const bunY = bunRef.current?.getBoundingClientRect().y;
		const sauceY = sauceRef.current?.getBoundingClientRect().y;
		const mainY = mainRef.current?.getBoundingClientRect().y;

		if (!tabsY || !bunY || !sauceY || !mainY) return;

		const diffs = [
			{ name: TabName.BUN, val: Math.abs(tabsY - bunY) },
			{ name: TabName.SAUCE, val: Math.abs(tabsY - sauceY) },
			{ name: TabName.MAIN, val: Math.abs(tabsY - mainY) },
		].sort((a, b) => {
			return a.val - b.val;
		});

		const tabName = diffs[0].name;
		setActiveTab(tabName);
	};

	const onTabClick = (tab: TabName) => {
		setActiveTab(tab);
		let elementRef: RefObject<HTMLElement> | null;
		switch (tab) {
			case TabName.BUN:
				elementRef = bunRef;
				break;
			case TabName.MAIN:
				elementRef = mainRef;
				break;
			case TabName.SAUCE:
				elementRef = sauceRef;
				break;
			default:
				elementRef = null;
				break;
		}
		if (elementRef) elementRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	if (ingredientsLoading) return <Loader />;
	if (ingredientsError) return <p>Произошла непоправимая ошибка</p>;

	return ingredients && ingredients.length > 0 ? (
		<div>
			<h1 className='text text_type_main-large' data-testid='header'>
				Соберите бургер
			</h1>
			<div ref={tabsRef} className={styles.tab_container}>
				<Tab
					value='Булки'
					active={activeTab === TabName.BUN}
					onClick={() => onTabClick(TabName.BUN)}>
					Булки
				</Tab>

				<Tab
					value='Соусы'
					active={activeTab === TabName.SAUCE}
					onClick={() => onTabClick(TabName.SAUCE)}>
					Соусы
				</Tab>

				<Tab
					value='Начинки'
					active={activeTab === TabName.MAIN}
					onClick={() => onTabClick(TabName.MAIN)}>
					Начинки
				</Tab>
			</div>

			<div className={styles.ingredients_container} onScroll={handleScroll}>
				<BurgerIngredientsSection
					ref={bunRef}
					title='Булки'
					ingredients={buns}
				/>

				<BurgerIngredientsSection
					ref={sauceRef}
					title='Соусы'
					ingredients={sauces}
				/>

				<BurgerIngredientsSection
					ref={mainRef}
					title='Начинки'
					ingredients={mains}
				/>
			</div>
		</div>
	) : (
		<div></div>
	);
};
