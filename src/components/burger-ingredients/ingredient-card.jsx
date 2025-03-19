import PropTypes from 'prop-types';
import { Price } from '../price/price';
import styles from './style.module.css';

export const IngredientCard = ({ ingredient }) => {
	return (
		<div className={`ml-4 mr-3 ${styles.card_container}`}>
			<img src={ingredient.image} alt='' />

			<Price value={ingredient.price} />
			<span>{ingredient.name}</span>
		</div>
	);
};

IngredientCard.propTypes = {
	name: PropTypes.string.isRequired,
	price: PropTypes.number,
	image: PropTypes.string,
};
