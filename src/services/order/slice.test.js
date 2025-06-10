import { getOrder, makeOrder } from './actions';
import { initialState, orderSlice } from './slice';

const mockOrderDetails = {
	success: true,
	name: 'Экзо-плантаго флюоресцентный бургер',
	order: {
		ingredients: [
			{
				_id: '643d69a5c3f7b9001cfa093d',
				name: 'Флюоресцентная булка R2-D3',
				type: 'bun',
				proteins: 44,
				fat: 26,
				carbohydrates: 85,
				calories: 643,
				price: 988,
				image: 'https://code.s3.yandex.net/react/code/bun-01.png',
				image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
				image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
				__v: 0,
			},
			{
				_id: '643d69a5c3f7b9001cfa0949',
				name: 'Мини-салат Экзо-Плантаго',
				type: 'main',
				proteins: 1,
				fat: 2,
				carbohydrates: 3,
				calories: 6,
				price: 4400,
				image: 'https://code.s3.yandex.net/react/code/salad.png',
				image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
				image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
				__v: 0,
			},
			{
				_id: '643d69a5c3f7b9001cfa093d',
				name: 'Флюоресцентная булка R2-D3',
				type: 'bun',
				proteins: 44,
				fat: 26,
				carbohydrates: 85,
				calories: 643,
				price: 988,
				image: 'https://code.s3.yandex.net/react/code/bun-01.png',
				image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
				image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
				__v: 0,
			},
		],
		_id: '6841e9d0c2f30c001cb2a3ee',
		owner: {
			name: 'Петя',
			email: 'david@holyhope.ru',
			createdAt: '2025-04-15T21:25:16.452Z',
			updatedAt: '2025-05-08T15:01:00.254Z',
		},
		status: 'done',
		name: 'Экзо-плантаго флюоресцентный бургер',
		createdAt: '2025-06-05T19:02:40.695Z',
		updatedAt: '2025-06-05T19:02:41.397Z',
		number: 80362,
		price: 6376,
	},
};

const mockOrder = {
	success: true,
	name: 'Метеоритный флюоресцентный минеральный бессмертный бургер',
	order: {
		ingredients: [
			{
				_id: '643d69a5c3f7b9001cfa093d',
				name: 'Флюоресцентная булка R2-D3',
				type: 'bun',
				proteins: 44,
				fat: 26,
				carbohydrates: 85,
				calories: 643,
				price: 988,
				image: 'https://code.s3.yandex.net/react/code/bun-01.png',
				image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
				image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
				__v: 0,
			},
			{
				_id: '643d69a5c3f7b9001cfa0940',
				name: 'Говяжий метеорит (отбивная)',
				type: 'main',
				proteins: 800,
				fat: 800,
				carbohydrates: 300,
				calories: 2674,
				price: 3000,
				image: 'https://code.s3.yandex.net/react/code/meat-04.png',
				image_mobile:
					'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
				image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
				__v: 0,
			},
			{
				_id: '643d69a5c3f7b9001cfa093f',
				name: 'Мясо бессмертных моллюсков Protostomia',
				type: 'main',
				proteins: 433,
				fat: 244,
				carbohydrates: 33,
				calories: 420,
				price: 1337,
				image: 'https://code.s3.yandex.net/react/code/meat-02.png',
				image_mobile:
					'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
				image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
				__v: 0,
			},
			{
				_id: '643d69a5c3f7b9001cfa0946',
				name: 'Хрустящие минеральные кольца',
				type: 'main',
				proteins: 808,
				fat: 689,
				carbohydrates: 609,
				calories: 986,
				price: 300,
				image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
				image_mobile:
					'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
				image_large:
					'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
				__v: 0,
			},
			{
				_id: '643d69a5c3f7b9001cfa093d',
				name: 'Флюоресцентная булка R2-D3',
				type: 'bun',
				proteins: 44,
				fat: 26,
				carbohydrates: 85,
				calories: 643,
				price: 988,
				image: 'https://code.s3.yandex.net/react/code/bun-01.png',
				image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
				image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
				__v: 0,
			},
		],
		_id: '6841ec71c2f30c001cb2a3f4',
		owner: {
			name: 'Петя',
			email: 'david@holyhope.ru',
			createdAt: '2025-04-15T21:25:16.452Z',
			updatedAt: '2025-05-08T15:01:00.254Z',
		},
		status: 'done',
		name: 'Метеоритный флюоресцентный минеральный бессмертный бургер',
		createdAt: '2025-06-05T19:13:53.521Z',
		updatedAt: '2025-06-05T19:13:54.225Z',
		number: 80365,
		price: 6613,
	},
};

describe('order slice', () => {
	it('initialized correctly', () => {
		const state = orderSlice.reducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('makeOrder pending', () => {
		const action = makeOrder.pending;
		const state = orderSlice.reducer(initialState, action);
		expect(state).toEqual({ ...initialState, error: false, loading: true });
	});

	it('makeOrder fulfilled', () => {
		const action = {
			type: makeOrder.fulfilled.type,
			payload: mockOrderDetails,
			loading: true,
		};
		const state = orderSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			orderDetails: mockOrderDetails,
			error: false,
			loading: false,
		});
	});

	it('makeOrder rejected', () => {
		const stateWithOrderDetails = {
			...initialState,
			orderDetails: mockOrderDetails,
			loading: true,
		};
		const action = makeOrder.rejected;
		const state = orderSlice.reducer(stateWithOrderDetails, action);
		expect(state).toEqual({
			...initialState,
			orderDetails: null,
			loading: false,
			error: true,
		});
	});

	it('getOrder pending', () => {
		const action = getOrder.pending;
		const state = orderSlice.reducer(initialState, action);
		expect(state).toEqual({ ...initialState, loading: true, error: false });
	});

	it('getOrder fulfilled', () => {
		const action = { type: getOrder.fulfilled.type, payload: mockOrder };
		const state = orderSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			currentOrder: mockOrder,
			loading: false,
			error: false,
		});
	});

	it('getOrder rejected', () => {
		const stateWithOrder = {
			...initialState,
			currentOrder: mockOrder,
			loading: true,
		};
		const action = getOrder.rejected;
		const state = orderSlice.reducer(stateWithOrder, action);
		expect(state).toEqual({
			...initialState,
			currentOrder: null,
			loading: false,
			error: true,
		});
	});

	it('selector: getCurrentOrder', () => {
		const stateWithOrder = { ...initialState, currentOrder: mockOrder };
		expect(
			orderSlice.selectors.getCurrentOrder({ order: stateWithOrder })
		).toEqual(mockOrder);
	});

	it('selector: getOrderDetails', () => {
		const stateWithOrderDetails = {
			...initialState,
			orderDetails: mockOrderDetails,
		};
		expect(
			orderSlice.selectors.getOrderDetails({ order: stateWithOrderDetails })
		).toEqual(mockOrderDetails);
	});

	it('selector: getLoading', () => {
		const mockState = { ...initialState, loading: true };
		expect(orderSlice.selectors.getOrderLoading({ order: mockState })).toEqual(
			true
		);
	});

	it('selector: getError', () => {
		const mockState = { ...initialState, error: true };
		expect(orderSlice.selectors.getOrderError({ order: mockState })).toEqual(
			true
		);
	});
});
