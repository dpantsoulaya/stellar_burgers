import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearAll } from '@services/burger-constructor/slice';
import { postOrder, getOrder as getOrderApi } from '@utils/api';

export const getOrder = createAsyncThunk(
	'order/getOrder',
	async (number: number) => {
		return await getOrderApi(number);
	}
);

export const makeOrder = createAsyncThunk(
	'order/makeOrder',
	async (ingredients: string[], thunkAPI) => {
		return postOrder(ingredients).then((res) => {
			thunkAPI.dispatch(clearAll());
			return res;
		});
	}
);
