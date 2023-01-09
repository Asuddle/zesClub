import '../styles/globals.css';

import { AuthContext, AuthProvider } from '../src/context/auth-context';
import { useContext, useEffect, useState } from 'react';

import FullLayout from '../layout/FullLayout';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
	const router = useRouter();

	// const authContext = useContext(AuthContext);
	let isAdmin = router.route.split('/')[1] == 'admin';
	// useEffect(() => {
	// 	console.log('dsadas', localStorage);
	// }, []);
	// console.log('Auth Context ::  ', authContext);

	return (
		<AuthProvider>
			{isAdmin ? (
				<ThemeProvider theme={theme}>
					<FullLayout>
						<Head>
							<title>Zes</title>
							<meta name='description' content='Zes Club Admin Panel' />
							<link rel='icon' href='/favicon.ico' />
						</Head>
						<Component {...pageProps} />
					</FullLayout>
				</ThemeProvider>
			) : (
				<Component {...pageProps} />
			)}
		</AuthProvider>
	);
}

export default MyApp;
