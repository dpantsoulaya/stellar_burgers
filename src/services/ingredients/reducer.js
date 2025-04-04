import { createSlice } from '@reduxjs/toolkit';
import { loadIngredients } from './actions';

const initialState = {
	ingredients: [],
	loading: false,
	error: false,
};

export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState: initialState,
	selectors: {
		getAllIngredients: (state) => state.ingredients,
		getIngredientsLoading: (state) => state.loading,
		getIngredientsError: (state) => state.error,
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadIngredients.pending, (state) => {
				state.loading = true;
				state.error = false;
			})
			.addCase(loadIngredients.fulfilled, (state, action) => {
				state.loading = false;
				state.ingredients = action.payload;
			})
			.addCase(loadIngredients.rejected, (state, action) => {
				state.loading = false;
				state.ingredients = [];
				state.error = action.error?.message ?? 'Ошибка';
			});
	},
});

export const { setCurrentIngredient, clearCurrentIngredient } =
	ingredientsSlice.actions;

export const {
	getAllIngredients,
	getIngredientsError,
	getIngredientsLoading,
	getCurrentIngredient,
} = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
