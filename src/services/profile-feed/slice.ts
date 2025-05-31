import { FeedResponse } from '@utils/types';
import { onError, onMessage } from './actions';
import { createSlice } from '@reduxjs/toolkit';

export type TProfileFeed = {
	profileFeed: FeedResponse | null;
	error: string | null;
};

const initialState: TProfileFeed = {
	profileFeed: null,
	error: null,
};

export const profileFeedSlice = createSlice({
	name: 'profileFeed',
	initialState,
	reducers: {},
	selectors: {
		getProfileFeed: (state: TProfileFeed) => state.profileFeed,
		getError: (state: TProfileFeed) => state.error,
	},
	extraReducers: (builder) => {
		builder
			.addCase(onMessage, (state, action) => {
				state.profileFeed = action.payload;
			})
			.addCase(onError, (state, action) => {
				state.error = action.payload;
			});
	},
});

export const { getProfileFeed, getError } = profileFeedSlice.selectors;
