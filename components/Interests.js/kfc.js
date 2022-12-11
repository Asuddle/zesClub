import { Col, Row } from 'reactstrap';

import ContainerComponent from '../container';
import Image from 'next/image';
import styles from '../../styles/Interest.module.scss';

const burgerArr = [
	{ name: 'Double Burger', price: '$8.50' },
	{ name: 'Farm House', price: '$7.50' },
	{ name: 'Bacon Burger', price: '$8.00' },
	{ name: 'Special Offer', price: '$15.00' },
	{ name: 'Black Burger', price: '$11.00' },
	{ name: 'King Burger', price: '$11.00' },
];
export default function KFCPage() {
	return (
		<ContainerComponent container='mediumContainer'>
			<div className={styles.restaurantPage}>
				<Image src={`/PG2/F2.png`} width='221px' height='221px' alt='kfc' />
				<br />
				<br />
				<Row>
					{burgerArr.map((item, idx) => (
						<Col md={12} lg={6} key={item} className={styles.imageWrapper}>
							<div className={styles.dataWrapper}>
								<p className={styles.burgerName}>{item.name}</p>
								<p className={styles.price}>{item.price}</p>
								<button className={styles.scanButton}>Scan Now</button>
							</div>
							<Image
								key={item}
								src={`/PG-3/Deal-${idx + 1}.jpg`}
								width='557px'
								height='262px'
								alt='kfc'
							/>
						</Col>
					))}
				</Row>
				<br />
				<br />
				<br />
			</div>
		</ContainerComponent>
	);
}
