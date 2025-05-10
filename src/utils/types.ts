export type IngredientType = 'bun' | 'sauce' | 'main';

export type Ingredient = {
	_id: string;
	type: IngredientType;
	name: string;
	price: number;
	image: string;
	image_large: string;
	calories: number;
	proteins: number;
	fat: number;
	carbohydrates: number;
};

// Токена доступа и обновления
export type TokensData = {
	accessToken: string;
	refreshToken: string;
};

// Данные пользователя
export type UserData = {
	email: string;
	name: string;
};

// Данные пользователя с паролем
export type UserWithPassword = UserData & {
	password: string;
};

// Пользователь + токены
export type AuthData = {
	user: UserData;
} & TokensData;

export type TokenData = {
	token: string;
};

export type TokenAndPassword = TokenData & Pick<UserWithPassword, 'password'>;

export type ApiResponse = {
	success: boolean;
};

// Ответ от сервера на запрос пользователя
export type UserResponse = ApiResponse & {
	user: UserData;
};

// Ответ от сервера со строкой message
export type MessageResponse = ApiResponse & {
	message: string;
};

// Ответ на запрос списка ингредиентов
export type IngredientsResponse = ApiResponse & {
	data: Ingredient[];
};

// Детали заказа
export type OrderDetails = {
	name: string;
	order: {
		number: number;
	};
};

// Ответ сервера на запрос заказа
export type OrderResponse = ApiResponse & OrderDetails;
