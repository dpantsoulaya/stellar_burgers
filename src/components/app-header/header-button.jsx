import PropTypes from 'prop-types';
import styles from './style.module.css';
import { NavLink } from 'react-router-dom';

export const HeaderButton = ({ icon, text, link, active }) => {
	return (
		<NavLink to={link}>
			<div className={`p-4 mb-4 mt-4 ${styles.button_container}`}>
				{icon}
				<div>
					<span
						className={`p-2 text text_type_main-default ${
							active ? styles.active_button : styles.disabled_button
						}`}>
						{text}
					</span>
				</div>
			</div>
		</NavLink>
	);
};

HeaderButton.propTypes = {
	icon: PropTypes.node,
	text: PropTypes.string.isRequired,
	link: PropTypes.string,
	active: PropTypes.bool,
};
