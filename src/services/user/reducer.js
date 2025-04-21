import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout, patchUser } from './action';

const initialState = {
	user: null,
	isAuthChecked: false,
	loading: false,
	error: false,
	errorMessage: '',
};

function isRejectedAction(action) {
	return action.type.endsWith('rejected');
}

function isPendingAction(action) {
	return action.type.endsWith('pending');
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	selectors: {
		getUser: (state) => state.user,
		getIsAuthChecked: (state) => state.isAuthChecked,
		getLoading: (state) => state.loading,
		getError: (state) => state.error,
		getErrorMessage: (state) => state.errorMessage,
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setIsAuthChecked: (state, action) => {
			state.isAuthChecked = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.fulfilled, (state, action) => {
				state.user = action.payload;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false;
				state.isAuthChecked = true;
				state.user = action.payload;
			})
			.addCase(logout.fulfilled, (state) => {
				state.loading = false;
				state.user = null;
			})
			.addCase(patchUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addMatcher(isPendingAction, (state) => {
				state.loading = true;
				state.error = false;
			})
			.addMatcher(isRejectedAction, (state, action) => {
				state.loading = false;
				state.error = true;
				state.errorMessage = action.error?.message ?? 'Ошибка';
			});
	},
});

export const { setUser, setIsAuthChecked } = userSlice.actions;

export const {
	getUser,
	getIsAuthChecked,
	getLoading,
	getError,
	getErrorMessage,
} = userSlice.selectors;
