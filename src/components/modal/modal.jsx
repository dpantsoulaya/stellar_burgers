import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { ModalOverlay } from './modal-overlay';
import { ModalHeader } from './modal-header';
import styles from './style.module.css';

const modalRoot = document.getElementById('react-modals');

export const Modal = ({ children, title, onClose }) => {
	useEffect(() => {
		const handleEscPress = (event) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscPress);

		return () => {
			document.removeEventListener('keydown', handleEscPress);
		};
	}, [onClose]);

	return ReactDOM.createPortal(
		<>
			<ModalOverlay onClose={onClose} />
			<div className={`p-10 ${styles.container}`}>
				<ModalHeader title={title} onClose={onClose} />
				{children}
			</div>
		</>,
		modalRoot
	);
};

Modal.propTypes = {
	children: PropTypes.node.isRequired,
	title: PropTypes.string,
	onClose: PropTypes.func.isRequired,
};
