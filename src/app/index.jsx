import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppHeader } from '../components/app-header/app-header';
import { Home } from '@pages/home';
import { Login } from '@pages/login';
import { Register } from '@pages/register';
import { ForgotPassword } from '@pages/forgot-password';
import { ResetPassword } from '@pages/reset-password';
import { NotFound404 } from '@pages/not-found-404';
import { Profile } from '@pages/profile';
import { Ingredient } from '@pages/ingredient';
import { OnlyAuth, OnlyUnAuth } from '../components/protected-route';
import { ProfileEdit } from '@pages/profile-edit';
import { Orders } from '@pages/orders';
import { checkUserAuth } from '@services/user/action';
import { Modal } from '../components/modal/modal';
import { IngredientDetails } from '../components/ingredient-details/ingredient-details';
import styles from './app.module.scss';

export const App = () => {
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
						path='/ingredients/:id'
						element={
							<Modal title='Детали ингредиента'>
								<IngredientDetails />
							</Modal>
						}
					/>
				</Routes>
			)}

			<Routes location={state?.backgroundLocation || location}>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
				<Route
					path='/register'
					element={<OnlyUnAuth component={<Register />} />}
				/>
				<Route
					path='/forgot_password'
					element={<OnlyUnAuth component={<ForgotPassword />} />}
				/>
				<Route
					path='/reset_password'
					element={<OnlyUnAuth component={<ResetPassword />} />}
				/>
				<Route path='/profile' element={<OnlyAuth component={<Profile />} />}>
					<Route path='/profile/edit' element={<ProfileEdit />} />
					<Route path='/profile/orders' element={<Orders />} />
				</Route>
				<Route path='/ingredients/:id' element={<Ingredient />} />
				<Route path='*' element={<NotFound404 />} />
			</Routes>
		</div>
	);
};
