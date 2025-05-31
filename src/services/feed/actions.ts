import { createAction } from '@reduxjs/toolkit';
import { FeedResponse } from '@utils/types';

export const connect = createAction<string, 'feed/connect'>('feed/connect');
export const disconnect = createAction('feed/disconnect');
export const onMessage = createAction<FeedResponse, 'feed/onMessage'>(
	'feed/onMessage'
);
export const onError = createAction<string, 'feed/onError'>('feed/onError');

export type FeedActionTypes =
	| ReturnType<typeof connect>
	| ReturnType<typeof disconnect>
	| ReturnType<typeof onMessage>
	| ReturnType<typeof onError>;
