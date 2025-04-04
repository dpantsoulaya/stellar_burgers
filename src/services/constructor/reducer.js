import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	bun: null,
	elements: [],

	// Индекс перемещаемого элемента (чтобы скрыть его из списка)
	draggingElementIndex: null,
};

export const constructorSlice = createSlice({
	name: 'constructor',
	initialState: initialState,
	selectors: {
		getBun: (state) => state.bun,
		getElements: (state) => state.elements,
		getDraggingElementIndex: (state) => state.draggingElementIndex,
	},
	reducers: {
		changeBun: (state, action) => {
			state.bun = action.payload;
		},
		addElement: (state, action) => {
			state.elements = state.elements
				? [...state.elements, action.payload]
				: [action.payload];
		},
		removeElement: (state, action) => {
			const elements = [...state.elements];
			elements.splice(action.payload, 1);
			state.elements = elements;
		},
		reorderElements: (state, action) => {
			const { toIndex, fromIndex } = action.payload;
			const elements = [...state.elements];
			elements.splice(toIndex, 0, elements.splice(fromIndex, 1)[0]);
			state.elements = elements;
			state.draggingElementIndex = fromIndex;
		},
		setDraggingElementIndex: (state, action) => {
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
	reorderElements,
	setDraggingElementIndex,
	clearDraggingElementIndex,
} = constructorSlice.actions;
export const { getBun, getElements, getDraggingElementIndex } =
	constructorSlice.selectors;

export default constructorSlice.reducer;
