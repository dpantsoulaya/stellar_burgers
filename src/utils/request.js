// 1 раз объявляем базовый урл
export const BASE_URL = 'https://norma.nomoreparties.space/api/';

// создаем функцию проверки ответа на `ok`
const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	// не забываем выкидывать ошибку, чтобы она попала в `catch`
	return Promise.reject(`Ошибка ${res.status}`);
};

// создаем функцию проверки на `success`
const checkSuccess = (res) => {
	if (res && res.success) {
		return res;
	}
	// не забываем выкидывать ошибку, чтобы она попала в `catch`
	return Promise.reject(`Ответ не success: ${res}`);
};

// создаем универсальную функцию запроса с проверкой ответа и `success`
// В вызов приходит `endpoint`(часть урла, которая идет после базового) и опции
export const request = (endpoint, options) => {
	// а также в ней базовый урл сразу прописывается, чтобы не дублировать в каждом запросе
	return fetch(`${BASE_URL}${endpoint}`, options)
		.then(checkResponse)
		.then(checkSuccess);
};

export const patch = (endpoint, data, authorizationToken = '') => {
	return request(endpoint, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: authorizationToken,
		},
		body: JSON.stringify(data),
	});
};

export const postRequest = (endpoint, data, authorizationToken = '') => {
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
