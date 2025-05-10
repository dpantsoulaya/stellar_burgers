import React from 'react';
import styles from './style.module.css';

type CharacteristicProps = {
	name: string;
	value: number;
};

export const Characteristic = ({
	name,
	value,
}: CharacteristicProps): React.JSX.Element => {
	return (
		<div className={styles.characteristic}>
			<p className='text text_type_main-default text_color_inactive'>{name}</p>
			<p className='text text_type_digits-default text_color_inactive'>
				{value}
			</p>
		</div>
	);
};
