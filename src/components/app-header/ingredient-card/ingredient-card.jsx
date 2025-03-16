import { Price } from '../../price/price';
import styles from './style.module.css';

export const IngredientCard = ({ ingredient }) => {
	return (
		<div className={`ml-4 mr-3 ${styles.container}`}>
			<img src={ingredient.image} alt='' />

			<Price value={ingredient.price} />
			<span>{ingredient.name}</span>
		</div>
	);
};
