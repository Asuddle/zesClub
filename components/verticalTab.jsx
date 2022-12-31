import { Nav, NavItem, NavLink } from 'reactstrap';

import Image from 'next/image';
import { ReactComponent as ProfileIcon } from '../public/profile-icon.svg';
import styles from '../styles/component.module.scss';

export default function VerticalTab({ children }) {
	return (
		<div className={styles.verticalTabUpperWrap}>
			<Nav vertical className={styles.verticalTabWrapper}>
				<br />
				<br />
				<NavItem>
					<NavLink href='#' className={styles.navLink}>
						Profile
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href='#' className={styles.navLink}>
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
