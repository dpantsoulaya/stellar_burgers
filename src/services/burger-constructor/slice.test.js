import {
	initialState,
	burgerConstructorSlice,
	changeBun,
	addElement,
	removeElement,
	clearAll,
	reorderElements,
} from './slice';

const bun = {
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
};

const ingredient1 = {
	_id: '643d69a5c3f7b9001cfa0942',
	name: 'Соус Spicy-X',
	type: 'sauce',
	proteins: 30,
	fat: 20,
	carbohydrates: 40,
	calories: 30,
	price: 90,
	image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
	__v: 0,
};

const ingredient2 = {
	_id: '643d69a5c3f7b9001cfa093f',
	name: 'Мясо бессмертных моллюсков Protostomia',
	type: 'main',
	proteins: 433,
	fat: 244,
	carbohydrates: 33,
	calories: 420,
	price: 1337,
	image: 'https://code.s3.yandex.net/react/code/meat-02.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
	__v: 0,
};

const ingredient3 = {
	_id: '643d69a5c3f7b9001cfa0947',
	name: 'Плоды Фалленианского дерева',
	type: 'main',
	proteins: 20,
	fat: 5,
	carbohydrates: 55,
	calories: 77,
	price: 874,
	image: 'https://code.s3.yandex.net/react/code/sp_1.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
	__v: 0,
};

describe('burger constructor slice', () => {
	it('initialized correctly', () => {
		const state = burgerConstructorSlice.reducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('changed bun', () => {
		const action = { type: changeBun, payload: bun };
		const state = burgerConstructorSlice.reducer(initialState, action);
		expect(state).toEqual({ ...initialState, bun });
	});

	it('add element', () => {
		const action = { type: addElement, payload: ingredient1 };
		const state = burgerConstructorSlice.reducer(initialState, action);
		expect(state.elements).toEqual([ingredient1]);
	});

	it('remove element', () => {
		const uniqueId = 'ingredient-1';
		const action = { type: removeElement, payload: uniqueId };
		const initialStateWithElement = {
			...initialState,
			elements: [{ ...ingredient1, uniqueId }, ingredient2],
		};
		const state = burgerConstructorSlice.reducer(
			initialStateWithElement,
			action
		);
		expect(state.elements).toEqual([ingredient2]);
	});

	it('clear all', () => {
		const initialStateWithData = {
			...initialState,
			bun,
			elements: [ingredient1, ingredient2, ingredient3],
		};
		const action = { type: clearAll };
		const state = burgerConstructorSlice.reducer(initialStateWithData, action);
		expect(state).toEqual(initialState);
	});

	it('reorder elements', () => {
		const initialStateWithData = {
			...initialState,
			elements: [ingredient1, ingredient2, ingredient3],
		};
		const action = {
			type: reorderElements,
			payload: { fromIndex: 0, toIndex: 2 },
		};
		const state = burgerConstructorSlice.reducer(initialStateWithData, action);
		expect(state.elements).toEqual([ingredient2, ingredient3, ingredient1]);
	});

	it('set dragging element index', () => {
		const action = burgerConstructorSlice.actions.setDraggingElementIndex({
			index: 1,
		});
		const state = burgerConstructorSlice.reducer(initialState, action);
		expect(state).toEqual({ ...initialState, draggingElementIndex: 1 });
	});

	it('clear dragging element index', () => {
		const initialStateWithIndex = { ...initialState, draggingElementIndex: 1 };
		const action = burgerConstructorSlice.actions.clearDraggingElementIndex();
		const state = burgerConstructorSlice.reducer(initialStateWithIndex, action);
		expect(state).toEqual({ ...initialState, draggingElementIndex: null });
	});

	it('get bun', () => {
		const state = {
			bun,
		};
		expect(
			burgerConstructorSlice.selectors.getBun({ burgerConstructor: state })
		).toEqual(bun);
	});

	it('get elements', () => {
		const state = {
			elements: [ingredient1, ingredient2, ingredient3],
		};
		expect(
			burgerConstructorSlice.selectors.getElements({ burgerConstructor: state })
		).toEqual([ingredient1, ingredient2, ingredient3]);
	});

	it('getDraggingElementIndex', () => {
		const state = { draggingElementIndex: 2 };
		expect(
			burgerConstructorSlice.selectors.getDraggingElementIndex({
				burgerConstructor: state,
			})
		).toEqual(2);
	});
});
