import { useState, useCallback } from 'react';

export const useModal = () => {
	const [isModalOpen, setIsModalOpen] = useState();

	const openModal = useCallback(() => {
		setIsModalOpen(true);
	}, []);

	const closeModal = useCallback(() => {
		setIsModalOpen(false);
	}, []);

	return {
		isModalOpen,
		openModal,
		closeModal,
	};
};
