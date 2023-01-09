import React, { useEffect } from 'react';

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
	console.log(authState);
	// checks if the user is authenticated or not
	const isUserAuthenticated = () => {
		if (!authState.token) {
			return false;
		}
	};

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
