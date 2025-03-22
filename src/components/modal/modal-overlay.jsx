import PropTypes from 'prop-types';
import styles from './style.module.css';

export const ModalOverlay = ({ onClose }) => {
	return <div className={styles.overlay} onClick={onClose}></div>;
};

ModalOverlay.propTypes = {
	onClose: PropTypes.func,
};
