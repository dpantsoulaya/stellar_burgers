import PropTypes from 'prop-types';
import styles from './style.module.css';

export const HeaderButton = ({ icon, text, active }) => {
	return (
		<div className={`p-4 mb-4 mt-4 ${styles.button_container}`}>
			{icon}
			<div
				className={`p-2 text text_type_main-default ${
					active ? styles.active_button : styles.disabled_button
				}`}>
				{text}
			</div>
		</div>
	);
};

HeaderButton.propTypes = {
	icon: PropTypes.node,
	text: PropTypes.string.isRequired,
	active: PropTypes.bool,
};
