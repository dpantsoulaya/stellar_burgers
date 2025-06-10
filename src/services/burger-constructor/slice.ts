import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient, ConstructorIngredient } from '@utils/types';

export type TConstructorState = {
	bun: Ingredient | null;
	elements: ConstructorIngredient[];
	// Индекс перемещаемого элемента (чтобы скрыть его из списка)
	draggingElementIndex: number | null;
};

export const initialState: TConstructorState = {
	bun: null,
	elements: [],
	draggingElementIndex: null,
};

export const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	selectors: {
		getBun: (state) => state.bun,
		getElements: (state) => state.elements,
		getDraggingElementIndex: (state) => state.draggingElementIndex,
	},
	reducers: {
		changeBun: (state, action: PayloadAction<Ingredient>) => {
			state.bun = action.payload;
		},
		addElement: {
			reducer: (state, action: PayloadAction<ConstructorIngredient>) => {
				state.elements = state.elements
					? [...state.elements, action.payload]
					: [action.payload];
			},
			prepare: (ingredient: Ingredient) => {
				return { payload: { ...ingredient, uniqueId: nanoid() } };
			},
		},
		removeElement: (state, action: PayloadAction<string>) => {
			state.elements = [...state.elements].filter(
				(e) => e.uniqueId !== action.payload
			);
		},
		clearAll: () => initialState,
		reorderElements: (
			state,
			action: PayloadAction<{ toIndex: number; fromIndex: number }>
		) => {
			const { toIndex, fromIndex } = action.payload;
			const elements = [...state.elements];
			elements.splice(toIndex, 0, elements.splice(fromIndex, 1)[0]);
			state.elements = elements;
			state.draggingElementIndex = fromIndex;
		},
		setDraggingElementIndex: (
			state,
			action: PayloadAction<{ index: number | null }>
		) => {
			state.draggingElementIndex = action.payload.index;
		},
		clearDraggingElementIndex: (state) => {
			state.draggingElementIndex = null;
		},
	},
});

export const {
	changeBun,
	addElement,
	removeElement,
	clearAll,
	reorderElements,
	setDraggingElementIndex,
	clearDraggingElementIndex,
} = burgerConstructorSlice.actions;

export const { getBun, getElements, getDraggingElementIndex } =
	burgerConstructorSlice.selectors;
