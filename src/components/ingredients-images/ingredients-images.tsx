import styles from './style.module.css';

type IngredientsImagesProp = {
	images: string[];
};

export const IngredientsImages = ({
	images,
}: IngredientsImagesProp): React.JSX.Element => {
	const Z_INDEX_BASE = 10;

	// Отображаемое кол-во ингредиентов
	const DISPLAY_NUMBER = 5;
	const numberOfIngredients = images.length;
	const imagesToDisplay = images.slice(0, DISPLAY_NUMBER);

	return (
		<div className={styles.container}>
			{imagesToDisplay.map((image, index) => (
				<div
					key={index}
					className={styles.image_container}
					style={{ zIndex: Z_INDEX_BASE - index }}>
					<img src={image} alt='ingredient' />
				</div>
			))}
			{numberOfIngredients > DISPLAY_NUMBER && (
				<div
					className={`${styles.image_container} ${styles.more_image_container}`}
					style={{ zIndex: Z_INDEX_BASE + 1 }}>
					<img src={images[DISPLAY_NUMBER]} alt='more' />
					<span
						className={`text text_type_digits-default ${styles.more_label}`}>
						+{numberOfIngredients - DISPLAY_NUMBER}
					</span>
				</div>
			)}
		</div>
	);
};
