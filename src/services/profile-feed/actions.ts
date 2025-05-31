import { createAction } from '@reduxjs/toolkit';
import { FeedResponse } from '@utils/types';

export const connect = createAction<string, 'profile-feed/connect'>(
	'profile-feed/connect'
);
export const disconnect = createAction('profile-feed/disconnect');
export const onMessage = createAction<FeedResponse, 'profile-feed/onMessage'>(
	'profile-feed/onMessage'
);
export const onError = createAction<string, 'profile-feed/onError'>(
	'profile-feed/onError'
);

export type FeedActionTypes =
	| ReturnType<typeof connect>
	| ReturnType<typeof disconnect>
	| ReturnType<typeof onMessage>
	| ReturnType<typeof onError>;
