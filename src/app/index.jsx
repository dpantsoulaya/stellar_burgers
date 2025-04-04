import { AppHeader } from '../components/app-header/app-header';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './app.module.scss';

export const App = () => {
	return (
		<div className='page'>
			<AppHeader />

			<DndProvider backend={HTML5Backend}>
				<main className={styles.container}>
					<BurgerIngredients />
					<BurgerConstructor />
				</main>
			</DndProvider>
		</div>
	);
};
