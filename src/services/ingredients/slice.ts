import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadIngredients } from './actions';
import { Ingredient } from '@utils/types';

export type TIngredientsState = {
	ingredients: Ingredient[];
	loading: boolean;
	error: boolean;
};

const initialState: TIngredientsState = {
	ingredients: [],
	loading: false,
	error: false,
};

export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	selectors: {
		getAllIngredients: (state) => state.ingredients,
		getIngredientsLoading: (state) => state.loading,
		getIngredientsError: (state) => state.error,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadIngredients.pending, (state) => {
				state.loading = true;
				state.error = false;
			})
			.addCase(
				loadIngredients.fulfilled,
				(state, action: PayloadAction<Ingredient[]>) => {
					state.loading = false;
					state.ingredients = Array.isArray(action.payload)
						? action.payload
						: [];
				}
			)
			.addCase(loadIngredients.rejected, (state) => {
				state.loading = false;
				state.error = true;
				state.ingredients = [];
			});
	},
});

// TODO:
// export const { setCurrentIngredient, clearCurrentIngredient } =
// 	ingredientsSlice.actions;

export const {
	getAllIngredients,
	getIngredientsError,
	getIngredientsLoading,
	// TODO:
	//getCurrentIngredient,
} = ingredientsSlice.selectors;
