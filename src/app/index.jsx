import { AppHeader } from '../components/app-header/app-header';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import { ingredients } from '@utils/data';

export const App = () => {
	const constructorElementsIds = [
		'60666c42cc7b410027a1a9b4',
		'60666c42cc7b410027a1a9bc',
		'60666c42cc7b410027a1a9bb',
		'60666c42cc7b410027a1a9bb',
	];
	const elements = constructorElementsIds.map((id) =>
		ingredients.find((i) => i._id === id)
	);

	return (
		<div className='page'>
			<AppHeader />

			<div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
				<BurgerIngredients ingredients={ingredients} />
				<BurgerConstructor elements={elements} />
			</div>
		</div>
	);
};
