import { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { ModalOverlay } from './modal-overlay';
import { ModalHeader } from './modal-header';
import styles from './style.module.css';
import { useNavigate } from 'react-router-dom';

const modalRoot = document.getElementById('react-modals');

export const Modal = ({ children, title }) => {
	const navigate = useNavigate();

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

	// Закрытие модального окна - идём назад в истории
	const onClose = useCallback(() => {
		navigate(-1);
	}, []);

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
};
