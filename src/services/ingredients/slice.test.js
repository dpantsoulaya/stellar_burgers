import { loadIngredients } from './actions';
import { initialState, ingredientsSlice } from './slice';

const ingredients = [
	{
		_id: '643d69a5c3f7b9001cfa093c',
		name: 'Краторная булка N-200i',
		type: 'bun',
		proteins: 80,
		fat: 24,
		carbohydrates: 53,
		calories: 420,
		price: 1255,
		image: 'https://code.s3.yandex.net/react/code/bun-02.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
		__v: 0,
	},
];

describe('ingredients slice', () => {
	it('initialized correctly', () => {
		const state = ingredientsSlice.reducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('loadIngredients pending', () => {
		const action = { type: loadIngredients.pending.type };
		const state = ingredientsSlice.reducer(initialState, action);
		expect(state).toEqual({ ...initialState, loading: true });
	});

	it('loadIngredients fulfilled', () => {
		const action = {
			type: loadIngredients.fulfilled.type,
			payload: ingredients,
		};
		const state = ingredientsSlice.reducer(initialState, action);
		expect(state).toEqual({ ...initialState, ingredients });
	});

	it('loadIngredients rejected', () => {
		const action = { type: loadIngredients.rejected.type };
		const state = ingredientsSlice.reducer(initialState, action);
		expect(state).toEqual({ ...initialState, error: true });
	});

	it('get all ingredients', () => {
		const state = { ingredients };
		expect(
			ingredientsSlice.selectors.getAllIngredients({ ingredients: state })
		).toEqual(ingredients);
	});

	it('get ingredients error', () => {
		const state = { error: true };
		expect(
			ingredientsSlice.selectors.getIngredientsError({ ingredients: state })
		).toEqual(true);
	});

	it('get ingredients loading', () => {
		const state = { loading: true };
		expect(
			ingredientsSlice.selectors.getIngredientsLoading({ ingredients: state })
		).toEqual(true);
	});
});
