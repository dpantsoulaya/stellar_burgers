import { createAsyncThunk } from '@reduxjs/toolkit';
import { postOrder } from '@utils/api';

export const makeOrder = createAsyncThunk(
	'order/makeOrder',
	async (ingredients) => {
		return postOrder(ingredients);
	}
);
