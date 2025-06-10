import { login, logout, patchUser, register } from './action';
import { initialState, userSlice } from './slice';

const mockUser = {
	email: 'test@test.com',
	name: 'Test User',
};

describe('user slice', () => {
	it('initialized correctly', () => {
		const state = userSlice.reducer(initialState, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('setUser', () => {
		const action = userSlice.actions.setUser(mockUser);
		const state = userSlice.reducer(initialState, action);
		expect(state).toEqual({ ...initialState, user: mockUser });
	});

	it('setIsAuthChecked', () => {
		const action = userSlice.actions.setIsAuthChecked(true);
		const state = userSlice.reducer(initialState, action);
		expect(state).toEqual({ ...initialState, isAuthChecked: true });
	});

	it('register fulfilled', () => {
		const action = { type: register.fulfilled.type, payload: mockUser };
		const state = userSlice.reducer(initialState, action);
		expect(state).toEqual({ ...initialState, user: mockUser });
	});

	it('login fulfilled', () => {
		const action = { type: login.fulfilled.type, payload: mockUser };
		const state = userSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			user: mockUser,
			isAuthChecked: true,
			loading: false,
		});
	});

	it('logout fulfilled', () => {
		const mockState = {
			...initialState,
			user: mockUser,
			loading: true,
		};
		const action = { type: logout.fulfilled.type };
		const state = userSlice.reducer(mockState, action);
		expect(state).toEqual({
			...initialState,
			user: null,
			loading: false,
		});
	});

	it('patchUser fulfilled', () => {
		const updateUser = { ...mockUser, name: 'Updated Name' };
		const mockState = { ...initialState, user: mockUser, loading: true };
		const action = { type: patchUser.fulfilled.type, payload: updateUser };
		const state = userSlice.reducer(mockState, action);
		expect(state).toEqual({
			...initialState,
			user: updateUser,
			loading: false,
		});
	});

	it('pending actions', () => {
		const action = { type: 'abc/pending' };
		const state = userSlice.reducer(initialState, action);
		expect(state).toEqual({ ...initialState, loading: true, error: false });
	});

	it('rejected actions', () => {
		const errorMessage = 'Some error message';
		const action = {
			type: 'abc/rejected',
			error: { message: errorMessage },
		};
		const state = userSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			loading: false,
			error: true,
			errorMessage: errorMessage,
		});
	});

	it('selector: getUser', () => {
		const mockState = { ...initialState, user: mockUser };
		expect(userSlice.selectors.getUser({ user: mockState })).toEqual(mockUser);
	});

	it('selector: isAuthChecked', () => {
		const mockState = { ...initialState, isAuthChecked: true };
		expect(userSlice.selectors.getIsAuthChecked({ user: mockState })).toEqual(
			true
		);
	});

	it('selector: getLoading', () => {
		const mockState = { ...initialState, loading: true };
		expect(userSlice.selectors.getLoading({ user: mockState })).toEqual(true);
	});

	it('selector: getError', () => {
		const mockState = { ...initialState, error: true };
		expect(userSlice.selectors.getError({ user: mockState })).toEqual(true);
	});

	it('selector: getErrorMessage', () => {
		const errorMessage = 'Some error';
		const mockState = { ...initialState, error: true, errorMessage };
		expect(userSlice.selectors.getErrorMessage({ user: mockState })).toEqual(
			errorMessage
		);
	});
});
