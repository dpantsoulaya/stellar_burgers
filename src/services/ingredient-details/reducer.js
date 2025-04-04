import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentIngredient: null,
};

export const ingredientDetailsSlice = createSlice({
	name: 'ingredientDetails',
	initialState: initialState,
	selectors: {
		getCurrentIngredient: (state) => state.currentIngredient,
	},
	reducers: {
		setCurrentIngredient: (state, action) => {
			state.currentIngredient = action.payload;
		},
		clearCurrentIngredient: (state) => {
			state.currentIngredient = null;
		},
	},
});

export const { setCurrentIngredient, clearCurrentIngredient } =
	ingredientDetailsSlice.actions;

export const { getCurrentIngredient } = ingredientDetailsSlice.selectors;

export default ingredientDetailsSlice.reducer;
