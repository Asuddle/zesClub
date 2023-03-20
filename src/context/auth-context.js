import React, { useEffect } from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';

const AuthContext = React.createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
	const [authState, setAuthState] = React.useState({
		token: '',
		role: '',
	});
	useEffect(() => {
		if (localStorage.getItem('token') && localStorage.getItem('role')) {
			setAuthState({
				token: localStorage.getItem('token'),
				role: localStorage.getItem('role'),
			});
		}
	}, []);

	const setUserAuthInfo = (data) => {
		const token = localStorage.setItem('token', data.token);
		const role = localStorage.setItem('role', data.role);

		setAuthState({
			token: data.token,
			role: data.role,
		});
	};
	// checks if the user is authenticated or not
	const isUserAuthenticated = () => {
		if (!authState.token) {
			return false;
		}
	};
	if (typeof window !== 'undefined') {
		window.onload = function () {
			console.log('Check if it is', localStorage.getItem('token'));
			// axios.defaults.headers.common = {
			// 	Authorization: localStorage.getItem('token'),
			// };
		};
	}
	axios.interceptors.request.use(
		function (config) {
			config.headers.common = {
				Authorization: () => localStorage.getItem('token'),
			};
			return config;
		},
		function (error) {
			// Do something with request error
			logger.error(error);
			return Promise.reject(error);
		},
	);
	return (
		<Provider
			value={{
				authState,
				setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
				isUserAuthenticated,
			}}
		>
			{children}
		</Provider>
	);
};

export { AuthContext, AuthProvider };
