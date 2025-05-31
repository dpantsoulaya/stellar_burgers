import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrder, makeOrder } from './actions';
import { Order, OrderDetails } from '@utils/types';

export type TOrderDetailsState = {
	currentOrder: Order | null;
	orderDetails: OrderDetails | null;
	loading: boolean;
	error: boolean;
};

const initialState: TOrderDetailsState = {
	currentOrder: null,
	orderDetails: null,
	loading: false,
	error: false,
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	selectors: {
		getCurrentOrder: (state) => state.currentOrder,
		getOrderDetails: (state) => state.orderDetails,
		getOrderLoading: (state) => state.loading,
		getOrderError: (state) => state.error,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(makeOrder.pending, (state) => {
				state.loading = true;
				state.error = false;
			})
			.addCase(
				makeOrder.fulfilled,
				(state, action: PayloadAction<OrderDetails>) => {
					state.loading = false;
					state.orderDetails = action.payload;
				}
			)
			.addCase(makeOrder.rejected, (state) => {
				state.loading = false;
				state.error = true;
				state.orderDetails = null;
			})
			.addCase(getOrder.pending, (state) => {
				state.loading = true;
				state.error = false;
			})
			.addCase(getOrder.fulfilled, (state, action: PayloadAction<Order>) => {
				state.loading = false;
				state.currentOrder = action.payload;
			})
			.addCase(getOrder.rejected, (state) => {
				state.loading = false;
				state.error = true;
				state.currentOrder = null;
			});
	},
});

export const {
	getCurrentOrder,
	getOrderDetails,
	getOrderLoading,
	getOrderError,
} = orderSlice.selectors;
