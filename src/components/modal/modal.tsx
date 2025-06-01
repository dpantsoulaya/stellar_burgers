import React, { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ModalOverlay } from './modal-overlay';
import { ModalHeader } from './modal-header';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css';

const modalRoot = document.getElementById('react-modals');

type ModalProps = {
	children: React.ReactNode;
	title?: string;
	onClose: () => void;
};

export const Modal = ({
	children,
	title,
	onClose,
}: ModalProps): React.ReactPortal => {
	//const navigate = useNavigate();

	// // Закрытие модального окна - идём назад в истории
	// const onClose = useCallback(() => {
	// 	navigate(-1);
	// }, []);

	useEffect(() => {
		const handleEscPress = (event: KeyboardEvent) => {
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
		modalRoot!
	);
};
