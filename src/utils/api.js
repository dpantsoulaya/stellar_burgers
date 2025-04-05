import request from './request';

// Загрузка ингредиентов с сервера
export const getIngredients = () =>
	request('ingredients').then((data) => data.data);

// Запрос создания заказа
export const postOrder = (ingredients) =>
	request('orders', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ ingredients }),
	});
