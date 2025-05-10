import React from 'react';
import styles from './loader.module.css';

export const Loader = (): React.JSX.Element => {
	return (
		<div className={styles.container}>
			<img src={require('../../images/loader3.gif')} alt='Загрузка...' />
			<p className='pt-8 text text_type_main-default'>Подождите...</p>
		</div>
	);
};
