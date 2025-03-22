import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './style.module.css';

export const ModalHeader = ({ title, onClose }) => {
	return (
		<div className={`${styles.modal_header}`}>
			<h1 className={`text text_type_main-large ${styles.title}`}>{title}</h1>

			<CloseIcon onClick={onClose} />
		</div>
	);
};

ModalHeader.propTypes = {
	title: PropTypes.string,
	onClose: PropTypes.func,
};
