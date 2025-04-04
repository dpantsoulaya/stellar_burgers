import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from './ingredients/reducer';
import { constructorSlice } from './constructor/reducer';
import { orderSlice } from './order/reducer';
import { ingredientDetailsSlice } from './ingredient-details/reducer';

const initialState = {
	ingredients: {},
	ingredientDetails: {},
	constructor: {},
	order: {},
};

const rootReducer = combineSlices(
	ingredientsSlice,
	ingredientDetailsSlice,
	constructorSlice,
	orderSlice
);

export const store = configureStore({
	reducer: rootReducer,
	preloadedState: initialState,
});
