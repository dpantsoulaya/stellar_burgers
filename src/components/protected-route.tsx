import { useSelector } from '@services/store';
import { getIsAuthChecked, getUser } from '@services/user/slice';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader } from './loader/loader';
import { Routes } from '../routes';
import { ReactNode } from 'react';

type ProtectedRouteProps = {
	onlyUnAuth?: boolean;
	component: ReactNode;
};

export const ProtectedRoute = ({
	onlyUnAuth = false,
	component,
}: ProtectedRouteProps): React.ReactNode => {
	const user = useSelector(getUser);
	const isAuthChecked = useSelector(getIsAuthChecked);
	const location = useLocation();

	if (!isAuthChecked) {
		return <Loader />;
	}

	// Если пользователь не должен быть авторизован, но он авторизован,
	// то перенаправляем его туда, откуда он пришёл или на главную
	if (onlyUnAuth && user) {
		const from = location.state?.from ?? '/';
		return <Navigate to={from} />;
	}

	// Если пользователь должен быть авторизован, а он не авторизован,
	//  то перенаправляем на страницу логина и запоминаем, откуда он пришёл
	if (!onlyUnAuth && !user) {
		return <Navigate to={Routes.LOGIN} state={{ from: location }} />;
	}

	return component;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ component }: { component: ReactNode }) => (
	<ProtectedRoute onlyUnAuth={true} component={component} />
);
