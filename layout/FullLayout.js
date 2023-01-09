import {
	Box,
	Container,
	experimentalStyled,
	useMediaQuery,
} from '@mui/material';
import React, { useContext, useEffect } from 'react';

import { AuthContext } from '../src/context/auth-context';
import Footer from './footer/Footer';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import { useRouter } from 'next/router';

const MainWrapper = experimentalStyled('div')(() => ({
	display: 'flex',
	minHeight: '100vh',
	overflow: 'hidden',
	width: '100%',
}));

const PageWrapper = experimentalStyled('div')(({ theme }) => ({
	display: 'flex',
	flex: '1 1 auto',
	overflow: 'hidden',

	backgroundColor: theme.palette.background.default,
	[theme.breakpoints.up('lg')]: {
		paddingTop: '64px',
	},
	[theme.breakpoints.down('lg')]: {
		paddingTop: '64px',
	},
}));

const FullLayout = ({ children }) => {
	const authContext = useContext(AuthContext);
	const router = useRouter();
	const [isSidebarOpen, setSidebarOpen] = React.useState(true);
	const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

	useEffect(() => {
		if (localStorage.getItem('role') !== 'admin') {
			router.push('/');
		}
	}, [authContext.authState]);

	const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
	return authContext.authState.role === 'admin' ? (
		<MainWrapper>
			<Header
				sx={{
					paddingLeft: isSidebarOpen && lgUp ? '265px' : '',
					backgroundColor: '#fbfbfb',
				}}
				toggleMobileSidebar={() => setMobileSidebarOpen(true)}
			/>
			<Sidebar
				isSidebarOpen={isSidebarOpen}
				isMobileSidebarOpen={isMobileSidebarOpen}
				onSidebarClose={() => setMobileSidebarOpen(false)}
			/>
			<PageWrapper>
				<Container
					maxWidth={false}
					sx={{
						paddingTop: '20px',
						paddingLeft: isSidebarOpen && lgUp ? '280px!important' : '',
					}}
				>
					<Box sx={{ minHeight: 'calc(100vh - 170px)' }}>{children}</Box>
					<Footer />
				</Container>
			</PageWrapper>
		</MainWrapper>
	) : (
		<div>....</div>
	);
};

export default FullLayout;
