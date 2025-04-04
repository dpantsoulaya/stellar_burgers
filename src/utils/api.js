const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';
const CREATE_ORDER_URL = 'https://norma.nomoreparties.space/api/orders';

// Загрузка ингредиентов с сервера
export const getIngredients = async () => {
	try {
		const response = await fetch(INGREDIENTS_URL);

		if (!response.ok) {
			throw new Error(`Ошибка ${response.status}`);
		}

		const data = await response.json();
		if (!data.success) {
			throw new Error('Ошибка получения данных');
		}

		return data.data; // Возвращаем данные, если всё успешно
	} catch (error) {
		console.error('Ошибка при загрузке ингредиентов:', error);
		throw error;
	}
};

// Запрос создания заказа
export const postOrder = async (ingredients) => {
	try {
		const response = await fetch(CREATE_ORDER_URL, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ingredients }),
		});

		if (!response.ok) {
			console.log(response);
			alert(`Ошибка ${response.status}`);
			return;
		}

		const data = await response.json();
		if (!data.success) {
			throw new Error('Ошибка получения данных');
		}

		return data;
	} catch (error) {
		console.error('Ошибка запроса создания заказа', error);
		throw error;
	}
};
