import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from './ingredients/slice';
import { burgerConstructorSlice } from './burger-constructor/slice';
import { orderSlice } from './order/slice';
import { userSlice } from './user/slice';
import {
	useSelector as selectorHook,
	useDispatch as dispatchHook,
} from 'react-redux';
import { socketMiddleware } from './middleware/socket-middleware';
import { connect, disconnect, onError, onMessage } from './feed/actions';
import {
	connect as profileFeedConnect,
	disconnect as profileFeedDisconnect,
	onError as profileFeedOnError,
	onMessage as profileFeedOnMessage,
} from './profile-feed/actions';
import { feedSlice } from './feed/slice';
import { profileFeedSlice } from './profile-feed/slice';

const rootReducer = combineSlices(
	ingredientsSlice,
	burgerConstructorSlice,
	orderSlice,
	userSlice,
	feedSlice,
	profileFeedSlice
);

// Мидлвара для ленты заказов
const feedMiddleware = socketMiddleware({
	connect,
	disconnect,
	onMessage,
	onError,
});

// Вторая мидлвара для истории заказов в профиле
const profileFeedMiddleware = socketMiddleware({
	connect: profileFeedConnect,
	disconnect: profileFeedDisconnect,
	onMessage: profileFeedOnMessage,
	onError: profileFeedOnError,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(feedMiddleware).concat(profileFeedMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
