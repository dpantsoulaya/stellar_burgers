import PropTypes from 'prop-types';
import { Modal } from '../components/modal/modal';
import { Characteristic } from './characteristic';
import styles from './style.module.css';

export const IngredientDetails = ({ ingredient, onClose }) => {
	return (
		<Modal title='Детали ингредиента' onClose={onClose}>
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
		</Modal>
	);
};

IngredientDetails.propTypes = {
	ingredient: PropTypes.shape({
		name: PropTypes.string,
		image_large: PropTypes.string,
		calories: PropTypes.number,
		fat: PropTypes.number,
		carbohydrates: PropTypes.number,
	}),
	onClose: PropTypes.func,
};
