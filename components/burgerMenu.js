import { faBars, faBurger } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { slide as Menu } from 'react-burger-menu';
import styles from '../styles/Home.module.scss';
import { useState } from 'react';

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

export default function BurgerMenu({ props }) {
	const [menuOpen, setMenuOpen] = useState(false);
	const handleMenuOpen = (state) => {
		setMenuOpen(state.isOpen);
	};

	return (
		<>
			{/* <button
				class='navbar-toggler'
				type='button'
				id='nav-id'
				className={styles.burgerButton}
				style={{ background: 'white', zIndex: '9999' }}
				onClick={() => setMenuOpen(true)}
			>   
				<span class='navbar-toggler-icon'></span>
			</button> */}

			<Menu
				customBurgerIcon={
					<FontAwesomeIcon onClick={() => setMenuOpen(true)} icon={faBars} />
				}
				isOpen={menuOpen}
				onStateChange={(state) => handleMenuOpen(state)}
			>
				<div className={styles.burgerMenuWrapper}>
					{navArr.map((item) => (
						<div key={item.href}>
							<Link key={item.href} className='menu-item' href={item.href}>
								{item.name}
							</Link>
						</div>
					))}
				</div>
			</Menu>
		</>
	);
}
