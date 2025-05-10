import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './style.module.css';

type ModalHeaderProps = {
	title?: string;
	onClose: () => void;
};

export const ModalHeader = ({
	title,
	onClose,
}: ModalHeaderProps): React.JSX.Element => {
	return (
		<div className={`${styles.modal_header}`}>
			<h1 className={`text text_type_main-large ${styles.title}`}>{title}</h1>

			<CloseIcon type='primary' onClick={onClose} />
		</div>
	);
};
