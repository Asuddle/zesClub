import React, { useContext, useEffect, useState } from 'react';
import { faCircleUser, faSignOut } from '@fortawesome/free-solid-svg-icons';

import { AuthContext } from '../src/context/auth-context';
import BurgerMenu from './burgerMenu';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { slide as Menu } from 'react-burger-menu';
import styles from '../styles/Home.module.scss';
import { useRouter } from 'next/router';

const navArr = [
	{ name: 'Home', href: '/' },
	{ name: 'About', href: '/about' },
	{ name: 'Why Zes', href: '/why-zes' },
	{ name: 'Gallery', href: '/gallery' },
	{ name: 'Whats Next', href: '/what-next' },
	{ name: 'Interests', href: '/interests' },
	{
		name: 'Contact',
		href: '/contact',
	},
];
export const handleLogout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('userData');
	localStorage.removeItem('role');
	window.location = window.location.origin;
};
function Navigation() {
	const authContext = useContext(AuthContext);
	const [activeNav, setActiveNav] = useState('/');
	const router = useRouter();

	useEffect(() => {
		// console.log('pkp', router);
		setActiveNav(router.pathname);
	}, [router.pathname]);

	const handleRegister = () => {
		router.push('/register');
	};
	const handleLogin = () => {
		router.push('/login');
	};

	const { authState } = authContext;
	return (
		<>
			<div className={styles.navContainer}>
				<div className={styles.navigationWrapper}>
					<BurgerMenu />
					<nav className='navbar navbar-expand-lg'>
						<Image
							className='navbar-brand'
							src='/zes2-black.png'
							alt='logo'
							width={100}
							height={100}
						/>
						<div
							className='collapse navbar-collapse'
							// id='navbarSupportedContent'
							// style={{ float: 'right' }}
						>
							<ul className='navbar-nav mr-auto' style={{ marginLeft: 'auto' }}>
								{navArr.map((item) => (
									<li
										key={item.name}
										className={
											item.href === activeNav ? styles.activeNav : 'nav-item'
										}
									>
										<Link href={item.href}>{item.name}</Link>
									</li>
								))}
								{authState.role !== 'user' ? (
									<>
										<li>
											<Button
												onClick={handleRegister}
												className={
													activeNav == '/register'
														? styles.activeBecomeMember
														: styles.becomeMember
												}
											>
												Become Member
											</Button>
										</li>
										<li className='nav-item' onClick={handleLogin}>
											<FontAwesomeIcon icon={faCircleUser} />
										</li>
									</>
								) : (
									<>
										{/* <Link className='nav-item' href='/user/profile'>
											Hi , User
										</Link> */}
										<li>
											<Button
												onClick={() => router.push('/user/profile')}
												className={styles.becomeMember}
											>
												Hi , User
											</Button>
										</li>
										{/* <li className='nav-item' style={{ color: '#fda700' }}>
											Hi, User
										</li> */}
										<li className='nav-item' onClick={handleLogout}>
											<FontAwesomeIcon icon={faSignOut} />
										</li>
									</>
								)}
							</ul>
						</div>
					</nav>
				</div>
			</div>
		</>
	);
}

export default Navigation;
