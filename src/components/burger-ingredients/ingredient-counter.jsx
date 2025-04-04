import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './style.module.css';
import { getBun, getElements } from '@services/constructor/reducer';

export const IngredientCounter = ({ ingredientId }) => {
	const [count, setCount] = useState(0);
	const elements = useSelector(getElements);
	const bun = useSelector(getBun);

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

IngredientCounter.propTypes = {
	ingredientId: PropTypes.string,
};
