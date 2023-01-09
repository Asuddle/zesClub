import { Nav, NavItem, NavLink } from 'reactstrap';

import Image from 'next/image';
import { ReactComponent as ProfileIcon } from '../public/profile-icon.svg';
import styles from '../styles/component.module.scss';
import { useRouter } from 'next/router';

export default function VerticalTab({ children }) {
	const router = useRouter();
	console.log(router.route);
	return (
		<div className={styles.verticalTabUpperWrap}>
			<Nav vertical className={styles.verticalTabWrapper}>
				<br />
				<br />
				<NavItem>
					<NavLink
						href='#'
						className={
							router.route === '/user/profile'
								? styles.selectedNavLink
								: styles.navLink
						}
						onClick={() => {
							router.push('/user/profile');
						}}
					>
						Profile
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						href='#'
						className={
							router.route === '/user/events'
								? styles.selectedNavLink
								: styles.navLink
						}
						onClick={() => {
							router.push('/user/events');
						}}
					>
						Dashboard
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink className={styles.navLink} href='#'>
						Logout
					</NavLink>
				</NavItem>
			</Nav>
			<div className={styles.verticalComponentWrapper}>{children}</div>
		</div>
	);
}
