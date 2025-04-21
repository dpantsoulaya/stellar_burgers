import PropTypes from 'prop-types';

export const IngredientType = PropTypes.shape({
	_id: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired,
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
	image_large: PropTypes.string.isRequired,
	calories: PropTypes.number.isRequired,
	fat: PropTypes.number.isRequired,
	carbohydrates: PropTypes.number.isRequired,
});
