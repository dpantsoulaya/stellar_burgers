import { request, postRequest as post, patch } from './request';
import {
	AuthData,
	Ingredient,
	IngredientsResponse,
	MessageResponse,
	Order,
	OrderResponse,
	OrdersResponse,
	TokenAndPassword,
	TokenData,
	TokensData,
	UserData,
	UserResponse,
	UserWithPassword,
} from './types';

export const LOCAL_STORAGE_ACCESS_TOKEN = 'accessToken';
export const LOCAL_STORAGE_REFRESH_TOKEN = 'refreshToken';

const ERROR_JWT_EXPIRED = 'jwt expired';

// Есть ли в хранилище access token
export const hasAccessToken = (): boolean => {
	const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
	return accessToken !== null && accessToken !== '';
};

// Обновление токена
export const refreshToken = async (): Promise<TokensData> => {
	const token = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN);
	if (!token) return Promise.reject('В localStorage отсутствует refresh token');

	return post<TokensData, TokenData>('auth/token', {
		token,
	}).then((data) => {
		localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, data.accessToken);
		localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, data.refreshToken);
		return data;
	});
};

// Обновить токен и попробовать ещё раз
const refreshTokenAndRetry = async <TReturn>(
	err: unknown,
	callback: (accessToken: string) => Promise<TReturn>
): Promise<TReturn> => {
	if (err instanceof Error && err.message === ERROR_JWT_EXPIRED) {
		const refreshData = await refreshToken();
		const accessToken = refreshData.accessToken;
		return callback(accessToken);
	} else {
		return Promise.reject(err);
	}
};

// PATCH-запрос с обновлением токена
export const patchWithAuth = async <TReturn, TInputData>(
	endpoint: string,
	data: TInputData
): Promise<TReturn> => {
	const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN) ?? '';
	try {
		return patch<TReturn, TInputData>(endpoint, data, accessToken);
	} catch (err) {
		return refreshTokenAndRetry(err, (newAccessToken) =>
			patch<TReturn, TInputData>(endpoint, data, newAccessToken)
		);
	}
};

// Запрос с обновлением токена
export const getWithAuth = async <TReturn>(
	endpoint: string,
	options?: RequestInit
): Promise<TReturn> => {
	const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN) ?? '';

	try {
		return request(endpoint, options, accessToken);
	} catch (err) {
		return refreshTokenAndRetry(err, (newAccessToken) =>
			request(endpoint, options, newAccessToken)
		);
	}
};

// POST-запрос с обновлением токена
export const postWithAuth = async <TReturn, TInputData>(
	endpoint: string,
	data: TInputData
): Promise<TReturn> => {
	const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN) ?? '';
	try {
		return post(endpoint, data, accessToken);
	} catch (err) {
		return refreshTokenAndRetry(err, (newAccessToken) =>
			post(endpoint, data, newAccessToken)
		);
	}
};

// Регистрация пользователя
export const register = (
	name: string,
	email: string,
	password: string
): Promise<AuthData> =>
	post<AuthData, UserWithPassword>('auth/register', {
		name,
		email,
		password,
	}).then((data) => {
		localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, data.accessToken);
		localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, data.refreshToken);
		return data;
	});

// Вход пользователя
export const login = (email: string, password: string): Promise<AuthData> =>
	post<AuthData, Pick<UserWithPassword, 'email' | 'password'>>('auth/login', {
		email,
		password,
	}).then((data) => {
		localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, data.accessToken);
		localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, data.refreshToken);
		return data;
	});

// Выход пользователя
export const logout = () => {
	const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN);
	if (refreshToken) {
		post<MessageResponse, TokenData>('auth/logout', {
			token: refreshToken,
		}).then((data) => {
			localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
			localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN);
			return data;
		});
	}
};

// Получение данных пользователя
export const getUser = async (): Promise<UserData> => {
	try {
		const data = await getWithAuth<UserResponse>('auth/user');
		return data.user;
	} catch (err) {
		localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
		localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN);
		throw err;
	}
};

// Обновление данных пользователя
export const patchUser = (
	email: string,
	name: string,
	password: string
): Promise<UserResponse> =>
	patchWithAuth<UserResponse, UserWithPassword>('auth/user', {
		email,
		name,
		password,
	});

// Пост-запрос для восстановления пароля: получить код на почту
export const postPasswordReset = (email: string): Promise<MessageResponse> =>
	postWithAuth<MessageResponse, Pick<UserData, 'email'>>('password-reset', {
		email,
	});

// Пост-запрос для восстановление пароля: новый пароль
export const postPasswordResetReset = (
	password: string,
	token: string
): Promise<MessageResponse> =>
	postWithAuth<MessageResponse, TokenAndPassword>('password-reset/reset', {
		password,
		token,
	});

// Загрузка ингредиентов с сервера
export const getIngredients = (): Promise<Ingredient[]> =>
	getWithAuth<IngredientsResponse>('ingredients').then((data) => data.data);

// Запрос создания заказа
export const postOrder = (ingredients: string[]): Promise<OrderResponse> =>
	postWithAuth<OrderResponse, { ingredients: string[] }>('orders', {
		ingredients,
	});

// Получить заказ с сервера по его номеру
export const getOrder = (number: number): Promise<Order> =>
	getWithAuth<OrdersResponse>(`orders/${number}`).then(
		(data) => data.orders[0]
	);
