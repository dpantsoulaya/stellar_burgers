// Тип ингредиента: булка, соус или начинка
export type IngredientType = 'bun' | 'sauce' | 'main';

// Ингредиент
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

// К ингредиенту в конструкторе бургеров мы добавляем уникальный Id для перетаскивания
export type ConstructorIngredient = Ingredient & {
	uniqueId: string;
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

// Данные для входа
export type LoginData = {
	email: string;
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

// Ответ сервера на запрос деталей заказа
export type OrderResponse = ApiResponse & OrderDetails;

// Поле status у заказа может иметь значения created, pending, done
export type OrderStatus = 'created' | 'pending' | 'done';

// Заказ в ленте
export type Order = {
	name: string;
	ingredients: string[];
	_id: string;
	status: OrderStatus;
	number: number;
	createdAt: Date;
	updatedAt: Date;
};

// Лента заказов
export type FeedResponse = ApiResponse & {
	orders: Order[];
	total: number;
	totalToday: number;
};

// Ответ сервера на запрос заказа
export type OrdersResponse = ApiResponse & {
	orders: Order[];
};
