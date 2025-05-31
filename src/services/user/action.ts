import {
	register as registerApi,
	login as loginApi,
	logout as logoutApi,
	patchUser as patchUserApi,
	hasAccessToken,
	getUser,
} from '@utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setIsAuthChecked, setUser } from './slice';
import { LoginData, UserWithPassword } from '@utils/types';

// Регистрация пользователя
export const register = createAsyncThunk(
	'user/register',
	async ({ name, email, password }: UserWithPassword) => {
		const res = await registerApi(name, email, password);
		return res.user;
	}
);

// Вход пользователя
export const login = createAsyncThunk(
	'user/login',
	async ({ email, password }: LoginData) => {
		const res = await loginApi(email, password);
		return res.user;
	}
);

// Выход пользователя
export const logout = createAsyncThunk('user/logout', async () => {
	await logoutApi();
});

// Обновление данных пользователя
export const patchUser = createAsyncThunk(
	'user/patchUser',
	async ({ email, name, password }: UserWithPassword) => {
		const res = await patchUserApi(email, name, password);
		return res.user;
	}
);

// Проверка авторизации пользователя (и запись пользователя в хранилище)
export const checkUserAuth = createAsyncThunk(
	'user/checkUserAuth',
	async (_, { dispatch }) => {
		if (hasAccessToken()) {
			getUser()
				.then((res) => dispatch(setUser(res)))
				.finally(() => dispatch(setIsAuthChecked(true)));
		} else {
			dispatch(setIsAuthChecked(true));
		}
	}
);
