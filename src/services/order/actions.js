import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearAll } from '@services/constructor/reducer';
import { postOrder } from '@utils/api';

export const makeOrder = createAsyncThunk(
	'order/makeOrder',
	async (ingredients, thunkAPI) => {
		return postOrder(ingredients).then((res) => {
			thunkAPI.dispatch(clearAll());
			return res;
		});
	}
);
