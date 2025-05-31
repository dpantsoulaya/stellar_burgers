import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AppHeader } from '../components/app-header/app-header';
import { Home } from '@pages/home/home';
import { Login } from '@pages/auth/login';
import { Register } from '@pages/auth/register';
import { ForgotPassword } from '@pages/auth/forgot-password';
import { ResetPassword } from '@pages/auth/reset-password';
import { NotFound404 } from '@pages/not-found/not-found-404';
import { Profile } from '@pages/profile/profile';
import { Ingredient } from '@pages/ingredient/ingredient';
import { OnlyAuth, OnlyUnAuth } from '../components/protected-route';
import { ProfileEdit } from '@pages/profile-edit/profile-edit';
import { checkUserAuth } from '@services/user/action';
import { Modal } from '../components/modal/modal';
import { IngredientDetails } from '../components/ingredient-details/ingredient-details';
import { Routes as AppRoutes } from '../routes';
import { Feed } from '@pages/feed/feed';
import { useDispatch } from '@services/store';
import styles from './app.module.scss';
import { Order } from '@pages/order/order';
import { OrderInfo } from '../components/order-info/order-info';
import { ProfileFeed } from '@pages/profile-feed/profile-feed';

export const App = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		dispatch(checkUserAuth());
	}, []);

	const state = location.state;

	return (
		<div className={styles.page}>
			<AppHeader />

			{state?.backgroundLocation && (
				<Routes>
					<Route
						path={AppRoutes.INGREDIENT}
						element={
							<Modal title='Детали ингредиента'>
								<IngredientDetails />
							</Modal>
						}
					/>
					<Route
						path={AppRoutes.FEED_ORDER_INFO}
						element={
							<Modal>
								<OrderInfo />
							</Modal>
						}
					/>
					<Route
						path={AppRoutes.PROFILE_ORDER_INFO}
						element={
							<Modal>
								<OrderInfo />
							</Modal>
						}
					/>
				</Routes>
			)}

			<Routes location={state?.backgroundLocation || location}>
				<Route path='/' element={<Home />} />
				<Route path={AppRoutes.FEED} element={<Feed />} />
				<Route
					path={AppRoutes.LOGIN}
					element={<OnlyUnAuth component={<Login />} />}
				/>
				<Route
					path={AppRoutes.REGISTER}
					element={<OnlyUnAuth component={<Register />} />}
				/>
				<Route
					path={AppRoutes.FORGOT_PASSWORD}
					element={<OnlyUnAuth component={<ForgotPassword />} />}
				/>
				<Route
					path={AppRoutes.RESET_PASSWORD}
					element={<OnlyUnAuth component={<ResetPassword />} />}
				/>
				<Route
					path={AppRoutes.PROFILE}
					element={<OnlyAuth component={<Profile />} />}>
					<Route path={AppRoutes.EDIT_PROFILE} element={<ProfileEdit />} />
					<Route path={AppRoutes.ORDERS} element={<ProfileFeed />} />
				</Route>
				<Route path={AppRoutes.INGREDIENT} element={<Ingredient />} />
				<Route path={AppRoutes.FEED_ORDER_INFO} element={<Order />} />
				<Route path={AppRoutes.PROFILE_ORDER_INFO} element={<Order />} />
				<Route path={AppRoutes.NOT_FOUND} element={<NotFound404 />} />
			</Routes>
		</div>
	);
};
