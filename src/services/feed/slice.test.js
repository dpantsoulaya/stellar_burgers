import { onError, onMessage } from './actions';
import { feedSlice, initialState } from './slice';

const mockFeed = {
	success: true,
	orders: [
		{
			_id: '6841c4dec2f30c001cb2a373',
			ingredients: [
				'643d69a5c3f7b9001cfa093d',
				'643d69a5c3f7b9001cfa0941',
				'643d69a5c3f7b9001cfa0941',
				'643d69a5c3f7b9001cfa093d',
			],
			status: 'done',
			name: 'Флюоресцентный био-марсианский бургер',
			createdAt: '2025-06-05T16:25:02.217Z',
			updatedAt: '2025-06-05T16:25:03.041Z',
			number: 80351,
		},
		{
			_id: '6841c425c2f30c001cb2a371',
			ingredients: [
				'643d69a5c3f7b9001cfa093d',
				'643d69a5c3f7b9001cfa093e',
				'643d69a5c3f7b9001cfa093e',
				'643d69a5c3f7b9001cfa093e',
				'643d69a5c3f7b9001cfa0947',
				'643d69a5c3f7b9001cfa0947',
			],
			status: 'done',
			name: 'Флюоресцентный фалленианский люминесцентный бургер',
			createdAt: '2025-06-05T16:21:57.543Z',
			updatedAt: '2025-06-05T16:21:58.287Z',
			number: 80350,
		},
		{
			_id: '6840b58bc2f30c001cb2a10d',
			ingredients: [
				'643d69a5c3f7b9001cfa093d',
				'643d69a5c3f7b9001cfa093e',
				'643d69a5c3f7b9001cfa093e',
				'643d69a5c3f7b9001cfa093e',
			],
			status: 'done',
			name: 'Флюоресцентный люминесцентный бургер',
			createdAt: '2025-06-04T21:07:23.739Z',
			updatedAt: '2025-06-04T21:07:24.528Z',
			number: 80302,
		},
	],
	total: 79977,
	totalToday: 101,
};

const mockError = 'Connection error';

describe('feed slice', () => {
	it('initialized correctly', () => {
		const state = feedSlice.reducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('on message action', () => {
		const action = onMessage(mockFeed);
		const state = feedSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			feed: mockFeed,
			error: null,
		});
	});

	it('on error action', () => {
		const action = onError(mockError);
		const state = feedSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			feed: null,
			error: mockError,
		});
	});

	it('selector: getFeed', () => {
		const mockState = {
			feed: mockFeed,
			error: null,
		};
		expect(feedSlice.selectors.getFeed({ feed: mockState })).toEqual(mockFeed);
	});

	it('selector: getError', () => {
		const mockState = {
			feed: null,
			error: mockError,
		};
		expect(feedSlice.selectors.getError({ feed: mockState })).toEqual(
			mockError
		);
	});
});
