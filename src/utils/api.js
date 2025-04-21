import { request, postRequest as post, patch } from './request';

const LOCAL_STORAGE_ACCESS_TOKEN = 'accessToken';
const LOCAL_STORAGE_REFRESH_TOKEN = 'refreshToken';

const ERROR_JWT_EXPIRED = 'jwt expired';

// Есть ли в хранилище access token
export const hasAccessToken = () => {
	const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
	return accessToken !== null && accessToken !== '';
};

// Обновление токена
export const refreshToken = async () => {
	return post('auth/token', {
		token: localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN),
	}).then((data) => {
		localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, data.accessToken);
		localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, data.refreshToken);
		return data;
	});
};

// PATCH-запрос с обновлением токена
export const patchWithAuth = async (endpoint, data) => {
	const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
	try {
		return patch(endpoint, data, accessToken);
	} catch (err) {
		if (err.message === ERROR_JWT_EXPIRED) {
			const refreshData = await refreshToken();
			return patch(endpoint, data, refreshData.accessToken);
		} else {
			return Promise.reject(err);
		}
	}
};

// Запрос с обновлением токена
export const getWithAuth = async (endpoint, options) => {
	const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
	options = options || {};
	options = {
		...options,
		headers: { ...options.headers, Authorization: accessToken },
	};
	try {
		return request(endpoint, options);
	} catch (err) {
		if (err.message === ERROR_JWT_EXPIRED) {
			const refreshData = await refreshToken();
			options.headers.authorization = refreshData.accessToken;
			return request(endpoint, options);
		} else {
			return Promise.reject(err);
		}
	}
};

// POST-запрос с обновлением токена
export const postWithAuth = async (endpoint, data) => {
	const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
	try {
		return post(endpoint, data, accessToken);
	} catch (err) {
		if (err.message === ERROR_JWT_EXPIRED) {
			const refreshData = await refreshToken();
			return post(endpoint, data, refreshData.accessToken);
		} else {
			return Promise.reject(err);
		}
	}
};

// Регистрация пользователя
export const register = (name, email, password) =>
	post('auth/register', { name, email, password }).then((data) => {
		localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, data.accessToken);
		localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, data.refreshToken);
		return data;
	});

// Вход пользователя
export const login = (email, password) =>
	post('auth/login', { email, password }).then((data) => {
		localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, data.accessToken);
		localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, data.refreshToken);
		return data;
	});

// Выход пользователя
export const logout = () => {
	const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN);
	if (refreshToken) {
		post('auth/logout', { token: refreshToken }).then((data) => {
			localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
			localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN);
			return data;
		});
	}
};

// Получение данных пользователя
export const getUser = () => {
	return getWithAuth('auth/user')
		.then((data) => {
			return data.user;
		})
		.catch((err) => {
			localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
			localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN);
			throw err;
		});
};

// Обновление данных пользователя
export const patchUser = (email, name, password) =>
	patchWithAuth('auth/user', { email, name, password });

// Пост-запрос для восстановления пароля: получить код на почту
export const postPasswordReset = (email) =>
	postWithAuth('password-reset', { email });

// Пост-запрос для восстановление пароля: новый пароль
export const postPasswordResetReset = (password, token) =>
	postWithAuth('password-reset/reset', { password, token });

// Загрузка ингредиентов с сервера
export const getIngredients = () =>
	getWithAuth('ingredients').then((data) => data.data);

// Запрос создания заказа
export const postOrder = (ingredients) =>
	postWithAuth('orders', { ingredients });
