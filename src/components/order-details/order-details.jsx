import styles from './style.module.css';

export const OrderDetails = () => {
	return (
		<div className={`pb-10 pt-10 ${styles.container}`}>
			<p className='text text_type_digits-large'>034536</p>
			<p className='pt-8 text text_type_main-medium'>идентификатор заказа</p>
			<img
				className='pt-15 pb-15'
				src={require('../../images/done.png')}
				alt='done'
			/>
			<p className='text text_type_main-default'>Ваш заказ начали готовить</p>
			<p className='pt-2 text text_type_main-default text_color_inactive'>
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	);
};
