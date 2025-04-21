import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from './ingredients/reducer';
import { constructorSlice } from './constructor/reducer';
import { orderSlice } from './order/reducer';
import { userSlice } from './user/reducer';

const initialState = {
	ingredients: {},
	ingredientDetails: {},
	constructor: {},
	order: {},
	user: {},
};

const rootReducer = combineSlices(
	ingredientsSlice,
	constructorSlice,
	orderSlice,
	userSlice
);

export const store = configureStore({
	reducer: rootReducer,
	preloadedState: initialState,
});
