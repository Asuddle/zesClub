import { Button, Card, Col, Nav, NavItem, NavLink, Row } from 'reactstrap';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import axios from 'axios';
import styles from '../../styles/user.module.scss';
import { useRouter } from 'next/router';

export default function UserEventComponent() {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState('1');
	const [data, setData] = useState([]);
	const handleNav = (val) => {
		setActiveTab(val);
	};
	useEffect(() => {
		axios.get('/api/events').then((res) => {
			console.log(res.data.data);
			setData(res.data.data);
		});
	}, []);
	const handleBook = (id) => {
		router.push(`/user/events/${id}`);
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
			{data.map((item) => (
				<Card className={styles.eventCard} key={item.name}>
					<Row>
						<Col md={3}>
							<Image
								src={`/${item.image}`}
								// layout='responsive'
								width={200}
								height={150}
							/>
							<div className={styles.imageDivider}></div>
						</Col>
						<Col md={9} className={styles.eventData}>
							<h6 className={styles.eventName}>{item.name}</h6>
							<p className={styles.price}>AED {item.price}</p>
							<p className={styles.description}>{item.description}</p>
							<br />
							<Row>
								<Col md={3}>
									<p className={styles.eventDetail}>{item.venue}</p>
								</Col>
								<Col md={3}>
									<p className={styles.eventDetail}>{item.audience}</p>
								</Col>
								<Col md={2}>
									<p className={styles.eventDetail}>{item.date}</p>
								</Col>
								<Col
									md={4}
									className='text-right'
									onClick={() => {
										handleBook(item.id);
									}}
								>
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
