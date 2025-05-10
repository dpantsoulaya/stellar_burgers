import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { getBun, getElements } from '@services/constructor/reducer';
import styles from './style.module.css';
import { Ingredient } from '@utils/types';

type IngredientCounterProps = {
	ingredientId: string;
};

export const IngredientCounter = ({
	ingredientId,
}: IngredientCounterProps): React.JSX.Element | null => {
	const [count, setCount] = useState(0);
	const elements = useSelector<unknown, Ingredient[]>(getElements);
	const bun = useSelector<unknown, Ingredient>(getBun);

	useEffect(() => {
		calcTotalNumber();
	}, [bun, elements]);

	const calcTotalNumber = useCallback(() => {
		const total =
			bun?._id === ingredientId
				? 2
				: elements
				? elements.filter((el) => el._id === ingredientId).length
				: 0;
		setCount(total);
	}, [bun, elements]);

	return count > 0 ? (
		<div className={styles.counter_container}>
			<Counter count={count} size='default' />
		</div>
	) : null;
};
