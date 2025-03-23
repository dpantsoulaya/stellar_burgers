import PropTypes from 'prop-types';

export const IngredientType = PropTypes.shape({
	_id: PropTypes.string,
	type: PropTypes.string,
	name: PropTypes.string,
	price: PropTypes.number,
	image: PropTypes.string,
	image_large: PropTypes.string,
	calories: PropTypes.number,
	fat: PropTypes.number,
	carbohydrates: PropTypes.number,
});
