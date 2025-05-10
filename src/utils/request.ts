import { ApiResponse } from './types';

// 1 раз объявляем базовый урл
export const BASE_URL = 'https://norma.nomoreparties.space/api/';

// Есть ли в переданном объекте поле success
function hasSuccessField(obj: any): obj is ApiResponse {
	return 'success' in obj;
}

// создаем функцию проверки ответа на `ok`
const checkResponse = <TData>(res: Response): Promise<TData> => {
	if (res.ok) {
		return res.json();
	}
	// не забываем выкидывать ошибку, чтобы она попала в `catch`
	return Promise.reject(`Ошибка ${res.status}`);
};

// создаем функцию проверки на `success`
const checkSuccess = <TData>(res?: TData): TData | Promise<never> => {
	if (res && hasSuccessField(res) && res.success) {
		return res;
	}
	// не забываем выкидывать ошибку, чтобы она попала в `catch`
	return Promise.reject(`Ответ не success: ${res}`);
};

// создаем универсальную функцию запроса с проверкой ответа и `success`
// В вызов приходит `endpoint`(часть урла, которая идет после базового) и опции
export const request = <TReturn>(
	endpoint: string,
	options?: RequestInit,
	authorizationToken = ''
): Promise<TReturn> => {
	options = options || {};
	options = {
		...options,
		headers: { ...options.headers, Authorization: authorizationToken },
	};

	// а также в ней базовый урл сразу прописывается, чтобы не дублировать в каждом запросе
	return fetch(`${BASE_URL}${endpoint}`, options)
		.then(checkResponse<TReturn>)
		.then(checkSuccess<TReturn>);
};

export const patch = <TReturn, TInputData>(
	endpoint: string,
	data: TInputData,
	authorizationToken = ''
): Promise<TReturn> => {
	return request(
		endpoint,
		{
			method: 'PATCH',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		},
		authorizationToken
	);
};

export const postRequest = <TReturn, TInputData>(
	endpoint: string,
	data?: TInputData,
	authorizationToken = ''
): Promise<TReturn> => {
	return request(endpoint, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: authorizationToken,
		},
		body: JSON.stringify(data),
	});
};
