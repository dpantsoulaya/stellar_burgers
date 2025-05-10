import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './home.module.scss';

export const Home = (): React.JSX.Element => {
	return (
		<DndProvider backend={HTML5Backend}>
			<main className={styles.container}>
				<BurgerIngredients />
				<BurgerConstructor />
			</main>
		</DndProvider>
	);
};
