import '../styles/globals.css';

import FullLayout from '../layout/FullLayout';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	let isAdmin = router.route.split('/')[1] == 'admin';

	return isAdmin ? (
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
	);
}

export default MyApp;
