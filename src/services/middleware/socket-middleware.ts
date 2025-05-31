import {
	ActionCreatorWithoutPayload,
	ActionCreatorWithPayload,
	Middleware,
} from '@reduxjs/toolkit';
import { RootState } from '@services/store';
import { refreshToken } from '@utils/api';

// Период, через который мидлвара попробует восстановить соединение, если сервер его разорвал
const RECONNECT_PERIOD = 3000;

// События, которые поддерживаются этой мидлварой
export type TWsActions<R, S> = {
	connect: ActionCreatorWithPayload<string>;
	disconnect: ActionCreatorWithoutPayload;
	onConnecting?: ActionCreatorWithoutPayload;
	onOpen?: ActionCreatorWithoutPayload;
	onClose?: ActionCreatorWithoutPayload;
	onError: ActionCreatorWithPayload<string>;
	sendMessage?: ActionCreatorWithPayload<S>;
	onMessage: ActionCreatorWithPayload<R>;
};

export const socketMiddleware = <R, S>(
	wsActions: TWsActions<R, S>,
	withTokenRefresh = false
): Middleware<object, RootState> => {
	return (store) => {
		let socket: WebSocket | null = null;
		const {
			connect,
			disconnect,
			onConnecting,
			onOpen,
			onClose,
			onError,
			sendMessage,
			onMessage,
		} = wsActions;
		const { dispatch } = store;
		let isConnected = false;
		let url = '';
		let reconnectId = 0;

		return (next) => (action) => {
			// При соединении
			if (connect.match(action)) {
				url = action.payload;
				socket = new WebSocket(url);
				isConnected = true;
				onConnecting && dispatch(onConnecting());

				socket.onopen = () => {
					onOpen && dispatch(onOpen());
				};

				socket.onerror = () => {
					dispatch(onError('Неизвестная ошибка'));
				};

				socket.onclose = () => {
					onClose && dispatch(onClose());

					if (isConnected) {
						reconnectId = window.setTimeout(() => {
							dispatch(connect(url));
						}, RECONNECT_PERIOD);
					}
				};

				socket.onmessage = (event) => {
					const { data } = event;

					try {
						const parsedData = JSON.parse(data);

						// Если токен устарел, то обновить его
						if (
							withTokenRefresh &&
							parsedData.message === 'Invalid or missing token'
						) {
							refreshToken()
								.then((refreshedData) => {
									const newToken = refreshedData.accessToken.replace(
										'Bearer ',
										''
									);
									const wssUrl = new URL(url);
									wssUrl.searchParams.set('token', newToken);
								})
								.catch((error) => {
									dispatch(onError((error as Error).message));
								});

							// Закрыть текущее соединение (через которое вернулось сообщение об устаревании токена)
							dispatch(disconnect());
							return;
						}

						dispatch(onMessage(parsedData));
					} catch (error) {
						dispatch(onError((error as Error).message));
					}
				};

				return;
			}

			// Отправка сообщения
			if (sendMessage?.match(action) && socket) {
				try {
					socket.send(JSON.stringify(action.payload));
				} catch (error) {
					dispatch(onError((error as Error).message));
				}

				return;
			}

			// Разъединение
			if (disconnect.match(action)) {
				clearTimeout(reconnectId);
				reconnectId = 0;
				isConnected = false;
				// Закомментировано, т.к. React дважды монтирует компонент и сокет открывается два раза,
				// но надо один закрыть ещё до того, как он подключится, а предупреждение в консоли - это норм.
				//if (socket?.readyState === WebSocket.OPEN) {
				socket?.close();
				//}
				socket = null;

				return;
			}

			next(action);
		};
	};
};
