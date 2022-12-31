import { Button, Card, Col, Nav, NavItem, NavLink, Row } from 'reactstrap';

import Image from 'next/image';
import styles from '../../styles/user.module.scss';
import { useState } from 'react';

export default function UserEventComponent() {
	const [activeTab, setActiveTab] = useState('1');
	const handleNav = (val) => {
		setActiveTab(val);
	};
	return (
		<div className={styles.userEventWrapper}>
			<h1 className={styles.heading}>Dashboard</h1>

			<div>
				<Nav pills className={styles.tabNav}>
					<NavItem className={styles.navItem}>
						<NavLink
							className={activeTab === '1' ? styles.active : {}}
							href='#'
							onClick={() => handleNav('1')}
						>
							All
						</NavLink>
					</NavItem>
					<NavItem className={styles.navItem}>
						<NavLink
							className={activeTab === '2' ? styles.active : {}}
							onClick={() => handleNav('2')}
							href='#'
						>
							Latest Events
						</NavLink>
					</NavItem>
					<NavItem className={styles.navItem}>
						<NavLink
							className={activeTab === '3' ? styles.active : {}}
							href='#'
							onClick={() => handleNav('3')}
						>
							Recent Events
						</NavLink>
					</NavItem>
				</Nav>
			</div>
			{[1, 2, 3, 4].map((item) => (
				<Card className={styles.eventCard}>
					<Row>
						<Col md={3}>
							<Image
								src='/components/service1.jpg'
								// layout='responsive'
								width={200}
								height={150}
							/>
							<div className={styles.imageDivider}></div>
						</Col>
						<Col md={9} className={styles.eventData}>
							<h6 className={styles.eventName}>Event Name here</h6>
							<p className={styles.price}>AED 2000</p>
							<p className={styles.description}>
								Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
								diam nonummy nibh euismod tincidunt ut laoreet dolore magna
								aliquam erat volutpat.
							</p>
							<br />
							<Row>
								<Col md={2}>
									<p className={styles.eventDetail}>Venue Here</p>
								</Col>
								<Col md={2}>
									<p className={styles.eventDetail}>Ladies & Gents</p>
								</Col>
								<Col md={2}>
									<p className={styles.eventDetail}>20 Oct 2022</p>
								</Col>
								<Col md={6} className='text-right'>
									<Button className={styles.bookNowButton}>Book Now</Button>
								</Col>
							</Row>
						</Col>
					</Row>
				</Card>
			))}
		</div>
	);
}
