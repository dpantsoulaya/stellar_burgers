import PropTypes from 'prop-types';
import styles from './style.module.css';

export const Characteristic = ({ name, value }) => {
	return (
		<div className={styles.characteristic}>
			<p className='text text_type_main-default text_color_inactive'>{name}</p>
			<p className='text text_type_digits-default text_color_inactive'>
				{value}
			</p>
		</div>
	);
};

Characteristic.propTypes = {
	name: PropTypes.string,
	value: PropTypes.number,
};
