import { FeedResponse } from '@utils/types';
import { onError, onMessage } from './actions';
import { createSlice } from '@reduxjs/toolkit';

export type TFeed = {
	feed: FeedResponse | null;
	error: string | null;
};

export const initialState: TFeed = {
	feed: null,
	error: null,
};

export const feedSlice = createSlice({
	name: 'feed',
	initialState,
	reducers: {},
	selectors: {
		getFeed: (state: TFeed) => state.feed,
		getError: (state: TFeed) => state.error,
	},
	extraReducers: (builder) => {
		builder
			.addCase(onMessage, (state, action) => {
				state.feed = action.payload;
			})
			.addCase(onError, (state, action) => {
				state.error = action.payload;
			});
	},
});

export const { getFeed, getError } = feedSlice.selectors;
