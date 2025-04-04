import { createSlice } from '@reduxjs/toolkit';
import { makeOrder } from './actions';

const initialState = {
	orderDetails: {},
	loading: false,
	error: false,
};

export const orderSlice = createSlice({
	name: 'order',
	initialState: initialState,
	selectors: {
		getOrderDetails: (state) => state.orderDetails,
		getOrderDetailsLoading: (state) => state.loading,
		getOrderDetailsError: (state) => state.error,
	},
	extraReducers: (builder) => {
		builder
			.addCase(makeOrder.pending, (state) => {
				state.loading = true;
				state.error = false;
			})
			.addCase(makeOrder.fulfilled, (state, action) => {
				state.loading = false;
				state.orderDetails = action.payload;
			})
			.addCase(makeOrder.rejected, (state, action) => {
				state.loading = false;
				state.orderDetails = {};
				state.error = action.error?.message ?? 'Ошибка';
			});
	},
});

export const { getOrderDetails, getOrderDetailsLoading, getOrderDetailsError } =
	orderSlice.selectors;

export default orderSlice.reducer;
